import { OverflowFallback } from "@/react/OverflowFallback";
import { useEffect } from "react";
import { Button } from "../../components/ui/button";

export function AllPropsShowcaseExampleOverflowFallback() {
  useEffect(() => {
    const styleId = "example-style-rules-of";
    if (document.getElementById(styleId)) return;
    const styleEl = document.createElement("style");
    styleEl.id = styleId;
    styleEl.innerHTML = `
      .redundant-class-to-remove-of {       
        border: 2px red solid;
        background-color: yellow;
      }
    `;
    document.head.appendChild(styleEl);
  }, []);

  return (
    <OverflowFallback
      style={{ border: "6px lightblue solid" }}
      throttleTime={150}
    >
      {(isOverflowing) => (
        <div
          className={`flex p-4 ${isOverflowing ? "flex-col gap-1" : "redundant-class-to-remove-of gap-2"}`}
          style={isOverflowing ? { border: "6px limegreen solid" } : {}}
        >
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
          <OverflowFallback hidden>
            {() => <div>This will be hidden not affecting anything</div>}
          </OverflowFallback>
        </div>
      )}
    </OverflowFallback>
  );
}

