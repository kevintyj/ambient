import { styled } from "solid-styled-components";

export const ColorIdentifier = styled('div')`
  width: 16px;
  height: 16px;
  border-radius: 3px;
  background-color: ${props => props.color ? props.color : 'white'};
  border: 1px solid rgba(255, 255, 255, 0.14);
`