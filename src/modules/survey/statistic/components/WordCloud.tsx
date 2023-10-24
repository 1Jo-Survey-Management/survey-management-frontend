import React, { useEffect, useState } from 'react';
import ReactWordcloud, { Options, Word } from 'react-wordcloud';

// const [wordCloud, setWordCloud] = useState<Word[]>([]);

interface WordCloudProps {
  wordCloud: Word[];
}

// useEffect로 가져온 객체의 각 응답별 text를 wordCloudData에 저장하도록 한다.

// useEffect(() => {
// console.log('props 체크 : ' + wordCloud);
// 각 응답별 단답형 뽑아서 newText에 넣어서 세팅하기
// setWordCloudData(updateWordCloudData(wordCloudData, newText, incrementValue));
// }, []);

function updateWordCloudData(
  wordCloudData: any[],
  newText: string,
  incrementValue: number
) {
  // newText와 동일한 텍스트가 이미 배열에 있는지 확인합니다.
  const existingWord = wordCloudData.find(
    (item: { text: any }) => item.text === newText
  );

  if (existingWord) {
    // 이미 있는 단어인 경우, 해당 단어의 값을 증가시킵니다.
    existingWord.value += incrementValue + 10;
  } else {
    // 새로운 단어인 경우, 배열에 새로운 항목을 추가합니다.
    wordCloudData.push({ text: newText, value: incrementValue });
  }

  return wordCloudData;
}

const responsiveOptions: Options = {
  fontFamily: 'Arial',
  colors: ['#FF5733', '#FFA233', '#FFCC33', '#FF33E9', '#33FF5D', '#339BFF'],
  rotations: 10,
  rotationAngles: [20, 10],
  deterministic: false,
  enableOptimizations: false,
  enableTooltip: false,
  fontSizes: [10, 50],
  fontStyle: '',
  fontWeight: '',
  padding: 0,
  scale: 'linear',
  spiral: 'archimedean',
  transitionDuration: 0,
  svgAttributes: {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '20 20 250 250',
    height: '200',
    width: '200',
  },
  textAttributes: {
    // fill: 'red',
    fontWeight: 'bold',
  },
  tooltipOptions: {
    // tooltipEnabled: true,   // 툴팁 활성화 여부
    // tooltipClassName: 'custom-tooltip',  // 사용자 정의 툴팁 클래스 이름
    // 원하는 다른 툴팁 옵션 추가
  },
};

function WordCloud({ wordCloud }: WordCloudProps) {
  console.log('워드 클라우드 들어옴' + JSON.stringify(wordCloud, null, 2));

  const [wordCloudData, setWordCloudData] = useState<Word[]>([]);

  const incrementValue = 0; // 동적으로 받은 증가할 값을 지정

  useEffect(() => {
    // wordCloud 배열을 기반으로 wordCloudData 업데이트
    const updatedWordCloudData = wordCloud.reduce((acc, word) => {
      return updateWordCloudData(acc, word.text, incrementValue);
    }, wordCloudData);

    setWordCloudData(updatedWordCloudData);
  }, [wordCloud, incrementValue]);

  // useEffect(() => {
  //   const updatedWordCloud = wordCloud.map((word) => {
  //     return {
  //       ...word,
  //       text: word.text,
  //     };

  //   });

  //   setWordCloudData(updatedWordCloud);
  // }, [wordCloud, incrementValue]);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '100%',
        height: 'auto',
      }}
    >
      <ReactWordcloud words={wordCloudData} options={responsiveOptions} />
    </div>
  );
}

export default WordCloud;
