import chroma from "chroma-js";
import {Component, createSignal, JSX} from "solid-js";
import SwatchList from "../shared/components/swatchList";
import { Button } from "../shared/styles/components/button.styled";
import { Flex } from "../shared/styles/components/flex.styled";
import { Select } from "../shared/styles/components/select.styled";
import {
  SetLegacy, SetLegacyLight,
  SetRelative,
  SetRelativeLight,
  SetShades,
  SetShadesLight
} from "../shared/styles/functions/functions.styled";
import {
  ColorLegacy, ColorLegacyLight,
  ColorMix, ColorMixLight,
  ColorRelative, ColorRelativeLight,
  ColorShades,
  ColorShadesLight
} from "../shared/styles/utils/variables.styled";

export type ISwatchItem = {
  name: string;
  swatch: Record<string, Record<string, string>>;
  light: boolean;
}

export const [showContrast, setShowContrast] = createSignal('0');
export const [contrastCalcType, setContrastCalcType] = createSignal(0);

const [colorType, setColorType] = createSignal('hex');

export const [shadeLength, setShadeLength] = createSignal(7);

const updateColorType = (type: any) => {
  setColorType(type.target.value);
}

const updateShowContrast = (type: any) => {
  setShowContrast(type.target.value);
}

const updateContrastCalc = (type: any) => {
  setContrastCalcType(type.target.value);
}

const updateShadeLength = (type: any) => {
  setShadeLength(type.target.value);
  setShades(shadeLength());
}

export const setShades = (len: number)  => {
  if (len == 10) {
    SetLegacy([0.03, 0.1, 0.2, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.2]);
    SetRelative([0.7, 0.6, 0.65, 0.7, 0.85, 0.9, 1, 1.1, 1.2, 1.2]);
    SetShades([1.95, 1.86, 1.78, 1.72, 1.3, 1.15, 1, 0.86, 0.74, 0.32]);

    SetLegacyLight([1.8, 1.7, 1.5, 1.25, 1.2, 1.1, 1, 0.8, 0.7, 0.7]);
    SetRelativeLight([1.5, 1.4, 1.3, 1.2, 1.15, 1.1, 1, 0.85, 0.7, 0.7]);
    SetShadesLight([0.1, 0.2, 0.3, 0.37, 0.77, 0.85, 1, 1.2, 1.4, 1.67]);
  }
  if (len == 9) {
    SetLegacy([0.1, 0.2, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.2]);
    SetRelative([0.6, 0.65, 0.7, 0.85, 0.9, 1, 1.1, 1.2, 1.2]);
    SetShades([1.86, 1.78, 1.72, 1.3, 1.15, 1, 0.86, 0.74, 0.32]);

    SetLegacyLight([1.7, 1.5, 1.25, 1.2, 1.1, 1, 0.8, 0.7, 0.7]);
    SetRelativeLight([1.4, 1.3, 1.2, 1.15, 1.1, 1, 0.85, 0.7, 0.7]);
    SetShadesLight([0.2, 0.3, 0.37, 0.77, 0.85, 1, 1.2, 1.4, 1.67]);

  } if (len == 7) {
    SetLegacy([0.1, 0.7, 0.9, 1, 1.1, 1.2, 1.5]);
    SetRelative([0.6, 0.7, 0.9, 1, 1.1, 1.2, 1.3]);
    SetShades([1.85, 1.65, 1.1, 1, 0.9, 0.35, 0.18]);

    SetLegacyLight([1.5, 1.2, 1.1, 1, 0.9, 0.7, 0.1]);
    SetRelativeLight([1.3, 1.2, 1.1, 1, 0.9, 0.7, 0.6]);
    SetShadesLight([0.18, 0.35, 0.9, 1, 1.1, 1.65, 1.85]);
  }
}

const ColorListPage: () => JSX.Element = () => {

  const listColorConversion = () => {
    let output = [];
    for (const scale of sList()) {
      let calcType: Record<string, any> = {};
      calcType[`name`] = scale.name;
      let colorSwatchObj: Record<string, Record<string, string>> = {};
      for (const [colorName, colorSwatch] of Object.entries(scale.swatch)){
        let colorScaleObj: Record<string, string> = {};
        for (const [scaleName, scaleValue] of Object.entries(colorSwatch)){
          if (typeof scaleValue === "string") {
            colorScaleObj[scaleName] = scaleValue;
          }
          switch(colorType()){
            case 'hex':
              // @ts-ignore
              colorScaleObj[scaleName] = chroma(scaleValue).hex();
              break;
            case 'rgb':
              // @ts-ignore
              colorScaleObj[scaleName] = `rgb(${chroma(scaleValue).rgb().toString()})`;
              break;
            case 'hsl':
              // @ts-ignore
              colorScaleObj[scaleName] = `hsl(${chroma(scaleValue).hsl().toString()})`;
              break;
            case 'hsv':
              // @ts-ignore
              colorScaleObj[scaleName] = `hsv(${chroma(scaleValue).hsv().toString()})`;
              break;
            case 'hsi':
              // @ts-ignore
              colorScaleObj[scaleName] = `hsi(${chroma(scaleValue).hsi().toString()})`;
              break;
            case 'lab':
              // @ts-ignore
              colorScaleObj[scaleName] = `lab(${chroma(scaleValue).lab().toString()})`;
              break;
            case 'oklab':
              // @ts-ignore
              colorScaleObj[scaleName] = `oklab(${chroma(scaleValue).oklab().toString()})`;
              break;
            case 'lch':
              // @ts-ignore
              colorScaleObj[scaleName] = `lch(${chroma(scaleValue).lch().toString()})`;
              break;
            case 'hcl':
              // @ts-ignore
              colorScaleObj[scaleName] = `hcl(${chroma(scaleValue).hcl().toString()})`;
              break;
            case 'okhcl':
              // @ts-ignore
              colorScaleObj[scaleName] = `okhcl(${chroma(scaleValue).okhcl().toString()})`;
              break;
          }
        }
        colorSwatchObj[colorName] = colorScaleObj;
      }
      calcType[`swatch`] = colorSwatchObj;
      output.push(calcType);
    }

    return output;
  }

  const fileDownloadFull = () => {
    console.log(listColorConversion());
    const fileData = JSON.stringify(sList());
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'ambientcolors-full.json';
    link.href = url;
    link.click();
  }

  const fileDownloadTW = () => {
    const fileData = JSON.stringify(listColorConversion()[0].swatch);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'ambientcolors-full.json';
    link.href = url;
    link.click();
  }

  const sList = () => [
    {
      name: 'Shades Corrected (RGB)',
      swatch: ColorShades(),
      light: false
    }, {
      name: 'Shades Corrected (RGB) Light Mode',
      swatch: ColorShadesLight(),
      light: true
    }, {
      name: 'Blended (Lab Color Mix)',
      swatch: ColorMix(),
      light: false
    }, {
      name: 'Blended (Lab Color Mix) Light Mode',
      swatch: ColorMixLight(),
      light: true
    }, {
      name: 'Relative (HSV & Relative Luminance)',
      swatch: ColorRelative(),
      light: false
    }, {
      name: 'Relative (HSV & Relative Luminance) Light Mode',
      swatch: ColorRelativeLight(),
      light: true
    }, {
      name: 'Brighten and Darken (Legacy)',
      swatch: ColorLegacy(),
      light: false
    }, {
      name: 'Brighten and Darken (Legacy) Light Mode',
      swatch: ColorLegacyLight(),
      light: true
    }
  ];

  return(
    <>
      <h3>
        Generated Colors
      </h3>
      <Flex flexDirection="row" gap={8} style={{
        margin: '0 0 8px -2px'
      }}>
        <Button type="submit" onclick={fileDownloadFull}>
          Export colors
        </Button>
        <Button type="submit" onclick={fileDownloadTW}>
          Export colors (Tailwind)
        </Button>
        <p style={{
          'padding': '18px 0 0 12px'
        }}>
          Export color type:
        </p>
        <Select value={colorType()} onChange={updateColorType}>
        <option value='hex' selected>
          HEX (Default)
        </option>
        <option value='rgb'>
          RGB
        </option>
        <option value='hsl'>
          HSL
        </option>
        <option value='hsv'>
          HSV
        </option>
        <option value='hsi'>
          HSI
        </option>
        <option value='lab'>
          LAB
        </option>
        <option value='oklab'>
          OKLAB
        </option>
        <option value='lch'>
          LCH
        </option>
        <option value='hcl'>
          HCL
        </option>
        <option value='okhcl'>
          OKHCL
        </option>
        </Select>
        <p style={{
          'padding': '18px 0 0 12px'
        }}>
          Color Shade Length:
        </p>
        <Select value={shadeLength()} onChange={updateShadeLength}>
          <option value={7} selected>
            7 (Default)
          </option>
          <option value={9}>
            9 (Bootstrap)
          </option>
          <option value={10}>
            10 (Tailwind)
          </option>
        </Select>
      </Flex>
      <Flex flexDirection="row" gap={8} style={{
        margin: '0 0 24px -2px'
      }}>
        <p style={{
            'padding': '18px 0 0 0'
        }}>
          Contrast Color Method:
        </p>
        <Select value={contrastCalcType()} onChange={updateContrastCalc}>
          <option value={0} selected>
            Most Contrasting Color (Default)
          </option>
          <option value={1}>
            First Compliant Color
          </option>
        </Select>
        <p style={{
          'padding': '18px 0 0 12px'
        }}>
          Always Show Contrast Info
        </p>
        <Select value={showContrast()} onChange={updateShowContrast}>
          <option value={'0'} selected>
            False (Default)
          </option>
          <option value={'1'}>
            True
          </option>
        </Select>
      </Flex>
      <SwatchList swatchList={sList()}/>
      <br/>
    </>
  )

}

export default ColorListPage;
