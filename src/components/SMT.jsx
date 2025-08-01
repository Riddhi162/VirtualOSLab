import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const SMT = ({
  smtData,
  smtFrameData,
  fmtData,
  numColumns,
  numRowsPerColumn,
  numFramesPerSegment,
}) => {
  const [selectedPID, setSelectedPID] = useState(null);
  const [selectedMapping, setSelectedMapping] = useState([]);
  const segmentNum = (color, index) => {
    let x = smtFrameData.filter(
      (f, i) => i < index && f.color === color
    ).length;
    return Math.floor(x / numFramesPerSegment);
  };
  const handleOpenMappingTable = (pid) => {
    setSelectedPID(pid);
    const mapping = fmtData.find((entry) => entry.PID === pid);
    if (mapping) {
      const matchingFrames = smtData.filter((smtEntry) => smtEntry.PID === pid);
      const frameIDsArray = [];

      matchingFrames.forEach((frame) => {
        const individualFrameIDs = frame.PageFrameID.split(", ");
        frameIDsArray.push(...individualFrameIDs);
      });
      const numSegments = frameIDsArray.length;
      const mappingFrameIDs = mapping.PageFrameID.split(", ");
      setSelectedMapping(
        mappingFrameIDs
          .map((_, index) => ({
            frameID: frameIDsArray[index * numFramesPerSegment]
              ? frameIDsArray[index * numFramesPerSegment]
              : -1,
            presence: frameIDsArray[index * numFramesPerSegment] ? "Yes" : "No",
            index: index,
          }))
          .filter((item) => item.index < numSegments)
      );
    } else {
      setSelectedMapping([]);
    }
  };

  const handleCloseMappingTable = () => {
    setSelectedPID(null);
    setSelectedMapping([]);
  };

  return (
    <div className="w-full flex-col flex items-center justify-center h-full">
      <div className="h-5 flex flex-row items-center justify-center mt-2">
        SMT(Segment Mapping Table)
        {selectedPID !== null && (
          <AiOutlineCloseCircle
            size={15}
            className="mx-1"
            onClick={handleCloseMappingTable}
          />
        )}
      </div>
      <div
        className={`border border-black w-11/12 h-[100px] m-1 relative ${
          selectedPID !== null ? "overflow-clip" : "overflow-scroll"
        }`}
      >
        <div className="flex flex-row w-full sticky top-0 bg-[#AA96DA] text-white z-10">
          <div
            className={`items-center justify-center text-sm flex h-1/5  border border-r-white border-transparent ${
              selectedPID !== null ? "w-1/4" : "w-1/2"
            }`}
          >
            PID
          </div>
          {selectedPID === null && (
            <div className="items-center justify-center text-sm flex h-1/5 w-1/2 border border-l-white border-transparent">
              Base
            </div>
          )}
        </div>
        {smtData.map((entry, index) => (
          <div key={index} className={`flex flex-row w-full`}>
            {selectedPID === entry.PID && (
              <div
                className={`items-center justify-center text-sm flex h-1/5 border w-1/4`}
              >
                {entry.PID}
              </div>
            )}
            {selectedPID === null && (
              <div
                className={`items-center justify-center text-sm flex h-1/5 border w-1/2`}
              >
                {entry.PID}
              </div>
            )}
            {selectedPID === null && (
              <div
                className="items-center justify-center text-center text-sm flex h-1/5 w-1/2 border"
                onClick={() => handleOpenMappingTable(entry.PID)}
              >
                {entry.PageFrameID.split(", ")[0]}
              </div>
            )}
          </div>
        ))}
        {selectedPID !== null && (
          <div className="w-3/4 h-[100px] right-0 overflow-scroll z-10 absolute text-sm text-center top-0">
            <div className="flex flex-row w-full sticky top-0 bg-[#AA96DA] text-white z-20">
              <div className="items-center justify-center text-sm flex h-1/5 w-1/3 border border-x-white border-transparent truncate">
                Segment No.
              </div>
              <div className="items-center justify-center text-sm flex h-1/5 w-1/3 border border-l-white border-transparent truncate">
                Base
              </div>
              <div className="items-center justify-center text-sm flex h-1/5 w-1/3 border border-l-white border-transparent truncate">
                Presence Status
              </div>
            </div>
            {selectedMapping.map((frame, index) => (
              <div key={index} className="flex flex-row w-full">
                <div className="items-center justify-center text-sm flex h-1/5 w-1/3 border">
                  {frame.index}
                </div>
                <div className="items-center justify-center text-sm flex h-1/5 w-1/3 border">
                  {frame.frameID}
                </div>
                <div
                  className={`items-center justify-center text-sm flex h-1/5 w-1/3 border`}
                >
                  {frame.presence}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="border border-black w-11/12 h-[350px] m-2 flex flex-wrap bg-[#C5FAD5] overflow-scroll">
        {smtFrameData.map((frame, index) => (
          <div
            key={index}
            className="text-center text-sm p-0"
            style={{
              zIndex: "1",
              border: "1px solid black",
              width: `${100 / numColumns}%`,
              height: `${350 / numRowsPerColumn}px`,
              backgroundColor: frame.color,
            }}
          >
            <p>{index + 1}</p>
            {frame.color !== "white" && (
              <p className="-m-1">{`S${segmentNum(frame.color, index)}`}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SMT;
