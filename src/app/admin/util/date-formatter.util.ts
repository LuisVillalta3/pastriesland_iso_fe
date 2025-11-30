export const dateFormatter = (date?: string) => {
  if (!date) return '-'

  const newDate = new Date(date)

  return new Intl.DateTimeFormat('es-SV', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(newDate)
}
