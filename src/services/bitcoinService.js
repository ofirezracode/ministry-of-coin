import axios from "axios";
import { utilService } from "./utilService";

const RATE_URL = "https://blockchain.info/tobtc?currency=USD&value=1";
const AVG_BLOCK_SIZE_URL =
  "https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true";
const MARKET_PRICE_HISTORY_URL =
  "https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true";

export const bitcoinService = {
  getRate,
  getAvgBlockSize,
  getMarketPriceHistory,
  getEmptyDataSet,
};

window.bitcoinService = bitcoinService;

async function getRate() {
  const rate = utilService.loadFromStorage("btc-rate");
  if (rate) {
    return rate;
  }
  const res = await axios.get(RATE_URL);
  utilService.saveToStorage("btc-rate", res.data);
  return res.data;
}

async function getAvgBlockSize() {
  const block = utilService.loadFromStorage("btc-block");
  if (block) {
    const dataObj = _buildChartData(block, "Avg block size");
    return dataObj;
  }
  const res = await axios.get(AVG_BLOCK_SIZE_URL);
  utilService.saveToStorage("btc-block", res.data);
  const dataObj = _buildChartData(res.data, "Avg block size");
  return dataObj;
}

async function getMarketPriceHistory() {
  const history = utilService.loadFromStorage("btc-history");
  if (history) {
    const dataObj = _buildChartData(history, "Market price history");
    return dataObj;
  }
  const res = await axios.get(MARKET_PRICE_HISTORY_URL);
  utilService.saveToStorage("btc-history", res.data);
  const dataObj = _buildChartData(res.data, "Market price history");
  return dataObj;
}

function _buildChartData(resData, label) {
  const dataObj = {
    labels: [],
    datasets: [
      {
        label,
        backgroundColor: "#34d399",
        data: [],
      },
    ],
  };
  const latestValues = resData.values.slice(resData.values.length - 10);
  const labels = latestValues.map((value) => _formatDate(value.x, "en-UK"));
  const data = latestValues.map((value) => value.y);
  dataObj.labels = labels;
  dataObj.datasets[0].data = data;
  return dataObj;
}

function _formatDate(timestamp, locale) {
  timestamp = timestamp * 1000;
  const date = new Date(timestamp);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };
  return date.toLocaleDateString(locale, options);
}

function getEmptyDataSet() {
  return {
    labels: [],
    datasets: [
      {
        label: "Empty",
        backgroundColor: "#34d399",
        data: [],
      },
    ],
  };
}
