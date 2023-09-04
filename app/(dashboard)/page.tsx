import CollectionCard from "@/components/collection-card";
import CreateCollection from "@/components/create-collection";
import SadFace from "@/components/icons/sad-face";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  return (
    <div className="flex gap-10 items-start w-full">
      <WelcomeMsg />
      <CollectionList />
    </div>
  );
}

async function WelcomeMsg() {
  const user = await currentUser();
  if (!user) {
    return <div>error</div>;
  }
  return (
    <div className="hidden md:flex flex-col gap-5 min-w-[250px]">
      <h1 className="text-4xl font-bold">
        Welcome , <br />
        {user.firstName} {user.lastName}
      </h1>

      <div className="flex flex-col gap-2">
        <Button variant="outline" className="bg-accent">
          All
        </Button>
        <Button variant="outline">Daily</Button>
        <Button variant="outline">Monthly</Button>
        <Button variant="outline">Yearly</Button>
      </div>
    </div>
  );
}

async function CollectionList() {
  const user = await currentUser();
  if (!user) {
    return <div>error</div>;
  }
  const collection = await prisma.collection.findMany({
    include: {
      task: true,
    },
    where: {
      userId: user?.id,
    },
  });

  if (collection.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-5">
        <Alert>
          <SadFace />
          <AlertTitle>There are no goals created yet.</AlertTitle>
          <AlertDescription>Create a goal to get started</AlertDescription>
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
