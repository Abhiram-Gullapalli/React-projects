
//1) For rendering a single element
const heading = React.createElement("h1", { id: "heading" }, "Hello world from React");

// React .createElement creates a new object whih comprises of  the html tag, any kind of property associated to the html tag
// and finally the content within the html tag
console.log(heading)
//printing out the heading -> defines that it is a "object"



//2) For rendering nested elements
/**
 * Considering html page to be of this format
 * <div id="parent">
 *      <div id="child">
 *          <h1>Hi</h1>
 *      </div>
 * </div>
 * this could be done in the following format =>
 */
const parent = React.createElement("div",{id: "parent"},
    React.createElement("div",{id: "child"},
        [
            React.createElement("h1", { id: "heading" }, "Hello world from h1"),
            React.createElement("h1", { id: "heading" }, "Hello world from h2")
        ])
    )

//This creates extreme redundant code causing unecessary and messy code
//hence code is written using jsx and custom tags are utilised
//But it is should be noticed that react could be written even without jsx

const root = ReactDOM.createRoot(document.getElementById("root"));

//By default react renders elements through the root element which is identified using dom and finally rendering it

root.render(parent);
//the render tag is converting the object heading into h1 tag and then putting it in the div


//*IMP* in case there is already existing code present in the div "root" that particular code will be replaced with the react code and not appended to it