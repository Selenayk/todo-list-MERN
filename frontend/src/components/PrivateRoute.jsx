// import { Route, Redirect } from 'react-router-dom';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const isAuthenticated = !!localStorage.getItem('token'); // Kullanıcı giriş yapmış mı kontrol et

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/" />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;
