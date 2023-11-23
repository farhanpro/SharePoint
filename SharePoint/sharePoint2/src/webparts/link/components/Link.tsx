import * as React from 'react';
import type { ILinkProps } from './ILinkProps';
import { ILinkState } from './ILinkState';
import { SPFI, SPFx, spfi } from "@pnp/sp/presets/all";
import { Icon } from '@fluentui/react';
import styles from './Link.module.scss';
import { DefaultButton, Modal, PrimaryButton, Stack, TextField } from '@fluentui/react';

let sp: SPFI;
export default class Link extends React.Component<ILinkProps, ILinkState> {
 
  constructor(props: ILinkProps) {
    super(props);
    sp = spfi().using(SPFx(this.props.spcontext));
    this.state = {
      title: '',
      link: '',
      iLinks: [],
      isEditModalOpen: false,
    }
  }
  private closeEditModal = (): void => {
    this.setState({
      isEditModalOpen: false,
    });
  };
  public getItem = async (): Promise<void> => {
    sp.web.lists.getByTitle("Links").items.select("ID", "Title", "Link",)().then((items: any[]) => {
      let modifiedData: any[] = [];

      items.map(async (i: any) => {
        let modifiedObject: any = {};
        modifiedObject.itemId = i.ID;
        modifiedObject.title = i.Title;
        modifiedObject.link = i.Link;
        modifiedData.push(modifiedObject);
      });

      this.setState({ iLinks: modifiedData });
      console.log(this.state.iLinks);
    }).catch((error: any) => {
      console.error(error);
    });
  }

  public addItem = async (): Promise<void> => {
    console.log(this.state.title);
    console.log(this.state.link);
    try {
      const addItem = await  sp.web.lists.getByTitle('Links')
      .items.add({
        Title: this.state.title, 
        Link: this.state.link,   
      });
      console.log(addItem);
      this.setState({
        title: '',
        link: ''
      });
      this.closeEditModal()
    } catch (e: any) {
      console.error("Error adding item to SharePoint:", e);
    }
  }
  

  public render(): React.ReactElement<ILinkProps> {
    return (
      <>
        <h1 className={styles.heading}>Hyperlink Webpart</h1>
        <div>
          <PrimaryButton iconProps={{ iconName: 'Add' }} onClick={() => this.setState({ isEditModalOpen: true })}>Add Link</PrimaryButton>
          <PrimaryButton onClick={this.getItem} style={{ marginLeft: "20px", marginBottom: "10px" }}>Show Links</PrimaryButton>
          <Modal
            isOpen={this.state.isEditModalOpen}
            onDismiss={this.closeEditModal}
            isBlocking={false}
            styles={{
              main: {
                width: "40%",
                height: "40%",
              },
            }}
          >
            <Stack horizontal tokens={{ childrenGap: 40 }} style={{ marginLeft: "30px", marginTop: "40px" }} >
              <TextField label='Decription of Link' placeholder='Decription of Link' value={this.state.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ title: e.target.value })} />
              <TextField label='Link' placeholder='link' value={this.state.link} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ link: e.target.value })} /> </Stack>
            <PrimaryButton style={{ marginTop: "30px", marginLeft: "30px", marginRight: "20px" }} onClick={this.addItem}>Save</PrimaryButton>
            <DefaultButton onClick={this.closeEditModal}>Cancel</DefaultButton>
          </Modal>
        </div>

        <div className={styles.container1} onClick={() => this.setState({ isEditModalOpen: true })}>
          <div className={styles.icon}>
            <Icon iconName="AddOnlineMeeting" aria-label="Add Online Meeting Icon" style={{ fontSize: '40px' }} className={styles.iconStyle} />
          </div>
          <div className={styles.main}>
            <h2>Create an Link</h2>
            <p>When you add an link, it will show here where your renders can see it.</p>
          </div>
        </div>

        <div>
          {this.state.iLinks.map((item, key) => (
            <div key={key} className={styles.container}>
              <div className={styles.link}>
                <Icon iconName="AddOnlineMeeting" aria-label="Add Online Meeting Icon" style={{ fontSize: '40px' }} />
                <a href={item.link} target="_blank" rel="noopener noreferrer">Link</a>
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
