const counters = [12, 0, 6, 11];

function updateCounter(index) {
    document.getElementById(`counter${index}`).textContent = counters[index];
    // Получаем кнопку "Записаться" для текущего талона
    const button = document.querySelector(`#counter${index}`).closest('.counter').querySelector('button');
    
    // Меняем текст кнопки в зависимости от количества талонов
    if (counters[index] === 0) {
        button.textContent = 'Нет талонов';
        button.disabled = true; // Дополнительно делаем кнопку неактивной
    } else {
        button.textContent = 'Записаться';
        button.disabled = false;
    }
}

function incrementCounter(index) {
    if (counters[index] < 10) {
        counters[index]++;
        updateCounter(index);
    }
}

function decrementCounter(index) {
    if (counters[index] > 0) {
        counters[index]--;
        updateCounter(index);
    }
}

// Инициализируем начальное состояние кнопок
window.onload = function() {
    for (let i = 0; i < counters.length; i++) {
        updateCounter(i);
    }
};