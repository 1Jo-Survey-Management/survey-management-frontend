import * as React from "react";
import SurveyMain from "../survey/Main";
import LoginDisplay from "../login/LoginDisplay";
import Mypage from "../survey/Mypage";
import CreationSurvey from "../survey/creation/routers/CreateationSurvey";

export const pathInfo: { [key: string]: string[] }[] = [{ survey: ["main"] }];

export const routeInfo = (path: string): React.ReactNode => {
  switch (path) {
    case "/survey/main":
      return <SurveyMain />;
    case "/login/LoginDisplay":
      return <LoginDisplay />;
    case "/survey/Mypage":
      return <Mypage />;
    case "/survey/register":
      return <CreationSurvey />;
    default:
      return <LoginDisplay />;
  }
};
