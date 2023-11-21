/** @jsxImportSource @emotion/react */

import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import React from 'react';
import { css } from '@emotion/react';
import { PreviewEachQuestionProps } from '../types/PreviewSurveyTypes';
import RequiredQuestionText from './RequiredQuestionText';

const styles = {
  questionBox: css({
    marginBottom: '30px',
  }),

  questionTitle: css({
    fontSize: '1rem',
    fontWeight: '600',
    color: 'black',
    marginBottom: '10px',
  }),

  questionDescription: css({
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#00000088',
    margin: '8px',
    paddingLeft: '10px',
  }),

  selectionText: css({
    fontSize: '0.7rem',
  }),

  controlBox: css({
    height: '25px',
  }),
};

/**
 * 설문 미리보기 단일 선택형 문항을 나타내는 컴포넌트 입니다.
 *
 * @param question 단일 선택형 문항에 대한 객체
 * @component
 * @returns 단일 선택형 문항 미리보기
 * @author 강명관
 */
function PreviewSingleQuestion({ question }: PreviewEachQuestionProps) {
  return (
    <Card css={styles.questionBox}>
      <CardContent>
        {question.questionRequired && <RequiredQuestionText />}
        <FormControl component="fieldset">
          <FormLabel component="legend" css={styles.questionTitle}>
            {question.questionTitle ? question.questionTitle : '제목 없는 문항'}
          </FormLabel>

          <Typography
            variant="body1"
            sx={{
              fontSize: '0.9rem',
            }}
          >
            {question.questionDescription}
          </Typography>

          <RadioGroup sx={{ paddingTop: '10x' }}>
            {question.selections.map((selection, index) => (
              <div key={selection.questionId}>
                <FormControlLabel
                  key={selection.selectionId}
                  value={index}
                  css={styles.controlBox}
                  control={
                    <Radio
                      sx={{
                        '& svg': {
                          width: '18px',
                          height: '18px',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="subtitle1"
                      css={{ fontSize: '0.8rem' }}
                    >
                      {selection.selectionValue
                        ? selection.selectionValue
                        : '제목 없는 선택지'}
                    </Typography>
                  }
                />
              </div>
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}

export default PreviewSingleQuestion;
