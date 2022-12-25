import type { Middleware, Placement } from '@floating-ui/dom'

import {
  arrow as arrowMiddleware,
  autoUpdate,
  computePosition,
  flip,
  offset as offsetMiddleware,
  shift,
  size,
} from '@floating-ui/dom'

import type { ComputedRef, Ref } from 'vue'

enum CSSPosition {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

type UseFloatingUI = (options: {
  isFloatingElementVisible: ComputedRef<boolean>
  referenceEl: ComputedRef<HTMLElement | null>
  floatingEl: ComputedRef<HTMLElement | null>
  arrowEl?: ComputedRef<HTMLElement | null>
  options: {
    margin: number
    offset: number
    position: Placement
    container?: HTMLElement
    containerPadding?: number
  }
}) => {
  positionX: Ref<number>
  positionY: Ref<number>
  arrowPositionX: Ref<number | null>
  arrowPositionY: Ref<number | null>
  width: Ref<number>
  actualPosition: Ref<CSSPosition>
}

const useFloatingUI: UseFloatingUI = (
  { isFloatingElementVisible, referenceEl, floatingEl, arrowEl, options }) => {
  let cleanup: (() => void) | null = null

  const positionX = ref(0)
  const positionY = ref(0)

  const arrowPositionX = ref<number | null>(0)
  const arrowPositionY = ref<number | null>(0)

  const width = ref(0)
  const actualPosition = ref<CSSPosition>(CSSPosition.BOTTOM)

  const getMiddleware = (): Middleware[] => {
    const {
      margin,
      offset,
      container,
      containerPadding,
    } = options

    const middleware = [
      offsetMiddleware({
        mainAxis: margin,
        crossAxis: offset,
      }),
      flip(),
      size({
        apply({ rects }) {
          width.value = rects.reference.width
        },
      }),
    ]

    if (container !== undefined) {
      middleware.push(shift({
        boundary: container,
        padding: containerPadding,
        crossAxis: true,
      }))
    }

    if ((arrowEl?.value ?? null) !== null) {
      middleware.push(arrowMiddleware({
        element: arrowEl!.value!,
      }))
    }

    return middleware
  }

  const getPosition = (placement: Placement): CSSPosition => {
    const [position] = placement.split('-')

    return {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[position as CSSPosition] as CSSPosition
  }

  const updatePosition = async (): Promise<void> => {
    const { position } = options

    const {
      x,
      y,
      placement,
      middlewareData: { arrow: arrowPosition },
    } = await computePosition(
      referenceEl.value!,
      floatingEl.value!, {
        middleware: getMiddleware(),
        placement: (position ?? CSSPosition.BOTTOM),
      },
    )

    actualPosition.value = getPosition(placement)

    positionX.value = x
    positionY.value = y

    arrowPositionX.value = arrowPosition?.x ?? null
    arrowPositionY.value = arrowPosition?.y ?? null
  }

  // const createMutationObserver = async (): Promise<void> => {
  //   await nextTick()

  //   if (referenceEl.value === null)
  //     throw new Error('referenceEl is null')

  //   mutationObserver = new MutationObserver(() => {
  //     if (floatingEl.value === null)
  //       cleanup?.()
  //     else
  //       // eslint-disable-next-line @typescript-eslint/no-misused-promises
  //       cleanup = autoUpdate(referenceEl.value!, floatingEl.value, updatePosition)
  //   })

  //   mutationObserver.observe(referenceEl.value, {
  //     childList: true,
  //     subtree: true,
  //   })
  // }

  watch(isFloatingElementVisible, async (isVisible) => {
    if (isVisible) {
      await nextTick()
      cleanup = autoUpdate(referenceEl.value!, floatingEl.value!, updatePosition as any)
    }
    else {
      cleanup?.()
    }
  })

  onBeforeUnmount(() => {
    cleanup?.()
  })

  return {
    positionX,
    positionY,
    arrowPositionX,
    arrowPositionY,
    actualPosition,
    width,
  }
}

export default useFloatingUI
