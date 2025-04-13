import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

function PassFailChart() {
  const [dataCounts, setDataCounts] = useState({ pass: 0, fail: 0 });
  const [pointsData, setPointsData] = useState([]);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [passRate, setPassRate] = useState(0);
  const [failRate, setFailRate] = useState(0);
  const [improvement, setImprovement] = useState(null);
  const [lastQuiz, setLastQuiz] = useState(null);
  const [bestQuiz, setBestQuiz] = useState(null);

  const {
    result: { userId },
  } = useSelector((state) => state);

  const colors = {
    secondary: "#E2DFD0",
    primary: "#F97300",
    darkText: "#32012F",
    pass: "#32CD32", // Passed
    fail: "#DC143C", // Failed
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/user/getUserResults",
          {
            username: userId,
          }
        );

        const results = res.data || [];
        const passCount = results.filter((r) => r.achived === "passed").length;
        const failCount = results.filter((r) => r.achived === "failed").length;
        setDataCounts({ pass: passCount, fail: failCount });

        const last5Points = results.slice(-5).map((r) => r.points || 0);
        setPointsData(last5Points);

        // Total Quizzes Taken
        setTotalQuizzes(results.length);

        // Pass/Fail Rates
        setPassRate(((passCount / results.length) * 100).toFixed(1));
        setFailRate(((failCount / results.length) * 100).toFixed(1));

        // Improvement Trend (Compare First and Last Quiz)
        if (results.length >= 2) {
          const firstQuiz = results[0].points;
          const lastQuizPoints = results[results.length - 1].points;
          setImprovement(lastQuizPoints - firstQuiz);
        }

        // Last Quiz Result
        setLastQuiz(results.at(-1));

        // Best Quiz (Highest Points)
        const bestQuiz = results.reduce((max, curr) =>
          curr.points > max.points ? curr : max
        );
        setBestQuiz(bestQuiz);
      } catch (err) {
        console.error("Error fetching user results:", err);
      }
    };

    fetchData();
  }, [userId]);

  const pieChartData = {
    labels: ["Passed", "Failed"],
    datasets: [
      {
        data: [dataCounts.pass, dataCounts.fail],
        backgroundColor: [colors.pass, colors.fail],
        borderColor: [colors.pass, colors.fail],
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Last 5 Scores",
        data: pointsData,
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        borderWidth: 1,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: colors.darkText, font: { size: 12 } },
      },
    },
  };

  const barChartOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: "Last 5 Points",
        color: colors.darkText,
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: colors.darkText, stepSize: 20 },
      },
      x: {
        ticks: { color: colors.darkText },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pie Chart */}
      <div className="bg-[#E2DFD0] border-2 border-[#F97300] rounded-xl p-4">
        <h2 className="text-center text-lg font-semibold text-[#32012F] mb-2">
          Pass/Fail Ratio
        </h2>
        <div className="h-72">
          <Pie data={pieChartData} options={commonOptions} />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-[#E2DFD0] border-2 border-[#F97300] rounded-xl p-4">
        <h2 className="text-center text-lg font-semibold text-[#32012F] mb-2">
          Recent Scores
        </h2>
        <div className="h-72">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#E2DFD0] border-2 border-[#F97300] rounded-xl p-6 col-span-1 md:col-span-2">
        <h2 className="text-xl font-semibold text-[#32012F] mb-4">
          Quiz Insights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Total Quizzes Taken */}
          <div className="p-4 rounded-lg border-2 border-[#F97300]">
            <span>Total Quizzes Taken : </span>
            <span className="font-bold text-[#F97300]">{totalQuizzes}</span>
          </div>

          {/* Pass Rate */}
          <div className="p-4 rounded-lg border-2 border-[#F97300]">
            <span>Pass Rate : </span>
            <span className="font-bold text-[#F97300]">{passRate}%</span>
          </div>

          {/* Fail Rate */}
          <div className="p-4 rounded-lg border-2 border-[#F97300]">
            <span>Fail Rate : </span>
            <span className="font-bold text-[#F97300]">{failRate}%</span>
          </div>

          {/* Improvement Trend */}
          {improvement !== null && (
            <div className="p-4 rounded-lg border-2 border-[#F97300]">
              <span>Improvement : </span>
              <span
                className={`font-bold ${
                  improvement >= 0 ? "text-[#32CD32]" : "text-[#DC143C]"
                }`}
              >
                {improvement >= 0
                  ? `+${improvement} pts`
                  : `${improvement} pts`}
              </span>
            </div>
          )}

          {/* Last Quiz Result */}
          <div className="p-4 rounded-lg border-2 border-[#F97300]">
            <span>Last Quiz : </span>
            <span className="font-bold text-[#F97300]">
              {lastQuiz
                ? `${lastQuiz.achived} (${lastQuiz.points} pts)`
                : "N/A"}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PassFailChart;
