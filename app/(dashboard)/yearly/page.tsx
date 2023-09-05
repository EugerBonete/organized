import CollectionCard from "@/components/collection-card";
import CreateCollection from "@/components/create-collection";
import SadFace from "@/components/icons/sad-face";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organizify | Yearly",
  description: "Organize and schedule your tasks.",
};

export default async function Yearly() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const collection = await prisma.collection.findMany({
    include: {
      task: true,
    },
    where: {
      userId: user?.id,
      type: "yearly",
    },
  });

  if (collection.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-5">
        <Alert>
          <SadFace />
          <AlertTitle>There are no collections created yet.</AlertTitle>
          <AlertDescription>
            Create a collection to get started
          </AlertDescription>
        </Alert>
        <CreateCollection />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-start justify-center gap-5">
      <CreateCollection />
      <div className="flex flex-col gap-4 w-full">
        {collection.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
}
