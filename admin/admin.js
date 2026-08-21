/* =====================================================
   BURGER JAIRO — PANEL DE ADMINISTRACIÓN
   ADMIN.JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTOS
    ========================= */

    const loginScreen = document.querySelector(".login-screen");
    const adminApp = document.querySelector(".admin-app");

    const loginForm = document.querySelector("#loginForm");

    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll(".admin-section");

    const sidebar = document.querySelector(".sidebar");
    const sidebarToggle = document.querySelector(".sidebar-toggle");

    const logoutButton = document.querySelector(".logout-button");

    const notificationButton =
        document.querySelector(".notification-button");

    const notificationPanel =
        document.querySelector(".notification-panel");

    const modal = document.querySelector(".admin-modal");
    const modalClose = document.querySelector(".modal-close");


    /* =========================
       LOGIN
    ========================= */

    if (loginForm) {

        loginForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const username =
                document.querySelector("#username")?.value.trim();

            const password =
                document.querySelector("#password")?.value;

            /*
             * DEMO LOCAL
             * Más adelante conectaremos esto
             * con un sistema de autenticación real.
             */

            if (
                username === "admin" &&
                password === "1234"
            ) {

                localStorage.setItem(
                    "burgerJairoAdmin",
                    "true"
                );

                mostrarPanel();

            } else {

                alert(
                    "Usuario o contraseña incorrectos."
                );

            }

        });

    }


    function mostrarPanel() {

        if (loginScreen) {

            loginScreen.style.display = "none";

        }

        if (adminApp) {

            adminApp.style.display = "block";

        }

    }


    function mostrarLogin() {

        if (loginScreen) {

            loginScreen.style.display = "flex";

        }

        if (adminApp) {

            adminApp.style.display = "none";

        }

    }


    /* =========================
       COMPROBAR SESIÓN
    ========================= */

    const sesionActiva =
        localStorage.getItem(
            "burgerJairoAdmin"
        );

    if (sesionActiva === "true") {

        mostrarPanel();

    } else {

        mostrarLogin();

    }


    /* =========================
       NAVEGACIÓN
    ========================= */

    navItems.forEach((item) => {

        item.addEventListener("click", () => {

            const target =
                item.dataset.section;

            if (!target) return;


            navItems.forEach((nav) => {

                nav.classList.remove("active");

            });


            item.classList.add("active");


            sections.forEach((section) => {

                section.classList.remove("active");

            });


            const targetSection =
                document.getElementById(target);

            if (targetSection) {

                targetSection.classList.add("active");

            }


            /* Cambiar título */

            const title =
                item.querySelector(".nav-title");

            const pageTitle =
                document.querySelector(
                    ".topbar-title h1"
                );

            if (
                title &&
                pageTitle
            ) {

                pageTitle.textContent =
                    title.textContent;

            }


            /* Cerrar menú móvil */

            if (sidebar) {

                sidebar.classList.remove("active");

            }

        });

    });


    /* =========================
       MENÚ MÓVIL
    ========================= */

    if (sidebarToggle) {

        sidebarToggle.addEventListener(
            "click",
            () => {

                sidebar?.classList.toggle(
                    "active"
                );

            }
        );

    }


    /* =========================
       CERRAR SIDEBAR
    ========================= */

    document.addEventListener(
        "click",
        (event) => {

            if (
                window.innerWidth <= 900 &&
                sidebar &&
                sidebar.classList.contains(
                    "active"
                )
            ) {

                if (
                    !sidebar.contains(
                        event.target
                    ) &&
                    !sidebarToggle?.contains(
                        event.target
                    )
                ) {

                    sidebar.classList.remove(
                        "active"
                    );

                }

            }

        }
    );


    /* =========================
       LOGOUT
    ========================= */

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            () => {

                const confirmar =
                    confirm(
                        "¿Quieres cerrar sesión?"
                    );

                if (!confirmar) return;


                localStorage.removeItem(
                    "burgerJairoAdmin"
                );


                mostrarLogin();

            }
        );

    }


    /* =========================
       NOTIFICACIONES
    ========================= */

    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                notificationPanel?.classList.toggle(
                    "active"
                );

            }
        );

    }


    document.addEventListener(
        "click",
        (event) => {

            if (
                notificationPanel &&
                !notificationPanel.contains(
                    event.target
                ) &&
                !notificationButton?.contains(
                    event.target
                )
            ) {

                notificationPanel.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =========================
       MODAL
    ========================= */

    function abrirModal() {

        if (modal) {

            modal.classList.add("active");

        }

    }


    function cerrarModal() {

        if (modal) {

            modal.classList.remove("active");

        }

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            cerrarModal
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === modal
                ) {

                    cerrarModal();

                }

            }
        );

    }


    /* =========================
       BOTONES AÑADIR
    ========================= */

    const addButtons =
        document.querySelectorAll(
            "[data-action='add']"
        );

    addButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                abrirModal();

            }
        );

    });


    /* =========================
       BOTONES EDITAR
    ========================= */

    const editButtons =
        document.querySelectorAll(
            ".edit-button"
        );

    editButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                abrirModal();

            }
        );

    });


    /* =========================
       ELIMINAR
    ========================= */

    const deleteButtons =
        document.querySelectorAll(
            ".delete-button"
        );

    deleteButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const confirmar =
                    confirm(
                        "¿Seguro que quieres eliminar este elemento?"
                    );

                if (
                    confirmar
                ) {

                    const card =
                        button.closest(
                            ".admin-product-card"
                        );

                    if (card) {

                        card.remove();

                    }

                }

            }
        );

    });


    /* =========================
       BÚSQUEDA
    ========================= */

    const searchInput =
        document.querySelector(
            "#productSearch"
        );

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                const search =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                const products =
                    document.querySelectorAll(
                        ".admin-product-card"
                    );


                products.forEach(
                    (product) => {

                        const text =
                            product.textContent
                                .toLowerCase();


                        if (
                            text.includes(
                                search
                            )
                        ) {

                            product.style.display =
                                "";

                        } else {

                            product.style.display =
                                "none";

                        }

                    }
                );

            }
        );

    }


    /* =========================
       MODO OSCURO
    ========================= */

    const darkModeToggle =
        document.querySelector(
            "#darkMode"
        );

    const darkMode =
        localStorage.getItem(
            "burgerJairoDarkMode"
        );


    if (darkMode === "true") {

        document.body.classList.add(
            "dark-mode"
        );

        if (darkModeToggle) {

            darkModeToggle.checked = true;

        }

    }


    if (darkModeToggle) {

        darkModeToggle.addEventListener(
            "change",
            () => {

                const enabled =
                    darkModeToggle.checked;


                document.body.classList.toggle(
                    "dark-mode",
                    enabled
                );


                localStorage.setItem(
                    "burgerJairoDarkMode",
                    enabled
                );

            }
        );

    }


    /* =========================
       BOTONES DE GUARDAR
    ========================= */

    const saveButtons =
        document.querySelectorAll(
            "[data-action='save']"
        );

    saveButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                alert(
                    "Cambios guardados correctamente ✅"
                );

                cerrarModal();

            }
        );

    });


    /* =========================
       SWITCHES
    ========================= */

    const switches =
        document.querySelectorAll(
            ".switch input"
        );

    switches.forEach((toggle) => {

        toggle.addEventListener(
            "change",
            () => {

                console.log(
                    "Configuración:",
                    toggle.checked
                );

            }
        );

    });


    /* =========================
       ESCAPE
    ========================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                cerrarModal();

                notificationPanel?.classList.remove(
                    "active"
                );

                sidebar?.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =========================
       MENSAJE DE INICIO
    ========================= */

    console.log(
        "🍔 Burger Jairo Admin iniciado correctamente."
    );

});
