import Link from "next/link";

type Props = {};

const ToolBar = (props: Props) => {
  return (
    <div className="flex w-full items-center justify-between border border-red-500 p-2">
        <p>ToolBar</p>
        <button>Run Code</button>
        <button>Help</button>
      <span>LC Pilot</span>
      <ul className="flex gap-2 items-center">
      </ul>
    </div>
  );
};

export default ToolBar;