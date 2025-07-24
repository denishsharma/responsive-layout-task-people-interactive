import styles from '~/components/header/styles/header.css?raw'
import resetStyleSheet from '~/utils/reset-style'

const headerStyleSheet = new CSSStyleSheet()
headerStyleSheet.replaceSync(styles)

export class Header extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    if (!this.shadowRoot) { return }
    this.shadowRoot.adoptedStyleSheets = [resetStyleSheet, headerStyleSheet]
  }

  connectedCallback() {
    this.#render()
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
