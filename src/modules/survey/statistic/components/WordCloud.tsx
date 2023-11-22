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

  const [width, setWidth] = useState<number>(800);
  const [height] = useState<number>(400);

  const incrementValue = 10;

  const updateWordCloud = () => {
    const updatedWordCloudData = wordCloud.reduce(
      (acc, word) => updateWordCloudData(acc, word.text, incrementValue),
      [...wordCloudData]
    );

    setWordCloudData(updatedWordCloudData);
  };

  useEffect(() => {
    const containerWidth = svgRef.current?.getBoundingClientRect().width;

    if (containerWidth) {
      setWidth(containerWidth);
    }

    const handleResize = () => {
      const newContainerWidth = svgRef.current?.getBoundingClientRect().width;

      if (newContainerWidth) {
        setWidth(newContainerWidth);
      }
    };

    window.addEventListener('resize', handleResize);

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
              x: Math.random() * width, // 무작위 x 좌표
              y: Math.random() * height, // 무작위 y 좌표
              rotate: Math.random() * 90 - 45, // 무작위 회전 각도 (-45도에서 45도 사이)
            }))
          )

          .padding(5)
          .rotate(() => Math.random() * 90 - 45) // 무작위 회전 각도 (-45도에서 45도 사이)
          .fontSize((d) => d.size)
          .on('end', (wordData) => {
            selection
              .selectAll('text')
              .data(wordData)
              .enter()
              .append('text')
              .attr(
                'transform',
                () =>
                  `translate(${Math.random() * width},${
                    Math.random() * height
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
    // }
  }, [wordCloudData, width, height]);

  return <svg ref={svgRef} />;
}

export default WordCloudTest;
