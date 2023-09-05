import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-2 w-full">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Skeleton className="w-full h-12 rounded-sm" />
          <Skeleton className="w-full h-20 rounded-sm mb-8" />
        </div>
      ))}
    </div>
  );
}
