export interface IEmployeeDetailsState {
    employeeDetails: {
      id: number;
      name: string;
      designation: string;
    };
    employeeArr: Employee[];
  }
  
  interface Employee {
    id: number;
    name: string;
    designation: string;
  }
  