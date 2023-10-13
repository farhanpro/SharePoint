import * as React from 'react';
import type { IRestApiProps } from './IRestApiProps';
import { IRestApiState } from './IRestApiState';
import styles from './RestApi.module.scss';


export default class RestApi extends React.Component<IRestApiProps, IRestApiState> {
  constructor(props: IRestApiProps){
    super(props);
    this.state = {
      restApiState: {
        title :"" ,
        first : "",
        last :"" ,
        cell : "",
        email :"" ,
        picture : "",
      }
    }
  }
  componentDidMount(): void {
    this.fetchData();
  }
  fetchData (){
   
    fetch("https://randomuser.me/api")
    .then((res)=>res.json())
    .then((data) => { this.setState({ 
      restApiState:{
        title: data.results[0].name.title,
        first: data.results[0].name.first,
        last: data.results[0].name.last,
        cell: data.results[0].cell,
        email: data.results[0].email,
        picture: data.results[0].picture.large
      }
    })} )
    .catch((err) => console.error(err));
  }
  public render(): React.ReactElement<IRestApiProps> {
    

    return (
     <div className={styles['div']}>
       <img  className={styles['img']}src={this.state.restApiState.picture} alt="" />
      <h1 className={styles['h1']}>Name : {this.state.restApiState.title}  {this.state.restApiState.first}  {this.state.restApiState.last}</h1>
      <h1 className={styles['h1']}> Phone number : {this.state.restApiState.cell}</h1>
      <h1 className={styles['h1']}> Email : {this.state.restApiState.email}</h1>
     </div>
    );
  }
}
