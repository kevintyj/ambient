import {Component, JSX, onCleanup, onMount} from "solid-js";
import ColorSelectorPage from "../components/colorListSelector";
import TesterButton from "../shared/components/testerButton";
import {ColorShades, ColorShadesLight} from "../shared/styles/utils/variables.styled";
import ButtonListComponent from "../components/buttonListComponent";
import {setShades, shadeLength} from "../components/colorListComponent";
import {Flex} from "../shared/styles/components/flex.styled";
import {styled} from "solid-styled-components";

const Playground: Component = () => {

  const loadShadeLen = shadeLength()

  onMount(() => {
    setShades(9)
  })

  onCleanup(() => {
    setShades(loadShadeLen)
  })

  const sList = () => [
    {
      name: 'Shades Corrected (RGB)',
      swatch: ColorShades(),
      light: false
    }, {
      name: 'Shades Corrected (RGB) Light Mode',
      swatch: ColorShadesLight(),
      light: true
    }
  ];

  type btnContainerProps = JSX.HTMLAttributes<HTMLDivElement> & {
    mode: 'dark' | 'light'
  };

  const ButtonContainer = styled('div')((props: btnContainerProps) => `
    padding: 24px 3px;
    width: 100%;
    
    background: ${props.mode == 'dark' ? '#000000' : '#ffffff'};
    border: 1px solid ${props.mode == 'dark' ? 'rgba(256,256,256,0.14)' : 'rgb(196,196,196)'};
    border-radius: 6px;
    
    margin-bottom: 12px;
  `);

  return(
    <>
      <h3>
        Color Testing Playground
      </h3>
      <Flex flexDirection={"column"}>
        <h4>
          Component Backgrounds
        </h4>
        <Flex flexDirection={"column"} style={{
          width: '100%',
          "margin-bottom": '12px'
        }}>
          <h5>
            Dark Mode
          </h5>
          <ButtonContainer mode={"dark"}>
            <Flex>
              <ButtonListComponent mode={"dark"} baseColor={800} baseBgColor={200}/>
            </Flex>
          </ButtonContainer>
          <h5>
            Light Mode
          </h5>
          <ButtonContainer mode={"light"}>
            <Flex>
              <ButtonListComponent mode={"light"} baseColor={800} baseBgColor={200}/>
            </Flex>
          </ButtonContainer>
        </Flex>
      </Flex>

      <Flex flexDirection={"column"}>
        <h4>
          Component Solid Backgrounds
        </h4>
        <Flex flexDirection={"column"} style={{
          width: '100%',
          "margin-bottom": '12px'
        }}>
          <h5>
            Dark Mode
          </h5>
          <ButtonContainer mode={"dark"}>
            <Flex>
              <ButtonListComponent mode={"dark"} baseColor={800} baseBgColor={600} APCAText={true}/>
            </Flex>
          </ButtonContainer>
          <h5>
            Light Mode
          </h5>
          <ButtonContainer mode={"light"}>
            <Flex>
              <ButtonListComponent mode={"light"} baseColor={800} baseBgColor={600} APCAText={true}/>
            </Flex>
          </ButtonContainer>
        </Flex>
      </Flex>

      <Flex flexDirection={"column"}>
        <h4>
          Component Backgrounds with Border
        </h4>
        <Flex flexDirection={"column"} style={{
          width: '100%',
          "margin-bottom": '12px'
        }}>
          <h5>
            Dark Mode
          </h5>
          <ButtonContainer mode={"dark"}>
            <Flex>
              <ButtonListComponent mode={"dark"} baseColor={800} baseBgColor={200} border={true}/>
            </Flex>
          </ButtonContainer>
          <h5>
            Light Mode
          </h5>
          <ButtonContainer mode={"light"}>
            <Flex>
              <ButtonListComponent mode={"light"} baseColor={800} baseBgColor={200} border={true}/>
            </Flex>
          </ButtonContainer>
        </Flex>
      </Flex>

      <Flex flexDirection={"column"}>
        <h4>
          Component Solid Backgrounds with Border
        </h4>
        <Flex flexDirection={"column"} style={{
          width: '100%',
          "margin-bottom": '12px'
        }}>
          <h5>
            Dark Mode
          </h5>
          <ButtonContainer mode={"dark"}>
            <Flex>
              <ButtonListComponent mode={"dark"} baseColor={800} baseBgColor={600} border={true} APCAText={true}/>
            </Flex>
          </ButtonContainer>
          <h5>
            Light Mode
          </h5>
          <ButtonContainer mode={"light"}>
            <Flex>
              <ButtonListComponent mode={"light"} baseColor={800} baseBgColor={600} border={true} APCAText={true}/>
            </Flex>
          </ButtonContainer>
        </Flex>
      </Flex>

      <Flex flexDirection={"column"}>
        <h4>
          Component Backgrounds with Strict Border
        </h4>
        <Flex flexDirection={"column"} style={{
          width: '100%',
          "margin-bottom": '12px'
        }}>
          <h5>
            Dark Mode
          </h5>
          <ButtonContainer mode={"dark"}>
            <Flex>
              <ButtonListComponent mode={"dark"} baseColor={800} baseBgColor={200} border={true} strictBorder={true}/>
            </Flex>
          </ButtonContainer>
          <h5>
            Light Mode
          </h5>
          <ButtonContainer mode={"light"}>
            <Flex>
              <ButtonListComponent mode={"light"} baseColor={800} baseBgColor={200} border={true} strictBorder={true}/>
            </Flex>
          </ButtonContainer>
        </Flex>
      </Flex>

      <Flex flexDirection={"column"}>
        <h4>
          Component Solid Backgrounds with Strict Border
        </h4>
        <Flex flexDirection={"column"} style={{
          width: '100%',
          "margin-bottom": '12px'
        }}>
          <h5>
            Dark Mode
          </h5>
          <ButtonContainer mode={"dark"}>
            <Flex>
              <ButtonListComponent mode={"dark"} baseColor={800} baseBgColor={600} border={true} strictBorder={true} APCAText={true}/>
            </Flex>
          </ButtonContainer>
          <h5>
            Light Mode
          </h5>
          <ButtonContainer mode={"light"}>
            <Flex>
              <ButtonListComponent mode={"light"} baseColor={800} baseBgColor={600} border={true} strictBorder={true} APCAText={true}/>
            </Flex>
          </ButtonContainer>
        </Flex>
      </Flex>

      <br/>
      <br/>
      <br/>

      <ColorSelectorPage/>
      <br/>
    </>
  )

}

export default Playground;
