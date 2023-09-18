// Mypage.tsx
import React from 'react';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function Mypage() {
  const navigate = useNavigate();
  const goBack = () => {
    console.log('nono');
    navigate('/survey/main');
  };

  return (
    <Container maxWidth="md">
      <h1>This is mypage</h1>

      <Button onClick={goBack}>돌아가기</Button>
    </Container>
  );
}

export default Mypage;
