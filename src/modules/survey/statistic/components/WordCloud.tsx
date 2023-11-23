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

  const [width] = useState<number>(window.innerWidth < 600 ? 300 : 500);
  const [height] = useState<number>(window.innerWidth < 600 ? 200 : 500);

  const incrementValue = 10;

  const updateWordCloud = () => {
    const updatedWordCloudData = wordCloud.reduce(
      (acc, word) => updateWordCloudData(acc, word.text, incrementValue),
      [...wordCloudData]
    );

    setWordCloudData(updatedWordCloudData);
  };

  useEffect(() => {
    updateWordCloud();
  }, [wordCloud]);

  useEffect(() => {
    if (wordCloudData && wordCloudData.length && width && height) {
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
              rotate: Math.random() * 90 - 45, // 무작위 회전 각도 (-45도에서 45도 사이)
            }))
          )

          .padding(5)
          .rotate(() => Math.random() * 90 - 45) // 무작위 회전 각도 (-45도에서 45도 사이)
          .fontSize((d) => d.size + 40)
          .on('end', (wordData) => {
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
                      ? Math.random() * 130 + 55 // 600px 이하일 때
                      : Math.random() * 250 + 90 // 600px 초과일 때
                  },${
                    window.innerWidth <= 600
                      ? Math.random() * 140 + 35
                      : Math.random() * 250 + 90
                  }) rotate(${Math.random() * 90 - 45})`
              )
              .style('font-size', (d) => `${d.size}px`)
              .style('fill', 'steelblue')
              .attr('text-anchor', 'middle')
              .text((d) => d.text);
          });

        layout.start();
      }
    }
  }, [wordCloudData, width, height]);

  return <svg ref={svgRef} />;
}

export default WordCloudTest;
