import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const simulations = [
    { title: "Memory Management", route: "/memoryManagement" },
    { title: "Virtual Memory", route: "/virtualMemory" },
    { title: "Process Scheduling", route: "/processScheduling" },
    // { title: "Process Scheduling", route: "/loading" },
    { title: "Dining Philosophers", route: "/diningPhilosophers" },
    { title: "File", route: "/file" },
    { title: "Mutual Exclusion", route: "/loading" },
    // { title: "Mutual Exclusion", route: "/mutualExclusion" },
    { title: "Page Replacement", route: "/pageReplacement" },
    // { title: "Producer Consumer", route: "/producerConsumer" },
    { title: "Producer Consumer", route: "/loading" },
    { title: "Reader Writer", route: "/readerWriter" },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-[#FBF8BE] text-[#234E70] h-screen w-screen">
      <h1 className="text-4xl font-semibold my-5 text-center">
        Simulation List
      </h1>
      <ul className="">
        {simulations.map((simulation, key) => (
          <Link to={simulation.route} key={key}>
            <li
              key={key}
              className="text-lg hover:scale-110 transition duration-200 hover:text-blue-500 rounded-md p-2 m-2 border border-blue-300 hover:border-blue-500 text-center"
            >
              {simulation.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Home;
