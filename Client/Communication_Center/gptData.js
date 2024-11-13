const base_url = 'https://iitc-b-backend-server-akinator-project-w.onrender.com/api/chatgpt/prompt';
const local_base_url = 'http://localhost:3000/api/chatgpt/prompt';
const current_base_url = local_base_url;

//response is of the form: { ..., data: { message:(string), response:(string) } }
//returns: An object of the form: { message:(string), response:(string) } 
export const prompt = async function(token, text){
    try{
        const response = await axios.post(`${current_base_url}`,{
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
        const reply = await axios.post(`${current_base_url}`, {
            token,
            text:"clear"
        });

        return reply.data;
    } catch(error){
        console.log(error);
    }


}
