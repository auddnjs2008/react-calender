import React from "react";
import {HashRouter as Router, Route} from "react-router-dom";
import Home from "../routes/Home";
import Detail from "../routes/Detail";
import GlobalStyles from "../components/GlobalStyles";
function App() {
  return (
    <>
    <Router>
      <Route path="/" exact component={Home}/>
      <Route path="/:id" component={Detail}/>
    </Router>
    <GlobalStyles/>
    </>
  );
}

export default App;
