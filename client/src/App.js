import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

// Components
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import Landing from "./layout/Landing";
import Login from "./auth/Login";
import Register from "./auth/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
