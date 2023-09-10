// Mypage.tsx
import React from 'react';
import Container from '@mui/material/Container';
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { pathInfo, routeInfo } from "../route/routeInfo"
import { Button } from '@mui/material';

const Mypage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const goBack = () => {
      
      console.log("nono");
      navigate('/survey/main'); 
    
    };


  return (
    <Container maxWidth="md">
      <h1>This is mypage</h1>

      <Button onClick={goBack}>돌아가기</Button>

    </Container>
  );
};

export default Mypage;
