import React from 'react';
import Navbares from "../../components/Navbares";
import Sidebares from "../../components/Sidebares";

const Project = () => {
  return (
    <>
      <Navbares />
      <Sidebares />
      <main className="bg-gray-100 min-h-screen ml-64 pt-20 p-6 font-sans flex flex-col items-center">

        {/* Title */}
        <div className="w-full max-w-screen-lg mb-6">
          <h1 className="text-2xl font-bold text-black">Projects</h1>
        </div>

        {/* Main Content: Flex with Chart + Project Details */}
        <div className="flex flex-col md:flex-row w-full max-w-screen-lg gap-6 mb-6">

          {/* Left: Chart */}
          <div className="flex-1 bg-white border-4 border-blue-500 p-2 rounded-md flex justify-center items-center">
            <img
              src="https://salaymisor.gov.ph/wp-content/uploads/2020/12/20200828_090843.jpg" // your uploaded chart image
              alt="Projects Chart"
              className="rounded-md max-h-96 object-contain"
            />
          </div>

          {/* Right: Project Details */}
          <div className="w-full md:w-1/3 bg-green-100 p-4 rounded-md shadow-md text-sm text-black">
            <h2 className="text-lg font-bold mb-2">Project 1</h2>
            <p><strong>Project 1: Barangay Health and Wellness Hub</strong></p>
            <p><strong>Objective:</strong><br />
              To improve access to basic health services and promote wellness activities within the community.
            </p>
            <p><strong>Estimated Cost (PHP):</strong><br />
              PHP 50,000
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">Project 2</h2>
            <p><strong>Project 2: Barangay Youth Tech Center</strong></p>
            <p><strong>Objective:</strong><br />
              To provide access to technology and digital literacy training for the youth in the barangay.
            </p>
            <p><strong>Estimated Cost (PHP):</strong><br />
              PHP 95,000
            </p>
          </div>
        </div>

        {/* Bottom Button */}
        <button className="bg-green-300 hover:bg-green-400 text-black font-bold py-3 px-8 rounded-md text-lg flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m-2 8c-4.418 0-8-1.79-8-4V5a2 2 0 012-2h16a2 2 0 012 2v11c0 2.21-3.582 4-8 4h-2z" />
          </svg>
          ADD FEEDBACK
        </button>
      </main>
    </>
  );
};

export default Project;