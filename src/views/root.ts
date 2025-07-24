import styles from '~/assets/styles/views/root.css?raw'

import resetStyleSheet from '~/utils/reset-style'

import '~/fragments/root/sidebar-fragment/sidebar-fragment'
import '~/fragments/root/main-content/main-content-header-fragment'
import '~/fragments/root/main-content/main-content-section-fragment'

const rootStyleSheet = new CSSStyleSheet()
rootStyleSheet.replaceSync(styles)

export class RootView extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    if (!this.shadowRoot) { return }
    this.shadowRoot.adoptedStyleSheets = [resetStyleSheet, rootStyleSheet]
  }

  connectedCallback() {
    this.render()
  }

  render() {
    if (!this.shadowRoot) { return }
    this.shadowRoot.innerHTML = `
      <root-sidebar-fragment></root-sidebar-fragment>

      <main class="root__main">
        <root-main-content-header-fragment></root-main-content-header-fragment>
        <root-main-content-section-fragment></root-main-content-section-fragment>

        <button type="button" class="fab-button">
          <icon-lucide-align-justify class="iconify-icon"></icon-lucide-align-justify>
        </button>
      </main>
    `
  }
}

customElements.define('root-view', RootView)
