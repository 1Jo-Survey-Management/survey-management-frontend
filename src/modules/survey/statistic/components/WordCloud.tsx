import React from 'react';
import ReactWordcloud, { Options } from 'react-wordcloud';

const wordCloudData = [
  { text: 'React', value: 100 },
  { text: 'JavaScript', value: 80 },
  { text: 'Web', value: 70 },
  { text: 'Component', value: 50 },
  // 추가 워드 데이터
];

const options: Options = {
  fontFamily: 'Arial',
  colors: ['#000000', '#333333', '#666666', '#999999'],
  rotations: 0,
  rotationAngles: [0, 0],
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
    xmlns: 'http://www.w3.org/2000/svg', // SVG 네임스페이스
    viewBox: '0 0 500 500', // 뷰박스 설정
    // 원하는 다른 SVG 속성 추가
  },
  textAttributes: {
    fill: 'red', // 텍스트 색상
    // fontSize: 20,           // 글꼴 크기
    fontWeight: 'bold', // 글꼴 두껍게 설정
    // 원하는 다른 텍스트 속성 추가
  },
  tooltipOptions: {
    // tooltipEnabled: true,   // 툴팁 활성화 여부
    // tooltipClassName: 'custom-tooltip',  // 사용자 정의 툴팁 클래스 이름
    // 원하는 다른 툴팁 옵션 추가
  },
};

const WordCloud: React.FC = () => {
  return (
    <div style={{ width: '500px', height: '500px' }}>
      <ReactWordcloud words={wordCloudData} options={options} />
    </div>
  );
};

export default WordCloud;
