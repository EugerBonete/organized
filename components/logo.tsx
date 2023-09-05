import React from "react";
import { CalendarCheck } from "lucide-react";

export default function Logo() {
  return (
    <div className="text-lg md:text-xl font-black flex items-center justify-center gap-1">
      <CalendarCheck className="h-6 w-6" />
      <h1>Organizify.</h1>
    </div>
  );
}
