import * as React from "react";
import type { ICalculatorProps } from "./ICalculatorProps";
import { ICalculatorState } from "./ICalcilatorState";

export default class Calculator extends React.Component<
  ICalculatorProps,
  ICalculatorState
> {
  constructor(props: ICalculatorProps) {
    super(props);
    this.state = {
      input1: 0,
      input2: 0,
      output: 0,
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, inputField: "input1" | "input2") => {
    const value = parseFloat(event.target.value) || 0;
    this.setState({ [inputField]: value } as Pick<ICalculatorState, "input1" | "input2">);
  };

  handleOperation = (operation: "+" | "-" | "*" | "/") => {
    const { input1, input2 } = this.state;
    let result = 0;

    switch (operation) {
      case "+":
        result = input1 + input2;
        break;
      case "-":
        result = input1 - input2;
        break;
      case "*":
        result = input1 * input2;
        break;
      case "/":
        result = input1 / input2;
        break;
      default:
        break;
    }

    this.setState({ output: result });
  };

  render() {
    const { input1, input2, output } = this.state;

    return (
      <div>
        <h1>Calculator</h1>
        <div>
          <label>Input 1:</label>
          <input type="number" value={input1} onChange={(e) => this.handleInputChange(e, "input1")} />
        </div>
        <div>
          <label>Input 2:</label>
          <input type="number" value={input2} onChange={(e) => this.handleInputChange(e, "input2")} />
        </div>
        <div>  
          <button onClick={() => this.handleOperation("+")}>+</button>
          <button onClick={() => this.handleOperation("-")}>-</button>
          <button onClick={() => this.handleOperation("*")}>*</button>
          <button onClick={() => this.handleOperation("/")}>/</button>
        </div>
        <div>
          <label>Result:</label>
          <span>{output}</span>
        </div>
      </div>
    );
  }
}
