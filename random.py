import openai

#Please add your open AI API key here. 
openai.api_key = "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"
#messages to store the conversation
messages = [
]

#Append the message to the conversation history 
def add_message(role, message):
    messages.append({"role": role, "content": message})

#Trigger the Open AI APIs
def converse_with_chatGPT():
    response = openai.chatCompletion.create(
        model="gpt-3.5-turbo", #Open AI model name
        messages=messages, # user query
        max_tokens = 1024, # this is the maximum number of tokens that can be used to provide a response.
        n=1, #number of responses expected from the Chat GPT
        stop=None, 
        temperature=0.5 #making responses deterministic or not much imaginative
    )
    # print(response)
    message = response.choices[0].message.content
    add_message("assistant", message)
    return message.strip()

# process user prompt
def process_user_query(prompt):
    user_prompt = (f"{prompt}")
    add_message("user", user_prompt)
    result = converse_with_chatGPT()
    print(result)

#Request user to provide the query
def user_query():
    while True:
        prompt = input("Enter your question: ")
        response = process_user_query(prompt)
        print(response)
# Call user_query to start conversation with user
user_query()