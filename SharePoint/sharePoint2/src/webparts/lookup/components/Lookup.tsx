import * as React from 'react';
import type { ILookupProps } from './ILookupProps';
import { ILookupState } from './ILookupState';
import { SPFI, SPFx, spfi } from "@pnp/sp/presets/all";

let sp:SPFI;
export default class Lookup extends React.Component<ILookupProps, ILookupState> {
  constructor(props:ILookupProps){
    super(props);
    sp = spfi().using(SPFx(this.props.spcontext));
    this.state = {
      bookDetails : {
        allotedTo :"",
        bookName :"",
      },
      bookArr :[]
    }
  }
  componentDidMount(): void {
    sp.web.lists.getByTitle('Library List')
      .items.select('Id', 'Title', 'BookName/Id', 'BookName/Title')
      .expand('BookName')()
      .then((items: any[]) => {
        const bookArr = items.map((item) => ({
          Id: item.Id,
          Title: item.Title,
          BookName: {
            Id: item.BookName.Id,
            Title: item.BookName.Title,
          },
        }));
        this.setState({ bookArr });
        console.log("Book Arr",bookArr);
        console.log("Item ", items);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  
  public render(): React.ReactElement<ILookupProps> {
    return (
    <div>
     
      <h1>Farhan</h1>

    </div>
    );
  }
}
