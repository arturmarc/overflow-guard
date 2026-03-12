import { OverflowFallback } from "@/react/OverflowFallback";
import { Button } from "../../components/ui/button";

export function OrderAndReverseOverflowFallback() {
  return (
    <OverflowFallback>
      {(isOverflowing) => (
        <div
          className={`flex h-40 flex-row-reverse gap-2 ${isOverflowing ? "flex-col" : ""}`}
        >
          <Button>First</Button>
          <Button className="order-3">Second</Button>
          <Button>Third</Button>
        </div>
      )}
    </OverflowFallback>
  );
}

