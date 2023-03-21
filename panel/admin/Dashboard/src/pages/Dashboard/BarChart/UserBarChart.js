import React from "react";
import { Bar } from "react-chartjs-2";

function UserBarChart() {

  //first e ekta 0 rekhe deya lagbe na for transparent lebel color 
  const data = [
    12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2,
  ];
  const labelsArr = [
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30
  ];

  console.log(data)
  return (
    <div>
     


      <Bar
        data={{
          labels: labelsArr,
          datasets: [
            {
              label: "",
              data: data,

              // dynamic done just comment out khula lagbe thats it 
              backgroundColor: 
                data.map((color,index) =>
                  
                  index === 0 ? 'rgb(255 46 46 / 80%)' :  data[index-1] > data[index] ? 'red' : 'Green' ),
              
              // backgroundColor: [
              //   // "#e4e4e400",
              //   '#04AA6D'
              // ],
              borderRadius: 5,
              hoverBorderRadius: 0,
              hoverBackgroundColor:data.map((color,index) =>
                  
              index === 0 ? 'rgb(255 46 46 / 80%)' :  data[index-1] > data[index] ? 'red' : 'Green' ),
          
              borderColor: [
                // "#e4e4e400",
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
            // {
            //   label: "",
            //   data: [47, 52, 67, 58, 9, 50, 47, 52, 67, 58, 9, 50],
            //   backgroundColor: "salmon",
            //   borderColor: "#e4e4e400",
            //   hoverBackgroundColor: "tomato",
            //   hoverBorderRadius: 10,
            // },
          ],
        }}
        // height={15}
        // width={12}
        options={{
          maintainAspectRatio: true,
          scales: {
            y: { // defining min and max so hiding the dataset does not change scale range
              min: 0,
              max: 100
            },
            // yAxes: [
            //   {
            //     ticks: {
            //       beginAtZero: true,
            //     },
            //   },
            // ],
          },
          legend: {
            labels: {
              fontSize: 15,
              fontColor: "blue",
            },
          },
        }}
      />
    </div>
  );
}

export default UserBarChart;
