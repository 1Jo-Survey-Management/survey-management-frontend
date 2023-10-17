/** @jsxImportSource @emotion/react */

import { Card, CardContent, TextField } from '@mui/material';
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
};

/**
 * 설문 미리보기에서 주관식 단단형 문항을 담당하는 컴포넌트입니다.
 *
 * @param question 주관식 단답형 문항 객체
 * @returns 주관식 단답형 문항 미리보기
 * @component
 * @author 강명관
 */
function PreviewShortQuestion({ question }: PreviewEachQuestionProps) {
  return (
    <Card css={styles.questionBox}>
      <CardContent>
        <p css={styles.questionTitle}>
          {question.questionTitle ? question.questionTitle : '제목 없는 문항'}
        </p>

        {question.questionDescription && (
          <p css={styles.questionDescription}>{question.questionDescription}</p>
        )}

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

export default PreviewShortQuestion;
