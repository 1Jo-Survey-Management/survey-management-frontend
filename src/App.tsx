import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  // Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material';
import Layout from './modules/layout/Layout';
import ModifySurvey from './modules/survey/modify/routers/ModifySurvey';
import CreateationSurvey from './modules/survey/creation/routers/CreateationSurvey';
import LoginDisplay from './modules/login/LoginDisplay';
import MypageWriteSurvey from './modules/survey/mypage/components/MypageWriteSurvey';
import MypageAttendSurvey from './modules/survey/mypage/components/MypageAttendSurvey';
import StatisticsPage from './modules/survey/statistic/StatisticsPage';
import Main from './modules/survey/main/Main';
import Search from './modules/survey/main/Search';
import AttendSurvey from './modules/survey/attend/routers/AttendSurvey';
import axios from './modules/login/components/customApi';
import MypageUserModify from './modules/survey/mypage/components/MypageUserModify';

function App() {
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }, []);

  const GlobalStyle = createGlobalStyle`
    @import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');

    /* Add any other global styles if needed */
    body {
      font-family: "NanumSquare", "Arial", sans-serif;
      margin: 0;
      padding: 0;
    }
  `;

  const Theme = createTheme({
    typography: {
      fontFamily: 'nanumsquare',
    },
  });

  return (
    <Router>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <Routes>
          <Route path="/" element={<LoginDisplay />} />
          <Route element={<Layout />}>
            <Route path="/survey/register" element={<CreateationSurvey />} />
            <Route path="/survey/modify/:surveyNo" element={<ModifySurvey />} />
            <Route path="/login/LoginDisplay" element={<LoginDisplay />} />
            <Route path="/survey/statistics" element={<StatisticsPage />} />
            <Route
              path="/survey/statistics/:surveyNo"
              element={<StatisticsPage />}
            />
            <Route path="/survey/main" element={<Main />} />
            {/* <Route path="/survey/modify" element={<Navigate to="/login" />} /> */}
            <Route path="/login" element={<LoginDisplay />} />
            {/* <Route path="/survey/mypage" element={<MypageWriteSurvey />} /> */}
            <Route path="/survey/search" element={<Search />} />
            <Route
              path="/survey/mypage/write"
              element={<MypageWriteSurvey />}
            />
            <Route
              path="/survey/mypage/attend"
              element={<MypageAttendSurvey />}
            />
            <Route path="/survey/attend/:surveyNo" element={<AttendSurvey />} />
            <Route
              path="/survey/mypageUserModify"
              element={<MypageUserModify />}
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
