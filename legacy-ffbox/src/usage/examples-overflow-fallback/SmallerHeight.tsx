import { OverflowFallback } from "@/react/OverflowFallback";
import { StopCircle } from "lucide-react";

export function SmallerHeightOverflowFallback() {
  return (
    <OverflowFallback>
      {(isOverflowing) => (
        <div className="flex">
          <div className="px-4">
            {isOverflowing ? (
              <StopCircle />
            ) : (
              <>
                <p>Multi line long text example</p>
                <p>Multi line</p>
                <p>Multi line</p>
              </>
            )}
          </div>
          <div className="h-[1px]"></div>
        </div>
      )}
    </OverflowFallback>
  );
}

