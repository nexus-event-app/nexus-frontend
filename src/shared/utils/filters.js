export function categoryOptions({ allLabel, items, category, buildHref }) {
  return [
    { key: 'all', label: allLabel, href: buildHref(1, { categoria: '' }), active: category === '' },
    ...items.map((item) => ({
      key: item.value,
      label: item.label,
      href: buildHref(1, { categoria: item.slug }),
      active: category === item.value,
    })),
  ]
}
