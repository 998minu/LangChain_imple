import { config } from "dotenv";
config();

import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { SimplesequentialChain, LLMChain } from "langchain/chains";


// Fix typo in SimpleSequentialChain import

const responseTemplate1 = 'You are a helpful bot that creates a "thank you" response text. If the customer is unsatisfied, offer them a real-world assistant to talk to. You will get a sentiment and subject as input and evaluate.\ntext: {input}';

const responseTemplate2 = 'You are an assistant bot. Your job is to make the customer feel heard and understood. Reflect on the input you receive.\ntext: {input}';

const reviewPromptTemplate1 = new PromptTemplate({
    template: responseTemplate1,
    inputVariables: ['input'],
});

const reviewPromptTemplate2 = new PromptTemplate({
    template: responseTemplate2,
    inputVariables: ['input'],
});

const overallChain = new SimplesequentialChain({
    chain: [reviewPromptTemplate1, reviewPromptTemplate2],
    verbose: true,
});

