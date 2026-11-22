export const NEWS_PAGE_SIZE = 9

export function newsLayout(total) {
  const layout = Array(total).fill('default')
  if (total === NEWS_PAGE_SIZE) {
    layout[0] = 'wide'
    layout[6] = 'wide'
    layout[7] = 'wide'
  } else if (total >= 2 && total % 3 === 2) {
    layout[0] = 'wide'
  } else if (total >= 4 && total % 3 === 1) {
    layout[0] = 'wide'
    layout[total - 2] = 'wide'
  }
  return layout
}
