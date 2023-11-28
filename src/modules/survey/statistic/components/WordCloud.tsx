import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

interface WordCloudProps {
  wordCloud: { text: string; size: number }[];
}

function updateWordCloudData(
  wordCloudData: { text: string; size: number }[],
  newText: string,
  incrementValue: number
): { text: string; size: number }[] {
  const existingWord = wordCloudData.find((item) => item.text === newText);

  if (existingWord) {
    existingWord.size += incrementValue + 10;
  } else {
    wordCloudData.push({ text: newText, size: incrementValue });
  }

  return wordCloudData;
}

const generateRandomPastelColor = (): string => {
  const pastelColors = [
    '#FFD1DC', // 연한 분홍
    '#FFA07A', // 연한 주황
    '#FFB6C1', // 연한 분홍
    '#FFDEAD', // 연한 베이지
    '#87CEEB', // 연한 하늘색
    '#98FB98', // 연한 녹색
    '#DDA0DD', // 연한 보라
    '#FFD700', // 연한 금색
  ];

  return pastelColors[Math.floor(Math.random() * pastelColors.length)];
};

function WordCloud({ wordCloud }: WordCloudProps): JSX.Element | null {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [wordCloudData, setWordCloudData] = useState<
    { text: string; size: number }[]
  >([]);

  const [width] = useState<number>(window.innerWidth < 600 ? 300 : 800);
  const [height] = useState<number>(window.innerWidth < 600 ? 200 : 600);

  const incrementValue = 10;

  const updateWordCloud = () => {
    const updatedWordCloudData = wordCloud.reduce(
      (acc, word) => updateWordCloudData(acc, word.text, incrementValue),
      [...wordCloudData]
    );

    setWordCloudData(updatedWordCloudData);
  };

  function calculateSizeBasedOnLength(text: string) {
    return Math.max(10, 30 - text.length * 2);
  }

  useEffect(() => {
    updateWordCloud();
  }, [wordCloud]);

  useEffect(() => {
    if (wordCloudData) {
      const svg = svgRef.current;

      if (svg) {
        const selection = d3
          .select<SVGSVGElement, unknown>(svg)
          .attr('width', width)
          .attr('height', height);

        const layout = cloud<{ text: string; size: number }>()
          .size([width, height])
          .words(
            wordCloudData.map((d) => ({
              text: d.text,
              size: d.size,
            }))
          )
          .padding(5)
          .rotate(() => Math.random() * 90 - 45);

        const wordData = layout.words();

        selection
          .selectAll('text')
          .data(wordData)
          .enter()
          .append('text')
          .attr(
            'transform',
            () =>
              `translate(${
                window.innerWidth <= 600
                  ? Math.random() * 110 + 105 // 600px 이하일 때
                  : Math.random() * 200 + 210 // 600px 초과일 때
              },${
                window.innerWidth <= 600
                  ? Math.random() * 60 + 61
                  : Math.random() * 200 + 210
              }) rotate(${Math.random() * 90 - 45})`
          )
          .style('font-size', `${window.innerWidth <= 600 ? 20 : 70}`)
          .style(
            'font-size',
            (d) =>
              `${
                window.innerWidth <= 600
                  ? d.size + calculateSizeBasedOnLength(d.text)
                  : d.size + 20 + calculateSizeBasedOnLength(d.text)
              }`
          )
          .style('fill', () => generateRandomPastelColor())
          .attr('text-anchor', 'middle')
          .text((d) => d.text);

        layout.start();
      }
    }
  }, [wordCloudData, width, height]);

  return <svg ref={svgRef} />;
}

export default WordCloud;
