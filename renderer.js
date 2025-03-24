document.querySelectorAll('.software-item button').forEach(button => {
    button.addEventListener('click', () => {
        alert('This feature is under development.');
    });
});

document.querySelector('.install-all-btn').addEventListener('click', () => {
    alert('Batch installation started!');
    // Implement batch installation logic here
});
