import os
from fontTools.ttLib import TTFont

font_dir = r"d:\بسم الله - Copy - Copy\storefront\public\fonts"
for fname in os.listdir(font_dir):
    if fname.endswith(".otf"):
        base = fname[:-4]
        in_path = os.path.join(font_dir, fname)
        out_path = os.path.join(font_dir, f"{base}.woff2")
        font = TTFont(in_path)
        font.flavor = "woff2"
        font.save(out_path)
        old_sz = os.path.getsize(in_path)
        new_sz = os.path.getsize(out_path)
        print(f"Converted {fname}: {old_sz/1024:.1f}KB -> {new_sz/1024:.1f}KB ({100*(1-new_sz/old_sz):.1f}% reduction)")
