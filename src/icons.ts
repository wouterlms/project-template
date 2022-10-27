import { Icon as icons } from '@wouterlms/icons'

const customIcons = {}

export const Icon: Record<keyof typeof icons, string> & Record<keyof typeof customIcons, string> = {
  ...icons,
  ...customIcons,
}
