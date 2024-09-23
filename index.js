let history = [];

function rollDice() {
    const numsDice = document.getElementById('numsDice').value;
    const results = document.getElementById('results');
    const diceResults = document.getElementById('diceResults');
    const diceImages = document.getElementById('diceImages');
    const historyList = document.getElementById('historyList');
    const values = [];
    const images = [];

    for (let i = 0; i < numsDice; i++) {
        const value = Math.floor(Math.random() * 6) + 1;
        values.push(value);
        images.push(`<img src="diceImages/${value}.png" alt="Dice ${value}">`);
    }

    diceResults.textContent = `Dice: ${values.join(', ')}`;
    diceImages.innerHTML = images.join('');
    let resultText = '';

    if (values.reduce((a, b) => a + b, 0) > 10) {
        resultText = 'Tài';
    } else {
        resultText = 'Xỉu';
    }

    results.textContent = resultText;

    // Save the result in history
    history.push({
        values: values,
        result: resultText
    });

    // Update the history display
    const historyItem = document.createElement('li');
    historyItem.textContent = `Dice: ${values.join(', ')} - ${resultText}`;
    historyList.appendChild(historyItem);
}
