const server_base_url = 'https://iitc-b-backend-server-akinator-project-w.onrender.com/api/chatgpt';
const local_base_url = 'http://localhost:3000/api/chatgpt';
const current_base_url = server_base_url;

//response is of the form: { ..., data: { message:(string), response:(string) } }
//returns: An object of the form: { message:(string), response:(string) } 
export const prompt = async function(token, text){
    try{
        const response = await axios.post(`${current_base_url}/prompt`,{
            token,
            text
        });
        return response.data
    } catch(error){
        console.log("Communication_Center.gptData.prompt says:", error);
    }
}

//returns: An object of the form { message: }
export const restartSession = async function(token){
    try{
        const reply = await axios.post(`${current_base_url}/clear`, {
            token,
            text:"clear"
        });

        return reply.data;
    } catch(error){
        console.log(error);
    }
}

//Deprecated due to api change?
// export const restartGame = async function(token){
//     await restartSession(token);
//     const reply = await prompt(token, " ");
//     return reply.response;
// }
