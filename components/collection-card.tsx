import React from "react";
import { Collection } from "@prisma/client";
import { Button } from "./ui/button";

interface Props {
  collection: Collection;
}
export default function CollectionCard({ collection }: Props) {
  return (
    <Button className="w-full" variant="ghost">
      {collection.name}
    </Button>
  );
}
