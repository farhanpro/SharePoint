import * as React from 'react';
import styles from './ProQuickLinks.module.scss';
import type { IProQuickLinksProps } from './IProQuickLinksProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import { SPFI, SPFx, spfi } from '@pnp/sp/presets/all';
import { IconButton, Stack,TooltipHost,Text, Link, StackItem, Icon } from 'office-ui-fabric-react';
import Constants from './Constants';
import { IProQuickLinksState } from './IProQuickLinks.State';


let sp: SPFI;
export default class ProQuickLinks extends React.Component<IProQuickLinksProps, IProQuickLinksState> {
  constructor(props:any){
    super(props);
    this.state = {
      Id : 0,
      Title:'',
      FileType:'',
      Link:'',
      QuickLinksArr: []

    }
    sp = spfi().using(SPFx(this.props.spcontext));
  }
  componentDidMount(): void {
    sp.web.lists.getByTitle("ProdQuickLinks").items.select()()
    .then((item:any)=>{
      item.map((item:any)=>{
        this.setState({
          Id : item.Id,
          Title:item.Title,
          FileType:item.FileType,
          Link:item.Link,
          QuickLinksArr :[...this.state.QuickLinksArr,{"Id":item.Id,"Title":item.Title,"FileType":item.FileType,"Link":item.Link}]
        })

      })
      console.log("This is Quick Links arr",this.state.QuickLinksArr);
    })
  }
  public render(): React.ReactElement<IProQuickLinksProps> {
    return (
    <section className={`${styles.procurementKeyContacts}`}>
       <Stack horizontal className={`${styles.headingStyle}`}>
          <IconButton className={styles.contactInfoIcon} iconProps={Constants.ICONS.CONTACT_DETAILS_ICON} />
          <TooltipHost content={`Contacts`}
            className="tooltipHostStyle"
            styles={Constants.TOOLTIP_ELLIPSIS_STYLES}
          >
            <Text variant={'xLarge'} className={`${styles.headingText}`}>Quick Links</Text>
          </TooltipHost>
        </Stack>
        <Stack className={styles.contactStack}>
        <Stack style={{ borderRight: '1px solid #EEEEEE', marginRight: 10 }}>
          { 
          <React.Fragment>
            {this.state.QuickLinksArr.map((val)=>{
              return(
                <React.Fragment>
                   <Stack horizontal style={{ borderBottom: '1px solid #EEEEEE', padding: '10px 0px 10px 24px' }}>
                    <StackItem className={styles.iconStackStyle}>
                      {
                        val.FileType === 'pdf'?
                        <StackItem className={styles.personStack}>
                                    <Icon className={styles.iconStyle} iconName={Constants.ICONS.PDF.iconName} />
                                  </StackItem>
                                  :
                        val.FileType === 'links' ?
                        <StackItem className={styles.emailStack}>
                                      <Icon className={styles.iconStyle} iconName={Constants.ICONS.LINK.iconName} />
                                    </StackItem>
                                    :
                        val.FileType === '.ppt' ?
                        <StackItem className={styles.linkStack}>
                                      <Icon className={styles.iconStyle} iconName={Constants.ICONS.PPT.iconName} />
                                    </StackItem>
                        :<React.Fragment/>
                      }
                    </StackItem>
                    <Stack style={{ overflow:"hidden",width:'78%'}}>
                      <TooltipHost  content={`${val.Title}`} className="tooltipHostStyle" styles={Constants.TOOLTIP_ELLIPSIS_STYLES}>
                      <Text className={styles.contactTitle}>{val.Title}</Text>
                        </TooltipHost>
                        <Stack style={{ overflow: "hidden", width: "85%" }}>
                          {val.FileType === 'pdf' ?
                          (
                          <TooltipHost  
                          content={`${val.Title}`}
                          className="tooltipHostStyle"
                          styles={Constants.TOOLTIP_ELLIPSIS_STYLES}>
                            <Link  href={"mailto:" + val.Title}
                                    className={styles.contactTitle}>
                            {val.Title}
                            </Link>
                          </TooltipHost>):val.Title === "links" ? (
                                <TooltipHost
                                  content={`${val.Title}`}
                                  className="tooltipHostStyle"
                                  styles={Constants.TOOLTIP_ELLIPSIS_STYLES}
                                >
                                  <Link
                                    href={val.Title}
                                    target="_blank"
                                    className={styles.contactDetailsStyles}
                                  >
                                    {val.Title}
                                  </Link>
                                </TooltipHost>):val.FileType === ".ppt" ?(
                                  <TooltipHost
                                  content={`${val.Title}`}
                                  className='tooltipHostStyle'
                                  styles={Constants.TOOLTIP_ELLIPSIS_STYLES}
                                  >
                                    <Link
                                      href={val.Title}
                                      target='_blank'
                                      className={styles.contactDetailsStyles}
                                    >
                                        {val.Title}
                                    </Link>
                                  </TooltipHost>
                                ):
                                <></>}
                        </Stack>
                    </Stack>
                   </Stack>
                </React.Fragment>
              )
            })}
          </React.Fragment>
          }
          </Stack>
        </Stack>

    </section>
    );
  }
}
