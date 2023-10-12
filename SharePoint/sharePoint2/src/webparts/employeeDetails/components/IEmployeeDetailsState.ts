export interface IEmployeeDetailsState {
    employeeDetails: {
      id: string;
      name: string;
      designation: string;
      email: string;
      number: string;
      dob:string;
    };
    employeeArr: Employee[];
  }
  
  interface Employee {
    id: string;
    name: string;
    designation: string;
    email: string;
    number: string;
    dob:string;
  }
  