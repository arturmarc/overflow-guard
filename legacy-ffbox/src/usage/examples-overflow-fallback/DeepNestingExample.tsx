import { OverflowFallback } from "@/react/OverflowFallback";
import { PlusIcon, TrashIcon, XIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

export function DeepNestingExampleOverflowFallback() {
  return (
    <OverflowFallback>
      {(outerIsOverflowing) => (
        <div className="flex gap-2">
          <Button>
            {outerIsOverflowing ? <XIcon size="20" /> : "Close"}
          </Button>
          <OverflowFallback>
            {(innerIsOverflowing) => (
              <div className="flex gap-2">
                <Button>
                  {innerIsOverflowing ? <PlusIcon size="20" /> : "New"}
                </Button>
                <OverflowFallback>
                  {(innermostIsOverflowing) => (
                    <div className="flex">
                      <Button onClick={() => console.log("delete")}>
                        {innermostIsOverflowing ? (
                          <TrashIcon size="20" />
                        ) : (
                          "Delete"
                        )}
                      </Button>
                      <div className="h-[1px]"></div>
                    </div>
                  )}
                </OverflowFallback>
              </div>
            )}
          </OverflowFallback>
        </div>
      )}
    </OverflowFallback>
  );
}

