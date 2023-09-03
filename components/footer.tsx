import React from "react";
import { ModeToggle } from "./mode-toggle";
import Logo from "./logo";

export default function Footer() {
  return (
    <nav className="flex justify-between p-5">
      <div className="flex gap-2">
        <ModeToggle />
      </div>
      <Logo />
    </nav>
  );
}
