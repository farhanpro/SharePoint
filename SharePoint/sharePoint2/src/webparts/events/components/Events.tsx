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
export default class Events extends React.Component<IEventsProps,IEventsState> 
{
  dropdownOptions: IDropdownOption[] = [
    { key: "4", text: "Choice3" },
    { key: "3", text: "Business" },
    { key: "1", text: "Holiday" },
  ];

  constructor(props: IEventsProps) {
    super(props);
    sp = spfi().using(SPFx(this.props.spcontext));
    this.state = {
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
    this.setState({Category: selection.text });
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
      .items.select("Title", "When", "DispName", "Link", "Category")()
      .then((items: any[]) => {
        let modifiedData: any[] = [];
        items.map(async (i: any) => {
          let modifiedObject: any = {};
          modifiedObject.title = i.Title;
          modifiedObject.when = i.When;
          modifiedObject.where = i.DispName;
          modifiedObject.link = i.Link;
          modifiedObject.category = i.Category;
          modifiedData.push(modifiedObject);
        });
        this.setState({ EventsArr: modifiedData });
        console.log(this.state.EventsArr);
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
        When: this.state.When ? this.state.When.toISOString() : '',
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

  public render(): React.ReactElement<IEventsProps> {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };

    return (
      <Stack>
        <h1 className={styles.heading}>Events Webpart</h1>
        <Stack className={styles.main}>
          <h2>Create a Event</h2>
          <PrimaryButton onClick={() => this.setState({ isEditModal: true })}>
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
          
            <PrimaryButton style={{ marginLeft: "10px", marginTop: "10px" }} onClick={() => this.createEvent()}>Submit</PrimaryButton>
          
          </Modal>
          </Stack>
          <Stack horizontal tokens={{ childrenGap:40 }}>
            <Stack className={styles.container1}>
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
              <hr />
            </Stack>
            <Slider {...settings} >
                {this.state.EventsArr.map((item, key) => (
              <Stack horizontal tokens={{ childrenGap: 10 }}>
            <div>
                  <Stack key={key} className={styles.container}>
                    <h5>{item.title}</h5>
                    <hr />
                    <Stack>
                      <p>Category: {item.category}</p>
                      <p>Title: {item.title}</p>
                    </Stack>
                    <Stack>
                      <h4>Time: {item.when}</h4>
                      <p>Location: {item.where}</p>
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
