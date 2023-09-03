import React from "react";
import { ModeToggle } from "./mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav>
      <ModeToggle />
      <UserButton afterSignOutUrl="/" />
    </nav>
  );
}
