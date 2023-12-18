export interface IProQuickLinksState{
    Id :number;
    Title:string;
    FileType:string;
    Link:string;
    QuickLinksArr : QuickLinksArr[] 
}
interface QuickLinksArr {
    Id : number;
    Title : string;
    FileType:string;
    Link :string;
}