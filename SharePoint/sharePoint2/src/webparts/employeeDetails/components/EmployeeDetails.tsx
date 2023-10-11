import * as React from 'react';
import type { IEmployeeDetailsProps } from './IEmployeeDetailsProps';
import { IEmployeeDetailsState } from './IEmployeeDetailsState';

interface Employee {
  id: number;
  name: string;
  designation: string;
}

export default class EmployeeDetails extends React.Component<IEmployeeDetailsProps, IEmployeeDetailsState> {
  constructor(props: IEmployeeDetailsProps) {
    super(props);
    this.state = { employeeDetails: { id: 0, name: '', designation: '' }, employeeArr: [] };
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

  handleSubmit = () => {
    let updatedEmployeeArr = [...this.state.employeeArr];
  
    // If the employee is already in the array, update it
    const existingEmployeeIndex = updatedEmployeeArr.findIndex((item :any) => item.id === this.state.employeeDetails.id);
    if (existingEmployeeIndex !== -1) {
      updatedEmployeeArr[existingEmployeeIndex] = { ...this.state.employeeDetails }; // Ensure you create a new object
    } else {
      // If the employee is not in the array, add it
      updatedEmployeeArr = [...updatedEmployeeArr, { ...this.state.employeeDetails }];
    }
  
    this.setState({ employeeArr: updatedEmployeeArr, employeeDetails: { id: 0, name: '', designation: '' } });
  };
  handleDelete = (id: number) => {
    const updatedEmployeeArr = this.state.employeeArr.filter((item) => item.id !== id);
    this.setState({ employeeArr: updatedEmployeeArr });
  };

  handleEdit = (employee: Employee) => {
    this.setState({ employeeDetails: { ...employee } });
  };

  public render(): React.ReactElement<IEmployeeDetailsProps> {
    return (
      <div>
        <div>
          <h1>Employee Management System</h1>
          <input type="number" name="id" placeholder="Employee Id" value={this.state.employeeDetails.id} onChange={this.handleChange} />
          <input type="text" name="name" placeholder="Employee Name" value={this.state.employeeDetails.name} onChange={this.handleChange} />
          <input
            type="text"
            name="designation"
            placeholder="Employee Designation"
            value={this.state.employeeDetails.designation}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Submit</button>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employeeArr.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.designation}</td>
                  <td>
                    <button onClick={() => this.handleEdit(item)}>Edit</button>
                    <button onClick={() => this.handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
