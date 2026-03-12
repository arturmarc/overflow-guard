import { OverflowFallback } from "@/react/OverflowFallback";
import { StopCircle } from "lucide-react";
import { Button } from "../../components/ui/button";

export function SingleChildExampleOverflowFallback() {
  return (
    <OverflowFallback>
      {(isOverflowing) => (
        <Button>{isOverflowing ? <StopCircle /> : "Long button"}</Button>
      )}
    </OverflowFallback>
  );
}
