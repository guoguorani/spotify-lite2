// // import logo from './logo.svg';
// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./Login";
// import Signup from "./Signup";

// function App() {
//   return (
//     // <Login />
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Signup />}></Route>
//         {/* <Route path="/signup" element={<Signup />}></Route>
//         <Route path="/login" element={<Login />}></Route> */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
