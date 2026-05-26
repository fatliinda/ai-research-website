function StatsCards({ reports }) {
  const totalReports = reports.length;

  const avgConfidence =
    reports.length > 0
      ? Math.round(
          reports.reduce((sum, report) => sum + Number(report.confidence_score || 0), 0) /
            reports.length
        )
      : 0;

  const reportsByType = reports.reduce((acc, report) => {
    acc[report.research_type] = (acc[report.research_type] || 0) + 1;
    return acc;
  }, {});

  return (
    <section className="stats-grid">
      <div className="stat-card purple">
        <span>Total Reports Generated</span>
        <h2>{totalReports}</h2>
        <p>Reports stored in database</p>
      </div>

      <div className="stat-card blue">
        <span>Reports by Research Type</span>
        <div className="type-list">
          {Object.entries(reportsByType).map(([type, count]) => (
            <div key={type}>
              <span>{type}</span>
              <strong>{count}</strong>
            </div>
          ))}

          {Object.keys(reportsByType).length === 0 && <p>No reports yet</p>}
        </div>
      </div>

      <div className="stat-card green">
        <span>Average Confidence Score</span>
        <h2>
          {avgConfidence}
          <small>/100</small>
        </h2>
        <p>Average AI confidence</p>
      </div>
    </section>
  );
}

export default StatsCards;