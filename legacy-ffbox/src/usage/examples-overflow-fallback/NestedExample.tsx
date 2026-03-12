import { OverflowFallback } from "@/react/OverflowFallback";
import { Button } from "../../components/ui/button";

export function NestedExampleOverflowFallback() {
  return (
    <OverflowFallback containerClassName="w-full">
      {(isOuterOverflowing) => (
        <div
          className={`flex w-full gap-2 ${isOuterOverflowing ? "flex-col" : ""}`}
        >
          <OverflowFallback containerClassName="flex-grow">
            {(isInnerOverflowing) => (
              <div
                className={`flex flex-grow justify-between gap-2 ${isInnerOverflowing ? "flex-col" : ""}`}
              >
                <Button className="flex-1">
                  {isOuterOverflowing ? "Wrapped" : "First"}
                </Button>
                <Button className="flex-1">Second</Button>
              </div>
            )}
          </OverflowFallback>
          <OverflowFallback containerClassName="flex-grow">
            {(isInnerOverflowing) => (
              <div
                className={`flex flex-grow justify-between gap-2 ${isInnerOverflowing ? "flex-col" : ""}`}
              >
                <Button className="flex-1">Third</Button>
                <Button className="flex-1">Fourth</Button>
              </div>
            )}
          </OverflowFallback>
        </div>
      )}
    </OverflowFallback>
  );
}
