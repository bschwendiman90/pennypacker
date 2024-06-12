const budgetId = '';
const categoryId = '';

const budgetEndpoint = `/api/budget/${budgetId}`;
const categoriesEndpoint = `/api/categories/${budgetId}`;
const transactionsEndpoint = `/api/transactions/${categoryId}`;

fetch(budgetEndpoint)
.then(response => response.json())
.then(budgetData => {
    const budgetIncome = budgetData.budget.income;
    
    fetch(categoriesEndpoint)
    .then(response => response.json())
    .then(categoriesData => {
        const categories = categoriesData.categories;

        let totalAssigned = 0;
        categories.forEach(category => {
            totalAssigned += category.assigned;
        });

        const remaining = budgetIncome - totalAssigned;

        document.getElementById('budget-income').innerText = remaining;
});
});

fetch(categoriesEndpoint)
.then(response => response.json())
.then(categoryData => {
    const categoryAssigned = categoryData.category.assigned;
    
    fetch(transactionsEndpoint)
    .then(response => response.json())
    .then(transactionsData => {
        const transactions = transactionsData.transaction;

        let totalAssigned = 0;
        transactions.forEach(transaction => {
            totalAssigned += transaction.assigned;
        });

        const remaining = categoryAssigned - totalAssigned;

        document.getElementById('category-available').innerText = remaining;
});
});