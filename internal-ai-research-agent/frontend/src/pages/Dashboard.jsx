import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getReports } from "../api/report";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StateCards";
import ReportFilters from "../components/ReportFilters";
import ReportTable from "../components/ReportTable";



function Dashboard() {
  const [reports, setReports] = useState([]);

  const [filters, setFilters] = useState({
    type: "",
    country: "",
    industry: "",
    minConfidence: "",
    search: "",
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await getReports();
      setReports(response.data);
    } catch (error) {
      console.error("Failed to load reports:", error);
    }
  };

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesType = filters.type
        ? report.research_type === filters.type
        : true;

      const matchesCountry = filters.country
        ? report.country?.toLowerCase().includes(filters.country.toLowerCase())
        : true;

      const matchesIndustry = filters.industry
        ? report.industry?.toLowerCase().includes(filters.industry.toLowerCase())
        : true;

      const matchesConfidence = filters.minConfidence
        ? Number(report.confidence_score) >= Number(filters.minConfidence)
        : true;

      const matchesSearch = filters.search
        ? report.name?.toLowerCase().includes(filters.search.toLowerCase())
        : true;

      return (
        matchesType &&
        matchesCountry &&
        matchesIndustry &&
        matchesConfidence &&
        matchesSearch
      );
    });
  }, [reports, filters]);

  const resetFilters = () => {
    setFilters({
      type: "",
      country: "",
      industry: "",
      minConfidence: "",
      search: "",
    });
  };

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Overview of generated business research reports</p>
          </div>

          <Link to="/generate" className="primary-btn">
            + Generate New Report
          </Link>
        </header>

        <StatsCards reports={reports} />

        <ReportFilters
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
        />

        <ReportTable
          reports={filteredReports}
          search={filters.search}
          setSearch={(value) => setFilters({ ...filters, search: value })}
        />
      </main>
    </div>
  );
}

export default Dashboard;