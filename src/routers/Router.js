import React from 'react';
import { Route, Routes as Router, Outlet } from 'react-router-dom';
import { authLayoutRoutes, commonLayoutRoutes } from '.';
import CommonLayout from '../components/layouts/CommonLayout';
import AuthLayout from '../components/layouts/AuthLayout';

const initRoutes = (Layout, routes) =>
  routes.map(({ name, path, element, children }, index) => (
    <Route
      key={index}
      path={path}
      element={
        <Layout>
          <Outlet />
        </Layout>
      }
    >
      {children &&
        children.map(child => <Route key={index} path={`${child.path}`} element={<child.element></child.element>} />)}
    </Route>
  ));

const Routers = () => {
  return (
    <Router>
      {initRoutes(CommonLayout, commonLayoutRoutes)}
      {initRoutes(AuthLayout, authLayoutRoutes)}
      <Route path="/*" element={<div>404</div>} />
    </Router>
  );
};

export default Routers;
