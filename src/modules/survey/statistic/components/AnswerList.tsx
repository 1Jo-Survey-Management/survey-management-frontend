import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ListData } from '../types/SurveyStatistics';
import '../../../../global.css';
import { Selection } from '../StatisticsPage2';

interface selectionList {
  selectList: Selection[];
}

export default function AnswerList({ selectList }: selectionList) {
  // console.log('리스트 들어옴 : ' + JSON.stringify(selectList, null, 2));

  const fontFamily = "'Noto Sans KR', sans-serif";
  const textStyle = {
    fontFamily,
  };
  const [selectStat, setSelectStat] = useState<Selection[]>([]);
  const [selectStats, setSelectStats] = useState<Selection[]>([]);

  const incrementValue = 0; // 동적으로 받은 증가할 값을 지정
  useEffect(() => {
    // selectList가 변경될 때만 실행되며, selectList를 selectStat에 할당합니다.
    setSelectStat(selectList);
  }, [selectList]);

  useEffect(() => {
    // selectStat가 변경될 때만 실행되며, updateArrayList를 생성하고 selectStats를 업데이트합니다.
    const updateArrayLists = selectList.reduce((acc, word) => {
      console.log(`acc?? : ${JSON.stringify(acc, null, 2)}`);
      console.log(`word?? : ${JSON.stringify(word, null, 2)}`);
      return updateArrayList(acc, word.surveySubjectiveAnswer);
    }, selectStats);

    setSelectStats(updateArrayLists);
  }, [selectList]);

  // console.log(
  //   'updateArrayLists 체크 : ' + JSON.stringify(selectStats, null, 2)
  // );

  function updateArrayList(
    data: Selection[],
    newSurveySubjectiveAnswer: string
  ) {
    // newText와 동일한 텍스트가 이미 배열에 있는지 확인합니다.
    const existingWord = data.find(
      (item: { surveySubjectiveAnswer: string }) =>
        item.surveySubjectiveAnswer === newSurveySubjectiveAnswer
    );

    if (existingWord) {
      // 이미 있는 단어인 경우, 해당 단어의 값을 증가시킵니다.
      console.log(`existingWord : ${existingWord}`);
      existingWord.surveySubjectiveAnswerCount += 1;
    } else {
      // 새로운 단어인 경우, 배열에 새로운 항목을 추가합니다.
      console.log(`새로운 단어 !! : ${newSurveySubjectiveAnswer}`);
      data.push({
        surveySubjectiveAnswer: newSurveySubjectiveAnswer,
        surveyPostAt: '',
        userNickname: '',
        surveyNo: 0,
        surveyTitle: '',
        surveyQuestionNo: 0,
        surveyQuestionTitle: '',
        questionTypeNo: 0,
        selectionNo: 0,
        selectionValue: '',
        selectionCount: 0,
        surveySubjectiveAnswerCount: 1,
        surveyWriter: '',
      });
    }

    return data;
  }

  return (
    <div>
      <br />
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 250 }}
        style={textStyle}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>답변 번호</TableCell>
              <TableCell>답변</TableCell>
              <TableCell>답변수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectStats.map((row, index) => (
              <TableRow
                component="th"
                scope="row"
                key={index} // index를 사용
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" width={100}>
                  {index + 1} {/* 1부터 시작하는 번호로 표시 */}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.Answer}
                </TableCell>
                {/* 중복된 답변수 */}
                <TableCell component="th" scope="row">
                  {row.surveySubjectiveAnswerCount}
                </TableCell>
                {/* 중복된 답변수 */}
                <TableCell component="th" scope="row">
                  {row.surveySubjectiveAnswerCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
