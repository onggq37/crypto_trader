import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NaviBar from "./components/Navibar";
import ProductPage from "./pages/ProductPage";
import PricePage from "./pages/PricePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AcademyPage from "./pages/AcademyPage";
import WalletPage from "./pages/WalletPage";
import ThemeContext from "./ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PriceShowPage from "./pages/PriceShowPage";
import TradePage from "./pages/TradePage/TradePage";

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");
  const [isAuth, setIsAuth] = useState(false);
  const [status, setStatus] = useState("Log In");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      await fetch("/api/auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("error initialising user");
          }
          return;
        })
        .then((data) => {
          setIsAuth(true);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
        });
    };
    init();
    return () => init;
  }, []);

  // This useEffect hook automatically hides the
  // success and error messages after 3s when they're shown.
  useEffect(() => {
    if (showSuccessMsg || showErrorMsg) {
      setTimeout(() => {
        setShowSuccessMsg(false);
        setShowErrorMsg(false);
      }, 3000);
    }
  }, [showSuccessMsg, showErrorMsg]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Router>
        <div className="App">
          <NaviBar
            status={status}
            setStatus={setStatus}
            setIsAuth={setIsAuth}
            btnDisable={btnDisable}
            setBtnDisable={setBtnDisable}
            isAuth={isAuth}
          />
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
              <Route path="/price/:symbol" component={PriceShowPage} />
              <Route path="/academy">
                <AcademyPage />
              </Route>
              <Route path="/trade/:symbol" component={TradePage} />
              <Route path="/login">
                <LoginPage
                  setStatus={setStatus}
                  isAuth={isAuth}
                  setIsAuth={setIsAuth}
                  showErrorMsg={showErrorMsg}
                  setShowErrorMsg={setShowErrorMsg}
                  btnDisable={btnDisable}
                  setBtnDisable={setBtnDisable}
                />
              </Route>
              <Route path="/signup">
                <SignUpPage
                  showErrorMsg={showErrorMsg}
                  setShowErrorMsg={setShowErrorMsg}
                />
              </Route>
              {/* wallet Route only for after user login */}
              <ProtectedRoute
                path="/wallet"
                component={WalletPage}
                isAuth={isAuth}
                status={status}
                setStatus={setStatus}
              />
              <Route path="/post/:postId"></Route>
            </Switch>
          </main>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
