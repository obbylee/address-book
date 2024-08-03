import "./style.css";
import { setupCounter } from "./counter.js";
import dataContacts from "./data.json";

console.log(dataContacts);

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Address Book</h1>
    
    ${dataContacts.map((contact) => {
      return `<div>
        <h2>${contact.fullName}</h2>
      </div>`;
    })}
  </div>
`;
