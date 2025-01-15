let chart;
let headsCounter;

// Function to simulate coin tosses and calculate deviations
function simulateCoinTossesAndDeviations(numTosses) {
  let randomSize = document.getElementById("checkbox").checked;
  let heads = 0;
  let tails = 0;
  let deviations = [];
  headsCounter = 0;
  for (let i = 0; i < numTosses; i++) {
    let toss = Math.random() * 2 - 1;
    if (toss < 0) {
      !randomSize ? heads++ : (heads += toss);
      headsCounter++;
    } else {
      !randomSize ? tails++ : (tails -= toss);
    }
    deviations.push(heads - tails);
  }
  deviations.unshift(0);
  return deviations;
}

function getData() {
  let numTosses = document.getElementById("reps").value;
  if (numTosses > 1e6) numTosses = 1e6;
  let labels = Array.from({ length: numTosses }, (_, i) => `${i + 1}`);
  labels.unshift("0");
  const deviations = simulateCoinTossesAndDeviations(numTosses);
  let lastOne = deviations[deviations.length - 1];
  document.getElementById("res").textContent =
    lastOne.toFixed(2) +
    " (" +
    ((lastOne / numTosses) * 100).toFixed(1) +
    "% ) HEADS " +
    headsCounter;
  return {
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
}

function buildConfig() {
  return {
    type: "line",
    data: getData(),
    options: {
      plugins: { title: { display: false, text: "" } },
      maintainAspectRatio: true,
      scales: {
        y: {
          title: {
            display: true,
            text: "Deviation from Equal Count",
          },
          ticks: { stepSize: 1 },
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
}

function draw() {
  if (chart) {
    chart.destroy();
  }
  const canvas = document.getElementById("deviationChart");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  chart = new Chart(ctx, buildConfig());
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    draw();
    event.preventDefault();
  }
});

draw();
