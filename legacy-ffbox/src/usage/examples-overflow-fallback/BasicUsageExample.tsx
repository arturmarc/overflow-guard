import { OverflowFallback } from "@/react/OverflowFallback";
import { Button } from "../../components/ui/button";

export function BasicUsageExampleOverflowFallback() {
  return (
    <OverflowFallback containerClassName="p-8">
      {(isOverflowing) => (
        <div className={`flex gap-2 ${isOverflowing ? "flex-col gap-0" : ""}`}>
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </div>
      )}
    </OverflowFallback>
  );
}
