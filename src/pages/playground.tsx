import {Component, createEffect, createSignal, JSX, onCleanup, onMount} from "solid-js";
import ButtonListComponent from "../components/buttonListComponent";
import {contrastCalcType, setShades, shadeLength, showContrast} from "../components/colorListComponent";
import {Flex} from "../shared/styles/components/flex.styled";
import {styled} from "solid-styled-components";
import MenuListcomponent from "../components/menuListComponent";
import {Select} from "../shared/styles/components/select.styled";
import {create} from "lodash";

const Playground: Component = () => {

  const loadShadeLen = shadeLength()

  const [playgroundArea, setPlaygroundArea] = createSignal('buttons');

  const updatePlayGroundArea = (type: any) => {
    setPlaygroundArea(type.target.value);
  }

  onMount(() => {
    setShades(9)
  })

  onCleanup(() => {
    setShades(loadShadeLen)
  })

  createEffect(() => {
    if (playgroundArea() == 'buttons'){

    }
  })

  type btnContainerProps = JSX.HTMLAttributes<HTMLDivElement> & {
    mode: 'dark' | 'light'
  };

  const ButtonContainer = styled('div')((props: btnContainerProps) => `
    padding: 24px 20px;
    width: 100%;
    
    background: ${props.mode == 'dark' ? '#080808' : '#ffffff'};
    border: 1px solid ${props.mode == 'dark' ? 'rgba(256,256,256,0.14)' : 'rgb(196,196,196)'};
    border-radius: 6px;
    
    margin-bottom: 12px;
  `);

  const playGroundAreaRender = () => {
    if (playgroundArea() == 'buttons') {
      return(
        <>
          <Flex flexDirection={"column"}>
            <h4>
              Component Backgrounds
            </h4>
            <Flex flexDirection={"column"} gap={6} style={{
              width: '100%',
              "margin-bottom": '6px'
            }}>
              <p>
                Dark Mode
              </p>
              <ButtonContainer mode={"dark"}>
                <Flex>
                  <ButtonListComponent mode={"dark"} baseColor={800} baseBgColor={200}/>
                </Flex>
              </ButtonContainer>
              <p>
                Light Mode
              </p>
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
            <Flex flexDirection={"column"} gap={6} style={{
              width: '100%',
              "margin-bottom": '6px'
            }}>
              <p>
                Dark Mode
              </p>
              <ButtonContainer mode={"dark"}>
                <Flex>
                  <ButtonListComponent mode={"dark"} baseColor={800} baseBgColor={600} APCAText={true}/>
                </Flex>
              </ButtonContainer>
              <p>
                Light Mode
              </p>
              <ButtonContainer mode={"light"}>
                <Flex>
                  <ButtonListComponent mode={"light"} baseColor={800} baseBgColor={600} APCAText={true}/>
                </Flex>
              </ButtonContainer>
            </Flex>
          </Flex>

          <Flex flexDirection={"column"}>
            <h4>
              Component Transparent Backgrounds
            </h4>
            <Flex flexDirection={"column"} gap={6} style={{
              width: '100%',
              "margin-bottom": '6px'
            }}>
              <p>
                Dark Mode
              </p>
              <ButtonContainer mode={"dark"}>
                <Flex>
                  <ButtonListComponent mode={"dark"} baseColor={600} baseBgColor={200} transparent={true}/>
                </Flex>
              </ButtonContainer>
              <p>
                Light Mode
              </p>
              <ButtonContainer mode={"light"}>
                <Flex>
                  <ButtonListComponent mode={"light"} baseColor={600} baseBgColor={200} transparent={true}/>
                </Flex>
              </ButtonContainer>
            </Flex>
          </Flex>

          <Flex flexDirection={"column"}>
            <h4>
              Component Backgrounds with Border
            </h4>
            <Flex flexDirection={"column"} gap={6} style={{
              width: '100%',
              "margin-bottom": '6px'
            }}>
              <p>
                Dark Mode
              </p>
              <ButtonContainer mode={"dark"}>
                <Flex>
                  <ButtonListComponent mode={"dark"} baseColor={800} baseBgColor={200} border={true}/>
                </Flex>
              </ButtonContainer>
              <p>
                Light Mode
              </p>
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
            <Flex flexDirection={"column"} gap={6} style={{
              width: '100%',
              "margin-bottom": '6px'
            }}>
              <p>
                Dark Mode
              </p>
              <ButtonContainer mode={"dark"}>
                <Flex>
                  <ButtonListComponent mode={"dark"} baseColor={800} baseBgColor={600} border={true} APCAText={true}/>
                </Flex>
              </ButtonContainer>
              <p>
                Light Mode
              </p>
              <ButtonContainer mode={"light"}>
                <Flex>
                  <ButtonListComponent mode={"light"} baseColor={800} baseBgColor={600} border={true} APCAText={true}/>
                </Flex>
              </ButtonContainer>
            </Flex>
          </Flex>

          <Flex flexDirection={"column"}>
            <h4>
              Component Transparent Backgrounds with Border
            </h4>
            <Flex flexDirection={"column"} gap={6} style={{
              width: '100%',
              "margin-bottom": '6px'
            }}>
              <p>
                Dark Mode
              </p>
              <ButtonContainer mode={"dark"}>
                <Flex>
                  <ButtonListComponent mode={"dark"} baseColor={600} baseBgColor={200} border={true} transparent={true}/>
                </Flex>
              </ButtonContainer>
              <p>
                Light Mode
              </p>
              <ButtonContainer mode={"light"}>
                <Flex>
                  <ButtonListComponent mode={"light"} baseColor={600} baseBgColor={200} border={true} transparent={true}/>
                </Flex>
              </ButtonContainer>
            </Flex>
          </Flex>

          <Flex flexDirection={"column"}>
            <h4>
              Component Backgrounds with Strict Border
            </h4>
            <Flex flexDirection={"column"} gap={6} style={{
              width: '100%',
              "margin-bottom": '6px'
            }}>
              <p>
                Dark Mode
              </p>
              <ButtonContainer mode={"dark"}>
                <Flex>
                  <ButtonListComponent mode={"dark"} baseColor={800} baseBgColor={200} border={true} strictBorder={true}/>
                </Flex>
              </ButtonContainer>
              <p>
                Light Mode
              </p>
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
            <Flex flexDirection={"column"} gap={6} style={{
              width: '100%',
              "margin-bottom": '6px'
            }}>
              <p>
                Dark Mode
              </p>
              <ButtonContainer mode={"dark"}>
                <Flex>
                  <ButtonListComponent mode={"dark"} baseColor={800} baseBgColor={600} border={true} strictBorder={true} APCAText={true}/>
                </Flex>
              </ButtonContainer>
              <p>
                Light Mode
              </p>
              <ButtonContainer mode={"light"}>
                <Flex>
                  <ButtonListComponent mode={"light"} baseColor={800} baseBgColor={600} border={true} strictBorder={true} APCAText={true}/>
                </Flex>
              </ButtonContainer>
            </Flex>
          </Flex>
        </>
      )
    } else if (playgroundArea() == 'menus') {
      return(
        <>
          <Flex flexDirection={"column"}>
            <h4>
              Active and Clickable Component
            </h4>
            <Flex flexDirection={"column"} gap={6} style={{
              width: '100%',
              "margin-bottom": '6px'
            }}>
              <p>
                Dark Mode
              </p>
              <ButtonContainer mode={"dark"}>
                <Flex>
                  <MenuListcomponent mode={"dark"}/>
                </Flex>
              </ButtonContainer>
              <p>
                Light Mode
              </p>
              <ButtonContainer mode={"light"}>
                <Flex>
                  <MenuListcomponent mode={"light"}/>
                </Flex>
              </ButtonContainer>
            </Flex>
          </Flex>

          <Flex flexDirection={"column"}>
            <h4>
              Active and Clickable Component with Highlighted Content
            </h4>
            <Flex flexDirection={"column"} gap={6} style={{
              width: '100%',
              "margin-bottom": '6px'
            }}>
              <p>
                Dark Mode
              </p>
              <ButtonContainer mode={"dark"}>
                <Flex>
                  <MenuListcomponent mode={"dark"} highlight/>
                </Flex>
              </ButtonContainer>
              <p>
                Light Mode
              </p>
              <ButtonContainer mode={"light"}>
                <Flex>
                  <MenuListcomponent mode={"light"} highlight/>
                </Flex>
              </ButtonContainer>
            </Flex>
          </Flex>

          <Flex flexDirection={"column"}>
            <h4>
              Active and Clickable Component Solid
            </h4>
            <Flex flexDirection={"column"} gap={6} style={{
              width: '100%',
              "margin-bottom": '6px'
            }}>
              <p>
                Dark Mode
              </p>
              <ButtonContainer mode={"dark"}>
                <Flex>
                  <MenuListcomponent mode={"dark"} solid/>
                </Flex>
              </ButtonContainer>
              <p>
                Light Mode
              </p>
              <ButtonContainer mode={"light"}>
                <Flex>
                  <MenuListcomponent mode={"light"} solid/>
                </Flex>
              </ButtonContainer>
            </Flex>
          </Flex>

          <Flex flexDirection={"column"}>
            <h4>
              Active and Clickable Component with Highlighted Content Solid
            </h4>
            <Flex flexDirection={"column"} gap={6} style={{
              width: '100%',
              "margin-bottom": '6px'
            }}>
              <p>
                Dark Mode
              </p>
              <ButtonContainer mode={"dark"}>
                <Flex>
                  <MenuListcomponent mode={"dark"} highlight solid/>
                </Flex>
              </ButtonContainer>
              <p>
                Light Mode
              </p>
              <ButtonContainer mode={"light"}>
                <Flex>
                  <MenuListcomponent mode={"light"} highlight solid/>
                </Flex>
              </ButtonContainer>
            </Flex>
          </Flex>
        </>
      )
    }
  }

  return(
    <>
      <h3>
        Color Testing Playground
      </h3>
      <Flex flexDirection="row" gap={8} style={{
        margin: '0 0 24px -2px'
      }}>
        <p style={{
          'padding': '18px 0 0 0'
        }}>
          Playground Elements:
        </p>
        <Select value={playgroundArea()} onChange={updatePlayGroundArea}>
          <option value={'buttons'} selected>
            Buttons
          </option>
          <option value={'menus'}>
            Menus
          </option>
        </Select>
      </Flex>

        {playGroundAreaRender()}

      <br/>
    </>
  )

}

export default Playground;
