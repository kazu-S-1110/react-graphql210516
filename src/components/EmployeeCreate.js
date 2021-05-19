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

  return <div></div>;
};

export default EmployeeCreate;
