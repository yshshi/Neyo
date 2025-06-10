import { StreamChat } from "stream-chat";
import "dotenv/config"

const api_key = process.env.STEAM_API_KEY
const api_secret = process.env.STEAM_API_SECRET

if(!api_key || !api_secret){
    console.error("Stream API KEY and SECERT is missing")
}

const streamClient = StreamChat.getInstance(api_key , api_secret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData
    } catch (error) {
        console.error(error)
        console.error("Error while creating user in Stream")
    }
}

export const generateStreamToken = (userId) => {
    try {
        const user_id = userId.toString();
        return streamClient.createToken(user_id)
    } catch (error) {
        console.error(error)
        console.error("Error while creating token in Stream")
    }
};