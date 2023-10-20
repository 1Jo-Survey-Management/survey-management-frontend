import React from 'react';
import ReactWordcloud, { Options } from 'react-wordcloud';

const wordCloudData = [
  { text: '플랫화이트', value: 100 },
  { text: '바닐라라떼', value: 80 },
  { text: '인삼차', value: 70 },
  { text: '코카콜라', value: 50 },
  { text: '우리집물', value: 70 },
  { text: '우유', value: 5 },
  { text: '프라프치노', value: 100 },
  { text: '우리집강아지가먹던물', value: 10 },
  { text: '환타', value: 20 },
  { text: '더치커피', value: 10 },
];

const responsiveOptions: Options = {
  fontFamily: 'Arial',
  colors: ['#FF5733', '#FFA233', '#FFCC33', '#FF33E9', '#33FF5D', '#339BFF'],
  rotations: 10,
  rotationAngles: [20, 10],
  deterministic: false,
  enableOptimizations: false,
  enableTooltip: false,
  fontSizes: [10, 60],
  fontStyle: '',
  fontWeight: '',
  padding: 0,
  scale: 'linear',
  spiral: 'archimedean',
  transitionDuration: 0,
  svgAttributes: {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '40 0 700 700',
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

function WordCloud() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '500px',
        height: 'auto',
      }}
    >
      <ReactWordcloud words={wordCloudData} options={responsiveOptions} />
    </div>
  );
}

// export default WordCloud;
