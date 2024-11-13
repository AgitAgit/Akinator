const base_url = 'https://iitc-b-backend-server-akinator-project-w.onrender.com'

export const registerUser = async function(firstName, userName, password, email){
    const reply = await axios.post(`${base_url}/api/users/users`,{
        fname: firstName,
        name: userName,
        password: password,
        email: email
    });
    return reply;
}