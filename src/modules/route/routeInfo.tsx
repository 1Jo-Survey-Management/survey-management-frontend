import * as React from 'react';
import SurveyMain from '../survey/main/Main';
import Search from '../survey/main/Search';
import LoginDisplay from '../login/LoginDisplay';
import Mypage from '../survey/mypage/MypageUserModify';
import MypageAttend from '../survey/MypageAttendSurvey';
// import CreationSurvey from '../survey/creation/routers/CreateationSurvey';
import StatisticsPage from '../survey/statistic/StatisticsPage';

export const pathInfo: { [key: string]: string[] }[] = [{ survey: ['main'] }];

export function routeInfo(path: string) {
  switch (path) {
    case '/survey/main':
      return <SurveyMain />;
    case '/login/LoginDisplay':
      return <LoginDisplay />;
    case '/survey/Search':
      return <Search />;
    case '/survey/MypageAttend':
      return <MypageAttend />;
    case '/survey/Mypage':
      return <Mypage />;
    // case '/survey/register':
    //   return <CreationSurvey />;
    case '/survey/statistics':
      return <StatisticsPage />;
    default:
      return <LoginDisplay />;
  }
}
