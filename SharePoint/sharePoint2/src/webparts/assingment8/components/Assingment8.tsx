import * as React from 'react';
import type { IAssingment8Props } from './IAssingment8Props';
import { IAssingmentState } from './IAssingment8State';
import { SPFI,SPFx,spfi } from "@pnp/sp/presets/all";
import { PrimaryButton, Stack, TextField, Toggle } from '@fluentui/react';
let sp: SPFI;

export default class Assingment8 extends React.Component<IAssingment8Props, IAssingmentState> {
  // Define your columns for the DetailsList
  
  constructor(props: IAssingment8Props) {
    super(props);
    sp = spfi().using(SPFx(this.props.spcontext));
    this.state = {
      employeeDetails:{
        title : "",
        employeeAge : "",
        linkedInProfile:"",
        isActive : true
      },
      employeeArr :[]
    };
  }

  componentDidMount(): void {
    sp.web.lists.getByTitle("Assingment_8").items.select("Title","Active","ProfileLink","Age/Age").expand("Age")()
    .then((items: any[]) => {
      let modifiedData : any[] =[];
      items.forEach(element => {
        let modifiedObject : any ={};
        modifiedObject.title = element.Title;
        modifiedObject.isActive = element.Active;
        modifiedObject.linkedInProfile = element.ProfileLink.Url;
        modifiedObject.employeeAge = element.Age.Age;
        modifiedData.push(modifiedObject);
      });
      console.log("Items",items);
        this.setState({employeeArr : modifiedData});
        console.log("State value",this.state.employeeArr)
      }).catch((error:any)=> {
        console.log("Error",error);
      })
      
  }

  public createItem = async (): Promise<void>=>{
    try{
      const {title,employeeAge,linkedInProfile,isActive} = this.state.employeeDetails;
      const addedItems = await sp.web.lists.getByTitle("Assingment_8").items.select("Title","Active","ProfileLink")
      .add({Title:title,Active:isActive,ProfileLink:linkedInProfile,Age:employeeAge});
      console.log("Added Items",addedItems);
      alert("Item Added Successfully");
      this.setState({employeeDetails:{
        title : "",
        employeeAge : "",
        linkedInProfile:"",
        isActive : true
      }});}
      catch(error){
        console.log("Error",error);
      }
  }

  public render(): React.ReactElement<IAssingment8Props> {
    return (
      <div>
      <div>
        <h1>Welcome to PnpJS List Operation Demo</h1>
      </div>
      <br/>
      <Stack horizontal tokens={{ childrenGap: 40 }}>
      <TextField label='Enter Title' value={this.state.employeeDetails.title} onChange={(e:any)=>this.setState({employeeDetails:{...this.state.employeeDetails,title:e.target.value}})}/>
      <TextField label='Enter Age' value={this.state.employeeDetails.employeeAge} onChange={(e:any)=>this.setState({employeeDetails:{...this.state.employeeDetails,employeeAge:e.target.value}})}/>
      <TextField label='Enter Profile Link' value={this.state.employeeDetails.linkedInProfile} onChange={(e:any)=>this.setState({employeeDetails:{...this.state.employeeDetails,linkedInProfile:e.target.value}})}/>
      <Toggle label='Active' checked={this.state.employeeDetails.isActive} onChange={(e:any,checked)=>this.setState({employeeDetails:{...this.state.employeeDetails,isActive: !!checked}})}/>
      </Stack>
      <PrimaryButton onClick={this.createItem} > Add Entry </PrimaryButton>
      <br/>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Active</th>
            <th>ProfileLink</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.state.employeeArr.map((item:any) => (
            <tr>
              <td>{item.title}</td>
              <td>{item.isActive}</td>
              <td>{item.linkedInProfile}</td>
              <td>{item.employeeAge}</td>
              <td><PrimaryButton>Edit</PrimaryButton> <PrimaryButton>Delete</PrimaryButton> </td>
            </tr>
          ))}
        
        </tbody>
      </table>
      </div>
    );
  }
}
