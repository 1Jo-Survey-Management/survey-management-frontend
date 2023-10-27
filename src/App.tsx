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
import StatisticsPage from './modules/survey/statistic/StatisticsPage';
import Main from './modules/survey/main/Main';
import Search from './modules/survey/main/Search';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginDisplay />} />
        <Route element={<Layout />}>
          <Route path="/survey/register" element={<CreateationSurvey />} />
          <Route path="/survey/modify/:surveyNo" element={<ModifySurvey />} />
          <Route path="/login/LoginDisplay" element={<LoginDisplay />} />
          <Route
            path="/survey/statistics/:surveyNo"
            element={<StatisticsPage />}
          />
          <Route path="/survey/main" element={<Main />} />
          <Route path="/survey/modify" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginDisplay />} />
          <Route path="/survey/mypage" element={<MypageWriteSurvey />} />
          <Route path="/survey/search" element={<Search />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
