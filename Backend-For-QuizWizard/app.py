from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import json
import re
from dotenv import load_dotenv
from pathlib import Path

# === Load .env ===
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
if OPENROUTER_API_KEY:
    print("✅ OpenRouter API Key Loaded:", OPENROUTER_API_KEY[:10], "********")
else:
    print("❌ ERROR: OpenRouter API Key not found. Check .env file.")
    # Optional: exit early if required
    # exit(1)

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend calls

MODEL = "meta-llama/llama-3.3-8b-instruct:free"

def build_prompt(topic, subtopic, num, difficulty, q_type):
    sub = f", subtopic '{subtopic}'" if subtopic else ""
    base = (
        f"Generate {num} {q_type.upper()} quiz questions based on the topic '{topic}'{sub} "
        f"with a difficulty level of '{difficulty}'.\n"
        "Guidelines:\n"
        "- Each question must be distinct in wording **and** cover a different concept or angle.\n"
        "- Do **not** repeat similar facts, formulas, definitions, or scenarios.\n"
        "- Avoid interrelated questions (no follow-ups or variations of the same idea).\n"
        "- Keep each question clear, accurate, and concise.\n"
        "- Align each question to the specified difficulty.\n"
        "- Keep explanations short (under 30 words), clear, and focused on why the answer is correct.\n"
        "- Format output as a valid JSON array only (no markdown, commentary, or extra notes).\n"
    )

    if q_type == "mcq":
        instructions = (
            "Each question should include:\n"
            "- 'question': The question text\n"
            "- 'options': A list of 4 choices\n"
            "- 'answer': The correct option\n"
            "- 'explanation': A brief explanation\n"
        )
    elif q_type in ["truefalse", "true/false"]:
        instructions = (
            "Each question should include:\n"
            "- 'question': The statement\n"
            "- 'answer': Either 'True' or 'False'\n"
            "- 'explanation': A brief explanation\n"
        )
    elif q_type == "short questions":
        instructions = (
            "Each question should include:\n"
            "- 'question': The question text\n"
            "- 'answer': A short correct answer\n"
            "- 'explanation': A brief explanation\n"
        )
    else:
        instructions = "Return a list of questions with answer and explanation in JSON format."

    return base + instructions + "\nReturn the entire output as a valid JSON array."

def call_openrouter(prompt):
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "HTTP-Referer": "https://quiz-wizard-ai-z5pv.onrender.com",  # Update in production
        "Content-Type": "application/json"
    }

    payload = {
        "model": MODEL,
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
    response.raise_for_status()
    return response.json()['choices'][0]['message']['content']

@app.route('/api/generate', methods=['POST'])
def generate_questions():
    ai_response = ""  # initialize to avoid UnboundLocalError
    try:
        data = request.json
        qtype_map = {
            "multiple-choice": "mcq",
            "true-false": "truefalse",
            "short-answer": "short questions"
        }

        topic = data.get('subject', 'General Knowledge')
        subtopic = data.get('topic', '')
        num = int(data.get('numberOfQuestions', 5))
        difficulty = data.get('difficulty', 'easy')
        q_type = qtype_map.get(data.get('questionType', 'multiple-choice'), 'mcq')

        prompt = build_prompt(topic, subtopic, num, difficulty, q_type)
        ai_response = call_openrouter(prompt)

        print("\n==== AI Raw Response ====\n", ai_response)

        try:
            questions = json.loads(ai_response)
        except json.JSONDecodeError:
            cleaned = re.sub(r"^```json|```$", "", ai_response.strip(), flags=re.MULTILINE)
            questions = json.loads(cleaned)

        return jsonify(questions)

    except Exception as e:
        print("\n==== ERROR ====\n", str(e))
        return jsonify({"error": str(e), "raw_response": ai_response}), 500

@app.route("/")
def home():
    return "✅ Flask backend is running."

if __name__ == '__main__':
    app.run(debug=True)
