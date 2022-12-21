import { JSX } from "solid-js/jsx-runtime";
import { css } from "solid-styled";
import { neutralSwatch } from "./colorSwatch";

const Paragraph = (props : JSX.SelectHTMLAttributes<HTMLParagraphElement & {
  size?: 'base' | 'large' | 'small'
}>) => {

  const bodyColor = () => neutralSwatch(7)
  const boldColor = () => neutralSwatch(8)
  const hintColor = () => neutralSwatch(5)

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