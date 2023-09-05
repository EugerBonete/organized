import React from "react";
import { ModeToggle } from "./mode-toggle";
import Logo from "./logo";
import Link from "next/link";

export default function Footer() {
  return (
    <nav className="flex justify-between items-center p-5">
      <div className="flex gap-2 items-center">
        <ModeToggle />
        <p>
          Built by{" "}
          <Link href="/" className="hover:underline cursor-pointer">
            euger.
          </Link>{" "}
          Hosted on Vercel. The source code is available on{" "}
          <Link href="/" className="hover:underline cursor-pointer">
            GitHub.
          </Link>
        </p>
      </div>

      <Logo />
    </nav>
  );
}
