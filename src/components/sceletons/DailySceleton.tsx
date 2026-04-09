import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

const DailySceleton = () => {
  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-5 items-center text-center gap-2"
        >
          <Skeleton className="w-9 h-8" />
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="size-8" />
          <Skeleton className="size-8" />
          <Skeleton className="size-8" />
        </div>
      ))}
    </Card>
  );
};

export default DailySceleton;
