/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Box, Button } from '@mui/material';
import axios from '../../../login/components/customApi';
import { validate } from 'class-validator';
import Swal from 'sweetalert2';
import {
  DragDropContext,
  Droppable,
  DragEndDetails,
  Draggable,
} from 'react-beautiful-dnd';
/** @jsxImportSource @emotion/react */
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
import { getValidationErrorMessage } from '../util/ValidatorUtil';
import { QuestionTypeEnum } from '../../enums/QuestionTypeEnum';
import { OpenStatusEnum } from '../../enums/OpenStatusEnum';
import { SurveyStatusEunm } from '../../enums/SurveyStatusEnum';

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
    openStatusNo: OpenStatusEnum.PUBLIC,
    surveyStatusNo: SurveyStatusEunm.WRITING,
    userNo: null,
  });

  const [questions, setQuestions] = useState<QuestionProps[]>([
    {
      surveyId,
      questionId: new Date().getTime(),
      questionTitle: '',
      questionDescription: '',
      questionType: QuestionTypeEnum.SINGLE_QUESTION,
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
        questionType: QuestionTypeEnum.SINGLE_QUESTION,
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
   * 일반문항(단일 선택형, 다중 선택형)의 선택지에 대해서 Validation 하기 위한 메서드 입니다.
   *
   * @param question 문항의 유형이 선택형인 문항
   * @returns validation error가 존재할 경우 false, 성공 true
   * @author 강명관
   */
  const validationGeneralSelection = (selections: SelectionProps[]) => {
    if (selections.length < 1) {
      Swal.fire({
        icon: 'error',
        title: '선택지는 최소 한개 이상 존재해야 합니다.',
      });
      return false;
    }

    return selections.every((selection) => {
      if (!selection.selectionValue) {
        return false;
      }

      if (selection.isEndOfSurvey || selection.isMoveable) {
        return false;
      }

      return true;
    });
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
  const validationMoveableSelection = (selections: SelectionProps[]): boolean =>
    selections.every((selection) => {
      if (!selection.isMoveable || !selection.selectionValue) {
        Swal.fire({
          icon: 'error',
          title: '선택지 정보가 잘못되었습니다.',
          text: '선택지 정보가 잘못되었습니다. 다시 시도해 주세요.',
        });
        return false;
      }

      if (
        (!selection.isEndOfSurvey && selection.questionMoveId === undefined) ||
        (selection.isEndOfSurvey && selection.questionMoveId)
      ) {
        Swal.fire({
          icon: 'error',
          title: '입력되지 않은 사항이 존재합니다.',
          text: '선택시 문항 이동에 대한 값이 제대로 입력되지 않았습니다.',
        });
        return false;
      }

      return true;
    });

  /**
   * 문항에 대한 validation을 진행하기 위한 메서드 입니다.
   *
   * @param validQuestions validation을 진행한 questions
   * @returns 모든 validation이 통과하면 true
   * @author 강명관
   */
  const validationQuestion = async (validQuestions: QuestionProps[]) => {
    if (validQuestions.length < 1) {
      Swal.fire({
        icon: 'error',
        title: '입력되지 않은 사항이 존재합니다.',
        text: `문항의 개수는 최소 1개 이상입니다.`,
      });
      return false;
    }

    const validationResultPromise = validQuestions.map(async (question) => {
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
        return false;
      }

      return true;
    });

    const validationResults: boolean[] = await Promise.all(
      validationResultPromise
    );

    return validationResults.every(Boolean);
  };

  /**
   * 모든 선택지(단일 선택형, 선택시 문항 이동형, 다중 선택형)에 대해서 선택지 정보를 검증하기 위한 메서드 입니다.
   *
   * @returns 성공시 true, 실패시 false
   * @author 강명관
   */
  const totalSelectionValidation = (validQuestions: QuestionProps[]) => {
    const questionSelectionType = [
      QuestionTypeEnum.SINGLE_QUESTION.toString(),
      QuestionTypeEnum.MOVEABLE_QUESTION.toString(),
      QuestionTypeEnum.MULTIPLE_QUESTION.toString(),
    ];

    const totalSelectionValidationResult = validQuestions
      .filter((question) =>
        questionSelectionType.includes(question.questionType)
      )
      .map((selectionTypeQuestion) => {
        if (
          selectionTypeQuestion.questionType ===
          QuestionTypeEnum.MOVEABLE_QUESTION
        ) {
          return validationMoveableSelection(selectionTypeQuestion.selections);
        }
        return validationGeneralSelection(selectionTypeQuestion.selections);
      });

    return totalSelectionValidationResult.every(Boolean);
  };

  /**
   * 전체 하나의 설문 (설문 정보, 문항, 선택지)을 검증하기 위한 메서드 입니다.
   *
   * @return 전체 모든 validation이 통과하면 true, 실패할 경우 false
   * @author 강명관
   */
  const validationSurvey = async (
    validQuestions: QuestionProps[]
  ): Promise<boolean> => {
    const [surveyInfoResult, questionResult] = await Promise.all([
      validationSurveyInfo(),
      validationQuestion(validQuestions),
    ]);

    const selectionResult = totalSelectionValidation(validQuestions);

    if (!surveyInfoResult) {
      Swal.fire({
        icon: 'error',
        title: '설문 정보가 올바르지 않습니다.',
        text: `설문 작성 정보를 다시 확인해주세요`,
      });
      return false;
    }

    if (!questionResult) {
      Swal.fire({
        icon: 'error',
        title: '문항 정보가 올바르지 않습니다.',
        text: `문항 작성 정보를 다시 확인해주세요`,
      });
      return false;
    }

    if (!selectionResult) {
      Swal.fire({
        icon: 'error',
        title: '선택지 정보가 올바르지 않습니다.',
        text: `선태지 작성 정보를 다시 확인해주세요`,
      });
      return false;
    }

    return true;
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

    const validationResult = await validationSurvey(questions);

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
      <FloatingActionButtons
        onClickAddQuestion={handleAddQuestion}
        surveyInfo={surveyInfo}
        surveyImage={surveyImage || undefined}
        questions={questions}
      />
    </Container>
  );
}

export default CreationSurvey;
