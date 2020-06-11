const Logout = () => {
  localStorage.removeItem("token");
  window.location.replace("/login");
};

export default Logout;

// import React, { useEffect } from "react";

// const Logout = () => {
//   useEffect(() => {
//     localStorage.clear("token");
//     window.location.replace("/login");
//   });
//   return null;
// };

// export default Logout;
