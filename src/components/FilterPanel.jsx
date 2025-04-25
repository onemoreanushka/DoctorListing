import React from 'react';

const FilterPanel = ({
  consultationType,
  setConsultationType,
  selectedSpecialties,
  setSelectedSpecialties,

}) => {
  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((item) => item !== specialty)
        : [...prev, specialty]
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* Consultation Type Filter */}
      <div className="mb-6">
        <label className="font-semibold text-lg">Consultation Mode</label>
        <div className="flex gap-6 mt-2">
          <div>
            <input
              type="radio"
              id="video-consult"
              name="consultation-type"
              value="Video Consult"
              onChange={() => setConsultationType("Video Consult")}
              checked={consultationType === "Video Consult"}
              className="mr-2"
            />
            <label htmlFor="video-consult" className="text-gray-700">Video Consult</label>
          </div>
          <div>
            <input
              type="radio"
              id="in-clinic"
              name="consultation-type"
              value="In Clinic"
              onChange={() => setConsultationType("In Clinic")}
              checked={consultationType === "In Clinic"}
              className="mr-2"
            />
            <label htmlFor="in-clinic" className="text-gray-700">In Clinic</label>
          </div>
        </div>
      </div>

      {/* Specialty Filter */}
      <div className="mb-6">
        <label className="font-semibold text-lg">Specialty</label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {[
            "General Physician",
            "Dentist",
            "Dermatologist",
            "Paediatrician",
            "Gynaecologist",
            "ENT",
            "Diabetologist",
            "Cardiologist",
            "Physiotherapist",
            "Endocrinologist",
            "Orthopaedic",
            "Ophthalmologist",
            "Gastroenterologist",
            "Pulmonologist",
            "Psychiatrist",
            "Urologist",
            "Dietitian-Nutritionist",
            "Psychologist",
            "Sexologist",
            "Nephrologist",
            "Neurologist",
            "Oncologist",
            "Ayurveda",
            "Homeopath",
          ].map((specialty) => (
            <div key={specialty} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`specialty-${specialty}`}
                value={specialty}
                onChange={() => handleSpecialtyChange(specialty)}
                checked={selectedSpecialties.includes(specialty)}
                className="h-4 w-4"
              />
              <label htmlFor={`specialty-${specialty}`} className="text-gray-700 text-sm">{specialty}</label>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default FilterPanel;
