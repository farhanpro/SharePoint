export interface IGroupPerMissonState {
currentUserDetails :{
    employeeName : string;
    employeeEmail:string;
},

groups :{
    groupName:string;
    groupUsers:number;
},

groupDescription :{
    groupName : string;
    groupTitle : string;
    groupEmail :string;
    isSiteAdmin : boolean;
    totalGroupMembers:number;
}
 groupsArr : Grouplength[];
 groupDescriptionArr : GroupDescription[];
}

interface Grouplength {
    groupName:string;
    groupUsers:number;
}
interface GroupDescription {
    groupName : string;
    groupTitle : string;
    groupEmail :string;
    isSiteAdmin : boolean;
    totalGroupMembers:number;
}

