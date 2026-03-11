import {ModeToggle} from "@/components/ui/mode-toggle";

export default function Home() {
  return (
      <div className="flex">
        <div className="flex flex-1 flex-col">
          {/* Empty body */}
          <main className="flex-1" />
            <ModeToggle />
        </div>
      </div>
  );
}