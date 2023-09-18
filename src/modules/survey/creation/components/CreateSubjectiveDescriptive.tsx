import { Box, TextField } from '@mui/material';
import React from 'react';

/**
 * 주관식 서술형 문항을 만드는 컴포넌트 입니다.
 *
 * @component
 * @returns 주관식 선택지 문항
 * @author 강명관
 */
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
