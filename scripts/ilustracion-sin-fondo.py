"""
Quita el fondo blanco de una ilustración para que se vea el fondo de la web (claro u oscuro).

Solo se quita el blanco de fuera: la zona casi blanca conectada con los bordes de la imagen. Las manchas lila de
detrás se quedan como una «nube» con forma (sobre fondo oscuro hacen de fondo suave de la escena), y lo que está
dentro de los dibujos (un papel o una ventana blancos, la piel...) no se toca. El borde se suaviza para que no quede
dentado.

Uso: python3 scripts/ilustracion-sin-fondo.py entrada.png public/images/salida.webp [ancho]
Necesita Pillow, NumPy y SciPy (pip install pillow numpy scipy).
"""
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

entrada, salida = sys.argv[1], sys.argv[2]
ancho = int(sys.argv[3]) if len(sys.argv) > 3 else 900

rgb = np.asarray(Image.open(entrada).convert('RGB')).astype(np.float32)
distancia_al_blanco = 255 - rgb.min(axis=2)

# Fondo: lo casi blanco que toca los bordes de la imagen.
casi_blanco = distancia_al_blanco < 14
etiquetas, _ = ndimage.label(casi_blanco)
bordes = np.unique(np.concatenate([etiquetas[0], etiquetas[-1], etiquetas[:, 0], etiquetas[:, -1]]))
fondo = np.isin(etiquetas, bordes[bordes > 0])

# Dentro del fondo, lo que ya se separa del blanco (el borde de las manchas lila) se queda, y el paso de opaco a
# transparente se difumina para que el borde sea suave y no se vean los cuadraditos de la compresión.
UMBRAL = 10
mancha = (distancia_al_blanco >= UMBRAL) | ~fondo
mancha = ndimage.binary_opening(mancha, structure=np.ones((3, 3)))
alfa = ndimage.gaussian_filter(mancha.astype(np.float32), 2.5)
alfa = np.where(fondo, alfa, 1.0)
# El color se deja tal cual: el borde de las manchas lila se funde en lila claro, sin manchas grises en oscuro.
color = rgb

out = Image.fromarray(np.dstack([color, alfa * 255]).astype(np.uint8), 'RGBA')
caja = out.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
if caja:
    out = out.crop(caja)
alto = round(out.height * ancho / out.width)
out = out.resize((ancho, alto), Image.LANCZOS)
out.save(salida, 'WEBP', quality=85, method=6)
print(f'{salida}: {ancho}x{alto}')
