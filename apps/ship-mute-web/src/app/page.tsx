"use client";

import { toast } from "sonner";

export default function Home() {
  return (
    <div>
      <button onClick={() => toast("initialized.")}>hello world</button>
    </div>
  );
}
