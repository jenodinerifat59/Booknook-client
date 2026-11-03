
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Email and Password Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error.message || 'Login failed');
        return;
      }

      toast.success('Login successful!');
      router.push('/');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Google and GitHub Login
  const handleSocialLogin = async (provider) => {
    setSocialLoading(provider);

    try {
      const { data, error } = await authClient.signIn.social({
        provider,
        callbackURL: `${window.location.origin}/`,
        errorCallbackURL: `${window.location.origin}/login`,
        disableRedirect: true,
      });

      if (error) {
        toast.error(error.message || `${provider} login failed`);
        setSocialLoading('');
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error('OAuth URL was not returned');
        setSocialLoading('');
      }
    } catch (error) {
      console.error('Social login error:', error);
      toast.error('Social login failed. Check the console.');
      setSocialLoading('');
    }
  };

  // Forgot Password
  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast.error('Please enter your email first');
      return;
    }

    try {
      const { error } = await authClient.requestPasswordReset({
        email: formData.email,
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast.error(error.message || 'Failed to send reset email');
        return;
      }

      toast.success('Password reset email sent! Check your inbox.');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const isBusy = loading || !!socialLoading;

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F6F0] px-4 py-16 transition-colors duration-500 dark:bg-[#0D1110]">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-80 w-80 rounded-full bg-lime-500/10 blur-3xl" />

      {/* Login Card */}
      <div className="animate-[fadeInUp_0.7s_ease-out_both] w-full max-w-md">

        <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white/90 p-7 shadow-2xl shadow-emerald-950/10 backdrop-blur-xl dark:border-gray-700 dark:bg-[#171D1B]/95 sm:p-9">

          {/* Logo */}
          <Link href="/" className="mb-8 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#234C3D] text-2xl shadow-lg shadow-emerald-900/20">
              📚
            </div>

            <span className="text-2xl font-extrabold tracking-tight text-[#234C3D] dark:text-white">
              Book<span className="text-emerald-600 dark:text-emerald-400">Nook</span>
            </span>
          </Link>

          {/* Heading */}
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-700/20 bg-emerald-700/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Welcome Back
            </span>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Login to Your Account
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Welcome back! Continue your reading journey with BookNook.
            </p>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10 dark:border-gray-700 dark:bg-[#0D1110] dark:text-white dark:focus:border-emerald-500 dark:focus:bg-[#111815]"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10 dark:border-gray-700 dark:bg-[#0D1110] dark:text-white dark:focus:border-emerald-500 dark:focus:bg-[#111815]"
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isBusy}
                className="text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-900 hover:underline disabled:opacity-50 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isBusy}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#234C3D] py-3.5 font-bold text-white shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#19392D] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Logging in...
                </>
              ) : (
                <>
                  Login to BookNook
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Or continue with
            </span>
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            disabled={isBusy}
            className="mb-3 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3.5 font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-[#0D1110] dark:text-gray-200 dark:hover:border-emerald-500 dark:hover:bg-[#202925]"
          >
            <span className="text-xl font-bold text-red-500">G</span>
            {socialLoading === 'google'
              ? 'Connecting to Google...'
              : 'Continue with Google'}
          </button>

          {/* GitHub Login */}
          <button
            type="button"
            onClick={() => handleSocialLogin('github')}
            disabled={isBusy}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#171717] py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <span className="text-xl">⌘</span>
            {socialLoading === 'github'
              ? 'Connecting to GitHub...'
              : 'Continue with GitHub'}
          </button>

          {/* Register Link */}
          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="font-bold text-emerald-700 transition-colors hover:underline dark:text-emerald-400"
            >
              Create Account
            </Link>
          </p>

        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-emerald-700 dark:text-gray-400 dark:hover:text-emerald-400"
          >
            <span>←</span> Back to Home
          </Link>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
};

export default LoginPage;
