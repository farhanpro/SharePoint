import * as React from "react";
// import styles from './ParentChild.module.scss';
import type { IParentChildProps } from "./IParentChildProps";
import EmployeeProfile from "./EmployeeProfile";
import { IParentChildState } from "./IParentChildState";

export default class ParentChild extends React.Component<
  IParentChildProps,
  IParentChildState
> {
  constructor(props: IParentChildProps) {
    super(props);
    this.state = {
      employeeDetails: {
        id: "",
        name: "",
        designation: "",
        email: "",
        number: "",
        dob: "",
      },
      employeeArr: [],
    };
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

  handleEmployeeSubmit = () => {
    let updatedEmployeeArr = [...this.state.employeeArr];

    if (this.state.employeeArr.length >= 0) {
      // If the employee is not in the array, add it
      updatedEmployeeArr = [
        ...updatedEmployeeArr,
        { ...this.state.employeeDetails },
      ];
    }

    this.setState({
      employeeArr: updatedEmployeeArr,
      employeeDetails: {
        id: "",
        name: "",
        designation: "",
        email: "",
        number: "",
        dob: "",
      },
    });
  };

  public render(): React.ReactElement<IParentChildProps> {
    return (
      <div>
        <table>
  <thead>
    <tr>
      <th>Employee ID</th>
      <th>Employee Name</th>
      <th>Employee Designation</th>
      <th>Employee Email</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <input
          type="text"
          name="id"
          value={this.state.employeeDetails.id}
          onChange={this.handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="name"
          value={this.state.employeeDetails.name}
          onChange={this.handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="designation"
          value={this.state.employeeDetails.designation}
          onChange={this.handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="email"
          value={this.state.employeeDetails.email}
          onChange={this.handleChange}
        />
      </td>
      <td>
      <button
  onClick={() => {
    this.handleEmployeeSubmit();
    console.log(this.state.employeeDetails),
      console.log(this.state.employeeArr);
  }}
>
  Submit
</button>
      </td>
    </tr>
  </tbody>
</table>




        {this.state.employeeArr.map((employee, index) => (
  <EmployeeProfile
    key={index} // Add a key for each mapped element
    employeeDetails={{
      name: employee.name,
      designation: employee.designation,
      email: employee.email,
    }}
  />
))}
      </div>
    );
  }
}
