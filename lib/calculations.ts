export function calcMOIC(currentValue: number, amountInvested: number): number {
  if (!amountInvested || amountInvested === 0) return 0
  return currentValue / amountInvested
}

// Newton-Raphson IRR from dated cash flows: [{date, amount}]
// amount negative = investment, positive = distribution/current value
export function calcIRR(cashFlows: { date: Date; amount: number }[]): number | null {
  if (cashFlows.length < 2) return null
  const t0 = cashFlows[0].date.getTime()
  const years = cashFlows.map(cf => (cf.date.getTime() - t0) / (365.25 * 24 * 3600 * 1000))
  const amounts = cashFlows.map(cf => cf.amount)

  const npv = (r: number) => amounts.reduce((sum, cf, i) => sum + cf / Math.pow(1 + r, years[i]), 0)
  const dnpv = (r: number) => amounts.reduce((sum, cf, i) => sum - (i === 0 ? 0 : (years[i] * cf) / Math.pow(1 + r, years[i] + 1)), 0)

  let r = 0.1
  for (let i = 0; i < 100; i++) {
    const f = npv(r), df = dnpv(r)
    if (Math.abs(df) < 1e-10) break
    const r2 = r - f / df
    if (Math.abs(r2 - r) < 1e-8) { r = r2; break }
    r = r2
    if (r < -0.999) return null
  }
  return isFinite(r) ? r : null
}

export function formatMOIC(moic: number): string {
  return `${moic.toFixed(2)}×`
}

export function formatIRR(irr: number): string {
  return `${(irr * 100).toFixed(1)}%`
}

export function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`
  return `$${amount.toLocaleString()}`
}
