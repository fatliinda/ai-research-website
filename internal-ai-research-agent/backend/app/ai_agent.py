import json
import random


def generate_ai_report(data):
    

    report = {
        "summary": f"{data.name} was analyzed as a {data.research_type}. The report focuses on: {data.research_goal}.",
        "products_or_services": [
            f"Main offering related to {data.industry or 'the provided business area'}",
            "Business operations and market positioning"
        ],
        "opportunities": [
            "Potential partnership opportunity",
            "Possible market expansion",
            "Further supplier/client evaluation recommended"
        ],
        "risks_or_missing_information": [
            "Limited verified public data",
            "Financial and legal information not fully validated"
        ],
        "suggested_next_actions": [
            "Verify company registration",
            "Check reviews and references",
            "Contact the company directly",
            "Compare with competitors"
        ],
        "confidence_score": random.randint(65, 90)
    }

    return report