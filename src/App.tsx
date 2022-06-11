import {Component, lazy} from 'solid-js';
import GlobalStyles from "./shared/styles/base/global.styled";
import ColorSelector from "./components/colorSelector";
import NavBar from './shared/components/navBar';
import Introduction from './pages/introduction';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ColorListPage from './components/colorListComponent';
import { Route, Routes } from 'solid-app-router';
import { styled } from 'solid-styled-components';
import { Container } from './shared/styles/components/container.styled';
import { Toaster } from 'solid-toast';
import { ColorShades } from './shared/styles/utils/variables.styled';
import GraphList from './components/graphListComponent';


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

      <Toaster
        position='bottom-right'
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 2000
        }}
      />

      <Routes>
        <Route path="/" element={
          <Container>
          <Page>
              <Introduction/>

              <GraphList colorSwatch={ColorShades()}/>

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
