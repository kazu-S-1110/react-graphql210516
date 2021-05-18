import React from 'react';

const MainPage = () => {
  return <div></div>;
};

export default MainPage;
    if (localStorage.getItem('token')) {
      const decodedToken = jwtDecode(localStorage.getItem('token'));
