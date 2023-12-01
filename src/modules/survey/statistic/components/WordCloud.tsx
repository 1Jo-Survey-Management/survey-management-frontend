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
    '#FF0000', // 빨강
    '#00FF00', // 초록
    '#0000FF', // 파랑
    '#FF00FF', // 핑크
    '#800000', // 갈색
    '#008000', // 올리브
    '#000080', // 네이비
    '#FFA500', // 주황
    '#A52A2A', // 갈색
    '#800080', // 자주
    '#808000', // 올리브
    '#FF6347', // 토마토
    '#2F4F4F', // 슬레이트 그레이
    '#4682B4', // 스틸 블루
    '#556B2F', // 다크 올리브 그린
    '#8B4513', // 시에나 갈색
    '#9932CC', // 다크 오치드
  ];

  return pastelColors[Math.floor(Math.random() * pastelColors.length)];
};

function WordCloud({ wordCloud }: WordCloudProps): JSX.Element | null {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [wordCloudData, setWordCloudData] = useState<
    { text: string; size: number }[]
  >([]);

  const [width] = useState<number>(window.innerWidth < 600 ? 350 : 800);
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
  // const widthPadding = 20;
  const widthThreshold = 600;
  const heightPadding = width <= widthThreshold ? 4 : 25;

  const checkCollision = (x: number, y: number): boolean =>
    placedWords.current.some(
      (word) => y > word.y - heightPadding && y < word.y + heightPadding
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
          .spiral('rectangular')
          .rotate(() => Math.random() * 90);

        const wordData = layout.words();

        selection
          .selectAll('text')
          .data(wordData)
          .enter()
          .append('text')
          .attr('transform', () => {
            let x;
            let y;
            do {
              x =
                window.innerWidth <= 600
                  ? Math.random() * 300 + 20
                  : Math.random() * 600 + 100;
              y =
                window.innerWidth <= 600
                  ? Math.random() * 180 + 15
                  : Math.random() * 400 + 100;
            } while (checkCollision(x, y));

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
