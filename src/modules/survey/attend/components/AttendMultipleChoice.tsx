import React from 'react';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
} from '@mui/material';

function AttendMultipleChoice() {
  return (
    <Card
      sx={{
        marginBottom: '30px',
        // boxShadow:
        //   '0 14px 28px rgba(0,0,0,0.22), 0 10px 10px rgba(0,0,0,0.19);',
      }}
    >
      <CardContent>
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            sx={{
              fontSize: '18px',
              fontWeight: '600',
              color: 'black',
            }}
          >
            2. 설문 2번 문항 제목 복수선택
          </FormLabel>
          <FormGroup
            sx={{
              paddingTop: '10px',
              //   paddingLeft: '20px',
            }}
          >
            <FormControlLabel
              control={<Checkbox />}
              label="선택지1 내용(복수선택)"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="선택지2 내용(복수선택)"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="선택지3 내용(복수선택)"
            />
          </FormGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}

export default AttendMultipleChoice;
