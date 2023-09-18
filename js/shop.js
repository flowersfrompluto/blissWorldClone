$(document).ready(function () {
    const cart = [];
    let total = 0;

    // Add to Cart button click handler
    $('.addToCart').click(function () {
        const product = $(this).closest('div');
        const id = product.data('id');
        const name = product.data('name');
        const price = parseFloat(product.data('price'));

        // Check if the item is already in the cart
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        total += price;

        // Update the cart display
        updateCartDisplay();
    });

    // Remove item from cart
    $('#cart').on('click', '.remove-item', function () {
        const itemId = $(this).data('id');
        const itemIndex = cart.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            total -= cart[itemIndex].price * cart[itemIndex].quantity;
            cart.splice(itemIndex, 1);
            updateCartDisplay();
        }
    });

    // Update the cart display
    function updateCartDisplay() {
        $('#cart').empty();
        cart.forEach(item => {
            $('#cart').append(`
                <li>
                    ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </li>
            `);
        });
        $('#cart-total').text(total.toFixed(2));
    }
});