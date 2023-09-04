import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-2 w-full">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-12 rounded-sm" />
      ))}
    </div>
  );
}
