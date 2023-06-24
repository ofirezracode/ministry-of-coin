<template>
  <main class="statistics">
    <h1>Statistics</h1>
    <div class="chart-container card">
      <Line
        :height="300"
        class="market-price-chart"
        :data="marketPriceHistory"
        :options="options"
      />
    </div>
    <div class="chart-container card">
      <Line
        :height="300"
        class="market-price-chart"
        :data="avgBlockSize"
        :options="options"
      />
    </div>
  </main>
</template>

<script>
import { bitcoinService } from "../services/bitcoinService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  data() {
    return {
      marketPriceHistory: bitcoinService.getEmptyDataSet(),
      avgBlockSize: bitcoinService.getEmptyDataSet(),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        color: "#34d399",
        scales: {
          y: {
            ticks: {
              color: "#34d399",
            },
          },
          x: {
            ticks: {
              color: "#34d399",
            },
          },
        },
      },
    };
  },

  components: {
    Line,
  },

  async created() {
    this.marketPriceHistory = await bitcoinService.getMarketPriceHistory();
    this.avgBlockSize = await bitcoinService.getAvgBlockSize();
  },
};
</script>
