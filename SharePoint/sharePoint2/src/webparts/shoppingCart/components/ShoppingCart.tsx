import * as React from "react";
import type { IShoppingCartProps } from "./IShoppingCartProps";
import { IShoppingCartState } from "./IShoppingCartState";


export default class ShoppingCart extends React.Component<
  IShoppingCartProps,
  IShoppingCartState
> {
  constructor(props: IShoppingCartProps) {
    super(props);
    this.state = { shoppingCart: '',cartArray :[] ,message : ''};
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
    else{
    this.setState({message: "Item not found"})
    setTimeout( ()=> {this.setState({message:""})},3000)
    }
    this.setState({ cartArray: EditedCard , shoppingCart : ''})

  }

  public render() {
    const { shoppingCart,cartArray } = this.state;
    

    return (
      <div>
        <h1>Shopping Cart</h1>
        <div>
          <p>Input :</p>
          <input type="string" value={shoppingCart} onChange={(e) => this.handleInputChange(e)}/>
          
          <button  onClick = {this.handleSubmit}> Submit </button>
              <button  onClick={this.handleDelete}> Delete</button>
           <br/>
           <br/>
           {this.state.message  }
             
          <h1>Shopping list is :  {cartArray.join(', ')}</h1>
        </div>
      
      </div>
    );
  }
}
