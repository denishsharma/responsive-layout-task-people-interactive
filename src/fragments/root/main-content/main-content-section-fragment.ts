export class MainContentSectionFragment extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  render() {
    if (!this.shadowRoot) { return }
    this.shadowRoot.innerHTML = `
      <div class="content-grid">
        <div class="chart-card"></div>
        <div class="chart-card"></div>
        <div class="chart-card"></div>
        <div class="chart-card"></div>
        <div class="chart-card"></div>
        <div class="chart-card"></div>
      </div>
    `
  }
}

customElements.define('root-main-content-section-fragment', MainContentSectionFragment)
