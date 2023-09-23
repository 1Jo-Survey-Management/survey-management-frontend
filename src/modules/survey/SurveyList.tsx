import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Survey {
  surveyNo: number;
  surveyTitle: string;
  surveyDescription: string;
  tags: { tag_no: number; tag_name: string }[]; // 객체 배열로 변경
}

function SurveyList() {
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    // Spring Boot API에서 설문 정보를 가져옵니다.
    axios
      .get<Survey[]>('http://localhost:8000/api/prac/surveys')
      .then((response) => {
        const surveyData = response.data;
        console.log('Survey Data:', surveyData);

        // 설문 정보를 그룹화하는 객체
        const groupedSurveys: { [key: number]: Survey } = {};

        // Spring Boot에서 받아온 데이터를 surveys 객체에 그룹화
        surveyData.forEach((item) => {
          const { surveyNo, surveyTitle, surveyDescription, tags } = item;
          if (!groupedSurveys[surveyNo]) {
            groupedSurveys[surveyNo] = {
              surveyNo,
              surveyTitle,
              surveyDescription,
              tags: [], // 태그 정보를 배열로 관리
            };
          }
          if (tags) {
            groupedSurveys[surveyNo].tags.push(...tags);
          }
        });

        // surveys 객체를 사용하여 설문 정보를 설정
        setSurveys(Object.values(groupedSurveys));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // ...

  return (
    <div>
      {surveys.map((survey) => (
        <div
          key={`survey-${survey.surveyNo}`} // 설문에 대한 고유한 키 생성
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '20px',
          }}
        >
          <h2>{survey.surveyTitle}</h2>
          <p>{survey.surveyDescription}</p>
          <ul>
            {survey.tags.map((tag) => (
              <li key={`survey-${survey.surveyNo}-tag-${tag.tag_no}`}>
                {tag.tag_name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default SurveyList;
