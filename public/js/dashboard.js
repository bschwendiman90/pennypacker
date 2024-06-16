document.querySelector('.save-budget-btn').addEventListener('click', async () => {
    const income = document.querySelector('#budget-income').value;

    try {
        // Delete the current budget
        const deleteResponse = await fetch('/api/budget', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!deleteResponse.ok) {
            throw new Error('Failed to delete the current budget');
        }

        // Create a new budget
        const createResponse = await fetch('/api/budget', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ income })
        });

        if (!createResponse.ok) {
            throw new Error('Failed to create a new budget');
        }

        const result = await createResponse.json();
        console.log('Budget saved:', result);
        // Optionally, close the modal and refresh the page or update the UI accordingly
        const budgetModal = new bootstrap.Modal(document.getElementById('budget-modal'));
        budgetModal.hide();
        location.reload(); // This will reload the page, you can update this to suit your needs
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error saving the budget. Please try again.');
    }
});