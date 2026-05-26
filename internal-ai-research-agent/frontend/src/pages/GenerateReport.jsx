import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { generateReport } from "../api/report";


function GenerateReport() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    research_type: "Company",
    name: "",
    website_url: "",
    country: "",
    industry: "",
    research_goal: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await generateReport(formData);
      navigate(`/reports/${response.data.id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to generate report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Generate Research Report</h1>
            <p>Create a structured AI-powered business report</p>
          </div>
        </header>

        <section className="form-card">
          <form onSubmit={handleSubmit} className="report-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Research Type</label>
                <select
                  name="research_type"
                  value={formData.research_type}
                  onChange={handleChange}
                  required
                >
                  <option value="Company">Company</option>
                  <option value="Supplier">Supplier</option>
                  <option value="Client">Client</option>
                  <option value="Product">Product</option>
                  <option value="Competitor">Competitor</option>
                </select>
              </div>

              <div className="form-group">
                <label>Name</label>
                <input
                  name="name"
                  placeholder="Example: Tesla, BMW, Apple"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Website URL</label>
                <input
                  name="website_url"
                  placeholder="https://example.com"
                  value={formData.website_url}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Country</label>
                <input
                  name="country"
                  placeholder="Example: Germany"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Industry / Category</label>
                <input
                  name="industry"
                  placeholder="Example: Automotive"
                  value={formData.industry}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width">
                <label>Research Goal</label>
                <textarea
                  name="research_goal"
                  placeholder="Example: Evaluate this company as a potential supplier"
                  value={formData.research_goal}
                  onChange={handleChange}
                  rows="5"
                  required
                />
              </div>
            </div>

            {error && <div className="form-error">{error}</div>}

            <div className="form-actions">
              <button type="button" className="secondary-btn" onClick={() => navigate("/")}>
                Cancel
              </button>

              <button type="submit" className="primary-btn" disabled={loading}>
                {loading ? "Generating..." : "+ Generate Report"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default GenerateReport;