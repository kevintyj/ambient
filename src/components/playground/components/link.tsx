import { JSX } from "solid-js/jsx-runtime";
import { css } from "solid-styled";
import { colorSwatch } from "./colorSwatch";

const LinkAnchor = (props : JSX.SelectHTMLAttributes<HTMLAnchorElement & {
  size?: 'base' | 'large' | 'small'
}>) => {

  const linkColor = () => colorSwatch(7)
  const linkHoverColor = () => colorSwatch(6)
  const hintColor = () => colorSwatch(4)
  const hintHoverColor = () => colorSwatch(3)

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