export interface IAnnouncmentsState {
    Id:number;
    title : string;
    link : any;
    image : any;
    employeeArr : AnnoucmentsArr[];
}
interface AnnoucmentsArr {
    Id:number;
    title:string;
    link :any;
    image:any;
}