export interface ILinkState{
    title: string;
    link :string;
    iLinks :iLink[];
    isEditModalOpen : boolean;
}

export interface iLink{
    title: string;
    link: string;
}