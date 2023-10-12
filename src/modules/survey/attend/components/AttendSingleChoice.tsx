import React from 'react';
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardContent,
} from '@mui/material';

function AttendSingleChoice() {
  return (
    <Card
      sx={{
        marginBottom: '30px',
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
            1. 설문 1번 문항 제목 단일선택
          </FormLabel>
          <RadioGroup
            aria-label="문항"
            name="question"
            sx={{
              paddingTop: '10px',
            }}
          >
            <FormControlLabel
              value="선택지1"
              control={<Radio />}
              label="선택지1 내용(단일선택)"
            />
            <FormControlLabel
              value="선택지2"
              control={<Radio />}
              label="선택지2 내용(단일선택)"
            />
            <FormControlLabel
              value="선택지3"
              control={<Radio />}
              label="선택지3 내용(단일선택)"
            />
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}

export default AttendSingleChoice;
