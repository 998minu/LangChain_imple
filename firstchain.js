import { config } from "dotenv";
config();

import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";

const model = new OpenAI({ temperature: 0 });

const prompt = PromptTemplate.fromTemplate('Be very funny when answering questions\n Question: {question}');

const chain = new LLMChain({ llm: model, prompt });

const result = await chain.call({ question: "What is the capital of France?" });
console.log(result);


