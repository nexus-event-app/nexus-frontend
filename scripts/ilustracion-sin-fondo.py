import sys

import numpy as np
from PIL import Image
from scipy import ndimage

entrada, salida = sys.argv[1], sys.argv[2]
ancho = int(sys.argv[3]) if len(sys.argv) > 3 else 900

rgb = np.asarray(Image.open(entrada).convert('RGB')).astype(np.float32)
distancia_al_blanco = 255 - rgb.min(axis=2)

casi_blanco = distancia_al_blanco < 14
etiquetas, _ = ndimage.label(casi_blanco)
bordes = np.unique(np.concatenate([etiquetas[0], etiquetas[-1], etiquetas[:, 0], etiquetas[:, -1]]))
fondo = np.isin(etiquetas, bordes[bordes > 0])

UMBRAL = 10
mancha = (distancia_al_blanco >= UMBRAL) | ~fondo
mancha = ndimage.binary_opening(mancha, structure=np.ones((3, 3)))
alfa = ndimage.gaussian_filter(mancha.astype(np.float32), 2.5)
alfa = np.where(fondo, alfa, 1.0)

out = Image.fromarray(np.dstack([rgb, alfa * 255]).astype(np.uint8), 'RGBA')
caja = out.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
if caja:
    out = out.crop(caja)
alto = round(out.height * ancho / out.width)
out = out.resize((ancho, alto), Image.LANCZOS)
out.save(salida, 'WEBP', quality=85, method=6)
print(f'{salida}: {ancho}x{alto}')
