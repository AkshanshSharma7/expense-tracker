import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount(0); // Ensure it's set back to a number after submission
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>{name}'s Expense Tracker</h1>
          <div className="balance">
            <h3>Your Balance</h3>
            {balance >= 0 ? <h2>${balance}</h2> : <h2>-${balance * -1}</h2>}
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>${income}</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>${expenses}</p>
            </div>
          </div>
          
          {/* Card-based expense form */}
          <div className="expense-card">
            <h2>Add Transaction</h2>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Amount"
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
                required
              />
              <div className="radio-buttons">
                <input
                  type="radio"
                  id="expense"
                  value="expense"
                  checked={transactionType === "expense"}
                  onChange={() => setTransactionType("expense")}
                />
                <label htmlFor="expense">Expense</label>
                <input
                  type="radio"
                  id="income"
                  value="income"
                  checked={transactionType === "income"}
                  onChange={() => setTransactionType("income")}
                />
                <label htmlFor="income">Income</label>
              </div>
              <button type="submit">Add Transaction</button>
            </form>
          </div>
          
        </div>

        {profilePhoto && (
          <div className="profile">
            <img className="profile-photo" src={profilePhoto} alt="Profile" />
            <button className="sign-out-button" onClick={signUserOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>

      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              <h4>{transaction.description}</h4>
              <p>
                ${transaction.transactionAmount} •{" "}
                <label
                  style={{
                    color: transaction.transactionType === "expense" ? "red" : "green",
                  }}
                >
                  {transaction.transactionType}
                </label>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
