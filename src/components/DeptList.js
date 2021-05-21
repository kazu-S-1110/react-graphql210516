import React, { useContext } from 'react';
import { StateContext } from '../context/StateContext';
import styles from './DeptList.module.css';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from '@apollo/client';
import { CREATE_DEPT, DELETE_DEPT, GET_DEPTS, GET_EMPLOYEES } from '../queries';

const DeptList = () => {
  const { deptName, setDeptName } = useContext(StateContext);
  const [createDept] = useMutation(CREATE_DEPT, {
    refetchQueries: [{ query: GET_DEPTS }],
  });
  const [deleteDept] = useMutation(DELETE_DEPT, {
    refetchQueries: [{ query: GET_DEPTS }, { query: GET_EMPLOYEES }],
  });
  return (
    <>
      <h3>Department List</h3>
      <input
        type="text"
        className={styles.deptList__input}
        placeholder="new department name"
        value={deptName}
        onChange={(e) => setDeptName(e.target.value)}
      />

      <button
        disabled={!deptName}
        onClick={async () => {
          try {
            await createDept({
              variables: {
                deptName: deptName,
              },
            });
          } catch (err) {
            alert(err.message);
          }
          setDeptName('');
        }}
      >
        New dept
      </button>
    </>
  );
};

export default DeptList;
