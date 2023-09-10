// LoginDisplay.tsx
import React from 'react';
import Container from '@mui/material/Container';
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { pathInfo, routeInfo } from "../route/routeInfo"
import { Button } from '@mui/material';

const LoginDisplay: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const goLogin = () => {
    
    console.log("nono");
    navigate('/survey/main'); 
  
  };

  console.log(location.pathname)
  return (
    <Container maxWidth="md">
      <h1>Login Display</h1>

      <Button onClick={goLogin}>로그인하기</Button>

    </Container>

    
  );
};

export default LoginDisplay;

