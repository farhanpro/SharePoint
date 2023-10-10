import * as React from 'react';
import type { IHelloWorldProps } from './IHelloWorldProps';
import { IHelloWorldState } from './IHelloWorldState';


export default class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldState> {
  constructor(props: IHelloWorldProps, state: IHelloWorldState) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  Adder() {
    console.log(this.state.count);
    this.setState({ count: this.state.count + 1 });
  }

  Reducer() {
    console.log(this.state.count);
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return (
      <div>
        <h1
          style={{
            color:
              this.state.count === 0
                ? "orange"
                : this.state.count > 0
                ? "green"
                : "red",
          }}
        >
          Count = {this.state.count}
        </h1>
        <button onClick={() => this.Adder()}>Click to Add</button>
        <button onClick={() => this.Reducer()}>Reduce</button>
      </div>
    );
  }
}
