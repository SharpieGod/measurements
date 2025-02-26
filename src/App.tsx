import { useEffect, useState } from "react";

const VALUES: number[] = [250, 125, 80, 60, 15, 5, 2, 1];

type Combination = {
  comb: Record<number, number>;
  val: number;
  len: number;
  uniq: number;
};

function calculate(target: number): Combination {
  let combinations: Combination[] = [];

  for (let i = 0; i < VALUES.length; i++) {
    let v = VALUES[i];
    let curr: Combination = {
      comb: {},
      val: target,
      len: 0,
      uniq: 0,
    };
    let newTarget = target;

    for (let j = i; j < VALUES.length; j++) {
      let value = VALUES[j];
      if (Math.floor(newTarget / value) > 0) {
        curr.comb[value] = Math.floor(newTarget / value);
        curr.uniq++;
        curr.len += Math.floor(newTarget / value);
        newTarget -= Math.floor(newTarget / value) * value;
      }
    }

    combinations.push(curr);
  }

  combinations.sort((a, b) => a.len - b.len || a.uniq - b.uniq);
  return combinations[0];
}

const App = () => {
  const [inputText, setInputText] = useState("");
  const [target, setTarget] = useState(0);
  const [calculated, setCalculated] =
    useState<ReturnType<typeof calculate>>();
  useEffect(() => {
    if (isNaN(parseInt(inputText))) {
      setTarget(0);
      return;
    }

    setTarget(parseInt(inputText));
  }, [inputText]);

  useEffect(() => {
    setCalculated(calculate(target));
  }, [target]);
  return (
    <div className="rounded-lg shadow-xl mt-48 text-3xl w-3/5 mx-auto flex items-start flex-col gap-12 p-12">
      <div className="flex flex-col gap-3 w-full">
        <h1 className="text-3xl">
          Volume to Dry Measure & Measuring Spoons
        </h1>
        <input
          placeholder="Enter wanted value in mL"
          type="number"
          pattern="[1-9]*"
          className="invalid:border-red-300 w-full border-2 border-purple-400 focus:outline-none rounded-lg p-2 shadow-lg"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />
      </div>
      {/* <pre>{JSON.stringify(calculated)}</pre> */}
      <div className="flex flex-col gap-3">
        {calculated
          ? Object.keys(calculated["comb"]).map((k) => {
              const key = Number(k);

              return (
                <span key={key}>
                  {key} mL x {calculated["comb"][key]}
                </span>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default App;
