import { JSX } from "solid-js/jsx-runtime";
import { css } from "solid-styled";
import { colorsToArr } from "../../../functions/colorConfig";
import { focused } from "../../../functions/keyHandler";
import { visibleColorScale } from "../../shared/toggleColorScale";

const LinkAnchor = (props : JSX.SelectHTMLAttributes<HTMLAnchorElement & {
  size?: 'base' | 'large' | 'small'
}>) => {

  const watchingSwatch = () => colorsToArr(visibleColorScale());
  const focusRow = () => focused()[1]

  const baseSwatch = () => watchingSwatch()[focusRow()]
  const baseNeutral = () => watchingSwatch()[0]

  const linkColor = () => baseSwatch()[7]
  const linkHoverColor = () => baseSwatch()[6]
  const hintColor = () => baseSwatch()[4]
  const hintHoverColor = () => baseSwatch()[3]

  const textSize = () => {
    return props.size ? 
    props.size == 'base' ? 'base' :
    props.size == 'large' ? 'lg' : 
    props.size == 'small' ? 'sm' : 'base' : 'base'
  }

  css`
    .link{
      color: ${linkColor()};
      cursor: pointer;
      font-weight: 500;
    }
    .link:hover{
      color: ${linkHoverColor()}
    }
    .hint{
      color: ${hintColor()}
    }
    .hint:hover{
      color: ${hintHoverColor()}
    }
  `

  return (
    <a class={`text-${textSize()} link inline-block ${props.class}`} {...props}>
      {props.children}
    </a>
  )
}

export default LinkAnchor;