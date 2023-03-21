import React, { useState, lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import { initializeApp } from "firebase";
import { Provider } from "react-redux";
import RedirectForApp from "./components/Redirect/RedirectForApp";
import { positions, Provider as ReactAlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import store from "./store";
import { Layout } from "./components";
import { auto } from "./store/auth/action";
import { Spinner } from "./shared";
import HomePageSkeleton from "./skeleton/HomePageSkeleton";

const HomePage = lazy(() => import("./pages/Home/index"));
const Profile = lazy(() => import("./pages/Profile"));

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
    <>
      <h2>Hello</h2>
      {/* <Provider store={store}>
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
            <Layout>
              <Switch>
                <Route
                  path="/:username"
                  component={() => (
                    <Suspense fallback={<Spinner height={100} />}>
                      <Profile />
                    </Suspense>
                  )}
                />
              </Switch>
            </Layout>
          </Switch>
        </BrowserRouter>
      </ReactAlertProvider>
    </Provider> */}
    </>
  );
}

export default App;
