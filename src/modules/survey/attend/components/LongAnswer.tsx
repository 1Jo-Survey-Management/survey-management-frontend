import React from 'react';
import { Card, CardContent, TextField } from '@mui/material';

function LongAnswer() {
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
            margin: '0',
            marginBottom: '5px',
          }}
        >
          4. 책을 읽고 난 후 소감 적기
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
          ex. LongAnswer 최대 2000자
        </p>
        <TextField
          label="답변 입력란"
          variant="outlined"
          fullWidth
          multiline
          rows={6}
        />
      </CardContent>
    </Card>
  );
}

export default LongAnswer;
