export const dateToLocale = (date: Date) => {
  const dateToShow = new Date(date)
  const localeDate = dateToShow.toLocaleString('ukr-UA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  return localeDate
}
