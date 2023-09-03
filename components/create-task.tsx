import React from "react";
import { Collection } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTaskSchema,
  createTaskSchemaType,
} from "@/schema/createTaskSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { createTask } from "@/actions/task";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  collection: Collection;
}

export default function CreateTaskDialog({ open, collection, setOpen }: Props) {
  const form = useForm<createTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      collectionId: collection.id,
    },
  });

  const router = useRouter();

  const openChangeWrapper = (value: boolean) => {
    setOpen(value);
    form.reset();
  };

  const onSubmit = async (data: createTaskSchemaType) => {
    console.log(data);
    try {
      await createTask(data);
      toast({
        title: "Success",
        description: "Task created successfully!!",
      });
      openChangeWrapper(false);
      router.refresh();
    } catch (e) {
      toast({
        title: "Error",
        description: "Cannot create task",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            Add task to collection:
            {collection.name}
          </DialogTitle>
          <DialogDescription>
            Add a task to your collection. You can add as many tasks as you want
            to a collection.
          </DialogDescription>
        </DialogHeader>

        <div className="gap-4 py-4">
          <Form {...form}>
            <form
              className="space-y-4 flex flex-col"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="Task content here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              />
            </form>
          </Form>
        </div>

        <DialogFooter>
          <Button
            disabled={form.formState.isSubmitting}
            className={""}
            onClick={form.handleSubmit(onSubmit)}
          >
            Confirm
            {form.formState.isSubmitting && (
              <ReloadIcon className="animate-spin h-4 w-4 ml-2" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
