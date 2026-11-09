const OUTPUT_SIZE = 512

/**
 * Recorta al centro en cuadrado y reduce la foto en el navegador antes de subirla: sube rápido aunque venga del
 * móvil, y vale cualquier formato que el navegador sepa abrir (HEIC en Safari, WebP...). El servidor la vuelve a
 * procesar de todos modos.
 */
export async function resizeToSquareJpeg(file) {
  const bitmap = await loadBitmap(file)
  const side = Math.min(bitmap.width, bitmap.height)
  const size = Math.min(OUTPUT_SIZE, side)
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, size, size)
  context.imageSmoothingQuality = 'high'
  context.drawImage(bitmap, (bitmap.width - side) / 2, (bitmap.height - side) / 2, side, side, 0, 0, size, size)
  bitmap.close?.()
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9))
  if (!blob) throw new Error('canvas')
  return { blob, preview: canvas.toDataURL('image/jpeg', 0.8) }
}

async function loadBitmap(file) {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file, { imageOrientation: 'from-image' })
    } catch {
      // Algunos navegadores no admiten la opción o el formato: se prueba con <img>.
    }
  }
  // data: y no blob:, porque la política de seguridad de la web solo permite imágenes «self», data: y https:.
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
  const image = new Image()
  image.src = dataUrl
  await image.decode()
  return image
}
