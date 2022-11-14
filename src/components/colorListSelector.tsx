import {JSX, onMount} from "solid-js";
import SwatchList from "../shared/components/swatchList";
import {
  ColorShades,
  ColorShadesLight
} from "../shared/styles/utils/variables.styled";

const ColorSelectorPage: () => JSX.Element = () => {

  const sList = () => [
    {
      name: 'Shades Corrected (RGB)',
      swatch: ColorShades(),
      light: false
    }, {
      name: 'Shades Corrected (RGB) Light Mode',
      swatch: ColorShadesLight(),
      light: true
    }
  ];

  return(
    <>
      <h3>
        Generated Colors
      </h3>
      <SwatchList swatchList={sList()}/>
      <br/>
    </>
  )

}

export default ColorSelectorPage;
