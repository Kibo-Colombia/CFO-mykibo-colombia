'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Settings, User, Star, Zap, Ghost, Loader2, Pencil, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';
import { GoalCard } from '@/components/my-page/GoalCard';

export default function MyPage() {
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    // Unified Profile Data State
    const [profileData, setProfileData] = useState({
        // Design Your Life fields
        identity_goal: '',
        identity_details: '',
        fuel_category: '',
        fuel_details: '',
        leak_category: '',
        leak_details: '',
        // User Info
        full_name: '',
        avatar_url: '',
        email: ''
    });

    // Fetch Profile Data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    router.push('/login');
                    return;
                }

                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (data) {
                    setProfileData({
                        identity_goal: data.identity_goal || '',
                        identity_details: data.identity_details || '',
                        fuel_category: data.fuel_category || '',
                        fuel_details: data.fuel_details || '',
                        leak_category: data.leak_category || '',
                        leak_details: data.leak_details || '',
                        full_name: data.full_name || user.user_metadata?.full_name || '',
                        avatar_url: data.avatar_url || user.user_metadata?.avatar_url || '',
                        email: user.email || ''
                    });
                } else if (error && error.code !== 'PGRST116') {
                    console.error('Error fetching profile:', error);
                } else {
                    // If no profile row, still set basic user info from auth
                    setProfileData(prev => ({
                        ...prev,
                        email: user.email || '',
                        full_name: user.user_metadata?.full_name || '',
                        avatar_url: user.user_metadata?.avatar_url || ''
                    }));
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
                setMounted(true);
            }
        };

        fetchProfile();
    }, [router, supabase]);

    // Save to Supabase (Debounced)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSave = useCallback(
        debounce(async (updates: Record<string, string>) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Filter out non-DB columns if necessary, but 'profiles' usually accepts what's defined.
            // We only want to save the "Design Your Life" fields here usually, unless we add profile editing.
            // For now, we'll strip email/avatar if they aren't in the update.

            const { error } = await supabase
                .from('profiles')
                .upsert({ id: user.id, ...updates, updated_at: new Date().toISOString() });

            if (error) console.error('Error saving profile:', error);
        }, 1000),
        []
    );

    const updateField = (field: keyof typeof profileData, value: string) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
        debouncedSave({ [field]: value });
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    if (!mounted || loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-24 text-foreground">
            {/* Header */}
            <header className="px-6 py-6 flex items-center justify-between max-w-lg mx-auto">
                <h1 className="text-2xl font-bold tracking-tight">My Page</h1>
                <Link
                    href="/my-page/settings"
                    className="p-2 rounded-full bg-background hover:bg-muted transition-colors border border-primary"
                >
                    <Settings className="w-5 h-5 text-foreground" />
                </Link>
            </header>

            <main className="max-w-lg mx-auto px-4 space-y-8">

                {/* Profile Card & Connected Apps */}
                <section className="space-y-6">
                    {/* User Profile Info */}
                    <div className="flex flex-col items-center p-6 rounded-3xl bg-card border border-primary">
                        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl mb-4 overflow-hidden border-2 border-background">
                            {profileData.avatar_url ? (
                                <img src={profileData.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-10 h-10 text-background" />
                            )}
                        </div>
                        <h2 className="text-xl font-bold text-foreground text-center">
                            {profileData.full_name || 'Kibo User'}
                        </h2>
                        <p className="text-sm text-primary text-center opacity-80">{profileData.email}</p>
                    </div>
                </section>

                {/* Design Your Life Section */}
                <section>
                    <div className="mb-6 flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-foreground mb-2">Design Your Life</h2>
                            <p className="text-primary text-sm leading-relaxed">
                                I&apos;m here to help you afford the life you actually want. Let&apos;s figure out what matters to you (and what doesn&apos;t) so you can do more of the fun stuff.
                            </p>
                        </div>
                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className={`p-2 rounded-full ring-1 ring-inset transition-all ml-4 shrink-0 shadow-lg ${isEditing ? 'bg-primary ring-primary text-primary-foreground' : 'bg-card ring-primary text-primary'}`}
                        >
                            {isEditing ? <Check className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Card 1: The North Star */}
                        <GoalCard
                            title="The North Star"
                            icon={Star}
                            helpText='"The version of you that exists in the future. I will use this to measure if your daily transactions are moving you closer to him or further away."'
                            value={profileData.identity_goal}
                            onChange={(val) => updateField('identity_goal', val)}
                            placeholder="In 2 years, I have built... or I am living as a..."
                            detailsValue={profileData.identity_details}
                            onDetailsChange={(val) => updateField('identity_details', val)}
                            detailsQuestion="What is one specific purchase that proves you are becoming this person?"
                            detailsPlaceholder="e.g., Buying a website domain, paying for a marathon entry, investing in a specific course..."
                            isEditing={isEditing}
                        />

                        {/* Card 2: The Energy Asset */}
                        <GoalCard
                            title="The Energy Asset"
                            icon={Zap}
                            helpText='"High-ROI Spending. The category where capital allocation consistently yields positive returns for your mental or professional growth."'
                            value={profileData.fuel_category}
                            onChange={(val) => updateField('fuel_category', val)}
                            placeholder='[ Select your "Growth Engine" ]'
                            detailsValue={profileData.fuel_details}
                            onDetailsChange={(val) => updateField('fuel_details', val)}
                            detailsQuestion="How do you feel immediately after spending money here?"
                            detailsPlaceholder="e.g., 'I feel clearer headed,' 'I feel capable,' 'I feel reconnected with the world'..."
                            isSelect={true}
                            isEditing={isEditing}
                        />

                        {/* Card 3: The Ghost */}
                        <GoalCard
                            title="The Ghost"
                            icon={Ghost}
                            helpText='"The unconscious habit that haunts your progress. It usually appears when you are tired, stressed, or bored. Let&apos;s make it visible."'
                            value={profileData.leak_category}
                            onChange={(val) => updateField('leak_category', val)}
                            placeholder="[ Select the habit you want to track ]"
                            detailsValue={profileData.leak_details}
                            onDetailsChange={(val) => updateField('leak_details', val)}
                            detailsQuestion="What specific situation or emotion usually triggers this?"
                            detailsPlaceholder="e.g., 'Late night boredom,' 'Stress after client meetings,' 'Feeling lonely on Fridays'..."
                            isSelect={true}
                            isEditing={isEditing}
                        />
                    </div>
                </section>

                {/* Connected Apps */}
                <div className="p-6 rounded-3xl bg-card border border-primary">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
                        <span className="text-xl text-primary">❖</span>
                        Connected Apps
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        {/* Kibo CFO - Current App (Theme Color) */}
                        <div className="p-4 rounded-2xl border border-primary relative overflow-hidden group transition-all duration-300 hover:bg-primary/10">
                            <div className="flex justify-between items-start mb-2">
                                <div className="font-bold text-lg text-primary">Mykibo CFO</div>
                                <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary text-primary-foreground">
                                    You are here
                                </span>
                            </div>
                            <p className="text-sm opacity-80 text-primary">Finance & Budgeting</p>

                            {/* Placeholder for Connect Logic if needed (since "You are here", it is always connected) */}
                        </div>

                        {/* Kibo Nexus - Link to External (Green) */}
                        <a
                            href="https://nexus.mykibo.site"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-4 rounded-2xl border relative overflow-hidden group transition-all duration-300"
                            style={{ backgroundColor: 'transparent', borderColor: '#A9D9C7' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1E4332'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="font-bold text-lg" style={{ color: '#A9D9C7' }}>Mykibo Nexus</div>
                                <div className="text-[10px] font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    style={{ backgroundColor: '#A9D9C7', color: '#1E4332' }}>
                                    Launch
                                </div>
                            </div>
                            <p className="text-sm opacity-80" style={{ color: '#A9D9C7' }}>Digital Campus</p>
                        </a>
                    </div>
                </div>

            </main>
        </div>
    );
}
