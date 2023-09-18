import React, { useState } from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {
  // Container,
  Card,
  CardContent,
  Typography,
  Box,
  // Radio,
  // RadioGroup,
  FormGroup,
  // FormControlLabel,
  // TextField,
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
import { CreateQuestionProps, QuestionProps } from '../types/SurveyTypes';
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
 * @param param0
 * @returns {React.FC}
 * @author 강명관
 */
function CreateQuestion({
  question,
  questions,
  setQuestions,
}: CreateQuestionProps) {
  const [questionType, setQuestionType] = useState<string>('1');

  /**
   * 셀렉박스의 선택에 따라 문항 타입을 랜더링하기 위한 메서드입니다.
   *
   * @param event SelectChangeEvent
   */
  const handleQuestionTypeChange = (event: SelectChangeEvent) => {
    setQuestionType(event.target.value);
  };

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

  const dragIndicator = (
    <Box sx={styles.dragIndicatorBox}>
      <DragIndicatorIcon
        sx={{ transform: 'rotate(90deg);', color: '#b2b2b2' }}
      />
    </Box>
  );

  /**
   * TODO => 1. 설문 문항 필수 스위치 핸들 메서드 작성해야 함.
   * 2.설문 문항 받을 DTO 구상
   * 3. 여기도 변경사항에 따른 state 변경 메서드가 필요. 이걸 2번으로 잡자
   */

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
      <Input placeholder="문항 제목을 입력해주세요." sx={{ flexGrow: 1 }} />
    </Box>
  );

  const questionDescription = (
    <Box sx={styles.questionDescriptionBox}>
      <Typography sx={{ marginRight: '10px', fontWeight: 'bold' }}>
        문항 설명
      </Typography>
      <Input placeholder="문항 설명을 입력해주세요." sx={{ flexGrow: 1 }} />
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
          value={questionType}
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

        {questionType === '1' && (
          <CreateSingleSelection questionId={question.questionId} />
        )}
        {questionType === '2' && (
          <CreateMoveableSingleSelection
            questionId={question.questionId}
            questions={questions}
          />
        )}
        {questionType === '3' && <CreateMultipleSelection />}
        {questionType === '4' && <CreateShortAnswer />}
        {questionType === '5' && <CreateSubjectiveDescriptive />}
      </CardContent>
    </Card>
  );
}

// function test() {
//   <Container>
//     <Card variant="outlined">
//       <CardContent>
//         <TextField id="standard-basic" label="문항 제목" variant="standard" />

//         <TextField id="standard-basic" label="문항 제목" variant="standard" />
//         <TextField
//           id="standard-basic"
//           sx={{
//             '& .MuiInputBase-input': {
//               fontSize: '16px', // 내부 텍스트 크기 조절
//             },
//             '& input': {
//               padding: '12px', // 입력 필드 크기 조절 (예: 패딩을 조정하여 크기 조절)
//             },
//           }}
//           label="문항 설명"
//           size="small"
//         />
//         <Typography variant="h5" component="div">
//           1. 단일선택형 문항입니다
//         </Typography>

//         <Box
//           component="div"
//           sx={{
//             display: 'inline-block',
//             mx: '2px',
//             marginLeft: '15px',
//             marginTop: '10px',
//           }}
//         >
//           <Typography sx={{ mb: 1.5 }} color="text.secondary">
//             문항에 대한 설명입니다.
//           </Typography>
//         </Box>

//         <RadioGroup
//           aria-labelledby="demo-radio-buttons-group-label"
//           defaultValue="female"
//           name="radio-buttons-group"
//         >
//           <FormControlLabel
//             value="female"
//             control={<Radio />}
//             label="10개 ~ 100개"
//           />
//           <FormControlLabel
//             value="male"
//             control={<Radio />}
//             label="100개 ~ 1000개"
//           />
//           <FormControlLabel
//             value="other"
//             control={<Radio />}
//             label="1000개 ~ 10000개"
//           />
//         </RadioGroup>
//       </CardContent>
//     </Card>
//   </Container>;
// }

export default CreateQuestion;
