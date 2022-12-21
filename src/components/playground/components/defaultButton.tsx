import { ParentComponent } from "solid-js";
import { css } from "solid-styled";
import { BaseBackgroundArr } from "../../../functions/colorConfig";
import { darkMode } from "../../shared/darkModeToggle";
import PlaygroundBtn from "../button/playgroundButton";
import { calcTextColor, colorSwatch, neutralSwatch } from "./colorSwatch";

type IDefaultBtnProps = ParentComponent<& {
  type: 'default' | 'secondary' | 'primary'
}
>;

const DefaultButton: IDefaultBtnProps = (props) => {

  const headerColor = () => neutralSwatch(9)

  css`
    .heading{
      color: ${headerColor()};
    }
  `

  if (props.type == 'default'){
    return (
      <PlaygroundBtn border={'full'}
        textColor={neutralSwatch(9)}
        color={darkMode() ? neutralSwatch(0) : BaseBackgroundArr[0]}
        hoverColor={darkMode() ? BaseBackgroundArr[1] : BaseBackgroundArr[0]}
        borderColor={neutralSwatch(2)}
        hoverBorderColor={neutralSwatch(1)}>
        {props.children}
      </PlaygroundBtn>
    )
  } if (props.type == 'secondary') {
    return (
      <PlaygroundBtn border={'full'} 
      textColor={colorSwatch(9)}
      color={colorSwatch(2)}
      hoverColor={colorSwatch(1)}
      borderColor={colorSwatch(3)}
      hoverBorderColor={colorSwatch(2)}>
        {props.children}
      </PlaygroundBtn>
    )
  } if (props.type == 'primary') {
    return (
      <PlaygroundBtn border={'top'} 
      textColor={calcTextColor()}
      color={colorSwatch(5)}
      hoverColor={colorSwatch(6)}
      borderColor={colorSwatch(6)}
      hoverBorderColor={colorSwatch(7)}>
        {props.children}
      </PlaygroundBtn>
    )
  }
}

export default DefaultButton;