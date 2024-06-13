const budgetId = document.getElementById("budget-container").dataset.budgetId;

const budgetEndpoint = `/api/budget/${budgetId}`;
const categoriesEndpoint = `/api/budget/${budgetId}/categories`;

fetch(budgetEndpoint)
  .then((response) => response.json())
  .then((budgetData) => {
    const budgetIncome = budgetData.budget.income;

    fetch(categoriesEndpoint)
      .then((response) => response.json())
      .then((categoriesData) => {
        const categories = categoriesData.categories;
        let totalCategoryAssigned = 0;

        categories.forEach((category) => {
          totalCategoryAssigned += category.assigned;

          // Fetch transactions for each category
          const transactionsEndpoint = `/api/categories/${category.id}/transactions`;
          fetch(transactionsEndpoint)
            .then((response) => response.json())
            .then((transactionsData) => {
              const transactions = transactionsData.transactions;
              let totalTransactions = 0;

              transactions.forEach((transaction) => {
                totalTransactions += transaction.amount;
              });

              const remainingCategory =
                category.assigned - totalTransactions;
              document.querySelector(
                `#category-${category.id} .category-available`
              ).innerText = remainingCategory.toFixed(2);
            })
            .catch((error) => {
              console.error("Error fetching transactions data:", error);
              document.querySelector(
                `#category-${category.id} .category-available`
              ).innerText = "Error loading data";
            });
        });

        const remainingBudget = budgetIncome - totalCategoryAssigned;
        document.getElementById("budget-income").innerText =
          remainingBudget.toFixed(2);
      })
      .catch((error) => {
        console.error("Error fetching categories data:", error);
      });
  })
  .catch((error) => {
    console.error("Error fetching budget data:", error);
  });
