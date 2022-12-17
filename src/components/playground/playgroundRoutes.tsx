import { Route } from "@solidjs/router";
import { Component } from "solid-js";
import PlaygroundPage from "../../pages/playgroundPage";
import ComponentPlaygroundPage from "./pages/componentPlaygroundPage";

const PlaygroundRoutes: Component = () => {
  return (
    <>
      <Route path="/playground" component={PlaygroundPage}>
        <Route path="/" component={ComponentPlaygroundPage}/>
      </Route>
    </>
  )
}

export default PlaygroundRoutes