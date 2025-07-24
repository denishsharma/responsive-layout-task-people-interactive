import styles from '~/fragments/root/sidebar-fragment/styles/sidebar-fragment.css?raw'

const fragmentStyleSheet = new CSSStyleSheet()
fragmentStyleSheet.replaceSync(styles)

export class SidebarFragment extends HTMLElement {
  private mediaQuery: MediaQueryList

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    this.mediaQuery = window.matchMedia('(max-width: 991px)')
    this.handleMediaChange = this.handleMediaChange.bind(this)

    if (!this.shadowRoot) { return }
    this.shadowRoot.adoptedStyleSheets = [fragmentStyleSheet]
  }

  connectedCallback() {
    this.mediaQuery.addEventListener('change', this.handleMediaChange)
    this.handleMediaChange(this.mediaQuery)
  }

  disconnectedCallback(): void {
    this.mediaQuery.removeEventListener('change', this.handleMediaChange)
  }

  private handleMediaChange(e: MediaQueryList | MediaQueryListEvent): void {
    const matches = 'matches' in e ? e.matches : false
    if (matches) {
      if (this.shadowRoot) { this.shadowRoot.innerHTML = '' }
    } else {
      this.render()
    }
  }

  render() {
    if (!this.shadowRoot) { return }
    this.shadowRoot.innerHTML = `
      <app-sidebar></app-sidebar>
      <div class="root__sidebar-divider"></div>
    `
  }
}

customElements.define('root-sidebar-fragment', SidebarFragment)
