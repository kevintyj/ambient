import {Component, lazy} from 'solid-js';
import GlobalStyles from "./shared/styles/base/global.styled";
import NavBar from './shared/components/navBar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Route, Routes } from 'solid-app-router';
import { styled } from 'solid-styled-components';
import { Container } from './shared/styles/components/container.styled';
import { Toaster } from 'solid-toast';
import Footer from './shared/components/footer';
import { Flex } from './shared/styles/components/flex.styled';
import Playground from "./pages/playground";


// Lazy loaded
const Documentation = lazy(() => import('./pages/documentation'));
const Home = lazy(() => import('./pages/home'))

const App: Component = () => {

  const Page = styled('div')`
    padding: 70px 16px 20px 16px;
  `

  return (
    <Flex flexDirection={'column'}>
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
              <Home/>
            </Page>
          </Container>
        } />
        <Route path="/playground" element={
          <Container>
            <Page>
              <Playground/>
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

      <Footer/>
    </Flex>
  );
};

export default App;
