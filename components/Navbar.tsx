import Link from "next/link";
import MemoryIcon from "@mui/icons-material/Memory";

type Props = {};

const Navbar = (props: Props) => {
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
      </div>
    </nav>
  );
};

export default Navbar;
