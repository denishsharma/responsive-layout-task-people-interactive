import css from '~/assets/styles/base/reset.css?raw'

const resetStyleSheet = new CSSStyleSheet()
resetStyleSheet.replaceSync(css)

export default resetStyleSheet
