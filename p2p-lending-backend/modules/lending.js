const mongoose = require('mongoose');

const LendingSchema = new mongoose.Schema({
  borrower: {
    type: String,
    required: true,
  },
  lender: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'funded', 'repaid'],
    default: 'pending',
  },
  dueDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Lending', LendingSchema);
