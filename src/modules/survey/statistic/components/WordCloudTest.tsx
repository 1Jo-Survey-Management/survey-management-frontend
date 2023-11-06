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
  console.log('들어왔는지 확인 : ' + JSON.stringify(wordCloud));

  const svgRef = useRef<SVGSVGElement | null>(null);

  const [wordCloudData, setWordCloudData] = useState<
    { text: string; size: number }[]
  >([]);

  const incrementValue = 10;

  useEffect(() => {
    const updatedWordCloudData = wordCloud.reduce(
      (acc, word) => {
        return updateWordCloudData(acc, word.text, incrementValue);
      },
      [...wordCloudData]
    );

    setWordCloudData(updatedWordCloudData);
  }, [wordCloud, incrementValue]);

  useEffect(() => {
    if (wordCloudData && wordCloudData.length) {
      console.log(
        '워드클라우드 다음내용 : ' + JSON.stringify(wordCloudData, null, 2)
      );
      const width = 800;
      const height = 400;
      const svg = svgRef.current;

      if (svg) {
        const selection = d3
          .select<SVGSVGElement, unknown>(svg)
          .attr('width', width)
          .attr('height', height);

        const layout = cloud<{ text: string; size: number }>()
          .size([width, height])
          .words(wordCloudData)
          .padding(5)
          .rotate(0)
          .fontSize((d) => d.size)
          .on('end', (words) => {
            selection
              .append('g')
              .attr('transform', `translate(${width / 2},${height / 2})`)
              .selectAll('text')
              .data(words)
              .enter()
              .append('text')
              .style('font-size', (d) => `${d.size}px`)
              .style('fill', 'steelblue')
              .attr('text-anchor', 'middle')
              .text((d) => d.text);
          });

        layout.start();
      }
    }
  }, [wordCloudData]);

  return <svg ref={svgRef}></svg>;
}

export default WordCloudTest;
