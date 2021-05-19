import React, { useContext } from 'react';
import { StateContext } from '../context/StateContext';
import styles from './EmployeeCreate.module.css';
import { useMutation } from '@apollo/client';
import { CREATE_EMPLOYEE, GET_EMPLOYEES, UPDATE_EMPLOYEE } from '../queries';

const EmployeeCreate = ({ dataDepts }) => {
  const {
    name,
    setName,
    joinYear,
    setJoinYear,
    deptName,
    setDeptName,
    selectedDept,
    setSelectedDept,
    editedId,
    setEditedId,
  } = useContext(StateContext);
  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }], //第二引数には第一引数に指定したクエリが完了した後に走らせるクエリを指定している。
  });
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });
  const selectOption = dataDepts?.allDepartments.edges.map((dept) => (
    <option key={dept.node.id} value={dept.node.id}>
      {dept.node.deptName}
    </option>
  ));

  return (
    <>
      <div>
        <input
          type="text"
          className={styles.employeeCreate__input}
          placeholder="employee name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          className={styles.employeeCreate__input}
          placeholder="year of join"
          value={joinYear}
          onChange={(e) => setJoinYear(e.target.value)}
        />
      </div>
      <select
        value={selectedDept}
        onChange={(e) => {
          setSelectedDept(e.target.value);
        }}
      >
        <option value="">select</option>
        {selectOption}
      </select>
      <button
        disabled={!selectedDept || !name || !joinYear}
        className={styles.employeeCreate__btn}
        onClick={
          editedId
            ? async () => {
                try {
                  await updateEmployee({
                    variables: {
                      id: editedId,
                      name: name,
                      joinYear: joinYear,
                      department: selectedDept,
                    },
                  });
                } catch (err) {
                  alert(err.message);
                }
              }
            : async () => {
                try {
                  await createEmployee({
                    variables: {
                      name: name,
                      joinYear: joinYear,
                      department: selectedDept,
                    },
                  });
                } catch (err) {
                  alert(err.message);
                }
                setName('');
                setJoinYear(2020);
                setSelectedDept('');
              }
        }
      >
        {editedId ? 'Update' : 'Create'}
      </button>
    </>
  );
};

export default EmployeeCreate;
