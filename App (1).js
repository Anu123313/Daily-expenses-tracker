import React, { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("Salary");

  const addTransaction = () => {
    if (!title || !amount) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type,
      category,
    };

    setTransactions([...transactions, newTransaction]);
    setTitle("");
    setAmount("");
  };

  const income = transactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = income - expense;

  return (
    <div className="container">
      <h1>Daily Expense Analytics Dashboard</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            if (e.target.value === "Income") {
              setCategory("Salary");
            } else {
              setCategory("Food");
            }
          }}
        >
          <option>Income</option>
          <option>Expense</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {type === "Income" ? (
            <>
              <option>Salary</option>
              <option>Bonus</option>
              <option>Freelance</option>
            </>
          ) : (
            <>
              <option>Food</option>
              <option>Travel</option>
              <option>Shopping</option>
              <option>Bills</option>
            </>
          )}
        </select>

        <button onClick={addTransaction}>Add</button>
      </div>

      <div className="summary">
        <div>Total Income: ₹{income}</div>
        <div>Total Expense: ₹{expense}</div>
        <div>Balance: ₹{balance}</div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="4">No Transactions</td>
            </tr>
          ) : (
            transactions.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td className={item.type === "Income" ? "income" : "expense"}>
                  {item.type}
                </td>
                <td>₹{item.amount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;