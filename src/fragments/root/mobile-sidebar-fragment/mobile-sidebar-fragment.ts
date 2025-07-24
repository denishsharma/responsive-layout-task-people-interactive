import styles from '~/fragments/root/mobile-sidebar-fragment/styles/mobile-sidebar-fragment.css?raw'
import resetStyleSheet from '~/utils/reset-style'

const fragmentStyleSheet = new CSSStyleSheet()
fragmentStyleSheet.replaceSync(styles)

export class MobileSidebarFragment extends HTMLElement {
  private isOpen: boolean = false
  static get observedAttributes() {
    return ['open']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    if (!this.shadowRoot) { return }
    this.shadowRoot.adoptedStyleSheets = [resetStyleSheet, fragmentStyleSheet]
    this.isOpen = false
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleShadowClick = this.handleShadowClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  connectedCallback() {
    this.#render()
    window.addEventListener('open-mobile-sidebar', this.handleOpen)
    window.addEventListener('close-mobile-sidebar', this.handleClose)
    this.shadowRoot?.addEventListener('click', this.handleShadowClick)
    window.addEventListener('keydown', this.handleKeyDown)
    this.#updateVisibility()
  }

  disconnectedCallback() {
    window.removeEventListener('open-mobile-sidebar', this.handleOpen)
    window.removeEventListener('close-mobile-sidebar', this.handleClose)
    this.shadowRoot?.removeEventListener('click', this.handleShadowClick)
    window.removeEventListener('keydown', this.handleKeyDown)
    this.#unlockBodyScroll()
  }

  #render() {
    if (!this.shadowRoot) { return }
    this.shadowRoot.innerHTML = `
      <div class="mobile-sidebar__overlay" part="overlay"></div>
      <div class="root__mobile-sidebar-drawer" part="drawer">
        <div class="root__sidebar-divider"></div>
        <div class="mobile-sidebar__wrapper">
          <button type="button" class="mobile-sidebar__close-button" part="close-button">
            <icon-lucide-x class="iconify-icon"></icon-lucide-x>
          </button>
          <slot name="sidebar"></slot>
        </div>
      </div>
    `

    const overlay = this.shadowRoot.querySelector('.mobile-sidebar__overlay')
    const drawer = this.shadowRoot.querySelector('.root__mobile-sidebar-drawer')
    overlay?.classList.remove('open', 'close')
    drawer?.classList.remove('open', 'close')
  }

  handleOpen() {
    if (!this.isOpen) {
      this.isOpen = true
      this.#updateVisibility()
      this.#lockBodyScroll()
    }
  }

  handleClose() {
    if (this.isOpen) {
      this.isOpen = false
      this.#updateVisibility()
      this.#unlockBodyScroll()
    }
  }

  handleShadowClick(e: Event) {
    const target = e.target as HTMLElement
    const overlay = this.shadowRoot?.querySelector('.mobile-sidebar__overlay')
    const btn = this.shadowRoot?.querySelector('.mobile-sidebar__close-button')
    if (overlay && target === overlay) {
      this.handleClose()
    }
    if (btn && target === btn) {
      this.handleClose()
    }
  }

  handleKeyDown(e: KeyboardEvent) {
    if (!this.isOpen) { return }

    const drawer = this.shadowRoot?.querySelector('.root__mobile-sidebar-drawer') as HTMLElement
    if (!drawer) { return }

    if (e.key === 'Escape') {
      this.handleClose()
      return
    }

    if (e.key === 'Tab') {
      const focusableSelectors = [
        'button',
        'a[href]',
        'input',
        'select',
        'textarea',
        '[tabindex]:not([tabindex="-1"])',
      ]
      const focusable = Array.from(drawer.querySelectorAll(focusableSelectors.join(',')))
        .filter((el: any) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')) as HTMLElement[]
      if (focusable.length === 0) { return }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = this.shadowRoot?.activeElement as HTMLElement || document.activeElement as HTMLElement
      if (!active) { return }
      if (!drawer.contains(active)) {
        first.focus()
        e.preventDefault()
        return
      }
      if (!e.shiftKey && active === last) {
        first.focus()
        e.preventDefault()
      } else if (e.shiftKey && active === first) {
        last.focus()
        e.preventDefault()
      }
    }
  }

  #updateVisibility() {
    const overlay = this.shadowRoot?.querySelector('.mobile-sidebar__overlay') as HTMLElement
    const drawer = this.shadowRoot?.querySelector('.root__mobile-sidebar-drawer') as HTMLElement
    if (!overlay || !drawer) { return }

    if (this.isOpen) {
      overlay.classList.remove('close')
      drawer.classList.remove('close')
      overlay.classList.add('open')
      drawer.classList.add('open')
      drawer.removeAttribute('tabindex')
      drawer.removeAttribute('aria-hidden')
      this.style.pointerEvents = 'auto'
    } else {
      if (overlay.classList.contains('open') || overlay.classList.contains('close')) {
        overlay.classList.remove('open')
        overlay.classList.add('close')
      } else {
        overlay.classList.remove('open', 'close')
      }
      if (drawer.classList.contains('open') || drawer.classList.contains('close')) {
        drawer.classList.remove('open')
        drawer.classList.add('close')
      } else {
        drawer.classList.remove('open', 'close')
      }
      drawer.setAttribute('tabindex', '-1')
      drawer.setAttribute('aria-hidden', 'true')
      this.style.pointerEvents = 'none'
    }
  }

  #lockBodyScroll() {
    document.body.style.overflow = 'hidden'
  }

  #unlockBodyScroll() {
    document.body.style.overflow = ''
  }
}

customElements.define('mobile-sidebar-fragment', MobileSidebarFragment)
