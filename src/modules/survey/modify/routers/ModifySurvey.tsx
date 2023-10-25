/** @jsxImportSource @emotion/react */

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import CreateSurveyInfo from '../../creation/components/CreateSurveyInfo';
import DragDropQuestion from '../../creation/components/DragDropQuestions';
import FloatingActionButtons from '../../creation/components/FloatingActionButtons';
import { tagNames } from '../../creation/constant/SurveyCreationConstant';
import {
  QuestionProps,
  SelectionProps,
  SurveyInfoProps,
} from '../../creation/types/SurveyTypes';
import { QuestionTypeEnum } from '../../enums/QuestionTypeEnum';
import { validationSurveyWithoutSurveyImage } from '../../creation/util/ValidatorUtil';

interface ModifySurveyProps {
  surveyInfo: SurveyInfoProps;
  questions: QuestionProps[];
}

const styles = {
  buttonBox: css({
    display: 'flex',
    alignItems: 'center',
  }),

  cancleButtoon: css({
    marginRight: '20px',
  }),
};

const previewImageBaseUrl = 'http://localhost:8080/api/images/surveys/';

/**
 * 설문을 수정하는 페이지를 담당하는 페이지 입니다.
 * API를 통해 받은 데이터를 가공해야 됨으로 eslint no-explicit-any 규칙을 disable 하였습니다.
 *
 * @returns
 * @author 강명관
 */
function ModifySurvey() {
  const { surveyNo } = useParams();
  const navigate = useNavigate();

  const initialSurveyData: ModifySurveyProps = {
    surveyInfo: {
      surveyId: Number(surveyNo),
      surveyInfoId: Number(surveyNo),
      surveyTitle: '',
      surveyTags: [],
      surveyClosingAt: '',
      openStatusNo: 0,
      surveyDescription: '',
      surveyStatusNo: 0,
    },
    questions: [],
  };
  const [surveyInfo, setSurveyInfo] = useState<SurveyInfoProps>(
    initialSurveyData.surveyInfo
  );
  const [surveyImage, setSurveyImage] = useState<File>();
  const [questions, setQuestions] = useState<QuestionProps[]>(
    initialSurveyData.questions
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [previewImageUrl, setPreviewImageUrl] = useState<string>('');

  /**
   * 설문 수정을 위해 설문의 정보를 가져오는 API Call 메서드 입니다.
   *
   * @returns 설문의 정보를 담은 객체
   * @author 강명관
   */
  const getSurveyDetails = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/surveys/${surveyNo}`
    );
    if (response.status !== 200) {
      /**
       * FIXME: redirect mypage 내가 작성한 설문 페이지로 변경 예정
       */
      navigate('/login');
    }
    return response.data.content;
  };

  /**
   * 설문지에 대한 내용을 가져와서 state로 세팅해주는 메서드입니다.
   *
   * @param responseData 응답 데이터
   * @author 강명관
   */
  const settingResponseDataToState = (responseData: any) => {
    const surveyTagsOfTagName = responseData.tagNames.split(',');
    const surveyTagsOfIndex = surveyTagsOfTagName.map((tag: string) =>
      tagNames.indexOf(tag)
    );

    setSurveyInfo({
      surveyId: responseData.surveyId,
      surveyInfoId: responseData.surveyId,
      surveyTitle: responseData.surveyTitle,
      surveyTags: surveyTagsOfIndex,
      surveyClosingAt: responseData.surveyClosingAt,
      openStatusNo: responseData.openStatusNo,
      surveyDescription: responseData.surveyDescription,
      surveyStatusNo: responseData.surveyStatusNo,
    });

    const questionPropsArray: QuestionProps[] = responseData.questions.map(
      (question: any) => ({
        surveyId: question.surveyId,
        questionId: question.questionId,
        questionTitle: question.surveyQuestionTitle,
        questionDescription: question.surveyQuestionDescription,
        questionRequired: question.required,
        questionType: question.questionTypeNo.toString(),
        selections: question.selections.map((selection: any) => {
          const selectionProps: SelectionProps = {
            questionId: selection.questionId,
            selectionId: selection.selectionId,
            selectionValue: selection.selectionValue,
            isMoveable: selection.movable,
            isEndOfSurvey: selection.endOfSurvey,
          };

          if (selection.surveyQuestionMoveNo !== 0) {
            selectionProps.questionMoveId = selection.surveyQuestionMoveNo;
          }

          return selectionProps;
        }),
      })
    );

    setQuestions(questionPropsArray);
  };

  useEffect(() => {
    if (surveyNo === undefined || Number.isNaN(Number(surveyNo))) {
      /**
       * FIXME: redirect mypage 내가 작성한 설문 페이지로 변경 예정
       */
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const responseData = await getSurveyDetails();

        if (responseData) {
          settingResponseDataToState(responseData);
        }

        setPreviewImageUrl(`${previewImageBaseUrl}${surveyNo}`);

        setIsLoading(false);
      } catch (error) {
        /**
         * FIXME: redirect mypage 내가 작성한 설문 페이지로 변경 예정
         */
        navigate('/login');
      }
    };

    fetchData();
  }, []);

  /**
   * 설문 수정에서 문항을 추가하는 메서드 입니다.
   *
   * @author 강명관
   */
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        surveyId: 0,
        questionId: new Date().getTime(),
        questionTitle: '',
        questionDescription: '',
        questionType: QuestionTypeEnum.SINGLE_QUESTION,
        questionRequired: true,
        selections: [],
      },
    ]);
  };

  const handleModifyCancle = () => {};

  /**
   * 설문 수정을 제출하는 메서드 입니다.
   *
   * @author 강명관
   */
  const handleModifySubmit = async () => {
    const validationResult = await validationSurveyWithoutSurveyImage(
      surveyInfo,
      questions
    );

    if (!validationResult) {
      return;
    }

    const formData = new FormData();
    formData.append('surveyInfoUpdateDto', JSON.stringify(surveyInfo));
    formData.append('surveyQuestionCreateDtoList', JSON.stringify(questions));

    if (surveyImage !== undefined) {
      formData.append('surveyImage', surveyImage);
    }

    try {
      const response = await axios.put(
        'http://localhost:8080/api/surveys',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '설문 수정이 완료되었습니다!',
        });
        navigate('/login');
      } else {
        Swal.fire({
          icon: 'error',
          title: '설문 수정에 실패 헀습니다.',
          text: `다시 시도해 주세요`,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: '설문 수정에 실패 헀습니다.',
        text: `다시 시도해 주세요`,
      });
    }
  };

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Container css={{ marginTop: '30px' }}>
      {surveyInfo && (
        <CreateSurveyInfo
          surveyInfo={surveyInfo}
          setSurveyInfo={setSurveyInfo}
          previewImage={previewImageUrl}
          setSurveyImage={setSurveyImage}
        />
      )}

      {questions && (
        <DragDropQuestion questions={questions} setQuestions={setQuestions} />
      )}

      <FloatingActionButtons
        onClickAddQuestion={handleAddQuestion}
        surveyInfo={surveyInfo}
        surveyImage={surveyImage}
        questions={questions}
        previewImageUrl={previewImageUrl}
      />

      <Box css={styles.buttonBox}>
        <Button
          variant="contained"
          color="error"
          css={styles.cancleButtoon}
          onClick={handleModifyCancle}
        >
          취소하기
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleModifySubmit}
        >
          수정하기
        </Button>
      </Box>
    </Container>
  );
}

export default ModifySurvey;
