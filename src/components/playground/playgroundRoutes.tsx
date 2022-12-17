import { Route } from "@solidjs/router";
import { Component, lazy } from "solid-js";
import TesterPage from "./pages/testerPage";
const PlaygroundPage = lazy (() => import("../../pages/playgroundPage"));
const buttonPlaygroundPage  = lazy(() => import("./pages/buttonPlaygroundPage"));
const IntroPlaygroundPage  = lazy(() => import("./pages/introPlaygroundPage"));
const DocumentationSamplePage = lazy (() => import("./pages/documentationSamplePage"));

const PlaygroundRoutes: Component = () => {
  return (
    <>
      <Route path="/playground" component={PlaygroundPage}>
        <Route path="/intro" component={IntroPlaygroundPage}/>
        <Route path="/buttons" component={buttonPlaygroundPage}/>

        <Route path="/documentation" component={DocumentationSamplePage}/>
        <Route path="/test" component={TesterPage}/>
      </Route>
    </>
  )
}

export default PlaygroundRoutes