import * as React from 'react';
import styles from './ListFilter.module.scss';
import { IListFilterProps } from './IListFilterProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Cards } from './Cards/cards';
//import './../../../tailwind.css';

export default class ListFilter extends React.Component<IListFilterProps, {}> {
  public render(): React.ReactElement<IListFilterProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      context,
    } = this.props;

    return (
     <div className='container'>
        <div className='container'>
          <Cards context={this.props.context}></Cards>
        </div>
     </div>
    );
  }
}
