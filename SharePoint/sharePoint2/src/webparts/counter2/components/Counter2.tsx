import * as React from 'react';
import type { ICounter2Props } from './ICounter2Props';
import { ICounterState } from './ICounter2State';

export default class Counter2 extends React.Component<ICounter2Props, ICounterState> {
  constructor (props: ICounter2Props){
      super(props);
      this.state = {
        counter : 0
      }
  }

   handleAdd = () =>{
      this.setState({counter: this.state.counter +1});
    }
  handleSub = () =>{
      this.setState({counter: this.state.counter -1});
    }
  public render(): React.ReactElement<ICounter2Props> {
    
    return (
      <div>
        <h1 style={{
            color:
              this.state.counter === 0
                ? "orange"
                : this.state.counter > 0
                ? "green"
                : "red",
          }}>Counter := {this.state.counter}</h1>
        <button onClick={this.handleAdd}> Add</button>
        <button onClick={this.handleSub}>Substract </button>
      </div>
    );
  }
}
