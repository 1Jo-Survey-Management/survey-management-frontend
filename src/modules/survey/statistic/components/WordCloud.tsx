// import React, { useEffect, useState } from 'react';
// import ReactWordcloud, { Options, Word } from 'react-wordcloud';

// interface WordCloudProps {
//   wordCloud: Word[];
// }

// function updateWordCloudData(
//   wordCloudData: any[],
//   newText: string,
//   incrementValue: number
// ) {
//   const existingWord = wordCloudData.find(
//     (item: { text: any }) => item.text === newText
//   );

//   if (existingWord) {
//     existingWord.value += incrementValue + 10;
//   } else {
//     wordCloudData.push({ text: newText, value: incrementValue });
//   }

//   return wordCloudData;
// }

// const responsiveOptions: Options = {
//   fontFamily: 'Arial',
//   colors: ['#FF5733', '#FFA233', '#FFCC33', '#FF33E9', '#33FF5D', '#339BFF'],
//   rotations: 30,
//   rotationAngles: [20, 10],
//   deterministic: false,
//   enableOptimizations: false,
//   enableTooltip: false,
//   fontSizes: [10, 50],
//   fontStyle: '',
//   fontWeight: '',
//   padding: 0,
//   scale: 'linear',
//   spiral: 'archimedean',
//   transitionDuration: 0,
//   svgAttributes: {
//     xmlns: 'http://www.w3.org/2000/svg',
//     viewBox: '20 20 250 250',
//     height: '200',
//     width: '200',
//   },
//   textAttributes: {
//     fontWeight: 'bold',
//   },
//   tooltipOptions: {},
// };

// function WordCloud({ wordCloud }: WordCloudProps) {
//   const [wordCloudData, setWordCloudData] = useState<Word[]>([]);

//   const incrementValue = 0;
//   useEffect(() => {
//     const updatedWordCloudData = wordCloud.reduce(
//       (acc, word) => updateWordCloudData(acc, word.text, incrementValue),
//       wordCloudData
//     );

//     setWordCloudData(updatedWordCloudData);
//   }, [wordCloud, incrementValue]);

//   return (
//     <div
//       style={{
//         width: '100%',
//         maxWidth: '100%',
//         height: 'auto',
//       }}
//     >
//       <ReactWordcloud words={wordCloudData} options={responsiveOptions} />
//     </div>
//   );
// }

// export default WordCloud;
