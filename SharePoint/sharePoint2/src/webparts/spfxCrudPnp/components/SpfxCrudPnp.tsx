import * as React from "react";

import type { ISpfxCrudPnpProps } from "./ISpfxCrudPnpProps";
import { ISpfxCrudPnpState } from "./ISpfxCurdPnpState";
import { SPFI, SPFx, spfi } from "@pnp/sp/presets/all";

import {
  PrimaryButton,
   DefaultButton,
  // Dialog,
  // DialogType,
  // DialogFooter,
  Modal,
  TextField,
  Stack,
  DetailsList,
  IColumn,
  DetailsListLayoutMode,
} from "@fluentui/react";

let sp: SPFI;
export default class SpfxCrudPnp extends React.Component<
  ISpfxCrudPnpProps,
  ISpfxCrudPnpState
> {
  // Define your columns for the DetailsList
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
      key: "Title",
      name: "Title",
      fieldName: "Title",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "Age",
      name: "Age",
      fieldName: "Age",
      minWidth: 50,
      maxWidth: 100,
      isResizable: true,
    },
    {
      key: 'column4',
      name: 'Action',
      fieldName: 'action',
      minWidth: 150,
      maxWidth: 50,
      isResizable: true,
      onRender: (item) => (
        <div>
          <DefaultButton text="Delete" onClick={() => this.deleteItem(item)} />
          <PrimaryButton text="Edit" onClick={() => this.EditItem(item)} />
        </div>
      ),
    },
    // Add more columns as needed
  ];

  constructor(props: ISpfxCrudPnpProps) {
    super(props);
    sp = spfi().using(SPFx(this.props.spcontext));
    this.state = {
      employeeDetails: {
        Title: "",
        Id: 0,
        Age: 0,
      },
      isAddEmployeeOpen: false,
      isUpdateCall : false,
      employeeArr: [],
    };
  }


  componentDidMount(): void {
    sp.web.lists
      .getByTitle("Employee Details")
      .items.select("Id", "Title", "Age", "Author/Title")
      .expand("Author/Title")()
      .then((items: any) => {
        console.log(items);
        this.setState({ employeeArr: items });
      });
  }

  deleteItem = (item: any) => {
    sp.web.lists
      .getByTitle("Employee Details")
      .items.getById(item.Id).delete()
      .then(() => {
        this.componentDidMount();
      });
  }

  EditItem = (item: any) => { 
    // Get a specific item by id.
    const itemFetched: any = sp.web.lists.getByTitle("Employee Details").items.getById(item.Id)()
      .then((result) => {
        console.log("Item Fetched", result.Title);
        this.setState({ employeeDetails: {Title: result.Title,Id: result.Id,Age: result.Age} ,isAddEmployeeOpen : true,isUpdateCall :true});
        console.log("Item ", itemFetched);
        // You can do further processing with the fetched item here if needed.
      })
      .catch((error) => {
        console.error("Error fetching item", error);
      });
  };

  UpdateItem = () => {
    sp.web.lists.getByTitle("Employee Details").items.getById(this.state.employeeDetails.Id).update({
      Title: this.state.employeeDetails.Title,
      Age: this.state.employeeDetails.Age,
    }).then(response => {
      this.setState({employeeDetails: { Title: "", Id: 0, Age: 0 },isAddEmployeeOpen: false,isUpdateCall :false}) 
      this.componentDidMount();
      console.log("Item updated:", response.data);
    });
  }

  addItem = () => {
    sp.web.lists
      .getByTitle("Employee Details")
      .items.add(this.state.employeeDetails)
      .then((item: any) => {
        console.log(item);
        this.setState({
          employeeArr: [...this.state.employeeArr, item],
          employeeDetails: { Title: "", Id: 0, Age: 0 },
          isAddEmployeeOpen: false
        }, () => {
          // Callback function to run componentDidMount after state is updated
          this.componentDidMount();
        });
      })
      .catch((error) => {
        console.error("Error adding item", error);
      });
  };
  

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      employeeDetails: {
        ...prevState.employeeDetails,
        [name]: value,
      },
    }));
  };

  public render(): React.ReactElement<ISpfxCrudPnpProps> {
    return (
      <div>
        <Stack
          horizontal
          tokens={{ childrenGap: 30 }}
          style={{ marginTop: "10px" }}
        >
          <PrimaryButton
            type="submit"
            onClick={() => {
              this.setState({ isAddEmployeeOpen: true });
            }}
          >
            Add Employee
          </PrimaryButton>
        </Stack>

        <Stack>
          <Modal
            isOpen={this.state.isAddEmployeeOpen}
            onDismiss={() => this.setState({ isAddEmployeeOpen: false })}
            isBlocking={false}
            containerClassName="ms-modal-test"
          >
            <Stack
              horizontal
              tokens={{ childrenGap: 10 }}
              style={{ margin: "10px" }}
            >
              <TextField
                name="Title"
                value={this.state.employeeDetails.Title}
                onChange={this.handleChange}
                label="Tile"
                required
              />
              <TextField
                type={"number"}
                name="Id"
                value={this.state.employeeDetails.Id.toString()}
                onChange={this.handleChange}
                label="Id"
                required
              />
              <TextField
                name="Age"
                value={this.state.employeeDetails.Age.toString()}
                onChange={this.handleChange}
                label="Age"
                required
              />
            </Stack>
              <PrimaryButton style={{margin:"10px"}} type="submit" onClick={ this.state.isUpdateCall ? this.UpdateItem  : this.addItem}>{this.state.isUpdateCall ? <p>Save</p> : <p>Add</p>}</PrimaryButton>
          </Modal>

          <DetailsList
            items={this.state.employeeArr}
            columns={this._columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          />

        </Stack>
      </div>
    );
  }
}
