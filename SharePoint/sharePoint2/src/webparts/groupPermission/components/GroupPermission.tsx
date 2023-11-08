import * as React from 'react';
import type { IGroupPermissionProps } from './IGroupPermissionProps';
// import { SPFI, SPFx,spfi } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { SPFI, spfi, SPFx } from "@pnp/sp";
import { IGroupPerMissonState } from './IGroupPermissionState';
import {
  DetailsList,
  IColumn,
  DetailsListLayoutMode,
} from "@fluentui/react";

let sp : SPFI;
export default class GroupPermission extends React.Component<IGroupPermissionProps, IGroupPerMissonState> {
  private _columns: IColumn[] = [{key: 'column1', name: 'Group Name', fieldName: 'groupName', minWidth: 100, maxWidth: 200},{key: 'column2', name: 'Group Users', fieldName: 'groupUsers', minWidth: 100, maxWidth: 200}];
  private _groupcolumns : IColumn[] = 
  [
    {key: 'column1', name: 'Group Name', fieldName: 'groupName', minWidth: 20, maxWidth: 40,isResizable:true},
    {key: 'column2', name: 'Group Title', fieldName: 'groupTitle', minWidth: 50, maxWidth: 100},
    {key: 'column3', name: 'Group Email', fieldName:'groupEmail', minWidth: 85, maxWidth: 150},
    {key: 'column4', name: 'Is Site Admin', fieldName: 'isSiteAdmin', minWidth: 50, maxWidth: 100},
    // {key: 'column5', name: 'Total Group Members', fieldName: 'totalGroupMembers', minWidth: 10, maxWidth: 20}
    
  ]
  constructor(props: IGroupPermissionProps) {
    super(props);
    sp = spfi().using(SPFx(this.props.spcontext));
    this.state = {
      currentUserDetails :{
        employeeName : "",
        employeeEmail : "",
      },
      groups : {
        groupName : "",
        groupUsers : 0,
      },
      groupDescription :{ 
        groupName : "",
        groupTitle : "",
        groupEmail : "",
        isSiteAdmin : false,
        totalGroupMembers : 0,
      },
      groupsArr : [],
      groupDescriptionArr :[]
    };
    // spfi().using(SPFx(this.props.spcontext));
  }

  // Get current user data
  public _getCurrentUser(): any {
    return new Promise<any>((resolve, reject) => {
      sp.web
        .currentUser()
        .then((result: any) => {
          resolve(result);
          this.setState({currentUserDetails :{ 
            employeeName : result.Title,
            employeeEmail : result.Email,
          }})
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  public getGroupUsers = () => {
    return new Promise<any>((resolve, reject) => {
      sp.web.siteGroups()
        .then((j: any[]) => {
          let flag = false;
         // console.log("Groups2",j);
          j.map((val) => {
            this.setState({groups:{ groupName : val.Title,groupUsers:val.Id},
              groupsArr:[...this.state.groupsArr  ,
                 {"groupName":val.Title,"groupUsers":val.Id} ]})
           // console.log("Groups",this.state.groups);
           //  console.log("Groups arr",this.state.groupsArr);
          //   console.log("Total Groups In ,",j.length);

          });
          if (flag === false) {
            resolve(false);
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  // Get group users list
  public getGroupUserList = (groupName: string) => {
    return new Promise<any>((resolve, reject) => 
    {
      sp.web.siteGroups.getByName(groupName).users()
        .then((userList: any) => {
          resolve(userList);
          console.log("Group Name ",userList);
          userList.map((val : any) => 
          {
            this.setState({groupDescription:{groupTitle: val.Title, groupEmail: val.Email, isSiteAdmin: val.IsSiteAdmin, totalGroupMembers: val.Id,groupName: groupName},
            groupDescriptionArr:[...this.state.groupDescriptionArr , {"groupTitle":val.Title,"groupEmail":val.Email,"isSiteAdmin":val.IsSiteAdmin,"totalGroupMembers":val.Id,"groupName":groupName}]
            })
            //console.log("User Name in Group",groupName,"is",val.Title);
           // console.log("User Email ",val.Email);
           // console.log("Is Admin of the Group",val.IsSiteAdmin);
          });
          //console.log("User List ",userList);
          //console.log("Total Users In Group",groupName,"are",userList.length);

        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  //

  public render(): React.ReactElement<IGroupPermissionProps> {
    return (
      <div>
      <div>
        <h1>Group Permission</h1>
        <ol>
          <li>User Details :{this.state.currentUserDetails.employeeName}</li>
          <li>User Email current Logged-in user : {this.state.currentUserDetails.employeeEmail}</li>
        </ol>
      </div>
        
      <DetailsList
        items = {this.state.groupsArr}
        columns = {this._columns}
        setKey='set'
        layoutMode={DetailsListLayoutMode.fixedColumns}
      
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
      />
      <DetailsList
        items = {this.state.groupDescriptionArr}
        columns = {this._groupcolumns}
        setKey='set'
        layoutMode={DetailsListLayoutMode.fixedColumns}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        
        />
      <button onClick={() =>{this.getGroupUsers(),this._getCurrentUser(),this.getGroupUserList("Sp11")}}>Fetch group</button>
      </div>
    );
  }
}
