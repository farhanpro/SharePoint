interface ILibraryItem {

    BookName: { key: number; text: string };
  }

export interface ILookupState 
{

    bookDetails : {
        allotedTo : string;
        bookName : string;
    },

    bookArr : ILibraryItem[];
}

