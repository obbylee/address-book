import "./style.css";
import { setupCounter } from "./counter.js";
import data from "./data.json";

console.log("%cHello, World!", "color: blue; font-size: 20px;");
console.log(
  "%cWelcome to My Fancy Console!",
  "color: white; background-color: #007acc; font-size: 24px; padding: 10px; border-radius: 5px;"
);
console.log(
  "%c✨ JavaScript is Awesome! ✨",
  "font-weight: bold; font-size: 40px; color: red; text-shadow: 2px 2px 0 rgba(255,0,0,0.5), 4px 4px 0 rgba(255,165,0,0.5), 6px 6px 0 rgba(255,255,0,0.5), 8px 8px 0 rgba(0,128,0,0.5), 10px 10px 0 rgba(0,0,255,0.5);"
);
console.log(
  "%c🎉 Welcome to My Fancy Consolae! 🎉",
  "font-weight:bold; font-size:30px; color:#fff; background-color:#007acc; padding:15px; border-radius:10px;"
);

console.log(data);

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Address Book</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`;

setupCounter(document.querySelector("#counter"));
