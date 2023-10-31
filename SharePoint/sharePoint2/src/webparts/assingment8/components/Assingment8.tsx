import * as React from 'react';
import { SPFI, SPFx, spfi } from '@pnp/sp/presets/all';
import { PrimaryButton, Stack, TextField, Toggle } from '@fluentui/react';

let sp: SPFI;

interface IEmployeeDetails {
  Id: number;
  title: string;
  employeeAge: string;
  linkedInProfile: string;
  isActive: boolean;
}

interface IAssingment8State {
  employeeDetails: IEmployeeDetails;
  isEditCall: boolean;
  employeeArr: any[];
}

export default class Assingment8 extends React.Component<any, IAssingment8State> {
  constructor(props: any) {
    super(props);
    sp = spfi().using(SPFx(this.props.spcontext));
    this.state = {
      employeeDetails: {
        Id: 0,
        title: '',
        employeeAge: '',
        linkedInProfile: '',
        isActive: true,
      },
      isEditCall: false,
      employeeArr: [],
    };
  }

  componentDidMount(): void {
    this.fetchData();
  }

  fetchData = async (): Promise<void> => {
    try {
      const list = sp.web.lists.getByTitle('Assingment_8');
      const items = await list.items
        .select('Id', 'Title', 'Active', 'ProfileLink', 'Age/Id', 'Age/Age').top(2).orderBy('Created', true) // Include Age/Id and Age/Age in select') // Include Age/Id and Age/Age in select
        .expand('Age') ()
  
      const modifiedData = items.map((element) => ({
        Id: element.Id,
        title: element.Title,
        isActive: element.Active,
        linkedInProfile: element.ProfileLink.Url,
        employeeAge: element.Age ? element.Age.Age : '', // Check if Age is defined before accessing properties
      }));
  
      this.setState({ employeeArr: modifiedData });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  createItem = async (): Promise<void> => {
    try {
      const { Id, title, linkedInProfile, isActive } = this.state.employeeDetails;
  
      // Use AgeId to get the ID of the selected lookup item
      const ageId = 1; // Replace with the actual ID of the item in the Age lookup list
  
      const addedItem = await sp.web.lists.getByTitle('Assingment_8').items.add({
        Title: title,
        Active: isActive,
        ProfileLink: { Url: linkedInProfile },
        AgeId: ageId, // Set the lookup field with the ID of the related item
        Id: Id,
      });
  
      console.log('Added Items:', addedItem);
  
      this.setState({
        employeeDetails: {
          Id: 0,
          title: '',
          employeeAge: '',
          linkedInProfile: '',
          isActive: true,
        },
      });
  
      this.fetchData();
    } catch (e) {
      console.log('Error', e);
    }
  };
  

  deleteItem = async (itemId: number): Promise<void> => {
    try {
      await sp.web.lists.getByTitle('Assingment_8').items.getById(itemId).delete();
      await this.fetchData();
      alert(`Item Deleted Successfully`);
    } catch (err) {
      console.log('Error', err);
    }
  };

  editItem = async (itemId: number): Promise<void> => {
    try {
      const result = await sp.web.lists.getByTitle('Assingment_8').items.getById(itemId)();

      this.setState({
        employeeDetails: {
          Id: result.Id,
          title: result.Title,
          employeeAge: result.AgeId,
          linkedInProfile: result.ProfileLink.Url,
          isActive: result.Active,
        },
        isEditCall: true,
      });

      console.log(result);
    } catch (err) {
      console.log('Error', err);
    }
  };

  updateItem = async (): Promise<void> => {
    try {
      const { Id, title, linkedInProfile, isActive } = this.state.employeeDetails;

      const updatedItem = await sp.web.lists.getByTitle('Assingment_8').items.getById(Id).update({
        Title: title,
        Active: isActive,
        ProfileLink: { Url: linkedInProfile },
      });

      console.log('Updated Item:', updatedItem);

      this.setState({
        employeeDetails: {
          Id: 0,
          title: '',
          employeeAge: '',
          linkedInProfile: '',
          isActive: true,
        },
        isEditCall: false,
      });

      this.fetchData();
    } catch (e) {
      console.log('Error', e);
    }
  };

  render(): React.ReactElement<any> {
    return (
      <div>
        <div>
          <h1>Welcome to PnpJS List Operation Demo</h1>
        </div>
        <br />
        <Stack horizontal tokens={{ childrenGap: 40 }}>
          <TextField
            label='Enter Id'
            type='number'
            value={this.state.employeeDetails.Id.toString()}
            onChange={(e: any) => this.setState({ employeeDetails: { ...this.state.employeeDetails, Id: +e.target.value } })}
          />
          <TextField
            label='Enter Title'
            value={this.state.employeeDetails.title}
            onChange={(e: any) => this.setState({ employeeDetails: { ...this.state.employeeDetails, title: e.target.value } })}
          />
          <TextField
            label='Enter Age'
            value={this.state.employeeDetails.employeeAge}
            onChange={(e: any) => this.setState({ employeeDetails: { ...this.state.employeeDetails, employeeAge: e.target.value } })}
          />
          <TextField
            label='Enter Profile Link'
            value={this.state.employeeDetails.linkedInProfile}
            onChange={(e: any) => this.setState({ employeeDetails: { ...this.state.employeeDetails, linkedInProfile: e.target.value } })}
          />
          <Toggle
            label='Active'
            checked={this.state.employeeDetails.isActive}
            onChange={(e: any, checked) => this.setState({ employeeDetails: { ...this.state.employeeDetails, isActive: !!checked } })}
          />
        </Stack>
        <PrimaryButton onClick={this.state.isEditCall ? this.updateItem : this.createItem}>
          {this.state.isEditCall ? 'Update' : 'Add'}
        </PrimaryButton>
        <br />
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
            {this.state.employeeArr.map((item: any) => (
              <tr key={item.Id}>
                <td>{item.title}</td>
                <td>{item.isActive ? 'Active' : 'Inactive'}</td>
                <td>{item.linkedInProfile}</td>
                <td>{item.employeeAge}</td>
                <td>
                  <PrimaryButton onClick={() => this.editItem(item.Id)}>Edit</PrimaryButton>{' '}
                  <PrimaryButton onClick={() => this.deleteItem(item.Id)}>Delete</PrimaryButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
