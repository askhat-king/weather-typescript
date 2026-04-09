import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

const HourlySceleton = () => {
  return (
    <Card
      childrenClassName="flex gap-6 overflow-x-scroll"
      title="Hourly Forecast"
    >
      {Array.from({ length: 24 }).map((_, index) => (
        <div className="flex flex-col gap-2 items-center p-2" key={index}>
          <Skeleton className="w-15 h-6" />
          <Skeleton className="size-8" />
          <Skeleton className="w-8 h-6" />
        </div>
      ))}
    </Card>
  );
};

export default HourlySceleton;
