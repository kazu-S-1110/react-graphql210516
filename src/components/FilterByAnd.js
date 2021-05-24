import React, { useState } from 'react';
import styles from './FilterByAnd.module.css';
import SearchIcon from '@material-ui/icons/Search';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_AND_EMPLOYEE } from '../queries';

const FilterByAnd = () => {
  const [searchName, setSearchName] = useState('');
  const [searchJoin, setSearchJoin] = useState(2020);
  const [searchDept, setSearchDept] = useState('');
  const [searchAndEmployee, { data: dataSearchAnd, error: errorSearchAnd }] =
    useLazyQuery(SEARCH_AND_EMPLOYEE, {
      fetchPolicy: 'network-only',
    });

  return (
    <>
      <h3>Filter by AND condition</h3>
      <input
        type="text"
        placeholder="employee name ?"
        className={styles.filterByAnd__input}
        value={searchName}
        onChange={(e) => {
          setSearchName(e.target.value);
        }}
      />

      <input
        type="number"
        className={styles.filterByAnd__input}
        min="0"
        value={searchJoin}
        onChange={(e) => {
          setSearchJoin(e.target.value || 0);
        }}
      />

      <input
        type="text"
        placeholder="department name ?"
        value={searchDept}
        onChange={(e) => {
          setSearchDept(e.target.value);
        }}
      />

      <div>
        <SearchIcon
          className={styles.filterByAnd__search}
          onClick={async () => {
            let tempData;
            if (searchJoin === 0) {
              tempData = null;
            } else {
              tempData = searchJoin;
            }
            await searchAndEmployee({
              variables: {
                name: searchName,
                joinYear: tempData,
                dept: searchDept,
              },
            });
            setSearchName('');
            setSearchJoin(0);
            setSearchDept('');
          }}
        />
      </div>

      <ul className={styles.filterByAnd__list}>
        {errorSearchAnd && <h3>{errorSearchAnd.message}</h3>}
        {dataSearchAnd &&
          dataSearchAnd.allEmployees &&
          dataSearchAnd.allEmployees.edges.map((empl) => (
            <li className={styles.filterByAnd__item} key={empl.node.id}>
              {empl.node.name}
              {' / '}
              {empl.node.joinYear}
              {' / '}
              {empl.node.department.deptName}
            </li>
          ))}
      </ul>
    </>
  );
};

export default FilterByAnd;
