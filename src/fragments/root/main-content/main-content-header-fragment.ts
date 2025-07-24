export class MainContentHeaderFragment extends HTMLElement {
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
      <div class="header"></div>
    `
  }
}

customElements.define('root-main-content-header-fragment', MainContentHeaderFragment)
