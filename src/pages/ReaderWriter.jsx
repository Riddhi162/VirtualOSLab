import React, { useState } from "react";

const ReaderWriter = () => {
  const [criticalColor, setCriticalColor] = useState("white");
  const [writerOtherColor, setWriterOtherColor] = useState("white");
  const [writerColor, setWriterColor] = useState("white");
  const [readerOtherColor, setReaderOtherColor] = useState("white");
  const [readerColor, setReaderColor] = useState("white");
  const [waitingColor, setWaitingColor] = useState("white");
  const [writerInputsDisabled, setWriterInputsDisabled] = useState(true);
  const [readerInputsDisabled, setReaderInputsDisabled] = useState(true);
  const [writerCriticalTime, setWriterCriticalTime] = useState(1500);
  const [writerOtherTime, setWriterOtherTime] = useState(1000);
  const [writerRequiredCriticalSections, setWriterRequiredCriticalSections] =
    useState(2);
  const [readerCriticalTime, setReaderCriticalTime] = useState(1500);
  const [readerOtherTime, setReaderOtherTime] = useState(1000);
  const [readerRequiredCriticalSections, setReaderRequiredCriticalSections] =
    useState(2);

  const startColorChange = async () => {
    const writerOther = parseInt(writerOtherTime) - writerCriticalTime;
    const readerOther = parseInt(readerOtherTime) - readerCriticalTime;
    let countReader = readerRequiredCriticalSections;
    let countWriter = writerRequiredCriticalSections;
    const timeForCycle = parseInt(
      (writerOtherTime > writerCriticalTime
        ? writerOtherTime * writerRequiredCriticalSections
        : writerCriticalTime * writerRequiredCriticalSections) +
        (readerOtherTime > readerCriticalTime
          ? readerOtherTime * readerRequiredCriticalSections
          : readerCriticalTime * readerRequiredCriticalSections)
    );
    const allocateReaderWriterColors = async () => {
      setReaderColor("orange");
      setWriterColor("skyblue");
      await new Promise((resolve) => setTimeout(resolve, timeForCycle));
      setReaderColor("white");
      setWriterColor("white");
    };
    const allocateCriticalColor = async (color, duration) => {
      setCriticalColor(color);
      await new Promise((resolve) => setTimeout(resolve, duration));
      setCriticalColor("white");
    };
    const allocateWriterOtherColor = async (color, duration) => {
      setWriterOtherColor(color);
      await new Promise((resolve) => setTimeout(resolve, duration));
      setWriterOtherColor("white");
    };
    const allocateReaderOtherColor = async (color, duration) => {
      setReaderOtherColor(color);
      await new Promise((resolve) => setTimeout(resolve, duration));
      setReaderOtherColor("white");
    };
    const allocateWaitingColor = async (color, duration) => {
      setWaitingColor(color);
      await new Promise((resolve) => setTimeout(resolve, duration));
      setWaitingColor("white");
    };
    allocateReaderWriterColors();
    while (countReader > 0 || countWriter > 0) {
      if (countReader > 0) {
        await allocateCriticalColor("orange", readerCriticalTime);
        allocateReaderOtherColor("orange", readerOtherTime);
        countReader--;
      }
      if (countWriter > 0) {
        await allocateCriticalColor("skyblue", writerCriticalTime);
        allocateWriterOtherColor("skyblue", writerOtherTime);
        if (writerOther > 0) {
          await allocateCriticalColor("white", writerOther);
        }
        countWriter--;
      }
    }
  };

  const enableWriterInputs = () => {
    setWriterInputsDisabled(false);
  };

  const disableWriterInputs = () => {
    setWriterInputsDisabled(true);
  };

  const enableReaderInputs = () => {
    setReaderInputsDisabled(false);
  };

  const disableReaderInputs = () => {
    setReaderInputsDisabled(true);
  };

  return (
    <div className="bg-slate-200 w-screen h-screen">
      <p className="flex justify-center text-blue-900 font-semibold text-lg">
        PETERSON'S SOLUTION FOR READER-WRITER PROBLEM
      </p>
      <div className="flex flex-wrap items-center justify-evenly mt-3 font-semibold">
        <p>RUNNING</p>
      </div>
      <div className="flex w-screen h-[60vh] justify-evenly">
        <div className="flex">
          <div className="flex-col">
            <div className={`w-[15vw] h-[20vh] mx-[4vw] mt-14 p-4`} style={{ backgroundColor: writerColor }}>
              <p className="text-center font-semibold">WRITER</p>
              <p className="text-center mt-3">flag[w]=false</p>
            </div>
            <div className="bg-slate-400 w-[15vw] h-[38vh] mx-[4vw] mt-3 text-[15px] p-2">
              <p className=""> flag[w]=true</p>
              <p>true=reader</p>
              <br />
              <p>while(flag[r]&&turn==reader)</p>
              <p>{"{ // Busy Wait }"}</p>
              <br />
              <p>{" // Critical Section "}</p>
              <br />
              <p className=""> flag[w]=false</p>
              <p>{" // Other Processing "}</p>
            </div>
            <div className="bg-slate-400 w-[17vw] h-[21vh] mx-[2vw]  mt-5 p-3 space-y-2">
              <div className="flex flex-row gap-5">
                <p className="text-[12px] font-semibold">
                  CRITICAL SECTION TIME:
                </p>
                <input
                  type="text"
                  placeholder="15000"
                  value={writerCriticalTime}
                  onChange={(e) =>
                    setWriterCriticalTime(Number(e.target.value))
                  }
                  className={`w-[30%] bg-slate-200 ${
                    writerInputsDisabled ? "bg-gray-300" : ""
                  }`}
                  disabled={writerInputsDisabled}
                />
              </div>
              <div className="flex flex-row gap-5">
                <p className="text-[12px] font-semibold mt-2">
                  OTHER WORK TIME:
                </p>
                <input
                  type="text"
                  placeholder="10000"
                  value={writerOtherTime}
                  onChange={(e) => setWriterOtherTime(Number(e.target.value))}
                  className={`w-[30%] bg-slate-200 ${
                    writerInputsDisabled ? "bg-gray-300" : ""
                  }`}
                  disabled={writerInputsDisabled}
                />
              </div>
              <div className="flex flex-row gap-5">
                <p className="text-[12px] font-semibold mt-2">
                  NO. OF REQUIRED CS:
                </p>
                <input
                  type="text"
                  placeholder="2"
                  value={writerRequiredCriticalSections}
                  onChange={(e) =>
                    setWriterRequiredCriticalSections(Number(e.target.value))
                  }
                  className={`w-[30%] bg-slate-200 ${
                    writerInputsDisabled ? "bg-gray-300" : ""
                  }`}
                  disabled={writerInputsDisabled}
                />
              </div>
              <div className="flex flex-wrap gap-5 justify-center mt-5  ">
                <button
                  className="border rounded-md border-black w-1/3 p-1"
                  onClick={enableWriterInputs}
                >
                  CHANGE
                </button>
                <button
                  className="border rounded-md border-black w-1/3 p-1"
                  onClick={disableWriterInputs}
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-slate-400 gap-5 w-[30vw] h-[50vh] justify-center p-8">
            <div
              id="one"
              className="w-[26vw] h-[30vh] bg-white"
              style={{ backgroundColor: criticalColor }}
            >
              <p className="flex justify-center m-2 font-semibold">
                CRITICAL SECTION
              </p>
            </div>
            <div className=" flex flex-row gap-5">
              <div
                id="two"
                className="bg-white h-[20vh] w-1/2"
                style={{ backgroundColor: writerOtherColor }}
              >
                <p className="font-semibold text-[13px] text-center">
                  OTHER PROCESS WRITER
                </p>
              </div>
              <div
                className="bg-white h-[20vh] w-1/2"
                style={{ backgroundColor: readerOtherColor }}
              >
                <p className="font-semibold text-[13px] text-center">
                  OTHER PROCESS READER
                </p>
              </div>
            </div>
          </div>

          <div className="flex-col">
            <div className="w-[15vw] h-[20vh] mx-[4vw] mt-14 p-4" style={{ backgroundColor: readerColor }}>
              <p className="text-center font-semibold">READER</p>
              <p className="text-center mt-3">flag[r]=false</p>
            </div>
            <div className="bg-slate-400 w-[15vw] h-[38vh] mx-[4vw] mt-3 text-[15px] p-2">
              <p className=""> flag[r]=true</p>
              <p>true=writer</p>
              <br />
              <p>while(flag[w]&&turn==writer)</p>
              <p>{"{ // Busy Wait }"}</p>
              <br />
              <p>{" // Critical Section "}</p>
              <br />
              <p className=""> flag[r]=false</p>
              <p>{" // Other Processing "}</p>
            </div>
            <div className="bg-slate-400 w-[17vw] h-[21vh] mx-[4vw] mt-5 p-3 space-y-2">
              <div className="flex flex-row gap-5">
                <p className="text-[12px] font-semibold">
                  CRITICAL SECTION TIME:
                </p>
                <input
                  type="text"
                  placeholder="15000"
                  value={readerCriticalTime}
                  onChange={(e) =>
                    setReaderCriticalTime(Number(e.target.value))
                  }
                  className={`w-[30%] bg-slate-200 ${
                    readerInputsDisabled ? "bg-gray-300" : ""
                  }`}
                  disabled={readerInputsDisabled}
                />
              </div>
              <div className="flex flex-row gap-5">
                <p className="text-[12px] font-semibold mt-2">
                  OTHER WORK TIME:
                </p>
                <input
                  type="text"
                  placeholder="10000"
                  value={readerOtherTime}
                  onChange={(e) => setReaderOtherTime(Number(e.target.value))}
                  className={`w-[30%] bg-slate-200 ${
                    readerInputsDisabled ? "bg-gray-300" : ""
                  }`}
                  disabled={readerInputsDisabled}
                />
              </div>
              <div className="flex flex-row gap-5">
                <p className="text-[12px] font-semibold mt-2">
                  NO. OF REQUIRED CS:
                </p>
                <input
                  type="text"
                  placeholder="2"
                  value={readerRequiredCriticalSections}
                  onChange={(e) =>
                    setReaderRequiredCriticalSections(Number(e.target.value))
                  }
                  className={`w-[30%] bg-slate-200 ${
                    readerInputsDisabled ? "bg-gray-300" : ""
                  }`}
                  disabled={readerInputsDisabled}
                />
              </div>
              <div className="flex flex-wrap gap-5 justify-center mt-5  ">
                <button
                  className="border rounded-md border-black w-1/3 p-1"
                  onClick={enableReaderInputs}
                >
                  CHANGE
                </button>
                <button
                  className="border rounded-md border-black w-1/3 p-1"
                  onClick={disableReaderInputs}
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-evenly mt-3 font-semibold">
        <p>WAITING</p>
      </div>
      <div
        className="bg-white w-[30vw] h-[20vh] mx-[34vw]"
        style={{ backgroundColor: waitingColor }}
      ></div>
      <div className="w-screen flex justify-center">
        <button
          className="border-black bg-slate-400 rounded-md mt-5 px-2"
          onClick={startColorChange}
        >
          START
        </button>
      </div>
    </div>
  );
};

export default ReaderWriter;
