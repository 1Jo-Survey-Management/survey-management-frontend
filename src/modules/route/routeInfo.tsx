import * as React from 'react';
import SurveyMain from '../survey/Main';
import LoginDisplay from '../login/LoginDisplay';
import Mypage from '../survey/MypageUserModify';
import MypageParty from '../survey/MypagePartySurvey';
import MypageWrite from '../survey/MypageWriteSurvey';

export const pathInfo: { [key: string]: string[] }[] = [{ survey: ['main'] }];

export const routeInfo = (path: string): React.ReactNode => {
  switch (path) {
    case '/survey/main':
      return <SurveyMain />;
    case '/login/LoginDisplay':
      return <LoginDisplay />;
    case '/survey/MypageWrite':
      return <MypageWrite />;
    case '/survey/MypageParty':
      return <MypageParty />;
    case '/survey/Mypage':
      return <Mypage />;
    default:
      return <LoginDisplay />;
  }
};
