"use client";
import React from "react";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
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
