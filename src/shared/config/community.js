import { paths } from './paths'

/**
 * Hilo del foro «¿Qué palabra le falta al glosario?», publicado con la cuenta de Primer Commit: ahí deja cada
 * persona las palabras que echa en falta. Cuando exista, poned aquí su id y su slug (los de su dirección, p. ej.
 * /foro/57-que-palabra-le-falta-al-glosario → { id: 57, slug: 'que-palabra-le-falta-al-glosario' }).
 * Si se pone a null, el botón busca «glosario» en el foro.
 */
export const GLOSSARY_THREAD = { id: 1, slug: 'que-palabra-le-falta-al-glosario-dejala-aqui' }

/** Adónde lleva «Añadir una palabra»: directo a la caja de respuesta del hilo (#responder). */
export function glossaryThreadHref(thread = GLOSSARY_THREAD) {
  return thread ? `${paths.discussionDetail(thread)}#responder` : `${paths.forum}?q=glosario`
}
