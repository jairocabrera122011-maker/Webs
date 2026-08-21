// =====================================================
// BURGER JAIRO PRO — SCRIPT.JS
// =====================================================


// ================= VARIABLES =================

const body = document.body;

let cart = [];

let discount = 0;


// ================= ELEMENTOS =================

const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");

const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCounter = document.getElementById("cartCounter");

const cartSubtotal = document.getElementById("cartSubtotal");
const cartDiscount = document.getElementById("cartDiscount");
const cartTotal = document.getElementById("cartTotal");

const productSearch = document.getElementById("productSearch");

const categoryButtons =
    document.querySelectorAll(".category-button");

const productCards =
    document.querySelectorAll(".product-card");

const themeButton =
    document.getElementById("themeButton");

const menuButton =
    document.getElementById("menuButton");

const navigation =
    document.getElementById("navigation");

const backToTop =
    document.getElementById("backToTop");


// =====================================================
// CARRITO
// =====================================================


// Abrir carrito

function openCartPanel() {

    cartPanel.classList.add("active");

    cartOverlay.classList.add("active");

    body.style.overflow = "hidden";
}


// Cerrar carrito

function closeCartPanel() {

    cartPanel.classList.remove("active");

    cartOverlay.classList.remove("active");

    body.style.overflow = "";
}


openCart.addEventListener(
    "click",
    openCartPanel
);


closeCart.addEventListener(
    "click",
    closeCartPanel
);


cartOverlay.addEventListener(
    "click",
    closeCartPanel
);


// =====================================================
// AÑADIR PRODUCTOS
// =====================================================

function addToCart(name, price) {

    const existingProduct =
        cart.find(
            product => product.name === name
        );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: name,

            price: Number(price),

            quantity: 1

        });

    }


    updateCart();

    openCartPanel();

}


// Botones de añadir

document.querySelectorAll(".add-product")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const name =
                    button.dataset.name;

                const price =
                    button.dataset.price;

                addToCart(
                    name,
                    price
                );

            }
        );

    });


// Oferta

const addOffer =
    document.getElementById("addOffer");


if (addOffer) {

    addOffer.addEventListener(
        "click",
        () => {

            addToCart(
                addOffer.dataset.name,
                addOffer.dataset.price
            );

        }
    );

}


// =====================================================
// ACTUALIZAR CARRITO
// =====================================================

function updateCart() {

    renderCart();

    updateCartCounter();

    updateTotals();

}


// Contador

function updateCartCounter() {

    const totalQuantity =
        cart.reduce(
            (total, product) =>
                total + product.quantity,
            0
        );


    cartCounter.textContent =
        totalQuantity;

}


// Renderizar productos

function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <span>🛒</span>

                <h3>
                    Tu carrito está vacío
                </h3>

                <p>
                    Añade algo delicioso del menú.
                </p>

            </div>

        `;

        return;

    }


    cartItems.innerHTML = "";


    cart.forEach(
        (product, index) => {

            const item =
                document.createElement("div");


            item.className =
                "cart-item";


            item.style.display =
                "flex";

            item.style.gap =
                "12px";

            item.style.alignItems =
                "center";

            item.style.padding =
                "15px 0";

            item.style.borderBottom =
                "1px solid #eeeeee";


            item.innerHTML = `

                <div style="flex:1">

                    <strong>
                        ${product.name}
                    </strong>

                    <div>
                        ${product.price.toFixed(2)} €
                    </div>

                </div>


                <div style="
                    display:flex;
                    align-items:center;
                    gap:8px;
                ">

                    <button
                        class="quantity-minus"
                        data-index="${index}"
                    >
                        −
                    </button>

                    <strong>
                        ${product.quantity}
                    </strong>

                    <button
                        class="quantity-plus"
                        data-index="${index}"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove-product"
                    data-index="${index}"
                    style="
                        border:none;
                        background:none;
                        cursor:pointer;
                    "
                >
                    🗑️
                </button>

            `;


            cartItems.appendChild(item);

        }
    );


    // Botones +

    document.querySelectorAll(".quantity-plus")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );

                    cart[index].quantity++;

                    updateCart();

                }
            );

        });


    // Botones -

    document.querySelectorAll(".quantity-minus")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    if (
                        cart[index].quantity > 1
                    ) {

                        cart[index].quantity--;

                    } else {

                        cart.splice(index, 1);

                    }


                    updateCart();

                }
            );

        });


    // Eliminar

    document.querySelectorAll(".remove-product")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );

                    cart.splice(
                        index,
                        1
                    );

                    updateCart();

                }
            );

        });

}


// =====================================================
// TOTALES
// =====================================================

function updateTotals() {

    const subtotal =
        cart.reduce(
            (total, product) =>
                total +
                product.price *
                product.quantity,
            0
        );


    const discountAmount =
        subtotal * discount;


    const total =
        subtotal -
        discountAmount;


    cartSubtotal.textContent =
        subtotal.toFixed(2) + " €";


    cartDiscount.textContent =
        "-" +
        discountAmount.toFixed(2) +
        " €";


    cartTotal.textContent =
        total.toFixed(2) + " €";

}


// =====================================================
// CUPONES
// =====================================================

const couponInput =
    document.getElementById("couponInput");

const applyCoupon =
    document.getElementById("applyCoupon");


if (applyCoupon) {

    applyCoupon.addEventListener(
        "click",
        () => {

            const code =
                couponInput.value
                    .trim()
                    .toUpperCase();


            if (code === "JAIRO10") {

                discount = 0.10;

                alert(
                    "🎉 Cupón aplicado: 10% de descuento"
                );

            }

            else if (code === "BURGER20") {

                discount = 0.20;

                alert(
                    "🔥 Cupón aplicado: 20% de descuento"
                );

            }

            else {

                discount = 0;

                alert(
                    "❌ Cupón no válido"
                );

            }


            updateTotals();

        }
    );

}


// =====================================================
// BUSCADOR
// =====================================================

if (productSearch) {

    productSearch.addEventListener(
        "input",
        () => {

            const search =
                productSearch.value
                    .toLowerCase()
                    .trim();


            productCards.forEach(
                card => {

                    const name =
                        card.dataset.name
                            .toLowerCase();


                    if (
                        name.includes(search)
                    ) {

                        card.style.display =
                            "";

                    } else {

                        card.style.display =
                            "none";

                    }

                }
            );

        }
    );

}


// =====================================================
// FILTROS DE CATEGORÍA
// =====================================================

categoryButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                categoryButtons.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                button.classList.add(
                    "active"
                );


                const category =
                    button.dataset.category;


                productCards.forEach(
                    card => {

                        if (
                            category === "all" ||
                            card.dataset.category ===
                            category
                        ) {

                            card.style.display =
                                "";

                        } else {

                            card.style.display =
                                "none";

                        }

                    }
                );

            }
        );

    }
);


// =====================================================
// MENÚ MÓVIL
// =====================================================

if (menuButton) {

    menuButton.addEventListener(
        "click",
        () => {

            navigation.classList.toggle(
                "active"
            );

        }
    );

}


// Cerrar menú al pulsar enlace

document.querySelectorAll(
    ".navigation a"
).forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                navigation.classList.remove(
                    "active"
                );

            }
        );

    }
);


// =====================================================
// MODO OSCURO
// =====================================================

if (themeButton) {

    themeButton.addEventListener(
        "click",
        () => {

            body.classList.toggle(
                "dark-mode"
            );


            if (
                body.classList.contains(
                    "dark-mode"
                )
            ) {

                themeButton.textContent =
                    "☀️";

                localStorage.setItem(
                    "theme",
                    "dark"
                );

            } else {

                themeButton.textContent =
                    "🌙";

                localStorage.setItem(
                    "theme",
                    "light"
                );

            }

        }
    );

}


// Cargar tema guardado

const savedTheme =
    localStorage.getItem(
        "theme"
    );


if (savedTheme === "dark") {

    body.classList.add(
        "dark-mode"
    );

    themeButton.textContent =
        "☀️";

}


// =====================================================
// MODAL DE PRODUCTOS
// =====================================================

const productModal =
    document.getElementById(
        "productModal"
    );

const closeProductModal =
    document.getElementById(
        "closeProductModal"
    );

const productModalContent =
    document.getElementById(
        "productModalContent"
    );


document.querySelectorAll(
    ".details-button"
).forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const card =
                    button.closest(
                        ".product-card"
                    );


                const title =
                    card.querySelector(
                        "h3"
                    ).textContent;


                const description =
                    card.querySelector(
                        ".product-content > p"
                    ).textContent;


                const price =
                    card.querySelector(
                        ".product-title-row strong"
                    ).textContent;


                const image =
                    card.querySelector(
                        "img"
                    ).src;


                productModalContent.innerHTML = `

                    <img
                        src="${image}"
                        alt="${title}"
                        style="
                            width:100%;
                            height:300px;
                            object-fit:cover;
                            border-radius:15px;
                            margin-bottom:20px;
                        "
                    >

                    <h2>
                        ${title}
                    </h2>

                    <p style="
                        color:#777;
                        margin:12px 0;
                    ">
                        ${description}
                    </p>

                    <strong style="
                        font-size:1.5rem;
                    ">
                        ${price}
                    </strong>

                    <br><br>

                    <button
                        class="button primary-button"
                        id="modalAddProduct"
                    >
                        🛒 Añadir al carrito
                    </button>

                `;


                productModal.classList.add(
                    "active"
                );


                document
                    .getElementById(
                        "modalAddProduct"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            const numericPrice =
                                parseFloat(
                                    price.replace(
                                        ",",
                                        "."
                                    )
                                );


                            addToCart(
                                title,
                                numericPrice
                            );


                            productModal.classList.remove(
                                "active"
                            );

                        }
                    );

            }
        );

    }
);


if (closeProductModal) {

    closeProductModal.addEventListener(
        "click",
        () => {

            productModal.classList.remove(
                "active"
            );

        }
    );

}


productModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            productModal
        ) {

            productModal.classList.remove(
                "active"
            );

        }

    }
);


// =====================================================
// RESERVAS
// =====================================================

const reservationForm =
    document.getElementById(
        "reservationForm"
    );

const reservationMessage =
    document.getElementById(
        "reservationMessage"
    );


if (reservationForm) {

    reservationForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            reservationMessage.textContent =
                "✅ Solicitud enviada correctamente. Te contactaremos para confirmar la reserva.";


            reservationMessage.style.color =
                "#198754";


            reservationForm.reset();

        }
    );

}


// =====================================================
// CONTACTO
// =====================================================

const contactForm =
    document.getElementById(
        "contactForm"
    );

const contactMessageStatus =
    document.getElementById(
        "contactMessageStatus"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            contactMessageStatus.textContent =
                "✅ Mensaje enviado correctamente.";


            contactMessageStatus.style.color =
                "#198754";


            contactForm.reset();

        }
    );

}


// =====================================================
// FINALIZAR PEDIDO
// =====================================================

const checkoutButton =
    document.getElementById(
        "checkoutButton"
    );


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "🛒 Tu carrito está vacío."
                );

                return;

            }


            const total =
                cart.reduce(
                    (sum, product) =>
                        sum +
                        product.price *
                        product.quantity,
                    0
                ) * (1 - discount);


            alert(
                "✅ Pedido preparado.\n\n" +
                "Total: " +
                total.toFixed(2) +
                " €\n\n" +
                "El sistema de pago se conectará posteriormente."
            );

        }
    );

}


// =====================================================
// VOLVER ARRIBA
// =====================================================

window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 500
        ) {

            backToTop.classList.add(
                "active"
            );

        } else {

            backToTop.classList.remove(
                "active"
            );

              }
