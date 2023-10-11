import React from 'react';
import Container from '@mui/material/Container';

import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function Main() {
  const navigate = useNavigate();
  const goAttend = () => {
    navigate('/survey/Attend');
  };
  return (
    <Container maxWidth="md">
      <h1>This is main</h1>
      <Button onClick={goAttend}>참여하기 버튼</Button>
    </Container>
  );
}

export default Main;
