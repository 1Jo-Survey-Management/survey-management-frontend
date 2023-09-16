import React, { useState } from 'react';
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
import { QuestionProps, SelectionProps } from '../types/SurveyTypes';

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
  questionId,
  questions,
}: {
  questionId: number;
  questions: QuestionProps[];
}) {
  const [selections, setSelections] = useState<SelectionProps[]>([
    {
      questionId,
      selectionId: new Date().getTime(),
      selectionValue: '',
      isMoveable: true,
    },
  ]);

  /**
   * 문항 이동이 가능한 선택지를 추가하는 메서드 입니다.
   *
   * @author 강명관
   */
  const handleAddMoveableSelection = () => {
    setSelections([
      ...selections,
      {
        questionId,
        selectionId: new Date().getTime(),
        selectionValue: '',
        isMoveable: true,
      },
    ]);
  };

  /**
   * 문항 이동이 가능한 선택지를 삭제하는 메서드 입니다.
   *
   * @param removeTargetSelectionId 삭제할 선택지 아이디
   * @returns 선택지가 삭제된 SelectionProps[]
   */
  const handleRemoveMoveableSelection = (removeTargetSelectionId: number) => {
    if (selections.length === 1) {
      return;
    }
    const updateSelections = selections.filter(
      (selection) => selection.selectionId !== removeTargetSelectionId
    );
    setSelections(updateSelections);
  };

  /**
   * 해당 선택지에 다음 문항 이동 번호를 등록해주는 메서드 입니다.
   *
   * @param selectionId
   */
  const handelSetQuestionNumber = (
    selectedSelectionId: number,
    event: SelectChangeEvent
  ) => {
    const selectedValue: string = event.target.value;

    const findQuestion: QuestionProps | undefined = questions.find(
      (question) => question.questionId.toString() === selectedValue
    );

    if (findQuestion === undefined) {
      return;
    }

    const findSelection: SelectionProps | undefined = selections.find(
      (selection) => selection.selectionId === selectedSelectionId
    );

    if (findSelection === undefined) {
      return;
    }

    const findQuestionIndex: number = questions.indexOf(findQuestion);
    const findSelectionIndex: number = selections.indexOf(findSelection);

    if (selectedValue === NEXT_QUESTION) {
      const updateSelections: SelectionProps[] = [...selections];
      updateSelections[findSelectionIndex] = {
        ...updateSelections[findSelectionIndex],
        questionMoveId: findQuestionIndex + 1,
      };
      setSelections(updateSelections);
    }
  };

  const handleSelectionValueChange = (
    changedSelection: SelectionProps,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const changeValue = event.target.value;

    const updatedSelection: SelectionProps = {
      ...changedSelection,
      selectionValue: changeValue,
    };

    const updatedSelections = selections.map((selection) =>
      selection.selectionId === updatedSelection.selectionId
        ? updatedSelection
        : selection
    );
    setSelections(updatedSelections);
  };

  return (
    <div>
      {selections.map((selection, index) => (
        <div key={selection.selectionId}>
          <Box sx={styles.selectionBox}>
            <Box sx={styles.removeAndAddIconBox}>
              {index === selections.length - 1 && (
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
                  value={NEXT_QUESTION}
                  onChange={(event: SelectChangeEvent) =>
                    handelSetQuestionNumber(selection.selectionId, event)
                  }
                >
                  {questions.map((question, questionIndex) => (
                    <MenuItem
                      key={question.questionId}
                      value={questionIndex + 1}
                    >
                      {questionIndex + 1}번
                    </MenuItem>
                  ))}
                  <MenuItem value={NEXT_QUESTION}>다음 문항</MenuItem>
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
