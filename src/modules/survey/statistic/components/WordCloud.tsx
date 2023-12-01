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
    existingWord.size += incrementValue;
  } else {
    wordCloudData.push({ text: newText, size: incrementValue });
  }

  return wordCloudData;
}

const generateRandomPastelColor = (): string => {
  const pastelColors = [
    '#FF6E8B', // 진한 분홍
    '#FF8C69', // 진한 주황
    '#9400D3', // 진한 보라
    '#9ACD32', // 진한 녹색
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
  const placedWords = useRef<{ x: number; y: number }[]>([]);

  const incrementValue = 1;

  const updateWordCloud = () => {
    const updatedWordCloudData = wordCloud.reduce(
      (acc, word) => updateWordCloudData(acc, word.text, incrementValue),
      [...wordCloudData]
    );

    updatedWordCloudData.sort((a, b) => b.size - a.size);

    const trimmedWordCloudData = updatedWordCloudData.slice(0, 10);

    setWordCloudData(trimmedWordCloudData);
  };

  function calculateSizeBasedOnLength(text: string) {
    return Math.max(10, 30 - text.length * 2);
  }
  const padding = 150; // 적절한 패딩 값 설정
  const checkCollision = (x: number, y: number): boolean =>
    placedWords.current.some(
      (word) =>
        x > word.x - padding &&
        x < word.x + padding &&
        y > word.y - padding &&
        y < word.y + padding
    );

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
          // .padding(20)
          .spiral('rectangular')
          .rotate(() => Math.random() * 90);

        const wordData = layout.words();

        selection
          .selectAll('text')
          .data(wordData)
          .enter()
          .append('text')
          .attr('transform', () => {
            // 새로운 단어의 위치를 계산하고 충돌 확인
            let x;
            let y;
            do {
              x =
                window.innerWidth <= 600
                  ? Math.random() * 110 + 105
                  : Math.random() * 600 + 100;
              y =
                window.innerWidth <= 600
                  ? Math.random() * 60 + 61
                  : Math.random() * 400 + 100;
            } while (checkCollision(x, y)); // 충돌이 발생하면 다시 계산

            // 위치를 저장
            placedWords.current.push({ x, y });

            return `translate(${x},${y}) `;
          })
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
