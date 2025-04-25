import React from "react";

const Card = ({ doctor }) => {
  const { name, specialities, experience, fees, video_consult, in_clinic } = doctor;

  const specialtiesList = Array.isArray(specialities) && specialities.length > 0
    ? specialities.map((specialty) => specialty.name).join(", ")
    : "No specialties listed";

  const doctorExperience = experience ? `${experience.replace(/[^0-9]/g, '')} Years of experience` : "Experience not available";
  const doctorFees = fees ? `₹ ${fees}` : "Fees not available";

  return (
    <div className="p-6 border rounded-lg shadow-lg bg-white hover:scale-105 hover:bg-blue-50 transition-all duration-300 ease-in-out transform">
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-2">Specialties: {specialtiesList}</p>
      <p className="text-gray-600 text-sm mb-2">{doctorExperience}</p>
      <p className="text-gray-600 text-sm mb-4">Fees: {doctorFees}</p>
  
      <div className="flex gap-2 mb-4">
        {video_consult && (
          <span className="inline-block bg-green-200 text-green-800 rounded-full px-3 py-1 text-xs font-semibold">Video Consult</span>
        )}
        {in_clinic && (
          <span className="inline-block bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-xs font-semibold">In Clinic</span>
        )}
        {!video_consult && !in_clinic && (
          <span className="text-gray-500 text-xs">Consultation type not specified</span>
        )}
      </div>
  
      <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
        Book Appointment
      </button>
    </div>
  );
  
  
};

export default Card;