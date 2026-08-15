from pathlib import Path
from PIL import Image

source = Path('/home/ubuntu/upload/msarw-neon-favicon.png')
target = Path('/home/ubuntu/msarw-redesign/client/public/assets/msarw-neon-favicon.png')
target.parent.mkdir(parents=True, exist_ok=True)

image = Image.open(source).convert('RGB')
image.thumbnail((512, 512), Image.Resampling.LANCZOS)
image.save(target, format='PNG', optimize=True, compress_level=9)
print(f'saved {target} at {image.size}')
