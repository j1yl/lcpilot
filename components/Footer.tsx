import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="w-full backdrop-blur-md bg-white/10 flex justify-between pt-2 pb-2">
      <p className="px-4 text-sm">© 2024 Joe Lee & . All rights reserved.</p>
      <Link href="/license" className="px-4 text-sm">
        License
      </Link>
    </footer>
  );
};

export default Footer;