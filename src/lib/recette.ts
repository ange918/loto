export function toIsoDate(d: Date) {
  return d.toISOString().split('T')[0]
}

export function getWeekStart(d: Date = new Date()) {
  const date = new Date(d)
  const day = date.getDay()
  const diff = day === 0 ? 6 : day - 1
  date.setDate(date.getDate() - diff)
  date.setHours(0, 0, 0, 0)
  return date
}

export function getMonthStart(d: Date = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}
