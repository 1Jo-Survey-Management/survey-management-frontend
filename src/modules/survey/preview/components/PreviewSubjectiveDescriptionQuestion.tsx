import { Card, CardContent, TextField } from '@mui/material';
import React from 'react';
import { PreviewEachQuestionProps } from '../types/PreviewSurveyTypes';

const styles = {
  questionBox: {
    marginBottom: '30px',
  },

  questionTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '10px',
    color: 'black',
  },

  questionDescription: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#00000088',
    margin: '8px',
    paddingLeft: '10px',
  },

  selectionText: {
    fontSize: '0.7rem',
  },
};

/**
 * 설문 미리보기 주관식 서술형 문항을 나타내는 컴포넌트 입니다.
 *
 * @param question 주관식 서술형 문항 객체
 * @returns 주관식 서술형 문항
 * @component
 * @author 강명관
 */
function PreviewSubjectiveDescriptionQuestion({
  question,
}: PreviewEachQuestionProps) {
  return (
    <Card sx={styles.questionBox}>
      <CardContent>
        <p style={styles.questionTitle}>
          {question.questionTitle ? question.questionTitle : '제목 없는 문항'}
        </p>

        {question.questionDescription && (
          <p style={styles.questionDescription}>
            {question.questionDescription}
          </p>
        )}

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

export default PreviewSubjectiveDescriptionQuestion;
