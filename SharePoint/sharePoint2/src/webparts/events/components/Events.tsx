import * as React from "react";
import type { IEventsProps } from "./IEventsProps";
import { IEventsState } from "./IEventsState";
import { SPFI, SPFx, spfi } from "@pnp/sp/presets/all";
// import { Icon } from '@fluentui/react';
import styles from "./Events.module.scss";
// import { DefaultButton, Modal, PrimaryButton, Stack, TextField } from '@fluentui/react';
import { Icon, Stack } from "office-ui-fabric-react";


let sp: SPFI;
export default class Events extends React.Component<
  IEventsProps,
  IEventsState
> {
  constructor(props: IEventsProps) {
    super(props);
    sp = spfi().using(SPFx(this.props.spcontext));
    this.state = {
      Title: "",
      When: "",
      Where: "",
      Link: "",
      Category: "",
      EventsArr: [],
    };
    console.log(sp);
  }

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

  public render(): React.ReactElement<IEventsProps> {
    return (
      <Stack>
        <h1 className={styles.heading}>Events Webpart</h1>
        <Stack className={styles.main}>
          <h2>Create a Event</h2>
          
          <Stack horizontal tokens={{ childrenGap: 40 }}>
            <Stack className={styles.container1}>
            <div className={styles.icon}>
            <Icon iconName="AddEvent" aria-label="Add Online Meeting Icon" style={{ fontSize: '40px' }} className={styles.iconStyle} />
          </div>
          <div className={styles.main}>
            <h2>Create an Event</h2>
            <p>When you add an Event, it will show here where your renders can see it.</p>
          </div>
              <hr />
            </Stack>

            {this.state.EventsArr.map((item, key) => (
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
            ))}
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
