import styles from '~/fragments/root/desktop-sidebar-fragment/styles/desktop-sidebar-fragment.css?raw'

const fragmentStyleSheet = new CSSStyleSheet()
fragmentStyleSheet.replaceSync(styles)

export class DesktopSidebarFragment extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    if (!this.shadowRoot) { return }
    this.shadowRoot.adoptedStyleSheets = [fragmentStyleSheet]
  }

  connectedCallback() {
    this.#render()
  }

  #render() {
    if (!this.shadowRoot) { return }
    this.shadowRoot.innerHTML = `
      <slot name="sidebar"></slot>
      <div class="root__sidebar-divider"></div>
    `
  }
}

customElements.define('desktop-sidebar-fragment', DesktopSidebarFragment)
