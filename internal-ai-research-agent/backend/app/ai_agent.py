import os
import json

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def generate_ai_report(data):

    prompt = f"""
    Generate a structured business research report.

    Research Type: {data.research_type}
    Name: {data.name}
    Website: {data.website_url}
    Country: {data.country}
    Industry: {data.industry}
    Goal: {data.research_goal}

    Return ONLY valid JSON in this exact format:

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
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a professional business research analyst. "
                    "Return only valid JSON."
                ),
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.4,
    )

    content = response.choices[0].message.content

    content = content.replace("```json", "")
    content = content.replace("```", "")
    content = content.strip()

    start = content.find("{")
    end = content.rfind("}") + 1

    if start == -1 or end == 0:
        raise ValueError("No valid JSON object found in AI response.")

    json_text = content[start:end]

    parsed_data = json.loads(json_text)
    from app.schemas import AIReportResult

    validated = AIReportResult(**parsed_data)

    return validated.model_dump()