import { registerUser } from "./Communication_Center/userData.js";

const reply = await registerUser("test1", "test1", "test1", "test1");

console.log("the server response to register user is:", reply);
