import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";

//React element

//React.createElement is an object => when this object rendered into the DOM then it is a HTML element
//const heading = React.createElement("h1",{id: "heading"},"This is the heading")

//JSX
// const Title = () =>(
//    <h1 id =  "header"> This is the JSX Content</h1>
// )

//Component Composition
// const HeadingComponent = () => {
//     return(
//         <div id="container">
//             <Title />
//             <h1 className="heading">
//                 This is a functional Component!
//             </h1>
//         </div>)
// }
// This transpilation of multiple components is done by Babel

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
