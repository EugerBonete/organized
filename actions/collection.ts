"use server";

import prisma from "@/lib/prisma";
import { createCollectionSchemaType } from "@/schema/createCollectionSchema";
import { currentUser } from "@clerk/nextjs";

export const createCollection = async (form: createCollectionSchemaType) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return await prisma.collection.create({
    data: {
      name: form.name,
      userId: user.id,
    },
  });
};
