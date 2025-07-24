import '~icons/lucide/align-justify'
import '~icons/lucide/brick-wall'
import '~icons/lucide/circle-gauge'
import '~icons/lucide/cloud-cog'
import '~icons/lucide/code-xml'
import '~icons/lucide/database'
import '~icons/lucide/history'
import '~icons/lucide/layers'
import '~icons/lucide/layout-dashboard'
import '~icons/lucide/server'
import '~icons/lucide/shield-half'
import '~icons/lucide/sparkles'
import '~icons/lucide/tablet-smartphone'
import '~icons/lucide/zap'
import '~icons/simple-icons/datadog'
import '~icons/lucide/x'

import '~/assets/styles/base/tokens.css'
import '~/assets/styles/base/reset.css'

import '~/components/sidebar/sidebar-navigation-item'
import '~/components/sidebar/sidebar'

import '~/views/root'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<root-view></root-view>`
