import ApexCharts from 'apexcharts'
import styles from '~/components/chart-card/styles/chart-card.css?raw'
import resetStyleSheet from '~/utils/reset-style'

const chartCardStyleSheet = new CSSStyleSheet()
chartCardStyleSheet.replaceSync(styles)

function getRandomData(length: number, min = 80, max = 120) {
  const arr = []
  let prev = Math.floor(Math.random() * (max - min + 1)) + min
  arr.push(prev)
  for (let i = 1; i < length; i++) {
    const delta = Math.floor(Math.random() * 11) - 5
    let next = prev + delta
    if (next < min) { next = min }
    if (next > max) { next = max }
    arr.push(next)
    prev = next
  }

  return arr
}

function generateSeries() {
  const numSeries = Math.floor(Math.random() * 3) + 1
  return Array.from({ length: numSeries }, (_, i) => ({
    name: `series${i + 1}`,
    data: getRandomData(7, 80, 120),
  }))
}

export class ChartCard extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    if (!this.shadowRoot) { return }
    this.shadowRoot.adoptedStyleSheets = [resetStyleSheet, chartCardStyleSheet]
  }

  connectedCallback() {
    this.#render()
  }

  #render() {
    if (!this.shadowRoot) { return }
    this.shadowRoot.innerHTML = `
      <div style="width: 100%; height: 100%; padding-top: 3rem;">
        <div id="chart" style="width: 100%; height: 100%;"></div>
      </div>
    `

    const chartElement = this.shadowRoot.querySelector('#chart')
    if (!chartElement) { return }

    const options = {
      chart: {
        height: '100%',
        type: 'area',
        toolbar: { show: false },
        zoom: { enabled: false },
        redrawOnParentResize: true,
        sparkline: { enabled: true },
      },

      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' },
      xaxis: {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false },
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      yaxis: {
        show: false,
        min: 70,
      },
      legend: { show: false },
      tooltip: { enabled: false },
      grid: { show: false },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.5,
          opacityFrom: 0.7,
          opacityTo: 0,
          stops: [0, 100],
        },
      },
      series: generateSeries(),
    }

    const chart = new ApexCharts(chartElement, options)
    chart.render().catch((error) => {
      console.error('Error rendering chart:', error)
    })
  }
}

customElements.define('chart-card', ChartCard)
