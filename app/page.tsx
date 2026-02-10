'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { useTour } from '@/context/TourContext';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { startTour } = useTour();

  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    // Check current session
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        // Redirect if already logged in
        router.push('/home');
        return;
      }
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      if (currentUser) {
        router.push('/home');
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">

      {/* Background Elements - Subtle and Clean */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center space-y-8">

        {/* Header Text */}
        <div className="space-y-2 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Welcome to Kibo
          </h1>
          <p className="text-primary font-medium tracking-wide text-sm uppercase">
            Your Financial Companion
          </p>
        </div>

        {/* Mascot */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float my-4">
          <Image
            src="/mascot/kibo/happy.png"
            alt="Kibo Mascot"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Auth Actions */}
        <div className="w-full space-y-4 animate-fade-in-up delay-200">
          <Link
            href="/login"
            className="block w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg text-center hover:bg-foreground transition-all active:scale-95 shadow-lg shadow-primary/10"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="block w-full py-4 rounded-xl border-2 border-primary/30 text-foreground font-semibold text-lg text-center hover:bg-primary/10 hover:border-primary/50 transition-all active:scale-95"
          >
            Create Account
          </Link>

          {/* Tour Button */}
          <button
            onClick={startTour}
            className="block w-full py-2 rounded-xl text-primary font-medium text-sm hover:text-foreground transition-colors"
          >
            Just take a look →
          </button>
        </div>

        {/* Footer Text */}
        <p className="text-foreground/40 text-xs mt-8">
          Kibo, your personal AI CFO
        </p>

      </div>
    </div>
  );
}
