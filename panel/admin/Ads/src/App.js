import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import ErrorBoundary from "./ErrorBoundary";
import { auto } from "./store/auth/action";
import { Layout } from "./components";
import { Spinner } from "./shared";
import store from "./store";
import { decodeToken } from "./shared/functions/Token";

const Sponsors = lazy(() => import("./pages/Sponsors"));

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
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
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
                      {decodeToken()?.type === "admin" ||
                      decodeToken()?.type === "ads" ? (
                        <Sponsors />
                      ) : (
                        " "
                      )}
                    </Suspense>
                  )}
                />
              </Switch>
            </Layout>
          </Switch>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
