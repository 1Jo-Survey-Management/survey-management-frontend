/** @jsxImportSource @emotion/react */

import {
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Typography,
} from '@mui/material';
import React from 'react';
import { css } from '@emotion/react';
import { PreviewEachQuestionProps } from '../types/PreviewSurveyTypes';

const styles = {
  questionBox: css({
    marginBottom: '30px',
  }),

  questionTitle: css({
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '10px',
    color: 'black',
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

function PreviewMultipleQuestion({ question }: PreviewEachQuestionProps) {
  return (
    <Card css={styles.questionBox}>
      <CardContent>
        <FormControl component="fieldset">
          <FormLabel component="legend" css={styles.questionTitle}>
            {question.questionTitle ? question.questionTitle : '제목 없는 문항'}
          </FormLabel>

          {question.questionDescription && (
            <p css={styles.questionDescription}>
              {question.questionDescription}
            </p>
          )}

          <RadioGroup>
            {question.selections.map((selection, index) => (
              <FormControlLabel
                css={styles.controlBox}
                key={selection.selectionId}
                value={index}
                control={<Checkbox size="small" />}
                label={
                  <Typography variant="subtitle1" css={styles.selectionText}>
                    {selection.selectionValue
                      ? selection.selectionValue
                      : '제목 없는 선택지'}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}

export default PreviewMultipleQuestion;
