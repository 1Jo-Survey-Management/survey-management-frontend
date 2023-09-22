// Main.tsx
import React from 'react';
import Container from '@mui/material/Container';

function Main() {
  const test = () => {
    window.location.href = 'http://localhost:8080/login/go';
  };

  return (
    <Container maxWidth="md">
      <button type="button" onClick={test}>
        테스트
      </button>
      <h1>This is main</h1>
    </Container>
  );
}

export default Main;
