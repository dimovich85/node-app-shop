const toCurrency = price => {
    return new Intl.NumberFormat('en-US', {
        currency: 'usd',
        style: 'currency'
    }).format(price);
}

window.addEventListener('load', () => {
    const price = document.querySelectorAll('.price');
    price.forEach( el => {
        el.textContent = toCurrency(el.textContent);
    });

    const $cart = document.querySelector('#cart');
    if( $cart ){
        $cart.addEventListener('click', async e => {
            if( e.target.classList.contains('js-remove') ){
                const id = e.target.getAttribute('data-id');
                const request = await fetch('/cart/remove/' + id, {
                    method: 'DELETE'
                });
                const cart = await request.json();
                if( cart.courses.length ){
                    const html = cart.courses.map( data => {
                        return `
                        <tr>
                            <td>${data.title}</td>
                            <td>${data.count}</td>
                            <td>
                                <button class="btn btn-small js-remove" data-id="${data.id}">Удалить</button>
                            </td>
                        </tr>
                        `;
                    }).join('');
                    $cart.querySelector('.price').textContent = toCurrency(cart.price);
                    $cart.querySelector('tbody').innerHTML = html;
                } else{
                    $cart.innerHTML = `
                        <p>Корзина пуста!</p>
                        <p>Давайте что-то <a href="/courses">купим</a>!</p>
                    `;
                }
            }
        });
    }
});