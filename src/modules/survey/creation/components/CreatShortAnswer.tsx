import { Box, Input } from '@mui/material';
import React from 'react';

function CreateShortAnswer() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '60.56px', marginRight: '10px' }} />
      <Input
        disabled
        defaultValue="문항 답변 입력란"
        sx={{ flexGrow: '1', marginTop: '15px' }}
      />
    </Box>
  );
}

export default CreateShortAnswer;
