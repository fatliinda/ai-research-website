function ReportFilters({ filters, setFilters, resetFilters }) {
  return (
    <section className="filters-card">
      <div className="filter-group">
        <label>Research Type</label>
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">All Types</option>
          <option value="Company">Company</option>
          <option value="Supplier">Supplier</option>
          <option value="Client">Client</option>
          <option value="Product">Product</option>
          <option value="Competitor">Competitor</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Country</label>
        <input
          placeholder="Country"
          value={filters.country}
          onChange={(e) => setFilters({ ...filters, country: e.target.value })}
        />
      </div>

      <div className="filter-group">
        <label>Industry / Category</label>
        <input
          placeholder="Industry"
          value={filters.industry}
          onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
        />
      </div>

      <div className="filter-group">
        <label>Min Confidence</label>
        <input
          type="number"
          min="0"
          max="100"
          placeholder="0 - 100"
          value={filters.minConfidence}
          onChange={(e) =>
            setFilters({ ...filters, minConfidence: e.target.value })
          }
        />
      </div>

      <button className="secondary-btn" onClick={resetFilters}>
        Reset
      </button>
    </section>
  );
}

export default ReportFilters;