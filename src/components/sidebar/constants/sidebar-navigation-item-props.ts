import type { InferValue } from 'better-enums'
import { Enum } from 'better-enums'

export const SIDEBAR_NAVIGATION_ITEM_PROPERTIES = Enum([
  'name',
  'to',
  'active',
  'external',
])

export const SidebarNavigationItemProperties = SIDEBAR_NAVIGATION_ITEM_PROPERTIES.accessor
export type SidebarNavigationItemProperties = InferValue<typeof SIDEBAR_NAVIGATION_ITEM_PROPERTIES>
