import React from "react";
import { Route, Routes } from "react-router-dom";
import MemoryManagement from "./pages/MemoryManagement";
import VirtualMemory from "./pages/VirtualMemory";
import ProcessScheduling from "./pages/ProcessScheduling";
import Home from "./pages/Home";
import PageReplacement from "./pages/PageReplacement";
import File from "./pages/File";
import ReaderWriter from "./pages/ReaderWriter";
import DiningPhilosopher from "./pages/DiningPhilosopher";
import Loading from "./pages/Loading";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memoryManagement" element={<MemoryManagement />} />
        <Route path="/virtualMemory" element={<VirtualMemory />} />
        <Route path="/processScheduling" element={<ProcessScheduling />} />
        <Route path="/pageReplacement" element={<PageReplacement />} />
        <Route path="/file" element={<File />} />
        <Route path="/readerWriter" element={<ReaderWriter />} />
        <Route path="/diningPhilosophers" element={<DiningPhilosopher />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </div>
  );
}

export default App;
