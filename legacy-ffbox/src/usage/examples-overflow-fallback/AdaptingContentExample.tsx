import { OverflowFallback, useOverflowFallback } from "@/react/OverflowFallback";
import { Button } from "../../components/ui/button";

export function AdaptingContentExampleOverflowFallback() {
  return (
    <div className="flex flex-col gap-6">
      <OverflowFallback>
        {(isOverflowing) => (
          <div className="flex gap-2">
            <Button>Remove</Button>
            <Button>Extra</Button>
            {!isOverflowing && <Button>Button</Button>}
          </div>
        )}
      </OverflowFallback>
      <Toolbar />
    </div>
  );
}

function Buttons() {
  const isOverflowing = useOverflowFallback();
  return (
    <>
      <Button>Remove</Button>
      <Button>Extra</Button>
      {!isOverflowing && <Button>Button</Button>}
    </>
  );
}

function Toolbar() {
  return (
    <OverflowFallback>
      {() => (
        <div className="flex gap-2">
          <Buttons />
        </div>
      )}
    </OverflowFallback>
  );
}

