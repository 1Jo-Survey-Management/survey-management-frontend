import React, { useEffect } from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormGroup,
  Tooltip,
  Switch,
  Input,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

import CreateSingleSelection from './CreateSingleSelection';
import CreateMultipleSelection from './CreateMultipleSelection';
import CreateShortAnswer from './CreatShortAnswer';
import CreateSubjectiveDescriptive from './CreateSubjectiveDescriptive';
import {
  CreateQuestionProps,
  QuestionProps,
  SelectionProps,
} from '../types/SurveyTypes';
import CreateMoveableSingleSelection from './CreateMoveableSingleSelection';

const styles = {
  dragIndicatorBox: {
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    top: '-15px',
  },

  iconAndSwitchContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '-15px',
  },

  iconAndSwitchBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  switchBox: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '5px',
  },

  questionTitleBox: {
    display: 'flex',
    alignItems: 'center',
  },

  questionDescriptionBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },

  selectQuestionTypeBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
};

/**
 * 설문조사 문항을 만드는 컴포넌트 입니다.
 *
 * @param question 자기 자신 문항 객체
 * @param questions 문항 배열
 * @param setQuestions questions setStataus 메서드
 * @author 강명관
 */
function CreateQuestion({
  question,
  questions,
  setQuestions, // selections,
}: CreateQuestionProps) {
  /**
   * 셀렉박스의 선택에 따라 문항 타입을 랜더링하기 위한 메서드입니다.
   *
   * @param event SelectChangeEvent
   */
  const handleQuestionTypeChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;

    let defaultSelection: SelectionProps = {
      questionId: question.questionId,
      selectionId: new Date().getTime(),
      selectionValue: '',
      isMoveable: false,
    };

    if (value === '2') {
      const currentQuestionIndex = questions.indexOf(question);

      defaultSelection = {
        ...defaultSelection,
        questionMoveId: currentQuestionIndex + 2,
        isMoveable: true,
      };
    }

    const updateQuestions: QuestionProps[] = questions.map((prevQuestion) => {
      if (prevQuestion.questionId === question.questionId) {
        return {
          ...prevQuestion,
          [name]: value,
          selections: [defaultSelection],
        };
      }

      return prevQuestion;
    });

    setQuestions(updateQuestions);
  };

  /**
   * 문항이 처음 랜더링 될 때 디폴트 타입으로 단일 선택형 문항을 선택하고,
   * 그에 맞게 선택지를 랜더링 해주기 위한 useEffect 입니다.
   * @author 강명관
   */
  useEffect(() => {
    handleQuestionTypeChange({
      target: {
        name: 'questionType',
        value: question.questionType,
      },
    } as SelectChangeEvent);
  }, []);

  /**
   * 문항을 삭제하기 위한 메서드 입니다.
   *
   * @param removeTargetId 삭제할 문항의 id
   * @return 문항이 한 개 밖에 존재하지 않는경우 삭제 불가
   * @author 강명관
   */
  const handleRemoveQuestion = (removeTargetId: number) => {
    if (questions.length === 1) {
      return;
    }

    setQuestions([
      ...questions.filter((ques) => ques.questionId !== removeTargetId),
    ]);
  };

  /**
   * 문항의 필수 여부를 변경하는 메서드 입니다.
   *
   * @param targetQuestion 변경할 문항
   * @author 강명관
   */
  const handleRequiredSwitchChange = (targetQuestion: QuestionProps) => {
    const updateQuestions = questions.map((prevQuestion) => {
      if (prevQuestion.questionId === targetQuestion.questionId) {
        return {
          ...prevQuestion,
          questionRequired: !prevQuestion.questionRequired,
        };
      }
      return prevQuestion;
    });

    setQuestions(updateQuestions);
  };

  /**
   * 설문 문항의 제목과 설명을 작성하는 메서드 입니다.
   *
   * @param event 설문 문항 제목, 설명 Input 태그의 onChange 이벤트
   * @author 강명관
   */
  const handelQuestionInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    const updateQuestions = questions.map((prevQuestion) => {
      if (prevQuestion.questionId === question.questionId) {
        return {
          ...prevQuestion,
          [name]: value,
        };
      }
      return prevQuestion;
    });

    setQuestions(updateQuestions);
  };

  const dragIndicator = (
    <Box sx={styles.dragIndicatorBox}>
      <DragIndicatorIcon
        sx={{ transform: 'rotate(90deg);', color: '#b2b2b2' }}
      />
    </Box>
  );

  const deleteIconAndRequiredSwitch = (
    <Box sx={styles.iconAndSwitchContainer}>
      <Box sx={styles.iconAndSwitchBox}>
        <Tooltip
          title="Delete"
          onClick={() => handleRemoveQuestion(question.questionId)}
        >
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <FormGroup>
          <Box sx={styles.switchBox}>
            <Typography sx={{ marginRight: '-7px' }}>필수</Typography>
            <Switch
              defaultChecked
              onChange={() => handleRequiredSwitchChange(question)}
            />
          </Box>
        </FormGroup>
      </Box>
    </Box>
  );

  const questionTitle = (
    <Box sx={styles.questionTitleBox}>
      <Typography sx={{ marginRight: '10px', fontWeight: 'bold' }}>
        문항 제목
      </Typography>
      <Input
        placeholder="문항 제목을 입력해주세요."
        sx={{ flexGrow: 1 }}
        value={question.questionTitle}
        name="questionTitle"
        onChange={(event) => handelQuestionInputChange(event)}
      />
    </Box>
  );

  const questionDescription = (
    <Box sx={styles.questionDescriptionBox}>
      <Typography sx={{ marginRight: '10px', fontWeight: 'bold' }}>
        문항 설명
      </Typography>
      <Input
        placeholder="문항 설명을 입력해주세요."
        sx={{ flexGrow: 1 }}
        name="questionDescription"
        value={question.questionDescription}
        onChange={(event) => handelQuestionInputChange(event)}
      />
    </Box>
  );

  const selectQuestionType = (
    <Box sx={styles.selectQuestionTypeBox}>
      <Typography sx={{ marginRight: '10px', fontWeight: 'bold' }}>
        문항 유형
      </Typography>

      <FormControl sx={{ flexGrow: '1' }}>
        <Select
          id="demo-simple-select"
          name="questionType"
          value={question.questionType}
          displayEmpty
          onChange={handleQuestionTypeChange}
        >
          <MenuItem value="1">단일 선택형</MenuItem>
          <MenuItem value="2">단일 선택형 (선택시 문항 이동)</MenuItem>
          <MenuItem value="3">복수 선택형</MenuItem>
          <MenuItem value="4">주관식 단답형</MenuItem>
          <MenuItem value="5">주관식 서술형</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: '#3f50b5',
        boxShadow:
          '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);',
        marginBottom: '30px',
      }}
    >
      <CardContent>
        {dragIndicator}
        {deleteIconAndRequiredSwitch}
        {questionTitle}
        {questionDescription}
        {selectQuestionType}

        {question.questionType === '1' && (
          <CreateSingleSelection
            question={question}
            questions={questions}
            setQuestions={setQuestions}
          />
        )}
        {question.questionType === '2' && (
          <CreateMoveableSingleSelection
            question={question}
            questions={questions}
            setQuestions={setQuestions}
          />
        )}
        {question.questionType === '3' && (
          <CreateMultipleSelection
            question={question}
            questions={questions}
            setQuestions={setQuestions}
          />
        )}
        {question.questionType === '4' && <CreateShortAnswer />}
        {question.questionType === '5' && <CreateSubjectiveDescriptive />}
      </CardContent>
    </Card>
  );
}

export default CreateQuestion;
