import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

// import { auto } from "./store/auth/action";
// import { Layout } from "./components";
import { Spinner } from "./shared";
import store from "./store";
import { auto } from "./store/auth/action";
// import { decodeToken } from "./shared/functions/Token";

const Login = lazy(() => import("./pages/Login"));

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
              path="/"
              component={() => (
                <Suspense fallback={<Spinner height={100} />}>
                  <Login />
                </Suspense>
              )}
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
