export interface IAssingmentState 
{
    employeeDetails :{  
    Id:number;  
    title : any;
    employeeAge : any;
    linkedInProfile:any;
    isActive : boolean;
   
};



isEditCall : boolean;
employeeArr : Employee[];



}


interface Employee {
    Id:number;
    title : any;
    employeeAge : any;
    linkedInProfile:any;
    isActive : boolean;
}
 