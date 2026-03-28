import type { CSSProperties, HTMLAttributes, ReactNode, RefCallback } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import useResizeObserver from 'use-resize-observer'

import { throttle } from './utils'

const DEFAULT_THROTTLE_TIME = 0
const LOOP_TIME_WINDOW = 300
const LOOP_THRESHOLD = 7

export type OverflowAxis = 'none' | 'horizontal' | 'vertical' | 'both'
export type FallbackOn = Exclude<OverflowAxis, 'none'>

type SharedProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  containerClassName?: string
  containerStyle?: CSSProperties
  throttleTime?: number
}

type RenderProp = (
  isOverflowing: boolean,
  overflowAxis: OverflowAxis,
) => ReactNode

type FallbackModeProps = SharedProps & {
  children?: ReactNode
  fallback: ReactNode
  fallbackOn?: FallbackOn
}

type RenderPropModeProps = SharedProps & {
  children?: RenderProp
  fallback?: never
  fallbackOn?: never
}

export type OverflowGuardProps = FallbackModeProps | RenderPropModeProps

type OverflowGuardContextValue = {
  isOverflowing: boolean
  overflowAxis?: OverflowAxis
}

const OverflowGuardContext = createContext<OverflowGuardContextValue>({
  isOverflowing: false,
  overflowAxis: 'none',
})

export function useOverflowGuard() {
  return useContext(OverflowGuardContext).isOverflowing
}

export function OverflowGuard(props: OverflowGuardProps) {
  const {
    children,
    className,
    containerClassName,
    containerStyle,
    style,
    throttleTime = DEFAULT_THROTTLE_TIME,
  } = props
  const measurementBoxRef = useRef<HTMLDivElement | null>(null)
  const [measuredOverflowAxis, setMeasuredOverflowAxis] =
    useState<OverflowAxis>('none')
  const [locked, setLocked] = useState(false)

  const domProps = { ...props } as Record<string, unknown>

  delete domProps.children
  delete domProps.className
  delete domProps.containerClassName
  delete domProps.containerStyle
  delete domProps.fallback
  delete domProps.fallbackOn
  delete domProps.style
  delete domProps.throttleTime

  const checkOverflow = useCallback(() => {
    const measurementBox = measurementBoxRef.current

    if (!measurementBox) {
      return
    }

    const horizontalOverflow =
      measurementBox.scrollWidth > measurementBox.clientWidth + 1
    const verticalOverflow =
      measurementBox.scrollHeight > measurementBox.clientHeight + 1

    setMeasuredOverflowAxis((currentAxis) => {
      const nextAxis =
        horizontalOverflow && verticalOverflow
          ? 'both'
          : horizontalOverflow
            ? 'horizontal'
            : verticalOverflow
              ? 'vertical'
              : 'none'

      return currentAxis === nextAxis ? currentAxis : nextAxis
    })
  }, [])

  const scheduleOverflowCheck = useCallback(() => {
    requestAnimationFrame(checkOverflow)
  }, [checkOverflow])

  const onResize = useMemo(
    () =>
      throttle(() => {
        scheduleOverflowCheck()
      }, throttleTime),
    [scheduleOverflowCheck, throttleTime],
  )

  const { ref: measurementObservedRef } = useResizeObserver<HTMLDivElement>({
    onResize,
  })
  const { ref: containerObservedRef } = useResizeObserver<HTMLDivElement>({
    onResize,
  })

  const setMeasurementBoxRef = useCallback<RefCallback<HTMLDivElement>>(
    (node) => {
      measurementBoxRef.current = node
      measurementObservedRef(node)
      scheduleOverflowCheck()
    },
    [measurementObservedRef, scheduleOverflowCheck],
  )

  useLayoutEffect(() => {
    checkOverflow()
  })

  const renderCountRef = useRef(0)
  const lastResetTimeRef = useRef(0)

  // This effect intentionally tracks every render to detect oscillating layouts.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const now = Date.now()

    if (lastResetTimeRef.current === 0) {
      lastResetTimeRef.current = now
    }

    if (now - lastResetTimeRef.current > LOOP_TIME_WINDOW) {
      renderCountRef.current = 1
      lastResetTimeRef.current = now
      setLocked(false)
      return
    }

    renderCountRef.current += 1

    if (renderCountRef.current > LOOP_THRESHOLD) {
      console.warn(
        'OverflowGuard infinite loop detected. The component will stay in the overflowing state to stabilize rendering.',
      )
      setLocked(true)
      setMeasuredOverflowAxis((currentAxis) =>
        currentAxis === 'none' ? 'both' : currentAxis,
      )
    }
  })

  const overflowAxis =
    locked && measuredOverflowAxis === 'none' ? 'both' : measuredOverflowAxis
  const isOverflowing = overflowAxis !== 'none'

  const measurementChildren =
    typeof children === 'function' ? children(false, 'none') : children

  const fallbackOn = 'fallback' in props ? (props.fallbackOn ?? 'both') : 'both'
  const shouldRenderFallback =
    'fallback' in props &&
    overflowAxis !== 'none' &&
    (fallbackOn === 'both' ||
      overflowAxis === fallbackOn ||
      overflowAxis === 'both')

  const visibleChildren =
    typeof children === 'function'
      ? children(isOverflowing, overflowAxis)
      : shouldRenderFallback
        ? props.fallback
        : children

  const sharedVisibleStyle = {
    ...style,
    minWidth: 0,
    minHeight: 0,
  } satisfies CSSProperties

  return (
    <div
      ref={containerObservedRef}
      data-overflow-guard="container"
      className={containerClassName}
      style={{
        ...containerStyle,
        display: 'grid',
        position: 'relative',
      }}
    >
      <div
        aria-hidden="true"
        data-overflow-guard="hidden-measurement-layer"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'auto',
          pointerEvents: 'none',
          visibility: 'hidden',
          zIndex: -1,
        }}
      >
        <div
          {...domProps}
          ref={setMeasurementBoxRef}
          data-overflow-guard="hidden-measurement-box"
          className={className}
          style={sharedVisibleStyle}
        >
          <OverflowGuardContext.Provider value={{ isOverflowing: false, overflowAxis: 'none' }}>
            {measurementChildren}
          </OverflowGuardContext.Provider>
        </div>
      </div>
      <div
        data-overflow-guard={`visible-layer-${overflowAxis}`}
        style={{
          gridArea: '1 / 1',
          minWidth: 0,
          minHeight: 0,
        }}
      >
        <div {...domProps} className={className} style={sharedVisibleStyle} data-overflow-guard="visible-box">
          <OverflowGuardContext.Provider value={{ isOverflowing, overflowAxis }}>
            {visibleChildren}
          </OverflowGuardContext.Provider>
        </div>
      </div>
    </div>
  )
}
