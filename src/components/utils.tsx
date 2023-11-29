const formatPrice = (centPrice: number, currency: string): string => {
  return (centPrice / 100).toLocaleString('sv-SE', {
    style: 'currency',
    currency: currency.toUpperCase(),
  })
}

export default formatPrice
