import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  FormControl,
  Input,
  MenuItem,
  Radio,
  Select,
  SelectChangeEvent,
} from '@mui/material';
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
    flexGrow: 0.8,
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
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
};

const NEXT_QUESTION: string = 'nextQuestion';
const END_OF_SURVEY: string = 'endOfSurvey';

/**
 * 선택지에 따른 문항 이동이 가능한 선택지를 만드는 컴포넌트 입니다.
 *
 * @component
 * @param questionId 해당 선택지를 갖고 있는 문항의 아이디 입니다.
 * @returns 선택지에 따른 문항 이동 컴포넌트
 */
function CreateMoveableSingleSelection({
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
   * 문항 이동이 가능한 선택지를 추가하는 메서드 입니다.
   *
   * @author 강명관
   */
  const handleAddMoveableSelection = () => {
    const addSelection: SelectionProps = {
      questionId: question.questionId,
      selectionId: new Date().getTime(),
      questionMoveId: questions.indexOf(question) + 2,
      selectionValue: '',
      isMoveable: true,
      isEndOfSurvey: false,
    };

    const updateQuestion: QuestionProps = {
      ...question,
      selections: [...question.selections, addSelection],
    };

    setQuestions(findQuestionAndUpdateQuestions(updateQuestion));
  };

  /**
   * 문항 이동이 가능한 선택지를 삭제하는 메서드 입니다.
   *
   * @param removeTargetSelectionId 삭제할 선택지 아이디
   * @returns 선택지가 삭제된 SelectionProps[]
   */
  const handleRemoveMoveableSelection = (removeTargetSelectionId: number) => {
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
   * 해당 선택지에 다음 문항 이동 번호를 등록해주는 메서드 입니다.
   *
   * @param selectionId
   */
  const handelSetQuestionNumber = (
    changeSelection: SelectionProps,
    event: SelectChangeEvent
  ) => {
    const selectedValue: string = event.target.value;

    const questionIndex: number = questions.indexOf(question);
    const selectionIndex: number = question.selections.indexOf(changeSelection);

    const updateSelections: SelectionProps[] = [...question.selections];

    if (selectedValue === END_OF_SURVEY) {
      updateSelections[selectionIndex] = {
        ...updateSelections[selectionIndex],
        questionMoveId: undefined,
        isEndOfSurvey: true,
      };

      const updateQuestion = {
        ...question,
        selections: updateSelections,
      };

      setQuestions(findQuestionAndUpdateQuestions(updateQuestion));
      return;
    }

    let changedQuestionMoveId: number = questionIndex + 2;

    if (selectedValue === NEXT_QUESTION) {
      changedQuestionMoveId = questionIndex + 2;
    } else {
      const selectedQuestionMoveId = Number(selectedValue);
      if (selectedQuestionMoveId > changedQuestionMoveId) {
        changedQuestionMoveId = selectedQuestionMoveId;
      }
    }

    const updatedSelection = {
      ...updateSelections[selectionIndex],
      questionMoveId: changedQuestionMoveId,
      isEndOfSurvey: false,
    };

    updateSelections[selectionIndex] = updatedSelection;

    const updateQuestion = {
      ...question,
      selections: updateSelections,
    };

    setQuestions(findQuestionAndUpdateQuestions(updateQuestion));
  };

  /**
   * 선택지의 내용을 변경할때 state를 변경하는 메서드 입니다.
   *
   * @param changedSelection 변경된 선택지 SelectionProps
   * @param event Input의 변경 이벤트
   * @author 강명관
   */
  const handleSelectionValueChange = (
    changedSelection: SelectionProps,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const changeValue = event.target.value;

    const updatedSelection: SelectionProps = {
      ...changedSelection,
      selectionValue: changeValue,
    };

    const updatedSelections = question.selections.map((selection) =>
      selection.selectionId === updatedSelection.selectionId
        ? updatedSelection
        : selection
    );

    const uddateQuestion: QuestionProps = {
      ...question,
      selections: updatedSelections,
    };

    setQuestions(findQuestionAndUpdateQuestions(uddateQuestion));
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
                  onClick={handleAddMoveableSelection}
                />
              )}

              <RemoveIcon
                sx={{ ...styles.icon, marginLeft: '5px' }}
                onClick={() =>
                  handleRemoveMoveableSelection(selection.selectionId)
                }
              />
            </Box>
            <Radio disabled name={`radio-buttons-${selection.selectionId}`} />
            <Input
              placeholder="문항을 입력해주세요."
              value={selection.selectionValue}
              sx={styles.input}
              onChange={(event) => handleSelectionValueChange(selection, event)}
            />
            <Box
              sx={{
                marginTop: '10px',
                marginLeft: 'auto',
              }}
            >
              <FormControl sx={{ minWidth: '200px' }}>
                <Select
                  id="demo-simple-select"
                  value={
                    selection.isEndOfSurvey
                      ? END_OF_SURVEY
                      : selection.questionMoveId?.toString() || ''
                  }
                  onChange={(event: SelectChangeEvent) =>
                    handelSetQuestionNumber(selection, event)
                  }
                >
                  {questions
                    .slice(questions.indexOf(question) + 1)
                    .map((que, queIndex) => (
                      <MenuItem
                        key={que.questionId}
                        value={questions.indexOf(question) + queIndex + 2}
                      >
                        {questions.indexOf(question) + queIndex + 2}번
                      </MenuItem>
                    ))}

                  {questions.indexOf(question) !== questions.length - 1 && (
                    <MenuItem value={NEXT_QUESTION}>다음 문항</MenuItem>
                  )}
                  <MenuItem value={END_OF_SURVEY}>종료</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </div>
      ))}
    </div>
  );
}

export default CreateMoveableSingleSelection;