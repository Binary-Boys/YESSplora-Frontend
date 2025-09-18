# QR Code Generator for YESSplora

This directory contains QR codes generated from the strings in `Qractions.txt`.

## Generated QR Codes

The following QR codes have been generated:

### Game Level QR Codes (9 codes)
- `yesslvl-1.png` - redirect to game 1
- `yesslvl-2.png` - redirect to game 2
- `yesslvl-3.png` - redirect to game 3
- `yesslvl-4.png` - redirect to game 4
- `yesslvl-5.png` - rules5
- `yesslvl-6.png` - rules6
- `yesslvl-7.png` - rules7
- `yesslvl-8.png` - rules8
- `yesslvl-9.png` - rules9

### Stallyess QR Codes (42 codes)
- `stallyess1.png` through `stallyess42.png` - Add 1 point to the score

### Special QR Codes (4 codes)
- `pixprompt.png` - Add 3 points to the score
- `googlegsa.png` - Add 3 points to the score
- `valaxiapy.png` - Add 3 points to the score
- `treasure.png` - guardians page

## Total: 55 QR Code Images

## Regenerating QR Codes

To regenerate the QR codes, run:

```bash
cd QRS/Qrgen
node qr-generator.js
```

The generator script:
- Reads from `../../Qractions.txt`
- Parses each line using `:` or space as delimiter
- Generates 256x256 PNG QR codes
- Saves them in the parent directory (`../`)
- Uses black QR codes on white background

## QR Code Specifications
- **Format**: PNG
- **Size**: 256x256 pixels
- **Quality**: 0.92
- **Margin**: 1
- **Colors**: Black on white
