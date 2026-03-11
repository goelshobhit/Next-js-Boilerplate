import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({ children }: any) {
  return (
    <div className="min-h-screen flex w-full bg-white">
      <div className="m-5 hidden sm:block">
        <Link href="/" className="flex items-center gap-3 w-fit hover:opacity-90 transition-opacity">
          <Image
            src="/assets/images/logo.png"
            alt="TTMSConnect"
            width={60}
            height={60}
            className="h-20 w-auto object-contain"
          />
        </Link>
      </div>
      {/* Right Side - Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-12 lg:p-20 relative">
        <div className="w-full max-w-[440px] space-y-8">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8 w-fit hover:opacity-90 transition-opacity">
            <Image
              src="/assets/images/logo.png"
              alt="TTMSConnect"
              width={32}
              height={32}
              className="h-22 w-auto object-contain align-middle"
            />
          </Link>

          {children}
        </div>
      </div>

      {/* Left Side - Hero/Image */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-5/12 relative bg-[#007ce1] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#007ce1]/90 to-indigo-900/90 z-10" />
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
          alt="Abstract Background"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
        />

        <div className="relative z-20 flex flex-col justify-between h-full p-12 text-white">
          {/* <Link href="/" className="flex items-center gap-3 w-fit hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-[#007ce1] flex items-center justify-center border border-blue-500 shadow-lg shadow-blue-900/20">
              <Icon icon="mdi:flash" width="24" className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">TTMSConnect</span>
          </Link> */}

          <div className="space-y-6 mt-80">
            <h2 className="text-4xl font-bold leading-tight">
              Turn your data into <br />
              <span className="text-blue-200">growth opportunities.</span>
            </h2>
            <p className="text-lg text-blue-100 max-w-md leading-relaxed">
              Join thousands of fleet organisation who use TTMSConnect to analyze, automate, and scale their fleet effectively.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-900 bg-gray-300 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium">
                <div className="flex items-center gap-1">
                  <Icon icon="solar:star-bold" className="text-yellow-400" />
                  <Icon icon="solar:star-bold" className="text-yellow-400" />
                  <Icon icon="solar:star-bold" className="text-yellow-400" />
                  <Icon icon="solar:star-bold" className="text-yellow-400" />
                  <Icon icon="solar:star-bold" className="text-yellow-400" />
                </div>
                <span className="text-blue-200">Loved by 10,000+ users</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-blue-200/60">
            <p>© {new Date().getFullYear()} Total Transport Management Inc.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
