const Lending = require('../models/lending');
const { web3, contract } = require('../web3');

exports.borrow = async (req, res) => {
  const { borrower, amount, interestRate, dueDate } = req.body;

  try {
    const newLoan = new Lending({ borrower, amount, interestRate, dueDate });
    await newLoan.save();
    res.json(newLoan);
  } catch (error) {
    res.status(500).json({ message: 'Borrowing failed', error });
  }
};

exports.lend = async (req, res) => {
  const { lender, loanId } = req.body;

  try {
    const loan = await Lending.findById(loanId);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    // 调用智能合约的 lend 方法
    await contract.methods.lend(loan.amount).send({ from: lender, value: web3.utils.toWei(loan.amount.toString(), 'ether') });
    
    loan.lender = lender;
    loan.status = 'funded';
    await loan.save();

    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Lending failed', error });
  }
};

exports.repay = async (req, res) => {
  const { loanId, borrower } = req.body;

  try {
    const loan = await Lending.findById(loanId);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    // 调用智能合约的 repay 方法
    await contract.methods.repay().send({ from: borrower });

    loan.status = 'repaid';
    await loan.save();

    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Repayment failed', error });
  }
};
