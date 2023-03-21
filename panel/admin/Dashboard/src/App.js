import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import { auto } from "./store/auth/action";
import { Layout } from "./components";
import { Spinner } from "./shared";
import store from "./store";
import { decodeToken } from "./shared/functions/Token";
import ErrorBoundary from "./ErrorBoundary";

const Dashboard = lazy(() => import("./pages/Dashboard"));
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
          <Route
            exact
            path="/"
            component={() => <Redirect to="/dashboard" />}
          />
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
                    decodeToken()?.type === "dashboard" ? (
                      <Dashboard />
                    ) : (
                      ""
                    )}
                  </Suspense>
                )}
              />
            </Switch>
          </Layout>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
