export interface IEventsState{
    Id : any;
    Title:string;
    When:any;
    Where:string;
    Link:string;
    Category:string;
    isEditModal:boolean;
    EventsArr: IEvents[];
}
export interface IEvents{
    id : any;
    title:string;
    when:any;
    where:string;
    link:string;
    category:string;

}