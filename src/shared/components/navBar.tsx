import {Component} from "solid-js";
import { styled } from "solid-styled-components";
import { Container } from "../styles/components/container.styled";

const NavBar: Component = () => {

  const NavigationBar = styled('nav')`
    width: 100%;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(5px) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.14);
    display: flex;

    img {
      height: 20px;
      width: auto;
    }
  `

  return(
    <>
      <NavigationBar>
        <Container style={{
            padding: `18px 18px 16px 18px`,
            display: `flex`
        }}>
          <img src="src/assets/images/ambient_logo_white.png"/>
        </Container>
      </NavigationBar>
    </>
  )

}

export default NavBar;