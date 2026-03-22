import { OverflowGuard } from '../index'

export function validFallbackUsage() {
  return (
    <OverflowGuard fallback={<div>compact</div>} fallbackOn="vertical">
      <div>content</div>
    </OverflowGuard>
  )
}

export function validRenderUsage() {
  return (
    <OverflowGuard>
      {(isOverflowing, overflowAxis) => (
        <div data-overflowing={isOverflowing} data-axis={overflowAxis} />
      )}
    </OverflowGuard>
  )
}

export function invalidMixedUsage() {
  return (
    // @ts-expect-error fallback mode and render-prop mode are mutually exclusive
    <OverflowGuard fallback={<div>compact</div>}>
      {(isOverflowing: boolean) => <div>{String(isOverflowing)}</div>}
    </OverflowGuard>
  )
}

export function invalidFallbackOnUsage() {
  return (
    // @ts-expect-error fallbackOn is only valid when fallback is present
    <OverflowGuard fallbackOn="horizontal">
      <div>content</div>
    </OverflowGuard>
  )
}
