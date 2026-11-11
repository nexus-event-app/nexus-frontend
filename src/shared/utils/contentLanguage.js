/** Idioma de un contenido (no de la web): «es» si no se indica, porque así se publicaba antes de guardarlo. */
export function contentLanguageOf(item) {
  return item?.language || 'es'
}
