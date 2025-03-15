import React from "react";
import { Routes, Route } from "react-router-dom";
import { PATH } from "../configs";

import Template1 from "../layouts/template1/template1";
import AuthRoutes from "./auth-routes";
import GuestRoute from "./guest-routes";
import Spinner from "../components/Spinner";

// pages
const Login = React.lazy(() => import('../pages/login'));
const Register = React.lazy(() => import('../pages/register'));
const Dashboard = React.lazy(() => import('../pages/dashboard').then(module => ({ default: module.Dashboard })));
const LandingPage = React.lazy(() => import('../pages/landing-page').then(module => ({ default: module.LandingPage })));
const ListUser = React.lazy(() => import('../pages/user').then(module => ({ default: module.ListUser })));
const ShowUser = React.lazy(() => import('../pages/user').then(module => ({ default: module.ShowUser })));
const CreateUser = React.lazy(() => import('../pages/user').then(module => ({ default: module.CreateUser })));
const EditUser = React.lazy(() => import('../pages/user').then(module => ({ default: module.EditUser })));

const NotFound = React.lazy(() => import('../pages/other-pages').then(module => ({ default: module.NotFound })));

const routesConfig = [
  {
    path: PATH.LOGIN,
    component: Login,
    guard: GuestRoute,
  },
  {
    path: PATH.REGISTGER,
    component: Register,
    guard: GuestRoute,
  },
  {
    path: PATH.ROOT,
    component: Dashboard,
    layout: Template1,
    guard: AuthRoutes
  },
  {
    path: PATH.LANDING_PAGE,
    component: LandingPage,
  },
  {
    path: PATH.USER_SHOW,
    component: ShowUser,
    layout: Template1,
    guard: AuthRoutes
  },
  {
    path: PATH.USER_CREATE,
    component: CreateUser,
    layout: Template1,
    guard: AuthRoutes
  },
  {
    path: PATH.USER_LIST,
    component: ListUser,
    layout: Template1,
    guard: AuthRoutes
  },
  {
    path: PATH.USER_EDIT,
    component: EditUser,
    layout: Template1,
    guard: AuthRoutes
  },
]

function renderRoutes() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <Routes>
        {routesConfig.map((route) => {
          const Component = route.component || React.Fragment;
          const Layout = route?.layout || React.Fragment;
          const Guard = route?.guard || React.Fragment;
          return (
            <Route 
              key={route.path} 
              path={route.path} 
              element={
                <Guard>
                  <Layout>
                      <Component />
                  </Layout>
                </Guard>
              } 
            />
          )
        })}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
   
  )
}


export const RoutersMain = () => {
  return renderRoutes()
}