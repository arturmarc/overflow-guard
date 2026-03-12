import { BookIcon, FileIcon, PanelBottomIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { FluidFlexbox } from "../../react/FluidFlexbox";

export function ConditionallyNestedExample() {
  const contentWhenWidest = (
    <>
      <Button key="1">Longer</Button>
      <Button key="2">
        <input className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm" />
      </Button>
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
    <FluidFlexbox className="gap-2">
      {(isWidestWrapped) =>
        !isWidestWrapped ? (
          contentWhenWidest
        ) : (
          <FluidFlexbox className="gap-2" wrappedClass="gap-1">
            {(isNarrowerWrapped) =>
              !isNarrowerWrapped ? contentWhenNarrower : narrowestContent
            }
          </FluidFlexbox>
        )
      }
    </FluidFlexbox>
  );
}
