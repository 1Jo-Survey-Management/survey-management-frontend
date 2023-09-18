import * as React from 'react';
import SurveyMain from '../survey/main/Main';
import LoginDisplay from '../login/LoginDisplay';
import Mypage from '../survey/MypageUserModify';
import MypageParty from '../survey/MypagePartySurvey';
import MypageWrite from '../survey/MypageWriteSurvey';
import Search from '../survey/main/Search';

export const pathInfo: { [key: string]: string[] }[] = [{ survey: ['main'] }];

export function routeInfo(path: string) {
  switch (path) {
    case '/survey/main':
      return <SurveyMain />;
    case '/login/LoginDisplay':
      return <LoginDisplay />;
    case '/survey/Search':
      return <Search />;
    case '/survey/MypageWrite':
      return <MypageWrite />;
    case '/survey/MypageParty':
      return <MypageParty />;
    case '/survey/Mypage':
      return <Mypage />;
    default:
      return <LoginDisplay />;
  }
}
