import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

export default function Content(
  surveyTitle: string,
  surveyClosingAt: Date,
  userNickName: string,
  userImage: string,
  surveyStatusName: string,
  tagName: string,
  surveyAttendCount: number
) {
  return (
    <div>
      <h3>{surveyTitle}</h3>
      <p> {surveyClosingAt.toLocaleString()}</p>
      <p> {userNickName}</p>
      <p> {userImage}</p>
      <p> {surveyStatusName}</p>
      <p> {tagName}</p>
      <p> {surveyAttendCount}</p>
    </div>
  );
  // const [data, setData] = useState<SurveyList>({});

  // useEffect(() => {
  //   const getData = async() => {
  //     const result = await axios.get('localhost:8081/test/closing');
  //     setData(result);
  //   }
  // },[]);
}
