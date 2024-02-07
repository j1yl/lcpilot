import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="flex w-full items-center justify-between border border-red-500 p-2">
      <span>LC Pilot</span>
      <ul className="flex gap-2 items-center">
        <li>
          <Link href="/problems">Problems</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
