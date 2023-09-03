"use client";

import React, { useState, useTransition } from "react";
import { Collection } from "@prisma/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { CaretDownIcon, CaretUpIcon, TrashIcon } from "@radix-ui/react-icons";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import Plus from "./icons/plus";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { toast } from "./ui/use-toast";
import { deleteCollection } from "@/actions/collection";

interface Props {
  collection: Collection;
}
export default function CollectionCard({ collection }: Props) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, startTransition] = useTransition();

  const removeCollection = async () => {
    try {
      await deleteCollection(collection.id);

      toast({
        title: "Success",
        description: "Collection deleted successfully.",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Cannot delete collection. Try again later.",
        variant: "destructive",
      });
    }
  };
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex w-full justify-between p-6",
            isOpen && "rounded-b-none"
          )}
        >
          <span className="font-bold">{collection.name}</span>
          {!isOpen ? (
            <CaretDownIcon className="h-6" />
          ) : (
            <CaretUpIcon className="h-6" />
          )}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent
        className={cn("flex flex-col shadow-lg", isOpen && "border")}
      >
        {/* {collection.task.length ? (
          <>
            <Progress className="rounded-none" value={45} />
            <div className="p-4 gap-3 flex flex-col">
              {collection.task.map((task) => (
                <div key={task.id}>{task.contents}</div>
              ))}
            </div>
          </>
        ) : (
          <div>No tasks</div>
        )} */}
        <div className="p-4 gap-3 flex flex-col">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id debitis
          dolorum sint error, nam similique officia quas autem cumque corrupti,
          vel praesentium dolorem beatae quod provident recusandae ut nulla
          eveniet?
        </div>
        <Separator />
        <footer className="h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex justify-between items-center">
          <p>Created at {collection.createdAt.toDateString()}</p>

          {isLoading ? (
            <div>Deleting...</div>
          ) : (
            <div>
              <Button
                onClick={() => setShowCreateModal((prev) => !prev)}
                size="icon"
                variant="ghost"
              >
                <Plus />
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <TrashIcon />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will not be undone. This wll permanently delete
                    your collection and all tasks inside it.
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => startTransition(removeCollection)}
                    >
                      Proceed
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </footer>
      </CollapsibleContent>
    </Collapsible>
  );
}
