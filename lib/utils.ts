import * as React from 'react';
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


interface OverflowX {
  ref: React.RefObject<HTMLDivElement>
  isOverflowX: boolean
}

export const useOverflowX = (
  callback?: (hasOverflow: boolean) => void
): OverflowX => {
  const [isOverflowX, setIsOverflowX] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const { current } = ref

    if (current) {
      const hasOverflowX = current.scrollWidth > current.clientWidth
      setIsOverflowX(hasOverflowX)
      callback?.(hasOverflowX)
    }
  }, [callback, ref])

  return { ref, isOverflowX }
}
