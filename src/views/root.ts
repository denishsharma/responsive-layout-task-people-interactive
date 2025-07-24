import styles from '~/assets/styles/views/root.css?raw'

import resetStyleSheet from '~/utils/reset-style'

import '~/fragments/root/desktop-sidebar-fragment/desktop-sidebar-fragment'
import '~/fragments/root/mobile-sidebar-fragment/mobile-sidebar-fragment'
import '~/fragments/root/main-content/main-content-header-fragment'
import '~/fragments/root/main-content/main-content-section-fragment'

const rootStyleSheet = new CSSStyleSheet()
rootStyleSheet.replaceSync(styles)

export class RootView extends HTMLElement {
  private mediaQuery: MediaQueryList
  private sidebar = document.createElement('app-sidebar')
  private desktopSidebarFragment?: HTMLElement
  private mobileSidebarFragment?: HTMLElement

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    this.mediaQuery = window.matchMedia('(max-width: 991px)')
    this.mediaQuery.addEventListener('change', () => this.#updateSidebarFragment())

    if (!this.shadowRoot) { return }
    this.shadowRoot.adoptedStyleSheets = [resetStyleSheet, rootStyleSheet]
  }

  connectedCallback() {
    if (!this.shadowRoot) { return }

    this.#render()

    const openSidebarButton = this.shadowRoot.querySelector('#open-mobile-sidebar')
    if (openSidebarButton) {
      openSidebarButton.addEventListener('click', () => {
        window.dispatchEvent(new Event('open-mobile-sidebar'))
      })
    }
  }

  disconnectedCallback() {
    this.mediaQuery.removeEventListener('change', () => this.#updateSidebarFragment())
  }

  #render() {
    if (!this.shadowRoot) { return }
    this.shadowRoot.innerHTML = `
      <main class="root__main">
        <root-main-content-header-fragment></root-main-content-header-fragment>
        <root-main-content-section-fragment></root-main-content-section-fragment>

        <button id="open-mobile-sidebar" type="button" class="fab-button">
          <icon-lucide-align-justify class="iconify-icon"></icon-lucide-align-justify>
        </button>
      </main>
    `

    this.#updateSidebarFragment()
  }

  #updateSidebarFragment() {
    if (!this.shadowRoot) { return }

    const isMobile = this.mediaQuery.matches

    this.desktopSidebarFragment?.remove()
    this.mobileSidebarFragment?.remove()

    if (isMobile) {
      this.mobileSidebarFragment = document.createElement('mobile-sidebar-fragment')
      this.sidebar.setAttribute('slot', 'sidebar')
      this.mobileSidebarFragment.appendChild(this.sidebar)
      this.shadowRoot.prepend(this.mobileSidebarFragment)
    } else {
      this.desktopSidebarFragment = document.createElement('desktop-sidebar-fragment')
      this.sidebar.setAttribute('slot', 'sidebar')
      this.desktopSidebarFragment.appendChild(this.sidebar)
      this.shadowRoot.prepend(this.desktopSidebarFragment)
    }
  }
}

customElements.define('root-view', RootView)
