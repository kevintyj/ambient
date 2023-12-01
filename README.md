![Ambient - generate contrast safe colors for UIUX](https://github.com/kevintyj/ambient/raw/main/public/ambient.png)

---


[![🧪 CI Tests](https://github.com/kevintyj/ambient/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/kevintyj/ambient/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/kevintyj/ambient)](https://github.com/kevintyj/ambient/blob/main/LICENSE)

**[Live Demo](https://ambient-rvx.web.app/)**

This tool is designed to generate **contrast ready** color pallets built specifically for UIUX design. Unlike other palette generation tools, Ambient generates the colors **based on the primary color**. Hues, saturation, and relative lightness adjustments are made automatically using our algorithm. As ambient relies on the primary color for alternative color generation, primary colors **must be contrast compliant**. Ambient displays both WACG and APCA definitions of text contrast, 4.5:1(WACG) or 60Lc(APCA) is recommended for text contrast. 

#### Limitations

The current contrast ratios are based on 4.5:1 and 60 for recommended contrast between text and background. When designing for accessibility in mind,  **text sizes should also be considered**. Ambient does not give any recommendation for text sizes, the official WCAG documentation should be referred to generate a lookup tables for text and background combination for text sizes.

Ambient was built with [Solid Start](https://solidjs.com)

> ### Important v1.0.0 Update
> The previous codebase has been put to `v.0.0.0` branch. The current master branch is a orphan.
> For previous commit logs, please check the outdated branch.

## Key Features
- Generate contrast ready color palette from base primary colors
- See Luminance values of each shade generated
- Get valuable contrast information on each shade
- APCA Contrast ratio ready
- Customize text color pairs
- Export to Tailwind colors

## Roadmap
- Export all color shades in CSS & SCSS ready formats
- Export to library theming formats (Bootstrap, Tailwind, Chakra, Mantine etc.) 
- Figma plugin
- Compatability with Figma design tokens
- Ability to customize algorithm
