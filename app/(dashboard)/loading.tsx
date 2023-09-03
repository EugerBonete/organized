import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-[200px] h-[40px] rounded-sm" />
      <Skeleton className="w-[200px] h-[40px] rounded-sm" />
    </div>
  );
}
