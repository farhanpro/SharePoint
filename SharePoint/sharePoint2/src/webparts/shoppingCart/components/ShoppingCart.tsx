import * as React from "react";
import type { IShoppingCartProps } from "./IShoppingCartProps";
import { IShoppingCartState } from "./IShoppingCartState";
import { Button } from '@fluentui/react-components';

export default class ShoppingCart extends React.Component<
  IShoppingCartProps,
  IShoppingCartState
> {
  constructor(props: IShoppingCartProps) {
    super(props);
    this.state = { shoppingCart: '',cartArray :[] };
  }



  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ shoppingCart: event.target.value });
  };
  handleSubmit = () =>
  {
    const updatedCart   = [...this.state.cartArray, this.state.shoppingCart]
    this.setState({cartArray:updatedCart,shoppingCart:''})
  }
  handleDelete = () => 
  {
    const EditedCard = [...this.state.cartArray];
    const index  = EditedCard.indexOf(this.state.shoppingCart);
    
    if(index > -1){
      EditedCard.splice(index, 1);
    }
    this.setState({ cartArray: EditedCard , shoppingCart : ''})

  }

  public render() {
    const { shoppingCart,cartArray } = this.state;
    //let arr: string[] = ["apple", "banana", "cherry"];

    return (
      <div>
        <h1>Shopping Cart</h1>
        <div>
          <p>Input 2:</p>
          <input type="string" value={shoppingCart} onChange={(e) => this.handleInputChange(e)}/>
          <Button appearance="primary" onClick = {this.handleSubmit}> Submit </Button>
              <Button appearance="subtle" onClick={this.handleDelete}> Delete</Button>
          <h1>Shopping list is :  {cartArray.join(', ')}</h1>
        </div>
      
      </div>
    );
  }
}
