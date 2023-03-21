import React, { useState, lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import { initializeApp } from "firebase";
import { Provider } from "react-redux";
import RedirectForApp from "./components/Redirect/RedirectForApp";
import HomePageSkeleton from "./skeleton/HomePageSkeleton";
import { positions, Provider as ReactAlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import store from "./store";
import { auto } from "./store/auth/action";
import ErrorBoundary from "./ErrorBoundary";

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      height: "90vh",
    }}>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const HomePage = lazy(() => import("./pages/Home/index"));

const Registration = lazy(() => import("Registration/Registration"));

function handelRightClick(event) {
  event.preventDefault();
}

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
              exact
              path="/"
              component={() => (
                <Suspense fallback={<HomePageSkeleton />}>
                  <HomePage />
                </Suspense>
              )}
            />
            <Route
              path="/signup"
              component={() => (
                <RemoteWrapper>
                  <Registration />
                </RemoteWrapper>
              )}
            />
          </Switch>
        </BrowserRouter>
      </ReactAlertProvider>
    </Provider>
  );
}

export default App;
