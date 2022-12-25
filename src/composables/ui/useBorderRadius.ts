import useInstance from './useInstance'
import type { Rounded } from '@/types'

const mappedBorderRadius: Record<Rounded, string> = {
  none: '0em',
  sm: '0.185em',
  default: '0.375em',
  md: '0.75em',
  lg: '3em',
  full: '50%',
}

export default (): string => {
  const { props } = useInstance('useBorderRadius')

  return mappedBorderRadius[props.rounded as keyof typeof mappedBorderRadius]
}
