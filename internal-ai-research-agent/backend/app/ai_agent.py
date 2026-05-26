import os
import json

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
api_key = os.getenv("OPENROUTER_API_KEY")

if not api_key:
    raise ValueError("OPENROUTER_API_KEY is missing from .env file.")

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)


def generate_ai_report(data):

    prompt = f"""
    Generate a business research report.

    Research Type: {data.research_type}
    Name: {data.name}
    Website: {data.website_url}
    Country: {data.country}
    Industry: {data.industry}
    Goal: {data.research_goal}

    Return ONLY valid JSON in this format:

    {{
      "summary": "...",
      "products_or_services": [],
      "opportunities": [],
      "risks_or_missing_information": [],
      "suggested_next_actions": [],
      "confidence_score": 0
    }}
    """

    response = client.chat.completions.create(
        model="openrouter/free",
        messages=[
            {
                "role": "system",
                "content": "You are a professional business research analyst. Return only valid JSON."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.4
    )

    content = response.choices[0].message.content

    content = content.replace("```json", "").replace("```", "").strip()

    return json.loads(content)