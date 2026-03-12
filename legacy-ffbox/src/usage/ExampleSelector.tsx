import { ChevronsUpDownIcon } from "lucide-react";
import {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { AdaptingContentExampleCE } from "./custom-element-react-examples/AdaptingContentExampleCE";
import { BasicUsageExampleCE } from "./custom-element-react-examples/BasicUsageExampleCE";
import { ConditionallyNestedExampleCE } from "./custom-element-react-examples/ConditionallyNestedExampleCE";
import { DeepNestingExampleCE } from "./custom-element-react-examples/DeepNestingExampleCE";
import { DynamicContentExampleCE } from "./custom-element-react-examples/DynamicContentExampleCE";
import { InfiniteLoopCE } from "./custom-element-react-examples/InfiniteLoopCE";
import { NestedExampleCE } from "./custom-element-react-examples/NestedExampleCE";
import { OrderAndReverseCE } from "./custom-element-react-examples/OrderAndReverseCE";
import { SingleChildExampleCE } from "./custom-element-react-examples/SingleChildExampleCE";
import { AdaptingContentExample } from "./examples/AdaptingContentExample";
import { AllPropsShowcaseExample } from "./examples/AllPropsShowcaseExample";
import { BasicUsageExample } from "./examples/BasicUsageExample";
import { ConditionallyNestedExample } from "./examples/ConditionallyNestedExample";
import { DeepNestingExample } from "./examples/DeepNestingExample";
import { HolyGrailToolbarExample } from "./examples/HolyGrailToolbarExample";
import { InfiniteLoop } from "./examples/InfiniteLoop";
import { NestedExample } from "./examples/NestedExample";
import { OrderAndReverse } from "./examples/OrderAndReverse";
import { SingleChildExample } from "./examples/SingleChildExample";
import { SmallerHeight } from "./examples/SmallerHeight";
import adaptingContentMutatingHtml from "./html-examples/adapting-content-mutating.html?raw";
import adaptingContentHtml from "./html-examples/adapting-content.html?raw";
import basicExampleHtml from "./html-examples/basic-usage.html?raw";
import conditionallyNestedHtml from "./html-examples/conditionally-nested.html?raw";
import deepNestingHtml from "./html-examples/deep-nesting.html?raw";
import dynamicContentHtml from "./html-examples/dynamic-content.html?raw";
import holyGrailHtml from "./html-examples/holy-grail.html?raw";
import singleChildHtml from "./html-examples/single-child.html?raw";
import twoLevelsNestingHtml from "./html-examples/two-levels-nesting.html?raw";
import { Resizer } from "./Resizer";
import { AdaptingContentExampleOverflowFallback } from "@/usage/examples-overflow-fallback/AdaptingContentExample";
import { AllPropsShowcaseExampleOverflowFallback } from "@/usage/examples-overflow-fallback/AllPropsShowcaseExample";
import { BasicUsageExampleOverflowFallback } from "@/usage/examples-overflow-fallback/BasicUsageExample";
import { ConditionallyNestedExampleOverflowFallback } from "@/usage/examples-overflow-fallback/ConditionallyNestedExample";
import { DeepNestingExampleOverflowFallback } from "@/usage/examples-overflow-fallback/DeepNestingExample";
import { HolyGrailToolbarExampleOverflowFallback } from "@/usage/examples-overflow-fallback/HolyGrailToolbarExample";
import { InfiniteLoopOverflowFallback } from "@/usage/examples-overflow-fallback/InfiniteLoop";
import { NestedExampleOverflowFallback } from "@/usage/examples-overflow-fallback/NestedExample";
import { OrderAndReverseOverflowFallback } from "@/usage/examples-overflow-fallback/OrderAndReverse";
import { SingleChildExampleOverflowFallback } from "@/usage/examples-overflow-fallback/SingleChildExample";
import { SmallerHeightOverflowFallback } from "@/usage/examples-overflow-fallback/SmallerHeight";

export function ExampleSelector() {
  // const [reactExample, setReactExample] = useState("Basic Usage");
  const [reactExample, setReactExample] = useState("Conditionally nested");
  const [htmlExample, setHtmlExample] = useState("Basic Usage");

  // show all examples / including internal ones that are more like
  // test and don't really showcase anything
  const [showAll, setShowAll] = useState(false);
  const [showCEReact, setShowCEReact] = useState(false);
  const [showOverflowFallback, setShowOverflowFallback] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setShowAll(searchParams.has("show-all"));
    setShowCEReact(searchParams.has("show-ce"));
    setShowOverflowFallback(searchParams.has("show-of"));
    if (searchParams.has("show-ce")) {
      setReactExample("CE Basic Usage");
    }
    if (searchParams.has("show-of")) {
      setReactExample("OF Basic Usage");
    }
  }, []);

  let reactDemoExamples: Map<string, ReactElement> = useMemo(
    () =>
      new Map([
        ["Basic Usage", <BasicUsageExample />],
        ["Adapting content", <AdaptingContentExample />],
        ["Two levels of nesting", <NestedExample />],
        ["Conditionally nested", <ConditionallyNestedExample />],
        ["Deep nesting", <DeepNestingExample />],
        ["Single child", <SingleChildExample />],
        ["Showcase other props usage", <AllPropsShowcaseExample />],
        ['"Holy Grail" toolbar', <HolyGrailToolbarExample />],
      ]),
    [],
  );

  const allReactExamples = useMemo(
    () =>
      new Map([
        ...reactDemoExamples.entries(),
        // test examples
        ["Order and reverse", <OrderAndReverse />],
        ["Infinite Loop", <InfiniteLoop />],
        ["Smaller Height", <SmallerHeight />],
      ]),
    [],
  );

  // custom element rendered using react
  const CEUsingReactExamples = useMemo(
    () =>
      new Map([
        ["CE Basic Usage", <BasicUsageExampleCE />],
        ["CE Dynamic Content", <DynamicContentExampleCE />],
        ["CE Adapting content", <AdaptingContentExampleCE />],
        ["CE Two levels of nesting", <NestedExampleCE />],
        ["CE Conditionally nested", <ConditionallyNestedExampleCE />],
        ["CE Deep nesting", <DeepNestingExampleCE />],
        ["CE Single child", <SingleChildExampleCE />],
        ["CE Order and reverse", <OrderAndReverseCE />],
        ["CE Infinite Loop", <InfiniteLoopCE />],
      ]),
    [],
  );

  // overflow fallback examples
  const overflowFallbackExamples = useMemo(
    () =>
      new Map([
        ["OF Basic Usage", <BasicUsageExampleOverflowFallback />],
        ["OF Adapting content", <AdaptingContentExampleOverflowFallback />],
        ["OF Two levels of nesting", <NestedExampleOverflowFallback />],
        [
          "OF Conditionally nested",
          <ConditionallyNestedExampleOverflowFallback />,
        ],
        ["OF Deep nesting", <DeepNestingExampleOverflowFallback />],
        ["OF Single child", <SingleChildExampleOverflowFallback />],
        [
          "OF Showcase other props usage",
          <AllPropsShowcaseExampleOverflowFallback />,
        ],
        [
          '"OF Holy Grail" toolbar',
          <HolyGrailToolbarExampleOverflowFallback />,
        ],
        ["OF Order and reverse", <OrderAndReverseOverflowFallback />],
        ["OF Infinite Loop", <InfiniteLoopOverflowFallback />],
        ["OF Smaller Height", <SmallerHeightOverflowFallback />],
      ]),
    [],
  );

  let reactExamples = showOverflowFallback
    ? overflowFallbackExamples
    : showCEReact
      ? CEUsingReactExamples
      : showAll
        ? allReactExamples
        : reactDemoExamples;

  const htmlDemoExamples: Map<string, string> = useMemo(
    () =>
      new Map([
        ["Basic Usage", basicExampleHtml],
        ["Adapting content", adaptingContentHtml],
        ["Adapting content by mutating", adaptingContentMutatingHtml],
        ["Two levels of nesting", twoLevelsNestingHtml],
        ["Conditionally nested", conditionallyNestedHtml],
        ["Deep nesting", deepNestingHtml],
        ["Single child", singleChildHtml],
        ['"Holy Grail" toolbar', holyGrailHtml],
        ["Dynamic content pitfalls", dynamicContentHtml],
      ]),
    [],
  );

  let htmlExamples = htmlDemoExamples;

  useLayoutEffect(() => {
    // run any scripts that might be in the current html example
    const scriptEls = document.querySelectorAll(
      "#html-example-container script",
    );
    scriptEls.forEach((el) => {
      const script = document.createElement("script");
      script.textContent = el.textContent;
      script.type = "module";
      el.parentElement?.replaceChild(script, el);
    });
  }, [htmlExample]);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex py-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">React Example:</span>
              <span>{reactExample}</span>
              <ChevronsUpDownIcon className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuRadioGroup
              value={reactExample}
              onValueChange={setReactExample}
            >
              {[...reactExamples.keys()].map((example) => (
                <DropdownMenuRadioItem key={example} value={example}>
                  {example}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Resizer>{reactExamples.get(reactExample)}</Resizer>

      <div className="mt-10 flex py-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">HTML Example:</span>
              <span>{htmlExample}</span>
              <ChevronsUpDownIcon className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuRadioGroup
              value={htmlExample}
              onValueChange={setHtmlExample}
            >
              {[...htmlExamples.keys()].map((example) => (
                <DropdownMenuRadioItem key={example} value={example}>
                  {example}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Resizer>
        <div
          id="html-example-container"
          dangerouslySetInnerHTML={{
            __html: htmlExamples.get(htmlExample) || "",
          }}
        />
      </Resizer>
    </div>
  );
}
