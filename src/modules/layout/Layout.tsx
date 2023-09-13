import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

export default function Layout() {
  // 컴포넌트 이름은 대문자로 시작
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Body />
      {/* <Footer /> */}
    </React.Fragment>
  );
}
