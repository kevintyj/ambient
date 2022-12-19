import { JSX } from "solid-js/jsx-runtime";
import { css } from "solid-styled";
import { colorsToArr } from "../../../functions/colorConfig";
import { focused } from "../../../functions/keyHandler";
import { visibleColorScale } from "../../shared/toggleColorScale";

const Paragraph = (props : JSX.SelectHTMLAttributes<HTMLParagraphElement & {
  size?: 'base' | 'large' | 'small'
}>) => {

  const watchingSwatch = () => colorsToArr(visibleColorScale());
  const focusRow = () => focused()[1]

  const baseSwatch = () => watchingSwatch()[focusRow()]
  const baseNeutral = () => watchingSwatch()[0]

  const bodyColor = () => baseNeutral()[7]
  const boldColor = () => baseNeutral()[8]
  const hintColor = () => baseNeutral()[5]

  const textSize = () => {
    return props.size ? 
    props.size == 'base' ? 'base' :
    props.size == 'large' ? 'lg' : 
    props.size == 'small' ? 'sm' : 'base' : 'base'
  }

  css`
    .paragraph{
      color: ${bodyColor()};
    }
    .bold{
      color: ${boldColor()};
      font-weight: 500;
    }
    .hint{
      color: ${hintColor()}
    }
  `

  return (
    <p class={`text-${textSize()} paragraph inline ${props.class}`} {...props}>
      {props.children}
    </p>
  )
}

export default Paragraph;