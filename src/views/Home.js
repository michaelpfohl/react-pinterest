import React from 'react';
import Auth from '../components/Auth';
import Loader from '../components/Loader';
import HomeComponent from '../components/HomeComponent';

export default function Home({ user }) {
  const loadComponent = () => {
    let component = '';
    if (user === null) {
      component = <Loader />;
    } else if (user) {
      component = <HomeComponent />;
    } else {
      component = <Auth />;
    }
    return component;
  };

  return (
    <div>
      <h1 className="mt-3">Welcome to React-Pinterest</h1>
      {loadComponent()}
    </div>
  );
}
