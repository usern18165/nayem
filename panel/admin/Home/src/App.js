import React, { lazy, Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import store from "./store";
import { Layout } from "./components";

import Spinner from "./shared/Spinner/index";
import ErrorBoundary from "./ErrorBoundary";
import { decodeToken } from "./shared/functions/Token";
import { auto } from "./store/auth/action";
const Home = lazy(() => import("./pages/Home"));

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      height: "90vh",
    }}>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

// Other page Component
const AppLogin = lazy(() => import("Login/Login"));
const AppDashboard = lazy(() => import("Dashboard/Dashboard"));
const AppNotice = lazy(() => import("Notice/Notice"));
const AppAds = lazy(() => import("Ads/Ads"));
const AppMail = lazy(() => import("Mail/Mail"));
const AppChat = lazy(() => import("Chat/Chat"));
const AppReport = lazy(() => import("Report/Report"));
const AppRecycle = lazy(() => import("Recycle/Recycle"));
const AppManagement = lazy(() => import("Management/Management"));
const AppNotes = lazy(() => import("Notes/Notes"));
const AppRestrictions = lazy(() => import("Restrictions/Restrictions"));
const AppAddRate = lazy(() => import("AddRate/AddRate"));
const AppCampaigns = lazy(() => import("Campaigns/Campaigns"));

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
            component={() => (
              <Suspense fallback={<Spinner height={100} />}>
                <Home />
              </Suspense>
            )}
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
                path="/dashboard"
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    {decodeToken()?.type === "admin" ||
                    decodeToken()?.type === "dashboard" ? (
                      <RemoteWrapper>
                        <AppDashboard />
                      </RemoteWrapper>
                    ) : (
                      ""
                    )}
                  </Suspense>
                )}
              />
              <Route
                path="/notices"
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    {decodeToken()?.type === "admin" ||
                    decodeToken()?.type === "notice" ? (
                      <RemoteWrapper>
                        <AppNotice />
                      </RemoteWrapper>
                    ) : (
                      ""
                    )}
                  </Suspense>
                )}
              />
              <Route
                path="/ads"
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    {decodeToken()?.type === "admin" ||
                    decodeToken()?.type === "ads" ? (
                      <RemoteWrapper>
                        <AppAds />
                      </RemoteWrapper>
                    ) : (
                      ""
                    )}
                  </Suspense>
                )}
              />
              <Route
                path="/mails"
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    {decodeToken()?.type === "admin" ||
                    decodeToken()?.type === "mail" ? (
                      <RemoteWrapper>
                        <AppMail />
                      </RemoteWrapper>
                    ) : (
                      ""
                    )}
                  </Suspense>
                )}
              />
              <Route
                path="/chats"
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    {decodeToken()?.type === "admin" ||
                    decodeToken()?.type === "modarator" ? (
                      <RemoteWrapper>
                        <AppChat />
                      </RemoteWrapper>
                    ) : (
                      ""
                    )}
                  </Suspense>
                )}
              />
              <Route
                path="/reports"
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    {decodeToken()?.type === "admin" ||
                    decodeToken()?.type === "report" ? (
                      <RemoteWrapper>
                        <AppReport />
                      </RemoteWrapper>
                    ) : (
                      ""
                    )}
                  </Suspense>
                )}
              />
              <Route
                path="/recycles"
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    {decodeToken()?.type === "admin" ||
                    decodeToken()?.type === "recycle" ? (
                      <RemoteWrapper>
                        <AppRecycle />
                      </RemoteWrapper>
                    ) : (
                      ""
                    )}
                  </Suspense>
                )}
              />
              <Route
                path="/management"
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    {decodeToken()?.type === "admin" ? (
                      <RemoteWrapper>
                        {" "}
                        <AppManagement />{" "}
                      </RemoteWrapper>
                    ) : (
                      ""
                    )}
                  </Suspense>
                )}
              />
              <Route
                path="/notes"
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    {decodeToken()?.type === "admin" ||
                    decodeToken()?.type === "notes" ? (
                      <RemoteWrapper>
                        <AppNotes />
                      </RemoteWrapper>
                    ) : (
                      ""
                    )}
                  </Suspense>
                )}
              />
              <Route
                path="/restricted"
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    {decodeToken()?.type === "admin" ||
                    decodeToken()?.type === "restrictions" ? (
                      <RemoteWrapper>
                        <AppRestrictions />
                      </RemoteWrapper>
                    ) : (
                      ""
                    )}
                  </Suspense>
                )}
              />
              <Route
                path="/adds-rate"
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    {decodeToken()?.type === "admin" ||
                    decodeToken()?.type === "adsRate" ? (
                      <RemoteWrapper>
                        <AppAddRate />
                      </RemoteWrapper>
                    ) : (
                      ""
                    )}
                  </Suspense>
                )}
              />
              <Route
                path="/campaign"
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    {decodeToken()?.type === "admin" ||
                    decodeToken()?.type === "adsRate" ? (
                      <RemoteWrapper>
                        <AppCampaigns />
                      </RemoteWrapper>
                    ) : (
                      ""
                    )}
                  </Suspense>
                )}
              />
              <Route>
                <Redirect to="/" />
              </Route>
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
