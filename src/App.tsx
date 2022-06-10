import {Component, lazy} from 'solid-js';
import GlobalStyles from "./shared/styles/base/global.styled";
import ColorSelector from "./shared/components/colorSelector";
import NavBar from './shared/components/navBar';
import Introduction from './pages/introduction';
import Toast from './shared/components/toast';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ColorListPage from './pages/colorListPage';
import { Route, Routes } from 'solid-app-router';
import { styled } from 'solid-styled-components';
import { Container } from './shared/styles/components/container.styled';


// Lazy loaded
const Documentation = lazy(() => import('./pages/documentation'));

const App: Component = () => {

  const Page = styled('div')`
    padding: 70px 16px 20px 16px;
  `



  return (
    <>
      <GlobalStyles/>

      <NavBar/>

      <Routes>
        <Route path="/" element={
          <Container>
          <Page>
              <Introduction/>
    
              <Toast showExit={false} box={'#131313'}>
                Palette Copied!
              </Toast>

              <ColorSelector/>

              <ColorListPage/>
          </Page>
          </Container>
        } />
        <Route path="/doc" element={
          <Container>
            <Page>
              <Documentation/>
            </Page>
          </Container>
        } />
      </Routes>
    </>
  );
};

export default App;
