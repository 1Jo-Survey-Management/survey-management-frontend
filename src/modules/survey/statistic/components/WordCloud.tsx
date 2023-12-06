import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import 'd3-array';

interface WordCloudProps {
  wordCloud: { text: string; size: number }[];
}

function updateWordCloudData(
  wordCloudData: { text: string }[],
  newText: string
  // incrementValue: number
): { text: string }[] {
  const existingWord = wordCloudData.find((item) => item.text === newText);

  if (existingWord) {
  } else {
    wordCloudData.push({ text: newText });
  }

  return wordCloudData;
}

function WordCloud({ wordCloud }: WordCloudProps): JSX.Element | any {
  const [wordCloudData, setWordCloudData] = useState<{ text: string }[]>([]);
  const updateWordCloud = () => {
    const updatedWordCloudData = wordCloud.reduce(
      (acc, word) => updateWordCloudData(acc, word.text),
      [...wordCloudData]
    );

    setWordCloudData(updatedWordCloudData);
  };

  useEffect(() => {
    updateWordCloud();
  }, [wordCloud]);

  const wordCloudDataString = JSON.stringify(wordCloudData);

  d3.text(wordCloudDataString).then((text) => {
    const stopwords = new Set(
      "i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall".split(
        ','
      )
    );
    const words = text
      .trim()
      .split(/[\s.]+/g)
      .map((w) => w.replace(/^[“‘"\-—()[\]{}]+/g, ''))
      .map((w) => w.replace(/[;:.!?()[\]{},"'’”\-—]+$/g, ''))
      .map((w) => w.replace(/['’]s$/g, ''))
      .map((w) => w.substring(0, 30))
      .map((w) => w.toLowerCase())
      .filter((w) => w && !stopwords.has(w));

    var fontFamily = 'sans-serif';
    var fontScale = 15;
    var padding = 0;
    var height = 500;
    var width = 700;
    const rotate = () => 0; // () => (~~(Math.random() * 6) - 3) * 30

    var data = d3
      .rollups(
        words,
        (group) => group.length,
        (w) => w
      )
      .sort(([, a], [, b]) => d3.descending(a, b))
      .slice(0, 250)
      .map(([text, value]) => ({ text, value }));
    console.log(data);

    const svg = d3
      .select('#word-cloud-div')
      .append('svg')
      .attr('height', height)
      .attr('width', width)
      .attr('font-family', fontFamily)
      .attr('text-anchor', 'middle');

    const w_cloud = cloud()
      .size([width, height])
      .words(data.map((d) => Object.create(d)))
      .padding(padding)
      .rotate(rotate)
      .font(fontFamily)
      .fontSize((d) =>
        typeof d.size === 'number' ? Math.sqrt(d.size) * fontScale : 0
      ) // 값이 숫자가 아닐 때 기본값 0 사용
      .on('word', ({ size, x, y, rotate, text }) => {
        return svg
          .append('text')
          .attr('font-size', size as number)
          .attr('transform', `translate(${x},${y}) rotate(${rotate})`)
          .text(text as string);
      });

    w_cloud.start();
  });
}

export default WordCloud;
