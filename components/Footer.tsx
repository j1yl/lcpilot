import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full h-[40px] px-4 text-xs backdrop-blur-md bg-white/10 flex justify-between items-center">
      <p className="text-sm">© 2024 Joe Lee & . All rights reserved.</p>
      <Link href="/license" className="text-sm">License</Link>
    </footer>
  );
};