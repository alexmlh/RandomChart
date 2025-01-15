let chart;

// Function to simulate coin tosses and calculate deviations
function simulateCoinTossesAndDeviations(numTosses) {
  let heads = 0;
  let tails = 0;
  let deviations = [];

  for (let i = 0; i < numTosses; i++) {
    if (Math.random() > 0.5) {
      heads++;
    } else {
      tails++;
    }
    deviations.push(heads - tails);
  }
  deviations.unshift(0);
  return deviations;
}

function getData() {
  let numTosses = document.getElementById("reps").value;
  if (numTosses > 1e6) numTosses = 1e6;
  const labels = Array.from({ length: numTosses }, (_, i) => `${i + 1}`);
  const deviations = simulateCoinTossesAndDeviations(numTosses);
  let lastOne = deviations[deviations.length - 1];
  document.getElementById("res").textContent =
    lastOne +
    " (" +
    ((lastOne / numTosses / 2) * 100).toFixed(1) +
    "% ) HEADS " +
    (numTosses / 2 - lastOne);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Deviation from Equal Count",
        data: deviations,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.3,
        pointRadius: 0,
        borderWidth: 1,
      },
    ],
  };
  return data;
}

const config = {
  type: "line",
  data: getData(), // Initialize with data
  options: {
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Deviation from Equal Count",
        },
        ticks: { stepSize: 1 }, // Ensure only integer values on the y-axis
        grid: {
          color: function (context) {
            return context.tick.value === 0
              ? "rgb(244, 0, 0)"
              : "rgb(222, 222, 222)";
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Number of Tosses",
        },
      },
    },
  },
};

function draw() {
  if (chart) {
    chart.destroy();
  }
  const canvas = document.getElementById("deviationChart");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  config.data = getData();
  chart = new Chart(ctx, config);
}

draw();
