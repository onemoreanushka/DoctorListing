import React, { useEffect, useState } from "react";
import axios from "axios";
import FilterPanel from "../components/FilterPanel";
import Card from "../components/Card";

const DoctorListing = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [consultationType, setConsultationType] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    axios
      .get("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json")
      .then((response) => {
        console.log("Initial doctors data:", response.data); // Log initial data
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor data:", error);
      });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      setFilteredDoctors(doctors);
      return;
    }

    const matches = doctors.filter((doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSuggestions(matches.slice(0, 3));
  }, [searchTerm, doctors]);

  useEffect(() => {
    let updatedDoctors = doctors;

    if (consultationType === "Video Consult") {
      updatedDoctors = updatedDoctors.filter(
        (doc) => doc.video_consult === true
      );
    } else if (consultationType === "In Clinic") {
      updatedDoctors = updatedDoctors.filter((doc) => doc.in_clinic === true);
    }

    if (selectedSpecialties.length > 0) {
      updatedDoctors = updatedDoctors.filter((doc) =>
        selectedSpecialties.every((specialty) =>
          doc.specialities.some((sp) => sp.name === specialty)
        )
      );
    }

    if (searchTerm.trim() !== "") {
      updatedDoctors = updatedDoctors.filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "fees") {
        updatedDoctors.sort((a, b) => {
          const feeA = parseInt(a.fees.replace(/[^\d]/g, ""));
          const feeB = parseInt(b.fees.replace(/[^\d]/g, ""));
          console.log("Comparing fees:", feeA, feeB, feeA - feeB); // Include the result
          return feeA - feeB; // Ascending order for fees
        });
      } else if (sortOrder === "experience") {
        updatedDoctors.sort((a, b) => {
          const experienceA = parseInt(a.experience.replace(/[^0-9]/g, ""));
          const experienceB = parseInt(b.experience.replace(/[^0-9]/g, ""));
          console.log("Comparing experience:", experienceA, experienceB, experienceB - experienceA); // Include the result
          return experienceB - experienceA; // Descending order for experience
        });
      }

    console.log("Filtered doctors before setting:", updatedDoctors); // Log before setting state
    setFilteredDoctors(updatedDoctors);
  }, [consultationType, selectedSpecialties, sortOrder, searchTerm, doctors]);

  const handleSelectDoctor = (name) => {
    setSearchTerm(name);
    const filtered = doctors.filter((doc) =>
      doc.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredDoctors(filtered);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      handleSelectDoctor(suggestions[0].name);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="fixed top-4 left-54 bg-gray-100 shadow-lg w-80 rounded-lg">
      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search doctor by name"
        className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      
      {/* Suggestions List */}
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border rounded-lg shadow-lg w-full mt-2 z-10">
          {suggestions.map((doc) => (
            <li
              key={doc.id}
              onClick={() => handleSelectDoctor(doc.name)}
              className="p-3 hover:bg-blue-100 cursor-pointer transition duration-200"
            >
              {doc.name}
            </li>
          ))}
        </ul>
      )}
    </div>

      <div className="flex gap-4 justify-between my-12">
        <div className="w-2/5">
          <FilterPanel
            consultationType={consultationType}
            setConsultationType={setConsultationType}
            selectedSpecialties={selectedSpecialties}
            setSelectedSpecialties={setSelectedSpecialties}
          />
        </div>

        <div className="w-full">
          <div className="my-2">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="">Sort By</option>
              <option value="fees">Sort by Fees</option>
              <option value="experience">Sort by Experience</option>
            </select>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
            {(filteredDoctors.length > 0 ? filteredDoctors : doctors).map(
              (doc) => (
                <Card key={doc.id} doctor={doc} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorListing;