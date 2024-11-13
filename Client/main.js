import { registerUser, loginUser } from "./Communication_Center/userData.js";
import { prompt, restartSession } from "./Communication_Center/gptData.js";

const baba = "test1";

// const reply = await registerUser("test1", "test1", "test1", "test1");
// const reply = await loginUser(baba,baba);

let reply = await loginUser(baba, baba);

const token = reply.token;


reply = await restartSession(token);
console.log("the client is waiting for a response...");
console.log("the server response is:", reply);

// reply = await prompt(token, "Yes");
// console.log("the client is waiting for a response...");
// console.log("the server response is:", reply);