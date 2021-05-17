import React, { useState, useEffect } from 'react';
import styles from './Auth.module.css';
import { GET_TOKEN, CREATE_USER } from '../queries';
import { useMutation } from '@apollo/client'; //Reactからクエリを実行するために必要なライブラリ
import jwtDecode from 'jwt-decode'; //JWTの期限を設定するためのライブラリ
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [getToken] = useMutation(GET_TOKEN);
  const [createUser] = useMutation(CREATE_USER);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const decodedToken = jwtDecode(localStorage.getItem('token'));
      if (decodedToken.exp * 1000 < Date.now()) {
        //expはexpireのこと、ミリ秒なので1000倍してあげる
        localStorage.removeItem('token');
      } else {
        window.location.href = './employees';
      }
    }
  }, []);

  return <div></div>;
};

export default Auth;
