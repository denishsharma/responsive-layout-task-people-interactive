import styles from '~/components/header/styles/mobile-header.css?raw'
import resetStyleSheet from "~/utils/reset-style"

const mobileHeaderStyleSheet = new CSSStyleSheet()
mobileHeaderStyleSheet.replaceSync(styles)

export class MobileHeader extends HTMLElement {
  private isOpen = false
  private isAnimating = false

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    if (!this.shadowRoot) { return }
    this.shadowRoot.adoptedStyleSheets = [resetStyleSheet, mobileHeaderStyleSheet]
  }

  connectedCallback() {
    this.#render()
    this.#setupEventListeners()
  }

  disconnectedCallback() {
    this.#removeEventListeners()
  }

  open() {
    if (this.isOpen || this.isAnimating) return

    this.isOpen = true
    this.isAnimating = true
    this.style.pointerEvents = 'auto'

    const overlay = this.shadowRoot?.querySelector('.mobile-header__overlay')
    const drawer = this.shadowRoot?.querySelector('.mobile-header__drawer')

    overlay?.classList.remove('close')
    overlay?.classList.add('open')
    drawer?.classList.remove('close')
    drawer?.classList.add('open')

    setTimeout(() => {
      this.isAnimating = false
    }, 200)
  }

  close() {
    if (!this.isOpen || this.isAnimating) return

    this.isOpen = false
    this.isAnimating = true

    const overlay = this.shadowRoot?.querySelector('.mobile-header__overlay')
    const drawer = this.shadowRoot?.querySelector('.mobile-header__drawer')

    overlay?.classList.remove('open')
    overlay?.classList.add('close')
    drawer?.classList.remove('open')
    drawer?.classList.add('close')

    setTimeout(() => {
      this.style.pointerEvents = 'none'
      this.isAnimating = false
    }, 200)
  }

  #setupEventListeners() {
    const overlay = this.shadowRoot?.querySelector('.mobile-header__overlay')
    const closeButton = this.shadowRoot?.querySelector('.mobile-header__close-button')

    overlay?.addEventListener('click', () => this.close())
    closeButton?.addEventListener('click', () => this.close())

    document.addEventListener('keydown', this.#handleKeydown)
  }

  #removeEventListeners() {
    document.removeEventListener('keydown', this.#handleKeydown)
  }

  #handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.isOpen) {
      this.close()
    }
  }

  #render() {
    if (!this.shadowRoot) { return }
    this.shadowRoot.innerHTML = `
      <div class="mobile-header__overlay"></div>

      <div class="mobile-header__drawer">
        <button type="button" class="mobile-header__close-button">
          <icon-lucide-x class="iconify-icon"></icon-lucide-x>
        </button>

        <div class="mobile-header__content">
          <div class="mobile-header__title-section">
            <h2 class="mobile-header__title">My - Metrics</h2>
            <p class="mobile-header__description">
              Customize the aspects of the dashboard to better suit your needs and preferences.
            </p>
          </div>

          <div class="mobile-header__dummy-section">
            <div class="mobile-header__dummy-row">
              <div class="mobile-header__dummy mobile-header__dummy--small"></div>
              <div class="mobile-header__dummy mobile-header__dummy--small"></div>
              <div class="mobile-header__dummy mobile-header__dummy--small"></div>
              <div class="mobile-header__dummy mobile-header__dummy--small"></div>
            </div>
            <div class="mobile-header__dummy-row">
              <div class="mobile-header__dummy mobile-header__dummy--large"></div>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('mobile-header-drawer', MobileHeader)
