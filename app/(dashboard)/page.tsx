import SadFace from "@/components/icons/sad-face";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  return (
    <div className="flex flex-col items-center">
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
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        Welcome , <br />
        {user.firstName} {user.lastName}
      </h1>
    </div>
  );
}

async function CollectionList() {
  const user = await currentUser();
  const collection = await prisma.collection.findMany({
    where: {
      userId: user?.id,
    },
  });

  if (collection.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <SadFace />
          <AlertTitle>There are no collections yet.</AlertTitle>
          <AlertDescription>
            Create a collection to get started
          </AlertDescription>
        </Alert>
        {/* <CreateCollection /> */}
      </div>
    );
  }
}
