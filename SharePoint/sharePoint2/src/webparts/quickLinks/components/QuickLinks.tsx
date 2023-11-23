import * as React from 'react';
//import styles from './QuickLinks.module.scss';
import type { IQuickLinksProps } from './IQuickLinksProps';
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { SPFI, spfi, SPFx } from "@pnp/sp";
import { IQuickLinksState } from './IQuickLinksState';
import { DefaultPalette, Stack, IStackStyles } from '@fluentui/react';
import { PrimaryButton, TextField  } from 'office-ui-fabric-react';
// import styles from './QuickLinks.module.scss';
// import { IconButton } from '@fluentui/react/lib/Button';


// Styles definition
const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
  },
};
const itemStyles: React.CSSProperties = {
  alignItems: 'center',
  background: DefaultPalette.themePrimary,
  color: DefaultPalette.white,
  display: 'flex',
  height: 250,
  justifyContent: 'center',
  width: 50,
};

// Tokens definition
// const stackTokens: IStackTokens = { childrenGap: 5 };

let sp: SPFI;
export default class QuickLinks extends React.Component<IQuickLinksProps,IQuickLinksState > {

  constructor(props : IQuickLinksProps){
    super(props);
    sp = spfi().using(SPFx(this.props.spcontext));
    this.state = {
      quickLinks : {
      title : '',
      description : '',
        url : '',
      },
      buyingLink :[]
    }
  }

  componentDidMount(): void {
    sp.web.lists.getByTitle('Quick links').items.select()()
    .then((items:any)=>{
      items.map((item:any) => {
        this.setState({ 
          quickLinks : {
          title : item.Title,
          description : item.BuyingLink.Description,
          url:item.BuyingLink.Url
          },
          buyingLink:[...this.state.buyingLink ,{ "title" : item.Title ,"description" : item.BuyingLink.Description, "url" : item.BuyingLink.Url }]
        })
      })
      console.log("Fetched from Titles",items);
      console.log("Buying Link",this.state.buyingLink);
    })
  }

  addQuickLink = async () : Promise<void> => {
    try{
      const {title,description,url} = this.state.quickLinks;
      const addedLink = await sp.web.lists.getByTitle('Quick links').items.add({
        Title : title,
        BuyingLink :
        {
          Description : description,
          Url : url
        }
      });
      console.log("Items Added",addedLink);
      this.setState({
        quickLinks:{
          title :'',
          description :'',
          url:''
        },
      });
      this.componentDidMount();
    }
    catch (e){
      console.log("Error",e);
    }
  }

  public render(): React.ReactElement<IQuickLinksProps> {
    return (
      <Stack >    
      <TextField 
      label='Enter Title'
      value={this.state.quickLinks.title}
      onChange={(e:any) => this.setState({quickLinks:{...this.state.quickLinks, title: e.target.value}})}
      />
      <TextField 
      label='Enter Description'
      value={this.state.quickLinks.description}
      onChange={(e:any) => this.setState({quickLinks:{...this.state.quickLinks, description: e.target.value}})}
      />
      <TextField 
      label='Enter Url'
      value={this.state.quickLinks.url}
      onChange={(e:any) => this.setState({quickLinks:{...this.state.quickLinks, url: e.target.value}})}
      />
      <PrimaryButton  onClick={this.addQuickLink} >Add Quick link</PrimaryButton>
      <Stack horizontal tokens={{ childrenGap: 40 }}>
      <Stack enableScopedSelectors horizontal horizontalAlign="space-evenly" styles={stackStyles}>
      {this.state.buyingLink.map((item,index)=>{
        return (  
            <Stack key={index} style={itemStyles}>
          
          <i className="ms-Icon ms-Icon--Globe" aria-hidden="true"> </i>
           
        
         
          
            </Stack>)})}
    </Stack>
    </Stack>
    </Stack>

    );
  }
}
