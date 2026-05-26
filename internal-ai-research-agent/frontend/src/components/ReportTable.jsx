import { Link } from "react-router-dom";
import { FiDownload } from "react-icons/fi";

function ReportTable({ reports, search, setSearch }) {
  return (
    <section className="table-card">
      <div className="table-header">
        <h2>Previous Research Reports</h2>

        <input
          className="search-input"
          placeholder="Search reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Research Type</th>
              <th>Country</th>
              <th>Industry / Category</th>
              <th>Confidence Score</th>
              <th>Created Date</th>
              <th>View Details</th>
              <th>Download</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="name-cell">{report.name}</td>

                <td>
                  <span className={`badge ${report.research_type?.toLowerCase()}`}>
                    {report.research_type}
                  </span>
                </td>

                <td>{report.country || "-"}</td>
                <td>{report.industry || "-"}</td>

                <td>
                  <div className="confidence">
                    <strong>{report.confidence_score}</strong>/100

                    <div className="confidence-bar">
                      <span style={{ width: `${report.confidence_score || 0}%` }} />
                    </div>
                  </div>
                </td>

                <td>{new Date(report.created_at).toLocaleString()}</td>

                <td>
                  <Link className="details-btn" to={`/reports/${report.id}`}>
                    View Details
                  </Link>
                </td>
                <td>
                    <a className="download-btn"href={`http://127.0.0.1:8000/api/reports/${report.id}/export/json`}download>
                    <FiDownload />
                    Download
                   </a>
                </td>
              </tr>
            ))}

            {reports.length === 0 && (
              <tr>
                <td colSpan="7" className="empty-state">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ReportTable;