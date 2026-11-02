
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


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">

        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Welcome Back
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Login to your BookNook account
        </p>

        {/* Email Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !!socialLoading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={() => handleSocialLogin('google')}
          disabled={loading || !!socialLoading}
          className="mb-3 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
        >
          <span className="font-bold text-lg text-red-500">G</span>
          {socialLoading === 'google'
            ? 'Connecting to Google...'
            : 'Continue with Google'}
        </button>

        {/* GitHub Login */}
        <button
          type="button"
          onClick={() => handleSocialLogin('github')}
          disabled={loading || !!socialLoading}
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-gray-900 py-3 font-medium text-white transition hover:bg-gray-800 disabled:opacity-60"
        >
          <span className="font-bold text-lg">⌘</span>
          {socialLoading === 'github'
            ? 'Connecting to GitHub...'
            : 'Continue with GitHub'}
        </button>

        {/* Register Link */}
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;
