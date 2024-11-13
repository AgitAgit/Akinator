const base_url = 'https://iitc-b-backend-server-akinator-project-w.onrender.com/api/users';
const local_base_url = 'http://localhost:3000/api/users';

export const registerUser = async function(firstName, userName, password, email){
    const reply = await axios.post(`${base_url}/users`,{
        fname: firstName,
        name: userName,
        password: password,
        email: email
    });
    return reply;
}