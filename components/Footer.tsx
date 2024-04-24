import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="backdrop-blur-md flex justify-between gap-2 z-20 w-full md:px-4 bg-white/10 max-w-screen-2xl mx-auto p-2">
      <p>© 2024 Joe Lee. All rights reserved.</p>
      <Link href="/license">
        License
      </Link>
    </footer>
  );
};

export default Footer;