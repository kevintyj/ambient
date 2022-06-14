import {Component} from "solid-js";
import ColorListPage from "../components/colorListComponent";
import ColorSelector from "../components/colorSelector";
import GraphList from "../components/graphListComponent";
import Introduction from "../components/introduction";
import { Flex } from "../shared/styles/components/flex.styled";
import { ColorShades } from "../shared/styles/utils/variables.styled";

const Home: Component = () => {

  return(
    <>
      <Introduction/>
      <Flex flexDirection='row' gap={16}>
        <div style={{
          width: 'auto'
        }}>
          <h3>
            Color Table
          </h3>
          <p>
            Color table of generated colors can be edited here. Only the primary color is considered. 
            <strong>Color names must be unique.</strong> 
          </p>
          <br/>
          <ColorSelector/>
        </div>
        <div style={{
          width: '100%'
        }}>
          <h3>
            Color Graph
          </h3>
          <p style={{
            'padding-bottom': '12px'
          }}>
            These values are the calculated luminance values of each color.
            The graph does not update until the color set is generated. 
          </p>
          <GraphList colorSwatch={ColorShades()}/>
          <br/>
          <br/>
        </div>
      </Flex>

      <ColorListPage/>
      <br/>
    </>
  )

}

export default Home;