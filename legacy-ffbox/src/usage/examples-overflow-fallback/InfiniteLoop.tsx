import { OverflowFallback } from "@/react/OverflowFallback";
import { Button } from "../../components/ui/button";

export function InfiniteLoopOverflowFallback() {
  return (
    <div className="flex gap-2">
      <div>Inside a flex container</div>
      <OverflowFallback >
        {(isOverflowing) => (
          <div className="flex gap-2">
            <Button>First</Button>
            <Button>Second</Button>
            <Button>{isOverflowing ? "THIRD EXPANDED" : "Third"}</Button>
          </div>
        )}
      </OverflowFallback>
    </div>
  );
}

