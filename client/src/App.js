import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import PricePage from "./pages/PricePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WalletPage from "./pages/WalletPage";
import AcademyPage from "./pages/AcademyPage";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/products">
            <ProductPage />
          </Route>
          <Route path="/prices">
            <PricePage />
          </Route>
          <Route path="/wallet">
            <WalletPage />
          </Route>
          <Route path="/academy">
            <AcademyPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default App;
