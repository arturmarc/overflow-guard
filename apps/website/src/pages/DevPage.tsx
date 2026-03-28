import {
  htmlDevExample,
} from '@/examples/html-registry/html-home-examples'
import { HtmlExampleRender } from '@/examples/html-registry/common/render'

export default function DevPage() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-10 md:px-10">
        <header className="flex flex-col gap-2">
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            HTML Dev
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Temporary single-example page for working on the custom element.
            Resize the box to test overflow transitions without the full docs page.
          </p>
        </header>

        <div className="demo-preview relative min-h-[14rem] min-w-0 overflow-hidden rounded-2xl border border-border bg-card/60 p-6 resize">
          <HtmlExampleRender example={htmlDevExample} />
        </div>
      </main>
    </div>
  )
}
