import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Layout from './modules/layout/Layout';
import ModifySurvey from './modules/survey/modify/routers/ModifySurvey';
import CreateationSurvey from './modules/survey/creation/routers/CreateationSurvey';
import LoginDisplay from './modules/login/LoginDisplay';
import MypageWriteSurvey from './modules/survey/MypageWriteSurvey';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/survey/register" element={<CreateationSurvey />} />
          <Route path="/survey/modify/:surveyNo" element={<ModifySurvey />} />
          {/**
           * FIXME: redirect mypage 내가 작성한 설문 페이지로 변경 예정
           */}
          <Route path="/survey/modify" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginDisplay />} />
          <Route path="/survey/mypage" element={<MypageWriteSurvey />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
