import { paths } from './paths'

const GLOSSARY_THREAD = { id: 1, slug: 'que-palabra-le-falta-al-glosario-dejala-aqui' }

export function glossaryThreadHref(thread = GLOSSARY_THREAD) {
  return thread ? `${paths.discussionDetail(thread)}#responder` : `${paths.forum}?q=glosario`
}
