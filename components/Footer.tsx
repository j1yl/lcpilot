import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex h-[40px] w-full items-center justify-between bg-white/10 px-4 text-xs backdrop-blur-md">
      <p>© 2024 Joe Lee & . All rights reserved.</p>
      <Link href="https://opensource.org/license/mit" target="_blank">
        MIT License
      </Link>
    </footer>
  );
}
