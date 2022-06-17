import chroma from "chroma-js";
import { forEach } from "lodash";
import {Component, createEffect, createSignal, For} from "solid-js";
import SwatchList from "../shared/components/swatchList";
import { Button } from "../shared/styles/components/button.styled";
import { Flex } from "../shared/styles/components/flex.styled";
import { Select } from "../shared/styles/components/select.styled";
import { ColorLegacy, ColorMix, ColorRelative, colorScale, ColorShades} from "../shared/styles/utils/variables.styled";

export type ISwatchItem = {
  name: string;
  swatch: Record<string, Record<string, string>>;
}


const ColorListPage: Component = () => {

  const [colorType, setColorType] = createSignal('hex');

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

  const [sList, setSList] = createSignal<Array<ISwatchItem>>([
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
  ]);

  createEffect(() => {
    console.log('master update');
    setSList([
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
    ])
  })

  const updateColorType = (type: any) => {
    setColorType(type.target.value);
  }

  return(
    <>
      <h3>
        Generated Colors
      </h3>
      <Flex flexDirection="row" gap={8} style={{
        margin: '0 0 24px -2px'
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
      </Flex>
      <SwatchList swatchList={sList()}/>
      <br/>
    </>
  )

}

export default ColorListPage;