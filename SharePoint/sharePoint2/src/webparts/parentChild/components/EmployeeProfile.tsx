// EmployeeProfile.tsx

import * as React from 'react';

export interface IEmployeeProfileProps {
  employeeDetails: {
    name: string;
    designation: string;
    email: string;
  };
}

const EmployeeProfile: React.FunctionComponent<IEmployeeProfileProps> = (props) => {
  const { name, designation, email } = props.employeeDetails;

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '600px' }}>
 <table>
  <thead>
    <tr>
      <th>Name </th>
      <td>{name};</td>
      <th>Designation </th>
      <td>{designation};</td>
      <th>Email </th>
      <td>{email};</td>
    </tr>
  </thead>
  {/* <tbody>
    <tr>
      <td>{name}</td>
      <td>{designation}</td>
      <td>{email}</td>
    </tr>
  </tbody> */}
</table>

      
    </div>
  );
};

export default EmployeeProfile;
