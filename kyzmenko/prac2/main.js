// Класс для представления товара в корзине
class CartItem {
    constructor(name, price, quantity = 1) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

// Класс для управления корзиной
class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
    }

    addItem(name, price) {
        const existingItem = this.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push(new CartItem(name, price));
        }
        this.updateTotal();
        this.updateUI();
    }

    removeItem(name) {
        const index = this.items.findIndex(item => item.name === name);
        if (index !== -1) {
            this.items.splice(index, 1);
            this.updateTotal();
            this.updateUI();
        }
    }

    updateQuantity(name, quantity) {
        const item = this.items.find(item => item.name === name);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(name);  // Удаляем товар, если количество 0 или меньше
            } else {
                item.quantity = quantity;
                this.updateTotal();
                this.updateUI();
            }
        }
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    updateUI() {
        // Обновляем счетчик товаров
        const cartCount = document.querySelector('.cart-count');
        const itemsCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = itemsCount;

        // Обновляем содержимое корзины
        const cartItems = document.getElementById('cartItems');
        cartItems.innerHTML = '';

        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item d-flex justify-content-between align-items-center mb-2';
            itemElement.innerHTML = `
                <div>
                    <h6 class="mb-0">${item.name}</h6>
                    <small class="text-muted">${item.price} ₽</small>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary me-2 decrease-btn">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary ms-2 increase-btn">+</button>
                    <button class="btn btn-sm btn-outline-danger ms-3 remove-btn">×</button>
                </div>
            `;

            // Добавляем обработчики событий после создания элемента
            const decreaseBtn = itemElement.querySelector('.decrease-btn');
            const increaseBtn = itemElement.querySelector('.increase-btn');
            const removeBtn = itemElement.querySelector('.remove-btn');

            decreaseBtn.addEventListener('click', () => this.updateQuantity(item.name, item.quantity - 1));
            increaseBtn.addEventListener('click', () => this.updateQuantity(item.name, item.quantity + 1));
            removeBtn.addEventListener('click', () => this.removeItem(item.name));

            cartItems.appendChild(itemElement);
        });

        // Обновляем итоговую сумму
        const cartTotal = document.getElementById('cartTotal');
        cartTotal.textContent = this.total;
    }
}

// Создаем экземпляр корзины
const cart = new Cart();

// Добавляем обработчики для кнопок "Заказать"
document.addEventListener('DOMContentLoaded', () => {
    const orderButtons = document.querySelectorAll('.btn-danger');
    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const name = card.querySelector('.card-title').textContent;
            const price = parseInt(card.querySelector('.text-muted').textContent);
            cart.addItem(name, price);
        });
    });

    // Обработчик для кнопки "Оформить заказ"
    document.getElementById('orderButton').addEventListener('click', () => {
        if (cart.items.length > 0) {
            alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
            cart.items = [];
            cart.updateTotal();
            cart.updateUI();
            bootstrap.Modal.getInstance(document.getElementById('cartModal')).hide();
        } else {
            alert('Корзина пуста!');
        }
    });
});
