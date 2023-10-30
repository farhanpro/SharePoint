import * as React from 'react';
import type { IFluientFormProps } from './IFluientFormProps';
import { IFluientState } from './IFluientState';
import {
  PrimaryButton,
  DefaultButton,
  Dialog,
  DialogType,
  DialogFooter,
  Modal,
  TextField,
  Stack,
  DetailsList,
  IColumn, 
  DetailsListLayoutMode
} from '@fluentui/react';

export default class FluientForm extends React.Component<IFluientFormProps, IFluientState> {

   // Define your columns for the DetailsList
   private _columns: IColumn[] = [
    { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'email', name: 'Email', fieldName: 'email', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'phoneNumber', name: 'Phone Number', fieldName: 'phoneNumber', minWidth: 100, maxWidth: 200, isResizable: true },
    // Add more columns as needed
  ];


 constructor (props : IFluientFormProps){
  super(props);
  this.state = {
    employeeDetails:{
      name: '',
      email: '',
      phoneNumber : '',
      id : 0
    },

    iDialougeBox:{
      isDialougVisible :false,
      isModalVisible:false,
    },

    employeeArray:[]
  }
 }

 handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  this.setState((prevState) => ({
    employeeDetails: {
      ...prevState.employeeDetails,
      [name]: value,
    },
  }));
};

handleSubmit = () =>{
  if(this.state.employeeDetails.email == '' || this.state.employeeDetails.name == '' || this.state.employeeDetails.phoneNumber == '')
  {
    this.setState({iDialougeBox:{isModalVisible:false,isDialougVisible:true}});
  }
  else 
  { 
  this.setState(prevState => ({
    employeeArray: [...prevState.employeeArray, this.state.employeeDetails],
    employeeDetails:{name: '',email: '',phoneNumber : '',id : 0}
  }), () => console.log(this.state.employeeArray));
}
}

// Function to close the dialog
closeDialog = () => {
  this.setState({iDialougeBox:{isModalVisible:false,isDialougVisible:true}});
};

// Function to handle help icon click
handleHelpIconClick = () => {
  // Show modal with information
  this.setState({iDialougeBox:{isModalVisible:true,isDialougVisible:false}});
};
// Function to close the modal
closeModal = () => {
  this.setState({iDialougeBox:{isModalVisible:false,isDialougVisible:false}});
};

  public render(): React.ReactElement<IFluientFormProps> 
  {
    return (
     
      <Stack>
      <TextField name = "name" value ={this.state.employeeDetails.name}  onChange={this.handleChange} label="Name" required />  
       
      <TextField name = "email" value={this.state.employeeDetails.email} onChange={this.handleChange}  label="Email" required />
      <TextField name = "phoneNumber" value={this.state.employeeDetails.phoneNumber} onChange={this.handleChange}  label="Phone Number" required />

      <Stack horizontal tokens={{ childrenGap: 30 }} style={{marginTop:"10px"}}>
          <PrimaryButton type="submit" onClick={this.handleSubmit}>Submit</PrimaryButton>
          {/* <IconButton
          iconProps={{ iconName: 'Help' }}
          title="Help"
          ariaLabel="Help"
          onClick={this.handleHelpIconClick}
        />  */}

          <DefaultButton>Cancel</DefaultButton>
        

        {/* Error Dialog */}
        <Dialog
          hidden={!this.state.iDialougeBox.isDialougVisible}
          onDismiss={this.closeDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Error',
            subText: 'Mandatory fields are not filled.'
          }}
          modalProps={{
            isBlocking: false,
            styles: { main: { maxWidth: 450 } }
          }}
        >

          <DialogFooter>
            <PrimaryButton onClick={this.closeModal} text="OK" />
          </DialogFooter>
        </Dialog>  

        {/* Help Modal */}
        <Modal
          isOpen={this.state.iDialougeBox.isModalVisible}
          onDismiss={this.closeModal}
          isBlocking={false}
        >
          {/* Your modal content goes here */}
          <div>
            <p>This is some helpful information.</p>
          
          </div>
            <PrimaryButton text ="ok" onClick={this.closeModal}/>
        </Modal>
        </Stack>

        
        <Stack>

        <DetailsList
          items={this.state.employeeArray}
          columns={this._columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          
        />
       

        </Stack>
      </Stack>
      

     
    );
  }
}
