import * as React from 'react';
import SurveyMain from '../survey/Main';
import LoginDisplay from '../login/LoginDisplay';
import Mypage from '../survey/MypageUserModify';
import MypageAttend from '../survey/MypageAttendSurvey';
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
    case '/survey/MypageAttend':
      return <MypageAttend />;
    case '/survey/Mypage':
      return <Mypage />;
    default:
      return <LoginDisplay />;
  }
};
