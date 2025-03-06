import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export default function SearchBar({handelSearch}) {
  const [searchContent, setSearchContent] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filterCategories = {
    "Programming Languages": ["Python", "JavaScript", "Java", "C++", "Ruby"],
    Mathematics: ["Calculus", "Linear Algebra", "Statistics"],
    "Web Development": ["React", "Angular", "Vue.js", "Node.js"],
  };

  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const handleSearchChange = debounce((value) => {
    setSearchContent(value);
  }, 300);

  return (
    <div className="container py-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handelSearch(searchContent)
        }}
      >
        <div className="d-flex align-items-center">
          <div className="position-relative flex-grow-1">
            <Search
              size={20}
              className="position-absolute"
              style={{ top: "50%", left: "10px", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              aria-label="Search for skills or users"
              className="form-control ps-5"
              placeholder="Search skills or users..."
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          {/* <button
            type="button"
            className={`btn ms-2 ${showFilters ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Toggle filters"
          >
            <Filter size={20} />
          </button> */}
        </div>
      </form>

      <div
        className={`filter-section mt-3 p-3 border rounded bg-white shadow-sm ${
          showFilters ? "d-block" : "d-none"
        }`}
        style={{ transition: "max-height 0.3s ease", overflow: "hidden" }}
      >
        {selectedFilters.length > 0 && (
          <div className="mb-3">
            <h6>Selected Filters:</h6>
            <div className="d-flex flex-wrap gap-2">
              {selectedFilters.map((filter) => (
                <span
                  key={filter}
                  className="badge bg-primary d-flex align-items-center gap-2"
                  style={{ padding: "8px 12px" }}
                >
                  {filter}
                  <X
                    size={14}
                    onClick={() => toggleFilter(filter)}
                    style={{ cursor: "pointer" }}
                  />
                </span>
              ))}
            </div>
            <button
              className="btn btn-sm btn-outline-danger mt-2"
              onClick={() => setSelectedFilters([])}
            >
              Clear Filters
            </button>
          </div>
        )}

        <div className="row">
          {Object.entries(filterCategories).map(([category, skills]) => (
            <div key={category} className="col-md-4 mb-3">
              <h6 className="mb-2">{category}</h6>
              <div className="d-flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    className={`btn btn-sm ${
                      selectedFilters.includes(skill)
                        ? "btn-primary"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() => toggleFilter(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
