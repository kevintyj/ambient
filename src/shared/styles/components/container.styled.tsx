import {styled} from "solid-styled-components";

import {Base, Color} from "../utils/variables.styled";

export const Container = styled('div')`
  width: 100%;
  max-width: ${Base.MAX_WIDTH}px;
  margin: 0 auto;
  background-color: ${Color.PRIMARY_400};
`;