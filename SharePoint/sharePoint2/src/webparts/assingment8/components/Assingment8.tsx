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
        Id : 0,
        title : "",
        employeeAge : "",
        linkedInProfile:"",
        isActive : true
      },
      isEditCall : false,
      employeeArr :[]
    };
  }

  componentDidMount(): void {
    sp.web.lists.getByTitle("Assingment_8").items.select("Id","Title","Active","ProfileLink","Age/Age").expand("Age")()
    .then((items: any[]) => {
      let modifiedData : any[] =[];
      items.forEach(element => {
        let modifiedObject : any ={};
        modifiedObject.Id = element.Id;
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
      const {Id,title,linkedInProfile,isActive} = this.state.employeeDetails;
      const addedItem = await sp.web.lists.getByTitle("Assingment_8").items.add(
        {
          Id:Id,
          Title:title,
          Active:isActive,
          ProfileLink: { Url:linkedInProfile},
        //  Age:employeeAge
        });
      console.log("AddedITems",addedItem);
      this.setState({employeeDetails:{
        Id : 0,
        title : "",
        employeeAge : "",
        linkedInProfile:"",
        isActive : true}
      });
      ()=>{this.componentDidMount()}
    }
    catch(e){
      console.log("Error",e);
    }
  }

  public deleteItem = async (itemId:any): Promise<void>=>{
    try{
      await sp.web.lists.getByTitle("Assingment_8").items.getById(itemId).delete();
      await this.componentDidMount();
      alert(`ITem Deleted Succesfully`);
    }
    catch (err){
      console.log("Error",err);
    }
  }

  public editItem = async (itemId : number):Promise<void> =>
  {
    console.log("Item",itemId);
    const searchITem = sp.web.lists.getByTitle("Assingment_8").items.getById(itemId)()
    .then((result) => {
      this.setState({
        employeeDetails:{ 
          Id:result.Id,
          title:result.Title,
          employeeAge:result.AgeId,
          linkedInProfile:result.ProfileLink.Url,
          isActive:result.Active},
          isEditCall : true
        })
      console.log(result)
    
    })
    console.log("SearchItem",searchITem);
    
  }
  public updateItem = async ():Promise<void> =>{
    try{
      const {Id,title,linkedInProfile,isActive} = this.state.employeeDetails;
      const updatedItem = await sp.web.lists.getByTitle("Assingment_8").items.getById(Id).update({
        Title:title,
        Active:isActive,
        ProfileLink: { Url:linkedInProfile},
      });
      console.log("UpdatedItem",updatedItem);
      this.setState({employeeDetails:{
        Id : 0,
        title : "",
        employeeAge : "",
        linkedInProfile:"",
        isActive : true},
        isEditCall:false
      });
      ()=>{this.componentDidMount()}
    }
    catch(e){
      console.log("Error",e);
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
        <TextField label='Enter Id' value={this.state.employeeDetails.Id.toString()} onChange={(e:any)=>this.setState({employeeDetails:{...this.state.employeeDetails,Id:e.target.value}})}/>
      <TextField label='Enter Title' value={this.state.employeeDetails.title} onChange={(e:any)=>this.setState({employeeDetails:{...this.state.employeeDetails,title:e.target.value}})}/>
      <TextField label='Enter Age' value={this.state.employeeDetails.employeeAge} onChange={(e:any)=>this.setState({employeeDetails:{...this.state.employeeDetails,employeeAge:e.target.value}})}/>
      <TextField label='Enter Profile Link' value={this.state.employeeDetails.linkedInProfile} onChange={(e:any)=>this.setState({employeeDetails:{...this.state.employeeDetails,linkedInProfile:e.target.value}})}/>
      <Toggle label='Active' checked={this.state.employeeDetails.isActive} onChange={(e:any,checked)=>this.setState({employeeDetails:{...this.state.employeeDetails,isActive: !!checked}})}/>
      </Stack>
      <PrimaryButton onClick={this.state.isEditCall ?this.updateItem :this.createItem} >{this.state.isEditCall ? "Update" : "Add"}</PrimaryButton>
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
              <td>{item.isActive ? "Active":"Inactive"}</td>
              <td>{item.linkedInProfile}</td>
              <td>{item.employeeAge}</td>
              <td><PrimaryButton onClick={()=>{this.editItem(item.Id)}}>Edit</PrimaryButton> <PrimaryButton onClick={()=>{this.deleteItem(item.Id)}}>Delete</PrimaryButton> </td>
            </tr>
          ))}
        
        </tbody>
      </table>
      </div>
    );
  }
}
