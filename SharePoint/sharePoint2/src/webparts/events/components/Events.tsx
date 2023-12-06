import * as React from "react";
import type { IEventsProps } from "./IEventsProps";
import { IEventsState } from "./IEventsState";
import { SPFI, SPFx, spfi } from "@pnp/sp/presets/all";
import styles from "./Events.module.scss";
import {
  Icon,
  Modal,
  PrimaryButton,
  Stack,
  TextField,
  Dropdown,
  IDropdownOption,
} from "office-ui-fabric-react";
import { DatePicker } from "@fluentui/react/lib/DatePicker";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

let sp: SPFI;
export default class Events extends React.Component<
  IEventsProps,
  IEventsState
> {
  dropdownOptions: IDropdownOption[] = [
    { key: "4", text: "Choice3" },
    { key: "3", text: "Business" },
    { key: "1", text: "Holiday" },
  ];

  constructor(props: IEventsProps) {
    super(props);
    sp = spfi().using(SPFx(this.props.spcontext));
    this.state = {
      Id: null,
      Title: "",
      When: null,
      Where: "",
      Link: "",
      Category: "",
      isEditModal: false,
      EventsArr: [],
    };
    console.log(sp);
  }

  private closeEditModal = (): void => {
    this.setState({
      isEditModal: false,
    });
  };

  onChange = (e: any, selection: any) => {
    console.log("Selection", selection);
    this.setState({ Category: selection.text });
    console.log(
      "State this  Value",
      this.state.Title,
      this.state.When,
      this.state.Where,
      this.state.Link,
      this.state.Category
    );
  };

  componentDidMount(): void {
    sp.web.lists
      .getByTitle("Events2")
      .items.select("Id", "Title", "When", "DispName", "Link", "Category")()
      .then((items: any[]) => {
        let modifiedData: any[] = [];
        items.map(async (i: any) => {
          let modifiedObject: any = {};
          modifiedObject.id = i.Id;
          modifiedObject.title = i.Title;
          modifiedObject.when = i.When;
          modifiedObject.where = i.DispName;
          modifiedObject.link = i.Link;
          modifiedObject.category = i.Category;
          modifiedData.push(modifiedObject);
        });
        this.setState({ EventsArr: modifiedData });
        console.log("Location to be searched here = ", this.state.EventsArr);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  createEvent = async (): Promise<void> => {
    const { Title, Where, Link, Category } = this.state;
    try {
      const item = await sp.web.lists.getByTitle("Events2").items.add({
        Title,
        When: this.state.When ? this.state.When.toISOString() : "",
        DispName: Where,
        Link,
        Category,
      });
      console.log(item);
      this.setState({
        Title: "",
        When: null,
        Where: "",
        Link: "",
        Category: "",
      });
      this.closeEditModal();
    } catch (error) {
      console.log(error);
    }
  };
  deleteItem = async (itemId: number): Promise<void> => {
    try {
      await sp.web.lists.getByTitle('Events2').items.getById(itemId).delete();
      await this.componentDidMount();
      alert(`Item Deleted Successfully`);
    } catch (err) {
      console.log('Error', err);
    }
  };

  editEvent = async (id : any) : Promise<void> =>{
    try {
      const result = await sp.web.lists.getByTitle('Events2').items.getById(id)();
      console.log("Results : ",result);
      this.setState({
        Id:result.id,
        Title:result.Title,
        When:new Date(result.When),
        Where:result.Where.DisplayName,
        Link:result.Link,
        Category:result.Category,
        isEditModal : true
      });
    }
    catch(err){
      console.log('Error',err);
    }
  };

  public render(): React.ReactElement<IEventsProps> {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };
    //var daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return (
      <Stack>
        <h1 className={styles.heading}>Events Webpart</h1>

        <Stack className={styles.container}>
          <h2>Create a Event</h2>
          <PrimaryButton
            styles={{
              root: { width: "140px", color: "grey", backgroundColor: "white" },
            }}
            iconProps={{ iconName: "Add" }}
            onClick={() => this.setState({ isEditModal: true })}
          >
            Add Event
          </PrimaryButton>
          <Modal
            isOpen={this.state.isEditModal}
            onDismiss={this.closeEditModal}
            isBlocking={false}
            styles={{
              main: {
                width: "40%",
                height: "70%",
              },
            }}
          >
            <Stack
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                marginTop: "40px",
              }}
            >
              <TextField
                label="Title of Event"
                placeholder="Title of Event"
                value={this.state.Title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ Title: e.target.value })
                }
              />
              {/* <TextField label='When' placeholder='When' value={this.state.When} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ When: e.target.value })} /> */}
              <DatePicker
                label="When"
                placeholder="Select a date"
                value={this.state.When}
                onSelectDate={(date) => this.setState({ When: date })}
                styles={{ root: { marginBottom: 10 } }} // Adjust styling as needed
              />

              <TextField
                label="Where"
                placeholder="Where"
                value={this.state.Where}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ Where: e.target.value })
                }
              />
              <TextField
                label="Link"
                placeholder="Link"
                value={this.state.Link}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ Link: e.target.value })
                }
              />
              <Dropdown
                label="Category"
                placeholder="Category"
                options={this.dropdownOptions}
              />
            </Stack>

            <PrimaryButton
              style={{ marginLeft: "10px", marginTop: "10px" }}
              onClick={() => this.createEvent()}
            >
              Submit
            </PrimaryButton>
          </Modal>
        </Stack>

        <Stack className={styles.container}>
          <Slider className="Slider" {...settings}>
            <Stack>
              <div className={styles.icon}>
                <Icon
                  iconName="AddEvent"
                  aria-label="Add Online Event Icon"
                  style={{ fontSize: "40px" }}
                  className={styles.iconStyle}
                />
              </div>
              <div className={styles.main}>
                <h2>Create an Event</h2>
                <p>
                  When you add an Event, it will show here where your renders
                  can see it.
                </p>
              </div>
            </Stack>

            {this.state.EventsArr.map((item, key) => (
              <Stack horizontal tokens={{ childrenGap: 10 }}>
                <div>
                  <Stack key={key} className={styles.container}>
                    <Stack>
                      <h1>
                        Month
                        <br />
                        {new Date(item.when).getMonth() + 1}
                        <hr />
                      </h1>
                    </Stack>

                    <Stack>
                      <p>
                        Category
                        <br />
                        <b>{item.category}</b>
                      </p>
                    </Stack>
                    <Stack>
                        Title
                        <br />
                        <b>{item.title}</b>
                      
                    </Stack>

                    <Stack>
                      <h4>Time: {new Date(item.when).getHours()}</h4>
                      <p>Location: {item.where}</p>
                    </Stack>
                    <Stack>
                      <PrimaryButton
                        styles={{
                          root: {
                           
                            color: "grey",
                            paddingRight: 0,
                            backgroundColor:"white"
                          },
                        }}
                        iconProps={{ iconName: "edit" }}
                        onClick={()=>{this.editEvent(item.id)}}
                      ></PrimaryButton>

                      <PrimaryButton
                        styles={{
                          root: {
                           
                            color: "red",
                            paddingLeft: 0,
                            backgroundColor:"white"
                          },
                        }}
                        iconProps={{ iconName: "delete" }}
                        onClick={()=>{this.deleteItem(item.id)}}
                      ></PrimaryButton>
                    </Stack>
                    <hr />
                  </Stack>
                </div>
              </Stack>
            ))}
          </Slider>
        </Stack>
      </Stack>
    );
  }
}
