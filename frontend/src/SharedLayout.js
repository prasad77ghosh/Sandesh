import React from "react";
import { Outlet, Routes } from "react-router-dom";
const SharedLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default SharedLayout;
