import React from "react";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="bg-gradient-to-br from-blue-100 via-white to-amber-50 p-12 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300">
        <h1 className="text-5xl font-bold text-blue-700 mb-6">
          👋 Welcome to <span className="text-amber-600">Events4All</span>
        </h1>
        <p className="text-xl text-gray-700 mb-10 leading-relaxed max-w-4xl">
          A dynamic platform where <span className="font-semibold text-blue-600">students</span> and <span className="font-semibold text-blue-600">colleges</span> seamlessly collaborate to manage and enjoy campus events — smart, simple, and secure.
        </p>

        <div className="grid lg:grid-cols-2 gap-14">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🚀 Why Events4All?</h2>
            <p className="text-lg text-gray-700 mb-6">
              We built Events4All to eliminate the chaos of traditional event registration.
              Whether you're joining a team or managing an entire fest, everything just works — fast and intuitively.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎯 Our Mission</h2>
            <p className="text-lg text-gray-700">
              To empower campus communities with a flexible, student-friendly platform that simplifies participation, organization, and coordination of events.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">✨ Key Features</h2>
            <ul className="list-disc list-inside text-lg text-gray-700 mb-6 space-y-2">
              <li>👤 Students can register solo or in teams effortlessly</li>
              <li>🏫 Colleges can create, edit, and manage multiple events</li>
              <li>🛡️ Validation ensures clean and accurate data</li>
              <li>📊 Activity logs track login and error details</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">⚙️ Tech Stack</h2>
            <p className="text-lg text-gray-700">
              React + TailwindCSS on the frontend, with Node.js and MongoDB powering the backend. Built for scale and speed.
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-xl text-gray-600 italic mb-2">Let’s build smarter campuses together. 🔗</p>
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Events4All · Built with ❤️ by students, for students.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
