import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { validate } from 'class-validator';
import Swal from 'sweetalert2';
import {
  DragDropContext,
  Droppable,
  DragEndDetails,
  Draggable,
} from 'react-beautiful-dnd';
import CreateQuestion from '../components/CreateQuestion';
import FloatingActionButtons from '../components/FloatingActionButtons';
import CreateSurveyInfo from '../components/CreateSurveyInfo';
import {
  QuestionProps,
  SelectionProps,
  SurveyInfoProps,
} from '../types/SurveyTypes';
import SurveyInfoValidation from '../validator/SurveyInfoValidation';
import QuestionValidation from '../validator/QuestionValidation';
import SelectionValidation from '../validator/SelectionValidation';
import { getValidationErrorMessage } from '../util/ValidatorUtil';

function CreationSurvey() {
  const [surveyId] = useState<number>(new Date().getTime());

  const [surveyImage, setSurveyImage] = useState<File>();

  const [surveyInfo, setSurveyInfo] = useState<SurveyInfoProps>({
    surveyId,
    surveyInfoId: new Date().getTime(),
    surveyTitle: '',
    surveyTags: [],
    surveyDescription: '',
    surveyClosingAt: '',
    openStatusNo: 1,
    surveyStatusNo: 1,
    userNo: null,
  });

  const [questions, setQuestions] = useState<QuestionProps[]>([
    {
      surveyId,
      questionId: new Date().getTime(),
      questionTitle: '',
      questionDescription: '',
      questionType: '1',
      questionRequired: true,
      selections: [],
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        surveyId,
        questionId: new Date().getTime(),
        questionTitle: '',
        questionDescription: '',
        questionType: '1',
        questionRequired: true,
        selections: [],
      },
    ]);
  };

  /**
   * 설문에 대한 기본 정보를 Validation 체크하기 위한 메서드 입니다.
   *
   * @returns validation error가 존재할 경우 false, 성공 true
   * @author 강명관
   */
  const validationSurveyInfo = async (): Promise<boolean> => {
    /**
     * FIXME: 현재 로그인 기능 미완료로 인한 테스트 데이터.
     */
    surveyInfo.userNo = '1';

    let surveyInfoValidationCheck: boolean = true;

    const surveyInfoValidation: SurveyInfoValidation = new SurveyInfoValidation(
      surveyInfo.surveyId,
      surveyInfo.surveyInfoId,
      surveyInfo.surveyClosingAt,
      surveyInfo.surveyTitle,
      surveyInfo.surveyTags,
      surveyInfo.openStatusNo,
      surveyInfo.surveyDescription,
      surveyInfo.surveyStatusNo,
      surveyInfo.userNo
    );

    const surveyInfoErrors = await validate(surveyInfoValidation);

    if (surveyInfoErrors.length > 0) {
      const errorMessage = getValidationErrorMessage(
        surveyInfoValidation,
        surveyInfoErrors
      );
      Swal.fire({
        icon: 'error',
        title: '입력되지 않은 사항이 존재합니다.',
        text: `${errorMessage}`,
      });
      surveyInfoValidationCheck = false;
      return surveyInfoValidationCheck;
    }

    if (surveyImage === undefined || surveyImage === null) {
      Swal.fire({
        icon: 'error',
        title: '입력되지 않은 사항이 존재합니다.',
        text: `설문의 대표 이미지는 필수 입니다.`,
      });

      surveyInfoValidationCheck = false;
      return surveyInfoValidationCheck;
    }

    return surveyInfoValidationCheck;
  };

  /**
   * 문항의 선택지에 대해서 Validation 하기 위한 메서드 입니다.
   *
   * @param question 문항의 유형이 선택형인 문항
   * @returns validation error가 존재할 경우 false, 성공 true
   * @author 강명관
   */
  const validationSelection = async (
    selections: SelectionProps[]
  ): Promise<boolean> => {
    let selectionValidationCheck: boolean = true;

    if (selections.length < 1) {
      Swal.fire({
        icon: 'error',
        title: '선택지는 최소 한개 이상 존재해야 합니다.',
      });
      selectionValidationCheck = false;
      return selectionValidationCheck;
    }

    const selectionValidationPromise: Promise<void>[] = selections.map(
      async (selection: SelectionProps) => {
        if (!selectionValidationCheck) {
          return;
        }

        const selectionValidation = new SelectionValidation(
          selection.questionId,
          selection.selectionId,
          selection.selectionValue,
          selection.isMoveable,
          selection.isEndOfSurvey,
          selection.questionMoveId
        );

        const selectionErrors = await validate(selectionValidation);

        if (selectionErrors.length > 0) {
          const errorMessage: string[] = getValidationErrorMessage(
            selectionValidation,
            selectionErrors
          );

          Swal.fire({
            icon: 'error',
            title: '입력되지 않은 사항이 존재합니다.',
            text: `${errorMessage}`,
          });
          selectionValidationCheck = false;
        }
      }
    );

    await Promise.all(selectionValidationPromise);

    return selectionValidationCheck;
  };

  /**
   * 이동형 문항에 대한 Validation을 진행하는 메서드 입니다.
   * 이동 사항이 설문 종료일 경우 questionMoveId 는 존재하면 안되고,
   * 이동 사항이 문항일 경우 해당 문항이 제대로 매핑되었는지 확인하는 메서드 입니다.
   *
   * @param selections 문항 선택시 이동 문항의 선택지들
   * @returns validation error가 존재할 경우 false, 성공 true
   * @author 강명관
   */
  const validationMoveableSelection = (
    selections: SelectionProps[]
  ): boolean => {
    let moveableSelectionValidationCheck: boolean = true;

    selections.forEach((selection) => {
      if (!moveableSelectionValidationCheck) {
        return;
      }

      if (
        (!selection.isEndOfSurvey && !selection.questionMoveId) ||
        (selection.isEndOfSurvey && selection.questionMoveId)
      ) {
        Swal.fire({
          icon: 'error',
          title: '입력되지 않은 사항이 존재합니다.',
          text: '선택시 문항 이동에 대한 값이 제대로 입력되지 않았습니다.',
        });
        moveableSelectionValidationCheck = false;
      }
    });

    return moveableSelectionValidationCheck;
  };

  /**
   * 문항들에 대한 Validation 을 진행하는 메서드 입니다.
   *
   * @returns validation error가 존재할 경우 false, 성공 true
   * @author 강명관
   */
  const validationQuestion = async (): Promise<boolean> => {
    let questionValidationCheck: boolean = true;

    if (questions.length < 1) {
      Swal.fire({
        icon: 'error',
        title: '입력되지 않은 사항이 존재합니다.',
        text: `문항의 개수는 최소 1개 이상입니다.`,
      });
      questionValidationCheck = false;
      return questionValidationCheck;
    }

    const questionSelectionType: string[] = ['1', '2', '3'];

    const questionValidationPromise: Promise<void>[] = questions.map(
      async (question) => {
        const questionValidation = new QuestionValidation(
          question.surveyId,
          question.questionId,
          question.questionTitle,
          question.questionRequired,
          question.questionType,
          question.selections,
          question.questionDescription
        );

        const questionErrors = await validate(questionValidation);
        if (questionErrors.length > 0) {
          const errorMessage: string[] = getValidationErrorMessage(
            questionValidation,
            questionErrors
          );
          Swal.fire({
            icon: 'error',
            title: '입력되지 않은 사항이 존재합니다.',
            text: `${errorMessage}`,
          });
          questionValidationCheck = false;
        }
      }
    );

    const selectionTypeQuestions: QuestionProps[] = questions.filter(
      (question) => questionSelectionType.includes(question.questionType)
    );

    const selectionsArray: SelectionProps[] = [];

    const selectionValidationPromise: Promise<void>[] =
      selectionTypeQuestions.map(async (question) => {
        if (!questionValidationCheck) {
          return;
        }

        if (question.questionType === '2') {
          questionValidationCheck = validationMoveableSelection(
            question.selections
          );
        }
        selectionsArray.push(...question.selections);
      });

    if (!questionValidationCheck) {
      questionValidationCheck = false;
      return questionValidationCheck;
    }

    if (selectionsArray.length > 0) {
      questionValidationCheck = await validationSelection(selectionsArray);
    }

    await Promise.all([
      questionValidationPromise,
      selectionValidationPromise,
      questionValidationCheck,
    ]);

    return questionValidationCheck;
  };

  /**
   * 설문을 작성하는 메서드입니다.
   *
   * @returns 설문이 성공적으로 작성시 main 페이지로 리다이렉트 합니다.
   * @author 강명관
   */
  const handleSubmitSurveyWrite = async () => {
    /**
     * FIXME: 현재 로그인 기능 미완료로 인한 테스트 데이터.
     */
    surveyInfo.userNo = '1';

    const [surveyInfoValidationResult, questionValidationResult] =
      await Promise.all([validationSurveyInfo(), validationQuestion()]);

    const validationResult: boolean =
      surveyInfoValidationResult && questionValidationResult;

    if (!validationResult) {
      return;
    }

    const formData = new FormData();
    formData.append('surveyInfoCreateDto', JSON.stringify(surveyInfo));
    formData.append('surveyQuestionCreateDtoList', JSON.stringify(questions));

    if (surveyImage !== undefined) {
      formData.append('surveyImage', surveyImage);
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/v1/survey',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        console.log('설문 등록 성공');
      } else {
        console.error('요청 실패:', response.status, response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Drag Drop을 통해 컴포넌트의 순서가 변경되는 것을 상태로 관리하기 위한 메서드 입니다.
   *
   * @param questionList 문항 리스트
   * @param startIndex 이동을 시작할 인덱스
   * @param endIndex 이동을 마친 인덱스
   * @returns 순서가 변경된 문항 리스트
   * @author 강명관
   */
  const reorder = (
    questionList: QuestionProps[],
    startIndex: number,
    endIndex: number
  ): QuestionProps[] => {
    const result = [...questionList];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  /**
   * react-beautiful-dnd 라이브러리에서 Drag Drop을 핸들링 하기 위한 메서드 입니다.
   * 올바른 Drag Drop의 경우 reorder 함수를 호출하여 스테이트를 변경합니다.
   *
   * @param result Drag가 끝났을때의 동작
   * @author 강명관
   */
  const handleOnDragEnd = (result: DragEndDetails) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderQuestion = reorder(
      questions,
      result.source.index,
      result.destination.index
    );

    setQuestions(reorderQuestion);
  };

  return (
    <Container maxWidth="md">
      <h1>Creation Survey</h1>
      <CreateSurveyInfo
        surveyInfo={surveyInfo}
        setSurveyInfo={setSurveyInfo}
        setSurveyImage={setSurveyImage}
      />

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable" direction="vertical">
          {(droppableProvided) => (
            <div
              className="droppable"
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {questions.map((question, index) => (
                <Draggable
                  key={question.questionId.toString()}
                  draggableId={question.questionId.toString()}
                  index={index}
                >
                  {(draggableProvided) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      style={{
                        userSelect: 'none',
                        margin: '0 0 30px 0',
                        ...draggableProvided.draggableProps.style,
                      }}
                    >
                      <CreateQuestion
                        key={question.questionId}
                        question={question}
                        questions={questions}
                        setQuestions={setQuestions}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Box sx={{ marginRight: '10px', marginBottom: '1000px' }}>
        <Button
          variant="contained"
          color="success"
          sx={{ marginRight: '20px' }}
          onClick={handleSubmitSurveyWrite}
        >
          작성하기
        </Button>

        <Button variant="contained">개시하기</Button>
      </Box>
      <FloatingActionButtons onClickAddQuestion={handleAddQuestion} />
    </Container>
  );
}

export default CreationSurvey;
