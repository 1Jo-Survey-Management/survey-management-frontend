import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './modules/layout/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Layout />} />
        {/* 다른 라우트에 대한 설정 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
