import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";

// Load environment variables from a .env file
config();
 
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const makeRequest= async (input)=>{
    const messages = [{ role: "user", content: input }];

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0,
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        if (error.response && error.response.status === 429) {
          // Implement exponential backoff
          const delay = Math.pow(2, error.config.retryCount || 0) * 1000;
          console.log(`Rate limited. Retrying in ${delay / 6000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, delay));

        }
    }   return makeRequest(input); 
}

const question = "What is the capital of India";

makeRequest(question)
    .then((response) => console.log(response))
    .catch((error) => console.error(error));

const promptTemplate= 
    'Be very funny when answering questions Question: {question}';

const prompt = promptTemplate.replace("{question}",question);

makeRequest(prompt)
    .then((response)=> console.log(response))
    .catch((err)=>console.log('Error', err));

export { promptTemplate };