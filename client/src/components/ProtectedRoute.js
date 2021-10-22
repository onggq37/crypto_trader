import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
// import CenteredModals from "../components/CenteredModals";

// Front end protected route for wallet page
const ProtectedRoute = ({ isAuth, component: Component, ...rest }) => {
  // const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          // if authenticated, return the page
          if (isAuth) {
            return <Component />;
          }
          // if not, redirect to hompage from whatever location it is called
          else {
            alert("Please Log In first to access your Wallet");
            // setShowModal(true);
          }
          return (
            <>
              {/* <CenteredModals
                show={showModal}
                onHide={() => setShowModal(false)}
              /> */}
              <Redirect
                to={{ pathname: "/", state: { from: props.location } }}
              />
            </>
          );
        }}
      />
    </>
  );
};

export default ProtectedRoute;
