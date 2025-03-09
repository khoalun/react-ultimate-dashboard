import React from "react";
import { Routes, Route } from "react-router-dom";
import { PATH } from "../configs";

import Template1 from "../layouts/template1/template1";

// pages
const Login = React.lazy(() => import('../pages/login'));
// const Register = React.lazy(() => import('../pages/register').then(module => ({ default: module.Register })));
const Register = React.lazy(() => import('../pages/register'));
const Dashboard = React.lazy(() => import('../pages/dashboard').then(module => ({ default: module.Dashboard })));

export const RoutersMain = () => {
  return  (
    <Routes>
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTGER} element={<Register />} />
      <Route path={PATH.ROOT} element={<Template1><Dashboard /></Template1>} />
    </Routes>
  )
}