# Color Converter
Tiny js library for color conversion
## Installation
```bash
npm install color-convertor --save
```
```bash
yarn add color-convertor
```
### Import

```javascript
import color from 'color-convertor';
```

```JavaScript
// CommonJS
const color = require('color-convertor');
```
### Usage
```JavaScript
// HEX to RGB/RGBA
color.hexToRgb('#2d2d2d') // returns rgb(45,45,45);
color.hexToRgb('#2d2d2dcc') // returns rgba(45,45,45,.8);

// HEX to HSL/HSLA
color.hexToHsl('#fff') // returns hsl(0,0%,100%)

//RGBA/RGB to HEX
color.rgbToHex(255,255,255,.8)// returns #ffffffcc
color.rgbToHex(255,255,255)// returns #ffffff

//RGBA/RGB String to HEX
color.rgbStrToHex('rgba(255,255,255,.8)')// returns #ffffffcc
color.rgbStrToHex('rgb(255,255,255)')// returns #ffffff

// RGB/RGBA to HSL/HSLA
color.rgbToHsl(33,33,33) // returns 'hsl(0,0%,13%)'
color.rgbToHsl(0,0,0,.5) // returns 'hsla(0,0%,0%,0.5)'

// RGB/RGBA String to HSL/HSLA
color.rgbStrToHsl('rgb(33,33,33)') // 'hsl(0,0%,13%)'
color.rgbStrToHsl('rgba(0,0,0,.5)') // returns 'hsla(0,0%,0%,0.5)'

// HSL/HSLA to RGB/RGBA
color.hslToRgb(500, 0.5, 0.5) // returnsrgb(64,191,106)
color.hslToRgb(500, '50%', '50%') // returnsrgb(64,191,106)
color.hslToRgb(500, 0.5, 0.5,.5) // returns rgb(64,191,106,.5)

// HSL/HSLA String to RGB/RGBA
color.hslStrToRgb('hsl(500, 50%, 50%)') // returns rgb(64,191,106)
color.hslStrToRgb('hsla(500, 0.5, 0.5,.5)') // returns rgba(64,191,106,.5)

// HSL/HSLA to HEX
color.hslToHex(50,'50%','50%') // returns #bfaa40
color.hslToHex(150,.5,.5) // returns #40bf80

// HSL/HSLA String to HEX
color.hslStrToHex('hsl(50,50%,50%)') // returns #bfaa40
color.hslToHex('hsla(150,.5,.5,.8)') // returns #40bf80cc
```
- Functions
  1. hexToRgb
  2. hexToHsl
  3. rgbToHex
  4. rgbStrToHex
  5. rgbToHsl
  6. rgbStrToHsl
  7. hslToHex
  8. hslStrToHex
  9. hslToRgb
  10. hslStrToRgb
