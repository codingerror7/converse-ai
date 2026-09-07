"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/Business');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#06090D] flex items-center justify-center text-[#F1F5F9] font-mono text-xs">
      <div className="flex items-center gap-2.5">
        <span className="w-4 h-4 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
        <span>Redirecting to Business Setup...</span>
      </div>
    </div>
  );
}
