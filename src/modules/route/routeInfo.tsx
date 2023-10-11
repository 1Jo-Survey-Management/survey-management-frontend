import * as React from 'react';
import SurveyMain from '../survey/Main';
import LoginDisplay from '../login/LoginDisplay';
import Mypage from '../survey/Mypage';
// import CreationSurvey from '../survey/creation/routers/CreateationSurvey';

/**
 * 각 페이지에 대한 라우팅 경로 설정입니다
 * @author 김선규
 * @param path
 * @returns
 */
export const routeInfo = (path: string) => {
  console.log('라우트인포');

  switch (path) {
    case '/survey/main':
      return <SurveyMain />;
    case '/login/LoginDisplay':
      return <LoginDisplay />;
    case '/survey/Mypage':
      return <Mypage />;
    // case '/survey/register':
    //   return <CreationSurvey />;

    default:
      return <LoginDisplay />;
  }
};
