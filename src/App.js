import React, { Component } from "react";
import { Navbar, NavItem } from "react-materialize";

import TodoApp from "./components/TodoApp";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoApp />
      </div>
    );
  }
}

export default App;
