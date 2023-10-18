import * as React from 'react';
import type { IFluientUiProps } from './IFluientUiProps';
import {
  TextField,
  Checkbox,
  PrimaryButton,
  DefaultButton,
  Stack,
} from '@fluentui/react';
import { IFluientUi } from './IFluientUi.State';


export default class FluientUi extends React.Component<IFluientUiProps, IFluientUi> {
  
  constructor(props: IFluientUiProps){
    super(props);
    this.state = {
      employeeDetails :{
        name : '',
        number:'',
        age : 0,
        designation : ''
    }
    }

  }
  public render() {

    

    const handleSubmit = () => {
      // Handle form submission logic here
    };
    
    
      return (
        <form onSubmit={handleSubmit}>
      <Stack tokens={{ childrenGap: 20 }}>
        <TextField label="Name" required />
        <TextField label="Email" required type="email" />
        <Checkbox label="Subscribe to newsletter" />

        <Stack horizontal tokens={{ childrenGap: 20 }}>
          <PrimaryButton type="submit">Submit</PrimaryButton>
          <DefaultButton>Cancel</DefaultButton>
        </Stack>
      </Stack>
    </form>
      );
}
}
