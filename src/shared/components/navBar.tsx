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
    align-items: center;

    img {
      height: 20px;
      width: auto;
    }

    p {
      padding-left: 6px;
      vertical-align: text-bottom;
      a{
        color: white !important;
      }
    }
  `

  return(
    <>
      <NavigationBar>
        <Container style={{
            padding: `18px 18px 16px 18px`,
            display: `flex`,
            "align-items": `center`,
            
        }}>
          <img src="src/assets/images/ambient_logo_white.png"/>
          <p>
            by <a href="https://kevintyj.com">Kevin (Taeyoon) Jin</a>
          </p>
        </Container>
      </NavigationBar>
    </>
  )

}

export default NavBar;