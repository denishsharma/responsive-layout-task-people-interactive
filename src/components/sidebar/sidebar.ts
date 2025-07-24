import styles from '~/components/sidebar/styles/sidebar.css?raw'
import resetStyleSheet from '~/utils/reset-style'

const styleSheet = new CSSStyleSheet()
styleSheet.replaceSync(styles)

const sidebarNavigationItems = [
  {
    group: 'group-1',
    items: [
      {
        name: 'Recent',
        to: 'http://example.com/recent',
        external: true,
        icon: 'icon-lucide-history',
      },
      {
        name: 'Bits AI',
        to: 'http://example.com/bits-ai',
        external: true,
        icon: 'icon-lucide-sparkles',
      },
      {
        name: 'Dashboards',
        to: 'http://example.com/dashboards',
        external: true,
        active: true,
        icon: 'icon-lucide-layout-dashboard',
      },
      {
        name: 'Monitors',
        to: 'http://example.com/monitors',
        external: true,
        icon: 'icon-lucide-circle-gauge',
      },
      {
        name: 'Service Management',
        to: 'http://example.com/service-management',
        external: true,
        icon: 'icon-lucide-layers',
      },
      {
        name: 'Actions',
        to: 'http://example.com/actions',
        external: true,
        icon: 'icon-lucide-zap',
      },
    ],
  },
  {
    group: 'group-2',
    items: [
      {
        name: 'Infrastructure',
        to: 'http://example.com/infrastructure',
        external: true,
        icon: 'icon-lucide-server',
      },
      {
        name: 'Cloud Cost',
        to: 'http://example.com/cloud-cost',
        external: true,
        icon: 'icon-lucide-cloud-cog',
      },
      {
        name: 'APM',
        to: 'http://example.com/apm',
        external: true,
        icon: 'icon-lucide-brick-wall',
      },
      {
        name: 'Digital Experience',
        to: 'http://example.com/digital-experience',
        external: true,
        icon: 'icon-lucide-tablet-smartphone',
      },
      {
        name: 'Software Delivery',
        to: 'http://example.com/software-delivery',
        external: true,
        icon: 'icon-lucide-code-xml',
      },
      {
        name: 'Security',
        to: 'http://example.com/security',
        external: true,
        icon: 'icon-lucide-shield-half',
      },
      {
        name: 'LLM Observability',
        to: 'http://example.com/llm-observability',
        external: true,
        icon: 'icon-lucide-database',
      },
    ],
  },
]

export class Sidebar extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    if (!this.shadowRoot) { return }
    this.shadowRoot.adoptedStyleSheets = [resetStyleSheet, styleSheet]
  }

  connectedCallback() {
    this.#render()
  }

  #render() {
    if (!this.shadowRoot) { return }
    this.shadowRoot.innerHTML = `
      <div class="sidebar__header">
        <icon-simple-icons-datadog class="sidebar__header-icon"></icon-simple-icons-datadog>
        <h1 class="sidebar__header-title">Datadog</h1>
      </div>

      <div class="sidebar__navigation">
        ${sidebarNavigationItems.map((group) => {
          return `
            <div class="sidebar__navigation-group">
              ${group.items.map((item) => {
                return `
                  <sidebar-navigation-item
                    name="${item.name}"
                    to="${item.to}"
                    external="${item.external}"
                    ${item.active ? 'active="true"' : ''}
                  >
                    <${item.icon} class="iconify-icon" slot="icon"></${item.icon}>
                  </sidebar-navigation-item>
                `
              }).join('')}
            </div>
          `
        }).join('')}
      </div>
    `
  }
}

customElements.define('app-sidebar', Sidebar)
