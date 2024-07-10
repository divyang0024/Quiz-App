import React, { useState, useEffect } from "react";
import { getServerData, verifyToken } from "../helper/helper";

function ResultTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let user;
    (async () => {
      user = await verifyToken();
      console.log(user);
    })();
    getServerData("http://localhost:3000/api/result").then((result) => {
      setData(result.msg);
    });
  }, []);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-[#32012F]">
        <div className="flex p-8 bg-[#E2DFD0] rounded-xl flex-col gap-6 min-w-[30%] max-w-lg  border-4 border-[#F97300]">
          <h1 className=" text-center text-[#F97300] text-4xl font-semibold">
            Global Logs
          </h1>
          <div className="flex flex-col gap-4 border-2 border-[#F97300] rounded-lg p-4 resize-none overflow-scroll h-96">
            <table className="">
              <thead>
                <tr className="text-[#F97300]">
                  <th className="text-start">Name</th>
                  <th className="text-start">Attempts</th>
                  <th className="text-start">Earn Points</th>
                  <th className="text-start">Result</th>
                </tr>
              </thead>

              <tbody className="">
                {!data && (
                  <div className="text-[#DC143C] font-bold text-2xl">
                    Data Not Found
                  </div>
                )}

                {data.map((item, i) => (
                  <tr
                    className="border border-transparent border-b-[#F97300]"
                    key={i}
                  >
                    <td>{item?.username}</td>
                    <td>{item?.attempts}</td>
                    <td>{item?.points}</td>
                    <td>{item?.achived}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResultTable;
