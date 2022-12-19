import { JSX } from "solid-js/jsx-runtime";
import { css } from "solid-styled";
import { colorsToArr } from "../../../functions/colorConfig";
import { focused } from "../../../functions/keyHandler";
import { visibleColorScale } from "../../shared/toggleColorScale";

const Heading = (props : JSX.SelectHTMLAttributes<HTMLHeadingElement & {
  size?: 1 | 2 | 3 | 4 | 5 | 6
}>) => {

  const watchingSwatch = () => colorsToArr(visibleColorScale());
  const focusRow = () => focused()[1]

  const baseSwatch = () => watchingSwatch()[focusRow()]
  const baseNeutral = () => watchingSwatch()[0]
  const headerColor = () => baseNeutral()[9]

  const textSize = () => {
    return props.size ? 
    props.size == 1 ? '4xl' :
    props.size == 2 ? '3xl' :
    props.size == 3 ? '2xl' :
    props.size == 4 ? 'xl' :
    props.size == 5 ? 'lg' :
    props.size == 6 ? 'base' : 'base' : 'base'
  }

  css`
    .heading{
      color: ${headerColor()};
    }
  `

  return (
    <p class={`text-${textSize()} heading font-bold ${props.class}`} {...props}>
      {props.children}
    </p>
  )
}

export default Heading;