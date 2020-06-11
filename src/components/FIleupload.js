import React, { useState } from "react";
import axios from "axios";

var accessTokenObj = localStorage.getItem("token");

const FIleupload = () => {
  const [state, setState] = useState({
    file: null,
  });
  const handleChange = (e) => {
    console.log("file", e.target.files);
    setState({ file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FileUpload.handlesubmit", state.file);
    const data = new FormData();
    data.append("image", state.file);
    console.log("dfef", data);
    fetch("http://localhost:8000/uploadProfile", {
      method: "POST",
      headers: {
        // " Access-Control-Allow-Origin": "origin-list",
        // "Content-Type": "application/x-www-form-urlencoded",
        "Content-Type": "multipart/form-data",
        token: accessTokenObj,
      },
      body: data,
    }).then((res) => {
      console.log(res);
    });
    // const upload_res = await axios({
    //   method: "POST",
    //   url: "http://localhost:8000/uploadProfile",
    //   headers: {
    //     // "Content-Type": "application/json",
    //     token: accessTokenObj,
    //   },
    //   body: data,
    // });
    // console.log("file upload", upload_res);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="file" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default FIleupload;
// import React, { useState } from "react";
// import axios from "axios";
// var accessTokenObj = localStorage.getItem("token");
// const FIleupload = () => {
//   var config = {
//     headers: {
//       "Content-Type": "application/json",
//       token: accessTokenObj,
//     },
//   };
//   const [state, setState] = useState({
//     selecState: null,
//   });

//   const fileSelectedHandler = (event) => {
//     console.log(event.target.files[0]);
//     setState({
//       state: event.target.files[0],
//     });
//   };
//   const fileUploadHandler = () => {
//     const fd = new FormData();
//     fd.append("image", state.selecState);
//     axios
//       .post("http://localhost:8000/uploadProfile", fd, {
//         headers: {
//           //   "Content-Type": "application/json",
//           //   "Content-Type": " application/x-www-form-urlencoded",
//           token: accessTokenObj,
//         },
//         body: fd,
//       })
//       .then((res) => {
//         console.log(res);
//       });
//     console.log(fd);
//   };
//   return (
//     <div>
//       <input
//         name="myImage"
//         type="file"
//         accept=".jpg,.jpeg,.png"
//         onChange={fileSelectedHandler}
//       />
//       <button onClick={fileUploadHandler}>submit</button>
//     </div>
//   );
// };

// export default FIleupload;
