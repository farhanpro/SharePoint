export interface ISpfxCrudPnpState
{
    employeeDetails :{
    Title: string;
    Id:number;
    Age:number;
    };
    isAddEmployeeOpen : boolean;
    isUpdateCall : boolean;
    employeeArr : Employee[];
}

interface Employee {
    Title:string;
    Id:number;
    Age:number;
}