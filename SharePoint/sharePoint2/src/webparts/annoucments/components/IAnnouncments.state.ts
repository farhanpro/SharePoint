export interface IAnnouncmentsState {
    Id:number;
    title : string;
    link : string;
    image : any;
    employeeArr : AnnoucmentsArr[];
}
interface AnnoucmentsArr {
    Id:number;
    title:string;
    link :string;
    image:any;
}