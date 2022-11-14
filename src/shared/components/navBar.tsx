import { NavLink } from "solid-app-router";
import {Component} from "solid-js";
import { styled } from "solid-styled-components";
import { Container } from "../styles/components/container.styled";
import imgUrl from '../../assets/images/ambient_logo_white_new.png';


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
      height: 24px;
      width: auto;
      margin-bottom: -4px;
    }

    a{
        color: white !important;
    }

    ul {
      margin-top: -4px;
      margin-left: auto;
      overflow: visible;
      white-space:nowrap;
      li {
        display:inline-block;
      }
      a {
        font-size: 14px;
        font-weight: normal !important;
        text-decoration: none;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: black;
      }
      .active {
        font-weight: bold !important;
      }
    }

    @media only screen and (max-width: 780px) {

      img {
        height: 21px;
      }

      a {
        font-size: 12px !important;
      }
    }
  `

  return(
    <>
      <NavigationBar>
        <Container style={{
            padding: `18px 18px 14px 18px`,
            display: `flex`,
            "align-items": `center`,
            "gap": `8px`
        }}>
          <a href="/"><img src={imgUrl}/></a>
          <p>
            by <a href="https://kevintyj.com">Kevin (Taeyoon) Jin</a>
          </p>
          <ul>
            <li>
              <NavLink href="/playground">Playground</NavLink>
            </li>
            <li>
              <NavLink href="/doc">Documentation</NavLink>
            </li>
            <li>
              <NavLink href="https://github.com/kevintyj/ambient"><i class="bi bi-github"></i></NavLink>
            </li>
          </ul>
        </Container>
      </NavigationBar>
    </>
  )

}

export default NavBar;
