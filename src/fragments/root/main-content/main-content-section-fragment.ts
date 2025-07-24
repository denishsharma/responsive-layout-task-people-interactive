import styles from '~/fragments/root/main-content/styles/main-content-section-fragment.css?raw'

const fragmentStyleSheet = new CSSStyleSheet()
fragmentStyleSheet.replaceSync(styles)

export class MainContentSectionFragment extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    if (!this.shadowRoot) { return }
    this.shadowRoot.adoptedStyleSheets = [fragmentStyleSheet]
  }

  connectedCallback() {
    this.render()
  }

  render() {
    if (!this.shadowRoot) { return }
    this.shadowRoot.innerHTML = `
      <div class="content-grid">
        <chart-card></chart-card>
        <chart-card></chart-card>
        <chart-card></chart-card>
        <chart-card></chart-card>
        <chart-card></chart-card>
        <chart-card></chart-card>
      </div>
    `
  }
}

customElements.define('root-main-content-section-fragment', MainContentSectionFragment)
