import { OverflowFallback } from "@/react/OverflowFallback";
import { BookIcon, FileIcon, PanelBottomIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

export function ConditionallyNestedExampleOverflowFallback() {
  const contentWhenWidest = (
    <>
      <Button key="1">Longer</Button>
      <Button key="2">button</Button>
      <Button key="3">Labels</Button>
    </>
  );
  const contentWhenNarrower = (
    <>
      <Button key="1">Shrt</Button>
      <Button key="2">But</Button>
      <Button key="3">Lbl</Button>
    </>
  );
  const narrowestContent = (
    <>
      <Button key="1" className="flex-grow p-0.5">
        <BookIcon size="20" />
      </Button>
      <Button key="2" className="flex-grow p-0.5">
        <FileIcon size="20" />
      </Button>
      <Button key="3" className="flex-grow p-0.5">
        <PanelBottomIcon size="20" />
      </Button>
    </>
  );
  return (
    <OverflowFallback>
      {(isWidestOverflowing) =>
        !isWidestOverflowing ? (
          <div className="flex gap-2">{contentWhenWidest}</div>
        ) : (
          <OverflowFallback>
            {(isNarrowerOverflowing) => (
              <div
                className={`flex w-full content-center ${isNarrowerOverflowing ? "gap-1" : "gap-2"}`}
              >
                {!isNarrowerOverflowing
                  ? contentWhenNarrower
                  : narrowestContent}
              </div>
            )}
          </OverflowFallback>
        )
      }
    </OverflowFallback>
  );
}
