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

function WordCloudTest({ wordCloud }: WordCloudProps): JSX.Element | null {
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
    return Math.max(10, 50 - text.length * 2);
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
          .style('font-size', (d) => calculateSizeBasedOnLength(d.text))
          .style('fill', 'steelblue')
          .attr('text-anchor', 'middle')
          .text((d) => d.text);

        layout.start();
      }
    }
  }, [wordCloudData, width, height]);

  return <svg ref={svgRef} />;
}

export default WordCloudTest;
