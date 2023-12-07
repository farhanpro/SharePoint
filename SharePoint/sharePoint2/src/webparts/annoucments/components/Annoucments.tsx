import * as React from 'react';
      import styles from './Annoucments.module.scss';
import type { IAnnoucmentsProps } from './IAnnoucmentsProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import { SPFI, SPFx, spfi } from '@pnp/sp/presets/all';
import { IAnnouncmentsState } from './IAnnouncments.state';
import { Stack } from '@fluentui/react/lib/Stack';

let sp: SPFI;

export default class Annoucments extends React.Component<IAnnoucmentsProps, IAnnouncmentsState> {
  constructor (props :any){
    super(props);
    this.state = {
      Id:0,
      title : '',
      link : '',
      image : '',
      employeeArr : []
    }
    sp = spfi().using(SPFx(this.props.spcontext));

  }
  componentDidMount(): void {
    sp.web.lists.getByTitle("Announcements").items.select()()
    .then((items:any)=>{
      items.map((item:any)=>{
        this.setState({
          Id : item.Id,
          title: item.Title,
          link:item.link,
          image : item.Image,
          employeeArr:[...this.state.employeeArr , {"Id" : item.Id,"title":item.Title,"image":item.Image,"link":item.link}]
        })
      })
    })
  }

  public render(): React.ReactElement<IAnnoucmentsProps> {
    return (
   <Stack>
    <h3>Annoucements</h3>
    {this.state.employeeArr.map((item,index)=>{
      const temp2 = JSON.parse(item.image);
      return(
        <Stack key={item.Id} className={styles.box}>
           <img className={styles.welcomeImage} src={temp2.serverRelativeUrl} alt={item.title}/> 
          <Stack style={{width:"84%",height:"100%"}}>
          <h3>{item.title}</h3> 
          <p><a href={item.link}>Synopsys Assist</a></p>
          </Stack>
        </Stack>
      )
    })}

   </Stack>
    );
  }
}
