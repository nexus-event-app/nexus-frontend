import sys

import numpy as np
from PIL import Image, ImageSequence
from scipy import ndimage

entrada, salida, quieta = sys.argv[1], sys.argv[2], sys.argv[3]
ancho = int(sys.argv[4]) if len(sys.argv) > 4 else 720

def sin_fondo(fotograma):
    rgba = np.asarray(fotograma.convert('RGBA')).astype(np.float32)
    rgb = rgba[..., :3]
    transparente = rgba[..., 3] < 128
    distancia_al_blanco = 255 - rgb.min(axis=2)
    casi_blanco = (distancia_al_blanco < 14) | transparente
    etiquetas, _ = ndimage.label(casi_blanco)
    bordes = np.concatenate([etiquetas[0], etiquetas[-1], etiquetas[:, 0], etiquetas[:, -1], etiquetas[transparente]])
    fondo = np.isin(etiquetas, np.unique(bordes[bordes > 0]))
    mancha = ~fondo
    mancha = ndimage.binary_opening(mancha, structure=np.ones((3, 3)))
    alfa = ndimage.gaussian_filter(mancha.astype(np.float32), 1.2)
    alfa = np.where(fondo, alfa, 1.0)
    alfa = np.where(transparente, 0.0, alfa)
    return Image.fromarray(np.dstack([rgb, alfa * 255]).astype(np.uint8), 'RGBA')


original = Image.open(entrada)
duraciones = []
fotogramas = []
for fotograma in ImageSequence.Iterator(original):
    duraciones.append(fotograma.info.get('duration', 100))
    fotogramas.append(sin_fondo(fotograma))

cajas = [f.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox() for f in fotogramas]
cajas = [c for c in cajas if c]
caja = (min(c[0] for c in cajas), min(c[1] for c in cajas), max(c[2] for c in cajas), max(c[3] for c in cajas))
ancho = min(ancho, caja[2] - caja[0])
alto = round((caja[3] - caja[1]) * ancho / (caja[2] - caja[0]))
listos = [f.crop(caja).resize((ancho, alto), Image.LANCZOS) for f in fotogramas]

listos[0].save(
    salida, 'WEBP', save_all=True, append_images=listos[1:], duration=duraciones, loop=0, quality=85, method=6
)
listos[0].save(quieta, 'WEBP', quality=85, method=6)
print(f'{salida} y {quieta}: {ancho}x{alto}, {len(listos)} fotogramas')
