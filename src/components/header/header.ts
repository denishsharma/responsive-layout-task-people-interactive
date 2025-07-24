import styles from '~/components/header/styles/header.css?raw'
import resetStyleSheet from '~/utils/reset-style'
import { MobileHeader } from './mobile-header'

const headerStyleSheet = new CSSStyleSheet()
headerStyleSheet.replaceSync(styles)

export class Header extends HTMLElement {
  private mobileHeader?: MobileHeader
  private mediaQuery: MediaQueryList

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    this.mediaQuery = window.matchMedia('(max-width: 860px)')
    this.mediaQuery.addEventListener('change', () => this.#updateMobileHeader())

    if (!this.shadowRoot) { return }
    this.shadowRoot.adoptedStyleSheets = [resetStyleSheet, headerStyleSheet]
  }

  connectedCallback() {
    this.#render()
    this.#setupEventListeners()
    this.#updateMobileHeader()
  }

  disconnectedCallback() {
    this.mediaQuery.removeEventListener('change', () => this.#updateMobileHeader())
    this.#removeMobileHeader()
  }

  #setupEventListeners() {
    const optionsButton = this.shadowRoot?.querySelector('.header__options-button')
    optionsButton?.addEventListener('click', () => {
      this.mobileHeader?.open()
    })
  }

  #updateMobileHeader() {
    const isMobile = this.mediaQuery.matches

    if (isMobile && !this.mobileHeader) {
      this.mobileHeader = new MobileHeader()
      document.body.appendChild(this.mobileHeader)
    } else if (!isMobile && this.mobileHeader) {
      this.#removeMobileHeader()
    }
  }

  #removeMobileHeader() {
    if (this.mobileHeader) {
      this.mobileHeader.remove()
      this.mobileHeader = undefined
    }
  }

  #render() {
    if (!this.shadowRoot) { return }
    this.shadowRoot.innerHTML = `
      <div class="header__wrapper">
        <div class="header__top-wrapper">
          <div class="top-wrapper__title-wrapper">
            <button type="button" class="star-button" part="star-button">
              <icon-lucide-star class="iconify-icon"></icon-lucide-star>
            </button>

            <button type="button" class="top-wrapper__title" part="title">
              <div>
                My - Metrics
              </div>

              <div>
                <icon-lucide-chevron-down class="iconify-icon"></icon-lucide-chevron-down>
              </div>
            </button>
          </div>

          <div>
            <button type="button" class="header__options-button" part="options-button">
              <icon-lucide-align-justify class="iconify-icon"></iconify-align-justify>
            </button>
          </div>
        </div>

        <div class="header__bottom-wrapper">
          <div class="bottom-wrapper__left">
            <div class="dummy"></div>
            <div class="dummy"></div>
            <div class="dummy"></div>
            <div class="dummy"></div>
          </div>

          <div class="bottom-wrapper__right">
            <div class="dummy"></div>
          </div>
        </div>
      </div>

      <div class="header__divider"></div>
    `
  }
}

customElements.define('app-header', Header)
