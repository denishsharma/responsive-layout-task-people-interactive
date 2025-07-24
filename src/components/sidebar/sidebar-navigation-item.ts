import type { SidebarNavigationItemProperties } from '~/components/sidebar/constants/sidebar-navigation-item-props'
import { SIDEBAR_NAVIGATION_ITEM_PROPERTIES } from '~/components/sidebar/constants/sidebar-navigation-item-props'
import styles from '~/components/sidebar/styles/sidebar-navigation-item.css?raw'
import resetStyleSheet from '~/utils/reset-style'

const styleSheet = new CSSStyleSheet()
styleSheet.replaceSync(styles)

export class SidebarNavigationItem extends HTMLElement {
  static get observedAttributes() {
    return SIDEBAR_NAVIGATION_ITEM_PROPERTIES.values()
  }

  private name: string = 'Item'
  private to: string = '#'
  private active: boolean = false
  private external: boolean = false

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    if (!this.shadowRoot) { return }
    this.shadowRoot.adoptedStyleSheets = [resetStyleSheet, styleSheet]
  }

  connectedCallback() {
    this.#render()
  }

  attributeChangedCallback(name: string, prev: string | null, curr: string | null) {
    if (prev === curr) { return }

    const checker: Record<SidebarNavigationItemProperties, () => boolean> = {
      name: () => this.#updateIfChanged('name', curr ?? ''),
      to: () => this.#updateIfChanged('to', curr ?? ''),
      active: () => this.#updateIfChanged('active', curr ?? 'false', (old, current) => Boolean(old) !== Boolean(current)),
      external: () => this.#updateIfChanged('external', curr ?? 'false', (old, current) => Boolean(old) !== Boolean(current)),
    }

    const updated = checker[name as SidebarNavigationItemProperties]()
    if (updated) { this.#render() }
  }

  #updateIfChanged<K extends SidebarNavigationItemProperties>(key: K, value: string, comparator: (old: string, current: string) => boolean = (old, current) => old !== current): boolean {
    const old = Object.getOwnPropertyDescriptor(this, key)?.value
    if (old === undefined) { return false }

    if (comparator(old, value)) {
      Object.assign(this, { [key]: value })
      return true
    }

    return false
  }

  #render() {
    if (!this.shadowRoot) { return }

    this.shadowRoot.innerHTML = `
      <a
        href="${this.to}"
        class="sidebar__navigation-item${this.active ? ' sidebar__navigation-item--active' : ''}"
        target="${this.external ? '_blank' : '_self'}"
        rel="${this.external ? 'noopener noreferrer' : ''}"
      >
        <span class="sidebar__navigation-item--icon">
          <slot name="icon"></slot>
        </span>
        <span class="sidebar__navigation-item--name">${this.name}</span>
      </a>
    `
  }
}

customElements.define('sidebar-navigation-item', SidebarNavigationItem)
