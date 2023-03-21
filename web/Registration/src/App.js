import React, { useState, lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import { initializeApp } from "firebase";
import { Provider } from "react-redux";
import RedirectForApp from "./components/Redirect/RedirectForApp";
import RegisterPageSkeleton from "./skeleton/RegisterPage/RegisterPageSkeleton";
import { positions, Provider as ReactAlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import store from "./store";
import { auto } from "./store/auth/action";

const Signup = lazy(() => import("./pages/Registration"));

function handelRightClick(event) {
  event.preventDefault();
}

// "file-loader": "^6.2.0",
//     "source-map-loader": "^4.0.1"

function App() {
  useEffect(() => {
    // initializeApp(firebaseConfig);
    store.dispatch(auto());

    console.log("something  something ->");
  }, []);

  document.addEventListener("contextmenu", handelRightClick);

  const reactAlertOptions = {
    timeout: 5000,
    position: positions.TOP_RIGHT,
  };
  return (
    <Provider store={store}>
      <ReactAlertProvider template={AlertTemplate} {...reactAlertOptions}>
        <BrowserRouter>
          <RedirectForApp />
          <Switch>
            <Route
              path="/"
              component={() => (
                <Suspense fallback={<RegisterPageSkeleton />}>
                  <Signup />
                </Suspense>
              )}
            />
          </Switch>
        </BrowserRouter>
      </ReactAlertProvider>
    </Provider>
  );
}

export default App;
