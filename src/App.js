import "./App.css";
import Header from "./components/header/header.component.jsx";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component.jsx";
import SignUpAndSignInPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up. component.jsx";
import { Routes, Route } from "react-router";
import { auth } from "./firebase/firebase.utils";
import React from "react";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/signin" element={<SignUpAndSignInPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
