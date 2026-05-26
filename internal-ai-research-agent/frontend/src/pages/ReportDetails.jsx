import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getReportById } from "../api/report";

function ReportDetails() {
  const { id } = useParams();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      const response = await getReportById(id);
      setReport(response.data);
    } catch (error) {
      console.error("Failed to load report:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Navbar />
        <main className="dashboard-main">
          <p>Loading report...</p>
        </main>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="dashboard-layout">
        <Navbar />
        <main className="dashboard-main">
          <h1>Report not found</h1>
          <Link to="/" className="primary-btn">Back to Dashboard</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>{report.name}</h1>
            <p>{report.research_type} research report</p>
          </div>

          <div className="table-actions">
            <Link to="/" className="secondary-btn">
              Back
            </Link>

            <a
              className="download-btn"
              href={`http://127.0.0.1:8000/api/reports/${report.id}/export/json`}
              download
            >
              ↓ JSON
            </a>
          </div>
        </header>

        <section className="details-grid">
          <div className="details-card">
            <span>Research Type</span>
            <strong>{report.research_type}</strong>
          </div>

          <div className="details-card">
            <span>Country</span>
            <strong>{report.country || "-"}</strong>
          </div>

          <div className="details-card">
            <span>Industry</span>
            <strong>{report.industry || "-"}</strong>
          </div>

          <div className="details-card">
            <span>Confidence</span>
            <strong>{report.confidence_score}/100</strong>
          </div>
        </section>

        <section className="report-section">
          <h2>Research Goal</h2>
          <p>{report.research_goal}</p>
        </section>

        <section className="report-section">
          <h2>Summary</h2>
          <p>{report.summary}</p>
        </section>

        <ReportList title="Products or Services" items={report.products_or_services} />
        <ReportList title="Opportunities" items={report.opportunities} />
        <ReportList title="Risks or Missing Information" items={report.risks_or_missing_information} />
        <ReportList title="Suggested Next Actions" items={report.suggested_next_actions} />

        <section className="report-section">
          <h2>Metadata</h2>
          <p>
            <strong>Website:</strong>{" "}
            {report.website_url ? (
              <a href={report.website_url} target="_blank" rel="noreferrer">
                {report.website_url}
              </a>
            ) : (
              "-"
            )}
          </p>
          <p>
            <strong>Created:</strong>{" "}
            {new Date(report.created_at).toLocaleString()}
          </p>
        </section>
      </main>
    </div>
  );
}

function ReportList({ title, items }) {
  return (
    <section className="report-section">
      <h2>{title}</h2>

      {Array.isArray(items) && items.length > 0 ? (
        <ul className="report-list">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No data available.</p>
      )}
    </section>
  );
}

export default ReportDetails;