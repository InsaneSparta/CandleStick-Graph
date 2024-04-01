const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const btcusdSchema = new Schema({
  symbol: { type: String, required: true },
  open: { type: Number, required: true },
  high: { type: Number, required: true },
  low: { type: Number, required: true },
  close: { type: Number, required: true },
  volume: { type: Number, required: true },
  tick_volume: { type: Number, required: true },
  date: { type: String, required: true },
  hour: { type: Number, required: true },
  minute: { type: Number, required: true },
  spread: { type: Number, required: true },
  fullDate: { type: Date, required: true },
}, {
  timestamps: true,
});

const Btcusd = mongoose.model('Btcusd', btcusdSchema);

module.exports = Btcusd;