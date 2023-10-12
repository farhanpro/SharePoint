import * as React from "react";
import type { IEmployeeDetailsProps } from "./IEmployeeDetailsProps";
import { IEmployeeDetailsState } from "./IEmployeeDetailsState";
import styles from "./EmployeeDetails.module.scss";

interface Employee {
  id: string;
  name: string;
  designation: string;
  email: string;
  number: string;
  dob: string;
}

export default class EmployeeDetails extends React.Component<
  IEmployeeDetailsProps,
  IEmployeeDetailsState
> {
  constructor(props: IEmployeeDetailsProps) {
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
  componentDidMount(): void {
    this.fetchData();
  }
  fetchData = () => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data)=>{this.setState({employeeArr : data})})
      .catch((err) => console.log("Error fetching data: " + err));
  };
  
  handleEmployeeSubmit = () => {
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.employeeDetails),
    })
      .then(() => {
        let updatedEmployeeArr = [...this.state.employeeArr];

        // If the employee is already in the array, update it
        const existingEmployeeIndex = updatedEmployeeArr.findIndex(
          (item: any) => item.id === this.state.employeeDetails.id
        );
        if (existingEmployeeIndex !== -1) {
          updatedEmployeeArr[existingEmployeeIndex] = {
            ...this.state.employeeDetails,
          }; // Ensure you create a new object
          fetch(
            `http://localhost:3000/posts/${this.state.employeeDetails.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(this.state.employeeDetails),
            }
          );
        } else {
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
      })
      .catch((error) => console.log("Error adding post", error));
  };

  handleSubmit = () => {
    let updatedEmployeeArr = [...this.state.employeeArr];

    // If the employee is already in the array, update it
    const existingEmployeeIndex = updatedEmployeeArr.findIndex(
      (item: any) => item.id === this.state.employeeDetails.id
    );
    if (existingEmployeeIndex !== -1) {
      updatedEmployeeArr[existingEmployeeIndex] = {...this.state.employeeDetails,}; // Ensure you create a new object
      fetch("http://localhost:3000/posts",{
        method: "PUT", // or "PATCH" depending on your server's API
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEmployeeArr),
      })
      .then((response) => response.json())
      .catch((error)=>{console.log("Error updating data", error)})
    } else {
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

  handleDelete = (id: string) => {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedEmployeeArr = this.state.employeeArr.filter(
          (item) => item.id !== id
        );
        this.setState({ employeeArr: updatedEmployeeArr });
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  handleEdit = (employee: Employee) => {
    this.setState({ employeeDetails: { ...employee } });
  };

  public render(): React.ReactElement<IEmployeeDetailsProps> {
    return (
      <div>
        <div>
          <h1>Employee Management System</h1>
          <div >
            <table className={styles["employee-table"]}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
                <tr>
                  <th
                  
                    style={{paddingRight:"20px"}}
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Employee Name"
                      value={this.state.employeeDetails.name}
                      onChange={this.handleChange}
                    />
                  </th>
                  <th  style={{paddingRight:"20px"}}>
                    <input
                      type="text"
                      name="designation"
                      placeholder="Employee Designation"
                      value={this.state.employeeDetails.designation}
                      onChange={this.handleChange}
                    />
                  </th>
                  <th  style={{paddingRight:"20px"}}>
                    <input
                      type="text"
                      name="email"
                      placeholder="Employee Email"
                      value={this.state.employeeDetails.email}
                      onChange={this.handleChange}
                    />
                  </th>
                  <th  style={{paddingRight:"20px"}}>
                    <button onClick={this.handleEmployeeSubmit}>Submit</button>
                  </th>
                </tr>
              </thead>
              <br/>

              <tbody>
                <th> Name</th>
                <th> Designation</th>
                <th> Email</th>
                  <th>Action</th>
                {this.state.employeeArr.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.designation}</td>
                    <td>{item.email}</td>
                    
                    <td>
                      <button className={styles["edit-btn"]} onClick={() => this.handleEdit(item)}>
                        Edit
                      </button>
                      <button className={styles["delete-btn"]} onClick={() => this.handleDelete(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
