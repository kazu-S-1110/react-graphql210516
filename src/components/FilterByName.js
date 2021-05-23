import React, { useState } from 'react';
import styles from './FilterByName.module.css';
import SearchIcon from '@material-ui/icons/Search';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_EMPLOYEE } from '../queries';

const FilterByName = () => {
  const [searchByName, setSearchByName] = useState('');
  const [searchEmployee, { data: dataSearch, error: errorSearch }] =
    useLazyQuery(SEARCH_EMPLOYEE, {
      fetchPolicy: 'network-only',
    });

  return <div></div>;
};

export default FilterByName;
