import chroma from "chroma-js";
import {Component, createSignal} from "solid-js";
import SwatchList from "../shared/components/swatchList";
import { Button } from "../shared/styles/components/button.styled";
import { Flex } from "../shared/styles/components/flex.styled";
import { Select } from "../shared/styles/components/select.styled";
import { SetLegacy, SetRelative, SetShades } from "../shared/styles/functions/functions.styled";
import { ColorLegacy, ColorMix, ColorRelative, ColorShades} from "../shared/styles/utils/variables.styled";

export type ISwatchItem = {
  name: string;
  swatch: Record<string, Record<string, string>>;
}

export const [showContrast, setShowContrast] = createSignal('0');
export const [contrastCalcType, setContrastCalcType] = createSignal(0);

const ColorListPage: Component = () => {

  const [colorType, setColorType] = createSignal('hex');

  const [shadeLength, setShadeLength] = createSignal(7);

  const listColorConversion = () => {
    let output = [];
    for (const scale of sList()) {
      let calcType: Record<string, any> = {};
      calcType[`name`] = scale.name;
      let colorSwatchObj: Record<string, Record<string, string>> = {};
      for (const [colorName, colorSwatch] of Object.entries(scale.swatch)){
        let colorScaleObj: Record<string, string> = {};
        for (const [scaleName, scaleValue] of Object.entries(colorSwatch)){
          colorScaleObj[scaleName] = scaleValue;
          switch(colorType()){
            case 'hex':
              colorScaleObj[scaleName] = chroma(scaleValue).hex();
              break;
            case 'rgb':
              colorScaleObj[scaleName] = `rgb(${chroma(scaleValue).rgb().toString()})`;
              break;
            case 'hsl':
              colorScaleObj[scaleName] = `hsl(${chroma(scaleValue).hsl().toString()})`;
              break;
            case 'hsv':
              colorScaleObj[scaleName] = `hsv(${chroma(scaleValue).hsv().toString()})`;
              break;
            case 'hsi':
              colorScaleObj[scaleName] = `hsi(${chroma(scaleValue).hsi().toString()})`;
              break;
            case 'lab':
              colorScaleObj[scaleName] = `lab(${chroma(scaleValue).lab().toString()})`;
              break;
            case 'oklab':
              colorScaleObj[scaleName] = `oklab(${chroma(scaleValue).oklab().toString()})`;
              break;
            case 'lch':
              colorScaleObj[scaleName] = `lch(${chroma(scaleValue).lch().toString()})`;
              break;
            case 'hcl':
              colorScaleObj[scaleName] = `hcl(${chroma(scaleValue).hcl().toString()})`;
              break;
            case 'okhcl':
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
      swatch: ColorShades()
    }, {
      name: 'Blended (Lab Color Mix)',
      swatch: ColorMix()
    }, {
      name: 'Relative (HSV & Relative Luminance)',
      swatch: ColorRelative()
    }, {
      name: 'Brighten and Darken (Legacy)',
      swatch: ColorLegacy()
    }
  ];

  const updateColorType = (type: any) => {
    setColorType(type.target.value);
  }


  const updateShadeLength = (type: any) => {
    setShadeLength(type.target.value);
    if (shadeLength() == 10) {
      SetLegacy([1.7, 1.5, 1.25, 1.2, 1.1, 1, 0.9, 0.8, 0.7, 0.1]);
      SetRelative([1.4, 1.3, 1.2, 1.15, 1.1, 1, 0.9, 0.85, 0.7, 0.6]);
      SetShades([0.12, 0.18, 0.35, 0.8, 0.9, 1, 1.1, 1.2, 1.65, 1.85]);
    }
    if (shadeLength() == 9) {
      SetLegacy([1.5, 1.25, 1.2, 1.1, 1, 0.9, 0.8, 0.7, 0.1]);
      SetRelative([1.3, 1.2, 1.15, 1.1, 1, 0.9, 0.85, 0.7, 0.6]);
      SetShades([0.18, 0.35, 0.8, 0.9, 1, 1.1, 1.2, 1.65, 1.85]);
    } if (shadeLength() == 7) {
      SetLegacy([1.5, 1.2, 1.1, 1, 0.9, 0.7, 0.1]);
      SetRelative([1.3, 1.2, 1.1, 1, 0.9, 0.7, 0.6]);
      SetShades([0.18, 0.35, 0.9, 1, 1.1, 1.65, 1.85]);
    }
  }

  const updateShowContrast = (type: any) => {
    setShowContrast(type.target.value);
  }

  const updateContrastCalc = (type: any) => {
    setContrastCalcType(type.target.value);
  }

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