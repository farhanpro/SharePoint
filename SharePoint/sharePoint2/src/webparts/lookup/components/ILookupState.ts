interface ILibraryItem {
    Id: number;
    Title: string;
    BookName: { Id: number; Title: string };
  }

export interface ILookupState 
{

    bookDetails : {
        allotedTo : string;
        bookName : string;
    }

    bookArr : ILibraryItem[];
}

