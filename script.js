document.addEventListener("DOMContentLoaded", () => {
    const transactionForm = document.getElementById("transaction-form");
    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const transactionsList = document.getElementById("transactions");
    const totalIncome = document.getElementById("total-income");
    const totalExpense = document.getElementById("total-expense");
    const netBalance = document.getElementById("net-balance");
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  
    // Update the total income, expense, and balance
    const updateTotals = () => {
      let income = transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((sum, curr) => sum + curr.amount, 0);
      let expense = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((sum, curr) => sum + curr.amount, 0);
  
      totalIncome.textContent = `₹${income.toFixed(2)}`;
      totalExpense.textContent = `₹${expense.toFixed(2)}`;
      netBalance.textContent = `₹${(income - expense).toFixed(2)}`;
    };
  
    // Save transactions to local storage
    const saveTransactions = () => {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    };
  
    // Render the transaction list
    const renderTransactions = (filter = "all") => {
      transactionsList.innerHTML = "";
      const filteredTransactions = transactions.filter(
        (transaction) => filter === "all" || transaction.type === filter
      );
  
      filteredTransactions.forEach((transaction, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
                <span>${transaction.description}: ₹${transaction.amount}</span>
                <div>
                    <button onclick="editTransaction(${index})">Edit</button>
                    <button onclick="deleteTransaction(${index})">Delete</button>
                </div>
            `;
        transactionsList.appendChild(li);
      });
    };
  
    // Handle form submission for new transaction
    transactionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const description = descriptionInput.value;
      const amount = parseFloat(amountInput.value);
      const type = document.querySelector('input[name="type"]:checked').value;
  
      transactions.push({ description, amount, type });
      descriptionInput.value = "";
      amountInput.value = "";
  
      saveTransactions();
      updateTotals();
      renderTransactions();
    });
  
    // Filter transactions based on user selection
    document.querySelectorAll('input[name="filter"]').forEach((filter) => {
      filter.addEventListener("change", () => {
        const selectedFilter = document.querySelector(
          'input[name="filter"]:checked'
        ).value;
        renderTransactions(selectedFilter);
      });
    });
  
    // Delete a transaction
    window.deleteTransaction = (index) => {
      transactions.splice(index, 1);
      saveTransactions();
      updateTotals();
      renderTransactions();
    };
  
    // Edit a transaction
    window.editTransaction = (index) => {
      const transaction = transactions[index];
      descriptionInput.value = transaction.description;
      amountInput.value = transaction.amount;
      document.querySelector(`input[value="${transaction.type}"]`).checked = true;
      transactions.splice(index, 1);
      saveTransactions();
      updateTotals();
      renderTransactions();
    };
  
    // Initial load of totals and transactions
    updateTotals();
    renderTransactions();
  });