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
      <app-header></app-header>
    `
  }
}

customElements.define('root-main-content-header-fragment', MainContentHeaderFragment)
