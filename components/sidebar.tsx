"use client";
import React from "react";
import { CardColor, capitalizeFirstLetter, cn } from "@/lib/utils";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-5 min-w-[200px]">
      <h1 className="text-4xl font-bold">
        Welcome , <br />
        {user?.firstName} {user?.lastName}
      </h1>

      <div className="flex md:flex-col gap-2">
        <SidebarItem title="Daily" url="/daily" />
        <SidebarItem title="Monthly" url="/monthly" />
        <SidebarItem title="Yearly" url="/yearly" />
        <SidebarItem title="All" url="/" />
      </div>

      <h1 className="text-sm">Legend</h1>
      <div className="flex md:flex-col gap-2">
        <Indicator title="daily" />
        <Indicator title="monthly" />
        <Indicator title="yearly" />
      </div>
    </div>
  );
}

interface SidebarItemProps {
  title: string;
  url: string;
}

const SidebarItem = ({ url, title }: SidebarItemProps) => {
  const path = usePathname();

  return (
    <Link
      href={url}
      className={cn(
        "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        path === url && "bg-accent"
      )}
    >
      {capitalizeFirstLetter(title)}
    </Link>
  );
};

interface IndicatorProps {
  title: string;
}

const Indicator = ({ title }: IndicatorProps) => {
  const cardColor =
    title === "monthly"
      ? "bg-gradient-to-r from-red-500 to-orange-500"
      : title === "daily"
      ? "bg-gradient-to-r from-rose-400 to-red-500"
      : "bg-gradient-to-r from-violet-500 to-purple-500";

  const path = usePathname();

  return (
    <div className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground font-medium">
      <span className={cn("h-5 w-5 rounded-full", cardColor)}></span>
      {capitalizeFirstLetter(title)}
    </div>
  );
};
