export interface IFluientState 
{
    employeeDetails :{
    name: string;
    email: string;
    phoneNumber : string;
    id : number;
},

employeeArray : Employee []

iDialougeBox : {
    isDialougVisible: boolean;
    isModalVisible : boolean;
}

}

interface Employee 
{
    name: string;
    email: string;
    phoneNumber : string;
    id : number;

}