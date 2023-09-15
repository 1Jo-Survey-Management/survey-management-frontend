import { Box, TextField } from '@mui/material';
import React from 'react';

function CreateSubjectiveDescriptive() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '60.56px', marginRight: '10px' }} />
      <TextField
        disabled
        multiline
        rows={5}
        defaultValue="문항 답변 입력란"
        sx={{ flexGrow: '1', marginTop: '15px' }}
      />
    </Box>
  );
}

export default CreateSubjectiveDescriptive;
