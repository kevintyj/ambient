import { NavLink } from "solid-app-router";
import { Component } from "solid-js";
import { styled } from "solid-styled-components";
import { Container } from "../styles/components/container.styled";
import imgUrl from '../../assets/images/ambient_logo_transparent_new.png';

const Footer: Component = () => {

  const FooterBar = styled('nav')`
    width: 100vw;
    margin-top: auto;
    background-color: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(5px) !important;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-bottom: 0;
    display: flex;
    align-items: center;
    align-self: center;

    img {
      height: 20px;
      width: auto;
      margin-bottom: -4px;
    }

    a{
        color: white !important;
    }
  `

  return(
    <>
      <FooterBar>
        <Container style={{
            padding: `21px 18px 21px 18px`,
            display: `flex`,
            "flex-direction": 'column',
            "align-items": `center`,
            "gap": `4px`
        }}>
          <a href="/"><img src={imgUrl}/></a>
          <p>
            Built with <a href="http://solidjs.com">Solidjs</a>, 
            with the help of <a href="https://vis4.net/chromajs/">Chromajs</a>, 
            <a href="https://felte.dev">Felte</a>, 
            <a href="https://icons.getbootstrap.com">Bootstrap Icons</a>, 
            and <a href="https://github.com/Myndex/SAPC-APCA">WCAG APCA</a>
          </p>
        </Container>
      </FooterBar>
    </>
  )

}

export default Footer;