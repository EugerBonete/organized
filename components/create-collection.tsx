"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import CreateCollectionSheet from "./create-collection-sheet";

export default function CreateCollection() {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setOpen(open);

  return (
    <>
      <Button onClick={() => setOpen((prev) => !prev)} className="w-full ">
        Create a Goal
      </Button>

      <CreateCollectionSheet open={open} onOpenChange={handleOpenChange} />
    </>
  );
}
