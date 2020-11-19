// import React from 'react';
// import BoardContainer from '../components/BoardContainer';
// import Auth from '../components/Auth';
// import Loader from '../components/Loader';

// export default function Home({ user }) {
//   const loadComponent = () => {
//     let component = '';
//     if (user === null) {
//       component = <Loader />;
//     } else if (user) {
//       component = <BoardContainer />;
//     } else {
//       component = <Auth />;
//     }
//     return component;
//   };

//   return (
//     <div>
//       <h1>Home Page</h1>
//       {loadComponent()}
//     </div>
//   );
// }

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
      <h1>Welcome to React-Pinterest</h1>
      {loadComponent()}
    </div>
  );
}
