# Fonts

Three self-hosted families, loaded through `next/font/local` in
[`src/lib/fonts.ts`](../../lib/fonts.ts). No `@import`, no external font requests
at runtime.

| File                    | Family | Axes      | Used for                                     |
| ----------------------- | ------ | --------- | -------------------------------------------- |
| `geist-variable.woff2`  | Geist  | wght 100–900 | Body, navigation, forms, UI                |
| `lobster-regular.woff2` | Lobster | static 400 | Brand display headings only                 |
| `caveat-variable.woff2` | Caveat | wght 400–700 | Short handwritten notes and annotations   |

## Licensing

All three are SIL Open Font License 1.1. The licence texts ship next to the
fonts (`LICENSE-Geist.txt`, `LICENSE-Lobster.txt`, `LICENSE-Caveat.txt`) and must
stay in the repository.

## How these files were produced

Upstream sources: Lobster and Caveat from
[google/fonts](https://github.com/google/fonts), Geist from the official
`geist` npm package.

Google's own CDN splits each family across several unicode-range subsets, and
`next/font/local` cannot merge unicode-ranges across files. The full TTFs were
therefore subset once into a single woff2 per family covering Latin, Latin
Extended-A, spacing diacritics, punctuation and currency — which is everything
Czech, German and English need — with the variable weight axes preserved.

```bash
python3 -m venv fontenv
./fontenv/bin/pip install "fonttools[woff]"

U="U+0000-00FF,U+0100-017F,U+0180-01BF,U+0218-021B,U+02B0-02FF,U+0300-036F,U+2000-206F,U+20A0-20BF,U+2100-214F,U+2212,U+FEFF,U+FFFD"

./fontenv/bin/pyftsubset Geist-Variable.ttf \
  --output-file=geist-variable.woff2 --flavor=woff2 \
  --layout-features='*' --unicodes="$U" --name-IDs='*' --notdef-outline
```

Repeat for `Lobster-Regular.ttf` and `Caveat[wght].ttf`.

## Replacing a font

Drop a new woff2 in this folder under the same filename and keep the `weight`
range in `src/lib/fonts.ts` in sync with the file's real axes. Verify Czech and
German coverage before shipping:

```python
from fontTools.ttLib import TTFont
cmap = TTFont("caveat-variable.woff2").getBestCmap()
print([c for c in "ěščřžýáíéůúňťďäöüß" if ord(c) not in cmap])  # must print []
```
