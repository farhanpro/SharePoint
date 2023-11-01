import * as React from 'react';
import type { ILookupProps } from './ILookupProps';
import { ILookupState } from './ILookupState';
import { SPFI, SPFx, spfi } from "@pnp/sp/presets/all";
import {
  // PrimaryButton,
  //  DefaultButton,
  // Modal,

  Dropdown, 
  IDropdownOption,
  
  TextField,
  Stack,
  DetailsList,
  IColumn,
  Text,
  DetailsListLayoutMode,
 
} from "@fluentui/react";


let sp:SPFI;
export default class Lookup extends React.Component<ILookupProps, ILookupState> {
  private _columns: IColumn[] = [
    {
      key: "Id",
      name: "Id",
      fieldName: "Id",
      minWidth: 50,
      maxWidth: 100,
      isResizable: true,
    },
    {
      key: "Alloted To",
      name: "Alloted To",      
      fieldName: "Title",
      minWidth: 50,
      maxWidth: 100,
      isResizable: true,
    },
    {
      key: "Book Name",
      name: "Book Name",
      fieldName: "BookName.text",
      minWidth: 50,
      maxWidth: 100,
      isResizable: true,
      onRender: (item) => (
        <div>
          <Text variant = "small"> {item.BookName.text}</Text>
        </div>
      )
    }
  ];
  dropdownOptions: IDropdownOption[] = [
    { key: '2', text: 'Influence ' },
    { key: '4', text: 'Way of the Wolf' },
    {key:'3',text : 'Trading In the zone'},
    { key: '1', text: '48 Laws of Power' },
  ];;

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
            key: item.BookName.Id,
            text: item.BookName.Title,
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

  onChange = ( option:any) => {
    this.setState({bookDetails: { ...this.state.bookDetails, bookName: option.key }});
    console.log("After Change" , this.state.bookDetails)
  };


  
  public render(): React.ReactElement<ILookupProps> {
    
    return (
     <div>
        <h1>Library List</h1>
        <br/>
        <Stack horizontal tokens={{childrenGap : 40}}>
          <TextField
            label='Enter Alloted To'
            value={this.state.bookDetails.allotedTo}
            onChange={(e: any) => this.setState({ bookDetails: { ...this.state.bookDetails, allotedTo: e.target.value } })}
          />
          <Dropdown
        label="Select an option"
        selectedKey={this.state.bookDetails.bookName  ? this.state.bookDetails.bookName  : undefined}
        onChange={(options)=>this.onChange(options)}
        options={this.dropdownOptions}
      />

         
        </Stack>


      <DetailsList
            items={this.state.bookArr}
            columns={this._columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          />

      
      
    </div>
    );
  }
}
