'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useTour } from '@/context/TourContext';

// Force dynamic rendering for pages that use client-side hooks
// export const dynamic = 'force-dynamic';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const { startTour } = useTour();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push(redirectTo);
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 page-ambient">
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-primary">Sign in to your Kibo account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="bg-background border border-primary p-6 rounded-xl shadow-lg">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-muted border border-primary/30
                           text-foreground placeholder:text-foreground/30
                           focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            {/* Password */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-primary mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-muted border border-primary/30
                           text-foreground placeholder:text-foreground/30
                           focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 mt-4 rounded-lg bg-[#C24656]/10 border border-[#C24656]/30">
                <p className="text-sm text-[#C24656]">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all duration-200
                ${loading
                  ? 'bg-primary/50 text-primary-foreground cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:bg-foreground hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]'
                }
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-primary/70 mt-6">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-primary hover:text-foreground transition-colors font-bold"
          >
            Sign up
          </Link>
        </p>

        {/* Back to Home */}
        <p className="text-center mt-4">
          <Link
            href="/"
            className="text-foreground/50 hover:text-foreground text-sm transition-colors"
          >
            ← Back to home
          </Link>
        </p>


      </div>
    </div>
  );
}

function LoginLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  );
}
