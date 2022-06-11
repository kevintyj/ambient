import { JSX } from "solid-js";
import {styled} from "solid-styled-components";

import {Base} from "../utils/variables.styled";

type IFlexProps = JSX.HTMLAttributes<HTMLDivElement> & {
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flexJustify?: 'flex-start' | 'flex-end' | 'center' | 'space-between';
  flexAlign?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  flexContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between';
  gap? : number | [number, number];
};

export const Flex = styled('div')((props : IFlexProps) => `
  max-width: ${Base.MAX_WIDTH}px;
  margin: 0 auto;
  display: flex;
  flex-direction: ${props.flexDirection? props.flexDirection : 'row'};
  flex-wrap: ${props.flexWrap? props.flexWrap : 'nowrap'};
  justify-content: ${props.flexJustify? props.flexJustify : 'flex-start'};
  align-items: ${props.flexAlign? props.flexAlign : 'flex-start'};
  align-content: ${props.flexContent? props.flexContent : 'flex-start'};
  gap: ${props.gap? typeof props.gap === 'number' ? `${props.gap}px` : `${props.gap[0]}px ${props.gap[1]}px` : ''};
`);