import Link from "next/link";
import MemoryIcon from "@mui/icons-material/Memory";
import { Button, buttonVariants } from './Button';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Suspense } from 'react';
import OpenProfile from './profile/OpenProfile';
import Profile from './profile/Modal';

type Props = {};

const Navbar = (props: Props) => {
  const { data: session } = useSession();

  return (
    <nav className="backdrop-blur-md bg-white/10 sticky top-0 w-full">
      <div className="flex w-full items-center p-2 gap-4 max-w-screen-2xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <MemoryIcon className="text-purple-400 w-6 h-6" />
          <span className="sr-only">LCPilot</span>
        </Link>
        <ul className="flex gap-4 items-center">
          <li>
            <Link href="/problems">Problems</Link>
          </li>
          <li>
            <Link href="/faq">FAQ</Link>
          </li>
          <li>
            <Link href="/source">Source</Link>
          </li>
        </ul>
        <div className="relative flex items-center">
          {session ? (
            <Suspense fallback={<OpenProfile session={session} />}>
              <Profile session={session} />
            </Suspense>
          ) : (
            <Button
              onClick={() => signIn('github')}
              className={buttonVariants({ variant: 'ghost', size: 'sm' })}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
