import * as React from 'react';
import SurveyMain from '../survey/main/Main';
import LoginDisplay from '../login/LoginDisplay';
import Mypage from '../survey/Mypage';
import Search from '../survey/main/Search';

export const pathInfo: { [key: string]: string[] }[] = [{ survey: ['main'] }];

export function routeInfo(path: string) {
  switch (path) {
    case '/survey/main':
      return <SurveyMain />;
    case '/login/LoginDisplay':
      return <LoginDisplay />;
    case '/survey/Mypage':
      return <Mypage />;
    case '/survey/Search':
      return <Search />;
    default:
      return <LoginDisplay />;
  }
}
