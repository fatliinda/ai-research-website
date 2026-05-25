import json
import os


def export_report_to_json(report):
    os.makedirs("output", exist_ok=True)

    file_path = f"output/research_report_{report.id}.json"

    data = {
        "id": report.id,
        "research_type": report.research_type,
        "name": report.name,
        "website_url": report.website_url,
        "country": report.country,
        "industry": report.industry,
        "research_goal": report.research_goal,
        "summary": report.summary,
        "products_or_services": report.products_or_services,
        "opportunities": report.opportunities,
        "risks_or_missing_information": report.risks_or_missing_information,
        "suggested_next_actions": report.suggested_next_actions,
        "confidence_score": report.confidence_score,
        "created_at": str(report.created_at)
    }

    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4, ensure_ascii=False)

    return file_path