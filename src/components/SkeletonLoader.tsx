import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function SkeletonCard() {
  return (
    <Card className="border-blue-800 bg-black/80 backdrop-blur-sm">
      <CardHeader>
        <Skeleton className="h-6 w-3/4 bg-blue-900/50" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full bg-blue-900/50 mb-2" />
        <Skeleton className="h-4 w-2/3 bg-blue-900/50" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-1/2 bg-blue-900/50" />
      </CardFooter>
    </Card>
  );
}

export function SkeletonHeatmap() {
  return (
    <div className="grid grid-cols-53 gap-1">
      {Array.from({ length: 365 }).map((_, i) => (
        <Skeleton key={i} className="w-2 h-2 bg-blue-900/50 rounded-sm" />
      ))}
    </div>
  );
}

export function SkeletonBarChart() {
  return (
    <div className="flex items-end gap-2 h-32">
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className="flex-1 h-8 bg-blue-900/50 rounded-t" />
      ))}
    </div>
  );
}
