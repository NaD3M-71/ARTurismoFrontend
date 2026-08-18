/**
 * Devuelve el texto en el idioma elegido, con fallback a español si no hay
 * versión en inglés cargada. El español siempre es el idioma prioritario.
 *
 * @param {object} obj - objeto con los campos (ciudad, cliente, textos, etc.)
 * @param {string} campoBase - nombre del campo en español (ej: 'descripcion')
 * @param {string} idioma - 'es' | 'en'
 */
export function textoBilingue(obj, campoBase, idioma) {
  if (!obj) return '';
  if (idioma === 'en') {
    // Soporta ambas convenciones usadas en el proyecto: camelCase (descripcionEn)
    // y snake_case (titulo_banner_en, texto_en).
    const valorEn = obj[`${campoBase}En`] ?? obj[`${campoBase}_en`];
    if (valorEn && String(valorEn).trim()) return valorEn;
  }
  return obj[campoBase] || '';
}
