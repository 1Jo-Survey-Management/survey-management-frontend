import * as React from 'react';
import SurveyMain from '../survey/Main';
import LoginDisplay from '../login/LoginDisplay';
import Mypage from '../survey/MypageUserModify';
import MypageAttend from '../survey/MypageAttendSurvey';
import MypageWrite from '../survey/MypageWriteSurvey';
import AttendSurvey from '../survey/attend/routers/AttendSurvey';
import CreationSurvey from '../survey/creation/routers/CreateationSurvey';
import ModifySurvey from '../survey/modify/routers/ModifySurvey';

/**
 * 각 페이지에 대한 라우팅 경로 설정입니다
 * @author 김선규
 * @param path
 * @returns
 */
export const routeInfo = (path: string) => {
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
    case '/survey/Attend':
      return <AttendSurvey />;
    case '/survey/register':
      return <CreationSurvey />;
    case '/survey/modify':
      return <ModifySurvey />;
    default:
      return <LoginDisplay />;
  }
};
