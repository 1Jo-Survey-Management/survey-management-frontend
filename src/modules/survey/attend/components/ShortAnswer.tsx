import React from 'react';
import { Card, CardContent, TextField } from '@mui/material';

function ShortAnswer() {
  return (
    <Card
      sx={{
        marginBottom: '30px',
      }}
    >
      <CardContent>
        <p
          style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'black',
            margin: 0,
          }}
        >
          3. 귀하의 학교를 입력해주세요.
        </p>
        <p
          style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#00000088',
            margin: '10px',
            marginBottom: '30px',
            paddingLeft: '18px',
          }}
        >
          ex. ShortAnswer 문항 부가 설명
        </p>
        <TextField
          label="답변 입력란 (최대 100자)"
          variant="outlined"
          fullWidth
          multiline
          maxRows={4}
        />
      </CardContent>
    </Card>
  );
}

export default ShortAnswer;
