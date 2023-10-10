import React from 'react';
import { Box, Radio, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  CreateSelectionProps,
  QuestionProps,
  SelectionProps,
} from '../types/SurveyTypes';

const primaryColor = '#3f50b5';

const styles = {
  icon: {
    color: primaryColor,
    border: `solid 1px ${primaryColor}`,
    borderRadius: '5px',
    cursor: 'pointer',
  },
  input: {
    flexGrow: 1,
  },
  removeAndAddIconBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    width: '53px',
  },
  selectionBox: {
    display: 'flex',
    alingItems: 'center',
  },
};

/**
 * 문항 생성에서 단일 선택형 선택지를 만드는 컴포넌트 입니다.
 *
 * @component
 * @returns 단일 선택형 선택지
 * @author 강명관
 */
function CreateSingleSelection({
  question,
  questions,
  setQuestions,
}: CreateSelectionProps) {
  /**
   * 문항 배열에서 업데이트할 배열을 찾아서 업데이트된 배열을 반환해주는 메서드 입니다.
   *
   * @param updateQuestion 업데이트할 배열
   * @returns 업데이트된 배열
   * @author 강명관
   */
  const findQuestionAndUpdateQuestions = (
    updateQuestion: QuestionProps
  ): QuestionProps[] => {
    const updatedQuestions: QuestionProps[] = questions.map((prevQuestion) =>
      prevQuestion.questionId === question.questionId
        ? updateQuestion
        : prevQuestion
    );

    return updatedQuestions;
  };

  /**
   * 선택지를 추가하는 메서드입니다.
   *
   * @author 강명관
   */
  const handleAddSelection = () => {
    const addSelection: SelectionProps = {
      questionId: question.questionId,
      selectionId: new Date().getTime(),
      selectionValue: '',
      isMoveable: false,
      isEndOfSurvey: false,
    };

    const updatedQuestion: QuestionProps = {
      ...question,
      selections: [...question.selections, addSelection],
    };

    setQuestions(findQuestionAndUpdateQuestions(updatedQuestion));
  };

  /**
   * 선택지를 삭제하는 메서드입니다.
   *
   * @param id selection Id
   * @author 강명관
   */
  const handleRemoveSelection = (removeTargetSelectionId: number) => {
    if (question.selections.length === 1) {
      return;
    }
    const updateSelections: SelectionProps[] = question.selections.filter(
      (selection) => selection.selectionId !== removeTargetSelectionId
    );

    const updateQuestion: QuestionProps = {
      ...question,
      selections: updateSelections,
    };

    setQuestions(findQuestionAndUpdateQuestions(updateQuestion));
  };

  /**
   * 선택지 내용 변경에 따른 메서드 입니다.
   *
   * @param changedSelection 변경된 선택지 내용의 선택지 객체
   * @param event HTML Input Change Evenet
   * @author 강명관
   */
  const handleSelectionValueChange = (
    changedSelection: SelectionProps,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const changeValue = event.target.value;

    const updateSelection: SelectionProps = {
      ...changedSelection,
      selectionValue: changeValue,
    };

    const updateSelections = question.selections.map((selection) =>
      selection.selectionId === updateSelection.selectionId
        ? updateSelection
        : selection
    );

    const updateQuestion = {
      ...question,
      selections: updateSelections,
    };

    setQuestions(findQuestionAndUpdateQuestions(updateQuestion));
  };

  return (
    <div>
      {question.selections.map((selection, index) => (
        <div key={selection.selectionId}>
          <Box sx={styles.selectionBox}>
            <Box sx={styles.removeAndAddIconBox}>
              {index === question.selections.length - 1 && (
                <AddIcon
                  sx={styles.icon}
                  aria-label="Add"
                  onClick={handleAddSelection}
                />
              )}
              <RemoveIcon
                sx={{ ...styles.icon, marginLeft: '5px' }}
                aria-label="Remove"
                onClick={() => handleRemoveSelection(selection.selectionId)}
              />
            </Box>
            <Radio disabled name={`radio-buttons-${selection.selectionId}`} />
            <Input
              placeholder="문항을 입력해주세요."
              sx={styles.input}
              value={selection.selectionValue}
              onChange={(event) => handleSelectionValueChange(selection, event)}
            />
          </Box>
        </div>
      ))}
    </div>
  );
}

export default CreateSingleSelection;