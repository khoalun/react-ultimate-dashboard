import React from "react";
import { Routes, Route } from "react-router-dom";
import { PATH, USER_ROLE } from "../configs";

import Template1 from "../layouts/template1/template1";
import AuthRoutes from "./auth-routes";
import GuestRoute from "./guest-routes";
import Spinner from "../components/Spinner";
import RoleRoutes from "./role-routes";

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
const UnauthoriedPage = React.lazy(() => import('../pages/other-pages').then(module => ({ default: module.UnauthoriedPage })));
const RestrictAccessPage = React.lazy(() => import('../pages/other-pages').then(module => ({ default: module.RestrictAccessPage })));
const Profile = React.lazy(() => import('../pages/profile').then(module => ({ default: module.Profile })));
const Calendar = React.lazy(() => import('../pages/calendar').then(module => ({ default: module.Calendar })));
/* role: RBAC (Role-Based Access Control)
page: A, B, C, D, E
method: create, update, delete, edit (CRUD)
FE
- role with page -> access page -> user A can access page A, B
- role with action -> user A can view
role: admin, member, operator
- admin: create, update, delete, view (CRUD)
- member: view
- operator: view, update, create

BE
- FE call api with access token -> get role from access token -> FE  call api delete (role = member) -> BE return access denied
*/

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
    guard: AuthRoutes,
    requireRoles: [USER_ROLE.ADMIN, USER_ROLE.OPERATOR, USER_ROLE.MEMBER]
  },
  {
    path: PATH.LANDING_PAGE,
    component: LandingPage,
  },
  {
    path: PATH.USER_SHOW,
    component: ShowUser,
    layout: Template1,
    guard: AuthRoutes,
    requireRoles: [USER_ROLE.ADMIN, USER_ROLE.OPERATOR]
  },
  {
    path: PATH.USER_CREATE,
    component: CreateUser,
    layout: Template1,
    guard: AuthRoutes,
    requireRoles: [USER_ROLE.ADMIN]
  },
  {
    path: PATH.USER_LIST,
    component: ListUser,
    layout: Template1,
    guard: AuthRoutes,
    requireRoles: [USER_ROLE.ADMIN, USER_ROLE.OPERATOR]
  },
  {
    path: PATH.USER_EDIT,
    component: EditUser,
    layout: Template1,
    guard: AuthRoutes,
    requireRoles: [USER_ROLE.ADMIN, USER_ROLE.OPERATOR]
  },
  {
    path: PATH.UNAUTHORIED_PAGE,
    component: UnauthoriedPage,
  },
  {
    path: PATH.RESTRICT_ACCESS_PAGE,
    component: RestrictAccessPage,
  },
  {
    path: PATH.PROFILE,
    component: Profile,
    layout: Template1,
    guard: AuthRoutes
  },
  {
    path: PATH.CALENDAR,
    component: Calendar,
    layout: Template1,
    guard: AuthRoutes,
    requireRoles: [USER_ROLE.ADMIN, USER_ROLE.OPERATOR]
  },
]

function renderRoutes() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <Routes>
        {routesConfig.map((route) => {
          const Component = route?.component || React.Fragment;
          const Layout = route?.layout || React.Fragment;
          const Guard = route?.guard || React.Fragment;
          const requireRoles = route?.requireRoles || [];

          return (
            <Route 
              key={route?.path} 
              path={route?.path} 
              element={
                <Guard>
                  <Layout>
                    <RoleRoutes requireRoles={requireRoles}>
                      <Component />
                    </RoleRoutes>
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