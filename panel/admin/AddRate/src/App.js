import React, { lazy, Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import store from "./store";
import { Layout } from "./components";

import Spinner from "./shared/Spinner/index";
import ErrorBoundary from "./ErrorBoundary";
import { decodeToken } from "./shared/functions/Token";
import { auto } from "./store/auth/action";

const AddsRate = lazy(() => import("./pages/AddsRate"));

// Other page Component
const AppLogin = lazy(() => import("Login/Login"));

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      height: "90vh",
    }}>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

function App() {
  useEffect(() => {
    store.dispatch(auto());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {/* <Route
            exact
            path="/"
            component={() => (
              <Suspense fallback={<Spinner height={100} />}>
                <h2>Mail</h2>
              </Suspense>
            )}
          /> */}
          <Route
            path="/login"
            component={() => (
              <Suspense fallback={<Spinner height={100} />}>
                <RemoteWrapper>
                  <AppLogin />
                </RemoteWrapper>
              </Suspense>
            )}
          />
          <Layout>
            <Switch>
              <Route
                path="/"
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    {" "}
                    {decodeToken()?.type === "admin" ||
                    decodeToken()?.type === "adsRate" ? (
                      <AddsRate />
                    ) : (
                      " "
                    )}
                  </Suspense>
                )}
              />
            </Switch>
          </Layout>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
