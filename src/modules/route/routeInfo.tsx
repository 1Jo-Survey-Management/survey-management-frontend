import * as React from 'react';
import Main from '../survey/main/Main';
import Search from '../survey/main/Search';
import LoginDisplay from '../login/LoginDisplay';
import Mypage from '../survey/mypage/MypageUserModify';
import MypageAttend from '../survey/MypageAttendSurvey';
import AttendSurvey from '../survey/attend/routers/AttendSurvey';
import CreationSurvey from '../survey/creation/routers/CreateationSurvey';
import StatisticsPage from '../survey/statistic/StatisticsPage';

/**
 * 각 페이지에 대한 라우팅 경로 설정입니다
 * @author 김선규
 * @param path
 * @returns
 */
export const routeInfo = (path: string) => {
  switch (path) {
    case '/login/LoginDisplay':
      return <LoginDisplay />;
    case '/survey/Search':
      return <Search />;
    case '/survey/MypageAttend':
      return <MypageAttend />;
    case '/survey/Mypage':
      return <Mypage />;
    case '/survey/Attend':
      return <AttendSurvey />;
    case '/survey/register':
      return <CreationSurvey />;
    case '/survey/main':
      return <Main />;
    case '/survey/statistics':
      return <StatisticsPage />;
    default:
      return <Main />;
  }
};
