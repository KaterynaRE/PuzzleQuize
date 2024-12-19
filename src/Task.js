import React, { useState } from "react";
import { ReadFile } from "./ReadFile";

const Task = () => {
  const [numbers, setNumbers] = useState([]);
  const [result, setResult] = useState("");

  const funcReadFile = (e) => {
    const file = e.target.files[0];
    ReadFile(file, setNumbers);
  };

  const findLongest = (allNums) => {
    let longestNumbers = "";

    const buildLongest = (currentSeq, nextSeq, pairs) => {
      const endingNumber = currentSeq[currentSeq.length - 1].slice(-2);

      nextSeq.forEach((currentNums, i) => {
        const firstNumSecondNumb = currentNums.slice(0, 2);
        const lastTwoDigitFirstTwoDig = `${endingNumber}-${firstNumSecondNumb}`;

        if (endingNumber === firstNumSecondNumb && !pairs.has(lastTwoDigitFirstTwoDig)) {
          pairs.add(lastTwoDigitFirstTwoDig);
          const newNumbers = currentSeq[currentSeq.length - 1] + currentNums.slice(2);
          buildLongest([...currentSeq.slice(0, -1), newNumbers], nextSeq.filter((_, j) => j !== i), new Set(pairs));
          pairs.delete(lastTwoDigitFirstTwoDig);
        }
      });

      const sequence = currentSeq.join("");
      if (sequence.length > longestNumbers.length) longestNumbers = sequence;
    };

    allNums.forEach((currentNums, i) => buildLongest([currentNums], allNums.filter((_, j) => j !== i), new Set()));

    return longestNumbers;
  };

  const funcRunFind = () => setResult(findLongest(numbers));

  return (
    <div>
      <h1>Цифровий пазл</h1>
      <input type="file" accept=".txt" onChange={funcReadFile} />
      <button onClick={funcRunFind}>Розв'язати пазл</button>
      {result && (
        <div>
          <h2>Найдовша послідовність:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default Task;
