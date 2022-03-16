import * as React from 'react';
import styles from './ListFilter.module.scss';
import { IListFilterProps } from './IListFilterProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Cards from './Cards/cards';
import useAppContext, {AppProvider} from '../context/appContext';

const ListFilter = ({
    description,
    isDarkTheme,
    environmentMessage,
    hasTeamsContext,
    userDisplayName,
    context,
  }) => {
    const t = useAppContext();
    return (
      <AppProvider context={context}>
        <>
          <div className='container my-12 mx-auto px-4 md:px-12'>
            <Cards/>
          </div>
        </>
      </AppProvider>
    );
  };

export default ListFilter;
