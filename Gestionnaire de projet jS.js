let transactions = [];
const transactionList = document.getElementById("transaction-list");
const balanceAmount = document.getElementById("balance-amount");

function ajouterTransaction() {
  const type = document.getElementById("type").value;
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (description.trim() === "" || isNaN(amount)) {
    return;
  }

  const transaction = { type, description, amount };
  transactions.push(transaction);
  updateUI();
  resetInputFields();
}

function updateUI() {
  transactionList.innerHTML = "";
  let balance = 0;

  transactions.forEach((transaction, index) => {
    const li = document.createElement("li");
    li.textContent = `${transaction.description}: ${transaction.amount.toFixed(2)}`;
    li.classList.add(transaction.type);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.onclick = () => supprimerTransaction(index);

    li.appendChild(deleteButton);
    transactionList.appendChild(li);

    if (transaction.type === "income") {
      balance += transaction.amount;
    } else if (transaction.type === "expense") {
      balance -= transaction.amount;
    }
  });

  balanceAmount.textContent = balance.toFixed(2);
}

function supprimerTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

function resetInputFields() {
  document.getElementById("type").value = "income";
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
}

updateUI();
