import React from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DragEndDetails,
} from 'react-beautiful-dnd';
import { QuestionProps } from '../types/SurveyTypes';
import CreateQuestion from './CreateQuestion';

interface DragDropQuestionProps {
  questions: QuestionProps[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionProps[]>>;
}

function DragDropQuestion({ questions, setQuestions }: DragDropQuestionProps) {
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
  );
}

export default DragDropQuestion;
