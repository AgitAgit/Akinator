const base_url = 'https://iitc-b-backend-server-akinator-project-w.onrender.com/api/users';
const local_base_url = 'http://localhost:3000/api/users';
const current_base_url = local_base_url;

//gets:
//returns:
export const registerUser = async function(firstName, userName, password, email){
    try{
        const reply = await axios.post(`${current_base_url}/users`,{
            fName: firstName,
            user: userName,
            password: password,
            email: email
        });
        return reply.data;
    } catch (error){
        console.log("Communication_Center.userData.registerUser says:", error);
    }
}

//gets:
//returns: An object of the form: { ..., data: { message:(string), response:(string), token(string) } }
export const loginUser = async function(email, password){
    try{
        const reply = await axios.post(`${current_base_url}/users/login`,{
            email,
            password
        });
        return reply.data;
    } catch (error){
        console.log("Communication_Center.userData.loginUser says:", error);
    }
}

//gets:
//request body:{
//   "token": "<your_jwt_token>",
//   "fName": "Jane",
//   "user": "jane_doe_updated",
//   "password": "newSecurePassword456",
//   "email": "new_example@gmail.com"
// }
//returns:
// export const updateUser = async function(token, fName, user, password, email){
//     const id = 'k';//I don't have a convenient way of getting the users id currently...
//     const reply = await axios.post(`${current_base_url}/users/${id}`)
// }