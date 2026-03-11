'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from '@/libs/I18nNavigation';
import { Link } from '@/libs/I18nNavigation';

export function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      document.cookie = 'auth_session=1; path=/; max-age=2592000'; // 30 days
      setIsLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Welcome back!</h1>
        <p className="text-gray-500">Please enter your details to sign in.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="signin-email">
              Email
            </label>
            <div className="relative">
              <Icon icon="solar:letter-linear" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#fff]" width={20} />
              <input
                id="signin-email"
                type="email"
                placeholder="Enter your email"
                required
                autoComplete="email"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="signin-password">
              Password
            </label>
            <div className="relative">
              <Icon icon="solar:lock-password-linear" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#fff]" width={20} />
              <input
                id="signin-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#fff] hover:text-gray-600 transition-colors"
              >
                <Icon icon={showPassword ? "solar:eye-bold" : "solar:eye-closed-bold"} width="20" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="w-4 h-4 rounded border border-gray-300 group-hover:border-blue-500 flex items-center justify-center transition-colors">
               <input type="checkbox" className="hidden peer" />
               <Icon icon="solar:check-square-bold" className="text-black hidden peer-checked:block w-4 h-4" />
            </div>
            <span className="text-sm text-gray-600 group-hover:text-black transition-colors">Remember me</span>
          </label>
          <Link
            href="/sign-in/#forgot"
            className="text-sm font-medium text-black hover:text-blue-700 transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#007ce1] text-white py-3.5 rounded-xl font-bold hover:bg-[#007ce1] transition-all shadow-lg shadow-[#007ce1]/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Icon icon="svg-spinners:ring-resize" width="20" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all">
          <Icon icon="logos:google-icon" width="20" />
          Google
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all">
          <Icon icon="logos:apple" width="20" />
          Apple
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-gray-500">
        Don&apos;t have an account?{' '}
        <Link href="/sign-up/" className="font-bold text-black hover:text-blue-700 transition-colors">
          Create account
        </Link>
      </p>
    </div>
  );
}
