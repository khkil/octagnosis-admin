import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  dashboardLayoutRoutes,
  authLayoutRoutes,
  presentationLayoutRoutes,
  protectedRoutes,
  inspectionRoutes,
  utilRoutes,
  groundUtilRoutes
} from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import GroundLayout from "../layouts/Ground";
import PresentationLayout from "../layouts/Presentation";
import Page404 from "../pages/auth/Page404";
import AuthGuard from "../components/AuthGuard";
import GuestGuard from "../components/GuestGuard";
import InspectionLayout from "../layouts/Inspection";
import Common from "../layouts/Common";

const childRoutes = (Layout, routes) => {
  return (
    routes.map(({ component: Component, children, path, auth, hideLayout }, index) => {
      return children ? (
        children.map((element, index) => {
          const hideLayout = Boolean(element.hideLayout && Boolean(element.hideLayout));
          return (
            <Route
              key={index}
              path={element.path}
              exact
              render={(props) => (
                auth && Boolean(auth) ? (
                  <AuthGuard path={path}>
                    {hideLayout ? 
                      <element.component {...props} /> :
                      <Layout>
                        <element.component {...props} />
                      </Layout>
                    }
                  </AuthGuard> 
                ) : (
                  hideLayout ? 
                  <element.component {...props} /> 
                  :
                  <Layout>
                    <element.component {...props} />
                  </Layout>
                )
              )}
            />
          );
        })
      ) : Component ? (
        <Route
          key={index}
          path={path}
          exact
          render={(props) => (
            auth && Boolean(auth) ? (
              <AuthGuard path={path}>
                {hideLayout && Boolean(hideLayout) ? 
                  <Component {...props} /> : 
                  <Layout>
                    <Component {...props} />
                  </Layout>}
              </AuthGuard>
            ) : (
              hideLayout && Boolean(hideLayout) ?
              <Component {...props} /> 
              :
              <Layout>
                <Component {...props} />
              </Layout>
            )
          )}
        />
      ) : null;
    })
  )
}


const Routes = () => (
  <Router>

    <Switch>
      {childRoutes(DashboardLayout, inspectionRoutes)}
      {childRoutes(AuthLayout, authLayoutRoutes)}
      {childRoutes(DashboardLayout, groundUtilRoutes)}
      {childRoutes(DashboardLayout, dashboardLayoutRoutes)}
      {childRoutes(DashboardLayout, protectedRoutes)}
      {childRoutes(DashboardLayout, presentationLayoutRoutes)}
      
      <Route
        render={() => (
          <Common>
            <Page404 />
          </Common>
        )}
        />
    </Switch>

  </Router>
);

export default Routes;
