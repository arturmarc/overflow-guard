export type HtmlSetup = (container: HTMLElement) => () => void

export type HtmlExampleDefinition = {
  id: string
  title: string
  description: string
  heightClass: string
  markup: string
  setup?: HtmlSetup
}
