export interface IEventsState{
    Title:string;
    When:string;
    Where:string;
    Link:string;
    Category:string;
    EventsArr: IEvents[];
}
export interface IEvents{
    title:string;
    when:string;
    where:string;
    link:string;
    category:string;

}