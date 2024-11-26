from flask import Flask, request, jsonify
from pymongo import MongoClient
import google.generativeai as genai

# Initialize Flask app
app = Flask(__name__)

# MongoDB connection
client = MongoClient("mongodb+srv://cletusjact:XHEn8chEwkKUggic@cluster0.l3hbg.mongodb.net/")
db = client["womens_rights_db"]
laws_collection = db["womens_laws"]

# Configure Google Generative AI with API key
genai.configure(api_key="AIzaSyBlhjfTLJZTeMwIl3AMbsluyZc7UHcmdPE")
model = genai.GenerativeModel("gemini-1.5-flash")

# Prompt template for query classification
prompt_template = """
You are a legal assistant. Given the following user query about women's legal rights, identify the appropriate laws and provide an answer using the available data.

Query: [User Query]

Answer in simple language, citing relevant sections or acts from the laws.
"""


def generate_response(user_query):
    """
    Generate a response using Google Generative AI.
    """
    try:
        # Replace placeholder with the actual user query
        prompt = prompt_template.replace("[User Query]", user_query)
        # Generate content using Generative AI
        response = model.generate_content(prompt)
        generated_text = response.candidates[0].content.parts[0].text
        return generated_text
    except Exception as e:
        print(f"Error generating response: {e}")
        return "I'm sorry, I couldn't process your query at the moment. Please try again later."


@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Handle chat requests from the React Native frontend.
    """
    data = request.json
    user_message = data.get('message', '')

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    try:
        # Generate a response for the user query
        response_text = generate_response(user_message)
        return jsonify({"response": {"main_response": response_text}})
    except Exception as e:
        print(f"Error handling request: {e}")
        return jsonify({"error": "An internal error occurred. Please try again later."}), 500


if __name__ == '_main_':
    # Run the Flask app, accessible from other devices on the same network
    app.run(debug=True, host='0.0.0.0', port=3000)