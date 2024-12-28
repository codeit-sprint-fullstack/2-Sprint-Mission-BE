export function ProductSort(orderBy) {
  let sortOption;
  switch (orderBy) {
    case 'oldest':
      sortOption = { createdAt: 'asc' };
      break;
    case 'newest':
      sortOption = { createdAt: 'desc' };
      break;
    case 'priceHighest':
      sortOption = { price: 'desc' };
      break;
    case 'priceLowest':
    default:
      sortOption = { price: 'asc' };
  }

  return sortOption;
}

export function Sort(orderBy) {
  let sortOption;
  switch (orderBy) {
    case 'oldest':
      sortOption = { createdAt: 'asc' };
      break;
    case 'newest':
    default:
      sortOption = { createdAt: 'desc' };
  }

  return sortOption;
}
