export interface IQuickLinksState {
    quickLinks :{
    title : string;
    description : string;
    url : string;
    }
    buyingLink : IQuickLinkState[];
}
interface IQuickLinkState {
    title : string;
    description : string;
    url : string;
}