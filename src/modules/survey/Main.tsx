// Main.tsx
import React from 'react';
import Container from '@mui/material/Container';
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { pathInfo, routeInfo } from "../route/routeInfo"
import { Button } from '@mui/material';

const Main: React.FC = () => {

  return (
    <Container maxWidth="md">
      <h1>This is main</h1>
      

    </Container>
  );
};

export default Main;

