import * as React from 'react';
import styles from './Contacts.module.scss';
import type { IContactsProps } from './IContactsProps';
import {  Text,IconButton, Stack,  TooltipHost } from '@fluentui/react';
import Constants from './Constants';


export default class Contacts extends React.Component<IContactsProps, {}> {
  public render(): React.ReactElement<IContactsProps> {
    return (
      <section className={`${styles.procurementKeyContacts}`}>
        <Stack horizontal className={`${styles.headingStyle}`}>
          <IconButton className={styles.contactInfoIcon} iconProps={Constants.ICONS.CONTACT_DETAILS_ICON} />
          <TooltipHost content={`Contacts`}
            className="tooltipHostStyle"
            styles={Constants.TOOLTIP_ELLIPSIS_STYLES}
          >
            <Text variant={'xLarge'} className={`${styles.headingText}`}>Contacts</Text>
          </TooltipHost>
        </Stack>
      </section>
    );
  }
}
