let history = [];
function rollDice() {
    const numsDice = parseInt(document.getElementById('numsDice').value);
    const results = document.getElementById('results');
    const diceResults = document.getElementById('diceResults');
    const diceImages = document.getElementById('diceImages');
    const historyList = document.getElementById('historyList');
    const values = [];
    const images = [];

    // Reset animations bằng cách xóa và thêm lại element
    results.style.animation = 'none';
    results.offsetHeight; // Trigger reflow
    results.style.animation = null;

    // Clear previous dice
    diceImages.innerHTML = '';
    
    for (let i = 0; i < numsDice; i++) {
        const value = Math.floor(Math.random() * 6) + 1;
        values.push(value);
        
        // Thêm delay cho từng xúc xắc
        setTimeout(() => {
            const img = document.createElement('img');
            img.src = `diceImages/${value}.png`;
            img.alt = `Dice ${value}`;
            diceImages.appendChild(img);
        }, i * 100); // Delay 100ms cho mỗi xúc xắc
    }

    // Đợi một chút trước khi hiển thị kết quả
    setTimeout(() => {
        diceResults.textContent = `Dice: ${values.join(', ')}`;
        
        const sum = values.reduce((a, b) => a + b, 0);
        let resultText = sum > 10 ? 'Tài' : 'Xỉu';
        results.textContent = resultText;

        // Save to history
        history.push({
            values: values,
            result: resultText
        });

        // Update history display with animation
        const historyItem = document.createElement('li');
        historyItem.textContent = `Dice: ${values.join(', ')} - ${resultText}`;
        historyItem.classList.add('history-item-new');
        
        // Thêm vào đầu danh sách
        historyList.insertBefore(historyItem, historyList.firstChild);

        // Xóa class animation sau khi nó hoàn thành
        setTimeout(() => {
            historyItem.classList.remove('history-item-new');
        }, 500);

        // Giới hạn số lượng kết quả hiển thị (tùy chọn)
        if (historyList.children.length > 10) {
            historyList.removeChild(historyList.lastChild);
        }
    }, numsDice * 100 + 200); // Đợi sau khi tất cả xúc xắc đã xuất hiện
}

// Thêm disable cho nút trong khi đang roll
document.addEventListener('DOMContentLoaded', function() {
    const rollButton = document.querySelector('button');
    
    rollButton.addEventListener('click', function() {
        this.disabled = true;
        rollDice();
        setTimeout(() => {
            this.disabled = false;
        }, 1000);
    });
});