import React from "react";
import { Bar } from "react-chartjs-2";

function FailedChart() {
  const data = [0, 12, 19, 3, 5, 2, 3, 12, 195, 2, 3, 12, 19];
  const labelsArr = [47, 52, 67, 58, 9, 50, 47, 52, 67, 58, 47];
  return (
    <div>
      <Bar
        data={{
          labels: labelsArr,
          datasets: [
            {
              label: "",
              data: data,
              backgroundColor: [
                "#e4e4e400",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderRadius: 5,
              hoverBorderRadius: 0,
              borderColor: [
                "#e4e4e400",
                "rgba(255, 99, 132, 0.37)",
                "rgba(54, 162, 235, 0.37)",
                "rgba(255, 206, 86, 0.37)",
                "rgba(75, 192, 192, 0.37)",
                "rgba(153, 102, 255, 0.37)",
                "rgba(255, 159, 64, 0.37)",
                "rgba(255, 99, 132, 0.37)",
                "rgba(54, 162, 235, 0.37)",
                "rgba(255, 206, 86, 0.37)",
                "rgba(75, 192, 192, 0.37)",
                "rgba(153, 102, 255, 0.37)",
                "rgba(255, 159, 64, 0.37)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          maintainAspectRatio: true,
        }}
      />
    </div>
  );
}

export default FailedChart;
