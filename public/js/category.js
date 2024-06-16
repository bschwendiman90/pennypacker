document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.querySelector('.save-transaction-btn');

    if (saveButton) {
        saveButton.addEventListener('click', async (e) => {
            e.preventDefault();

            const description = document.getElementById('transaction-desc').value;
            const amount = document.getElementById('transaction-amount').value;

            // Extract category_id from the current URL path
            const categoryId = window.location.pathname.split('/')[2]; // Adjust this based on your URL structure

            try {
                const response = await fetch(`/api/category/${categoryId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        description,
                        amount,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to save transaction');
                }

                const data = await response.json();
                console.log('Transaction saved:', data);

                // Close the modal if saving was successful
                closeModal();

                // Optionally, reload the page
                window.location.reload();
            } catch (error) {
                console.error('Error saving transaction:', error);
                // Handle error display or logging as needed
            }
        });
    } else {
        console.error('Save button not found');
    }
});

function closeModal() {
    const modal = document.getElementById('transaction-modal');
    if (modal) {
        modal.classList.add('hidden');
    } else {
        console.error('Modal element not found');
    }
}