/* ==========================================================
   LPZ DIGITAL
   script.js
========================================================== */


/* ==========================================================
   ELEMENTOS PRINCIPAIS
========================================================== */

const header = document.getElementById("header");

const menuToggle =
    document.getElementById("menuToggle");

const menu =
    document.getElementById("menu");

const navLinks =
    document.querySelectorAll(".nav-link");

const faqItems =
    document.querySelectorAll(".faq-item");

const revealElements =
    document.querySelectorAll(".reveal");

const contactForm =
    document.getElementById("contactForm");

const currentYear =
    document.getElementById("currentYear");


/* ==========================================================
   HEADER AO ROLAR A PÁGINA
========================================================== */

function handleHeaderScroll() {

    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener(
    "scroll",
    handleHeaderScroll
);

handleHeaderScroll();


/* ==========================================================
   MENU MOBILE
========================================================== */

function toggleMenu() {

    const isOpen =
        menu.classList.toggle("active");

    menuToggle.classList.toggle(
        "active",
        isOpen
    );

    document.body.classList.toggle(
        "menu-open",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Fechar menu"
            : "Abrir menu"
    );

}


function closeMenu() {

    menu.classList.remove("active");

    menuToggle.classList.remove("active");

    document.body.classList.remove(
        "menu-open"
    );

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Abrir menu"
    );

}


menuToggle.addEventListener(
    "click",
    toggleMenu
);


navLinks.forEach((link) => {

    link.addEventListener(
        "click",
        closeMenu
    );

});


/*
Fecha o menu também quando
o usuário clica no botão
"Falar com a LPZ".
*/

const menuButton =
    document.querySelector(".btn-menu");

if (menuButton) {

    menuButton.addEventListener(
        "click",
        closeMenu
    );

}


/* ==========================================================
   FECHAR MENU COM ESC
========================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            menu.classList.contains("active")
        ) {
            closeMenu();
        }

    }
);


/* ==========================================================
   FAQ
========================================================== */

faqItems.forEach((item) => {

    const button =
        item.querySelector(
            ".faq-question"
        );

    const answer =
        item.querySelector(
            ".faq-answer"
        );


    button.addEventListener(
        "click",
        () => {

            const isActive =
                item.classList.contains(
                    "active"
                );


            /*
            Fecha todas as outras
            perguntas primeiro.
            */

            faqItems.forEach(
                (otherItem) => {

                    const otherButton =
                        otherItem.querySelector(
                            ".faq-question"
                        );

                    const otherAnswer =
                        otherItem.querySelector(
                            ".faq-answer"
                        );

                    otherItem.classList.remove(
                        "active"
                    );

                    otherButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    otherAnswer.style.maxHeight =
                        null;
                }
            );


            /*
            Abre a pergunta clicada
            caso ela estivesse fechada.
            */

            if (!isActive) {

                item.classList.add(
                    "active"
                );

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

                answer.style.maxHeight =
                    answer.scrollHeight +
                    "px";

            }

        }
    );

});


/* ==========================================================
   ANIMAÇÕES AO APARECER NA TELA
========================================================== */

const observerOptions = {

    threshold: 0.12,

    rootMargin:
        "0px 0px -40px 0px"

};


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        observerOptions
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* ==========================================================
   ANO AUTOMÁTICO NO RODAPÉ
========================================================== */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* ==========================================================
   FORMATAÇÃO AUTOMÁTICA DE TELEFONE
========================================================== */

const phoneInput =
    document.getElementById("telefone");


if (phoneInput) {

    phoneInput.addEventListener(
        "input",
        (event) => {

            let value =
                event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 11);


            if (value.length > 10) {

                value =
                    value.replace(
                        /^(\d{2})(\d{5})(\d{4})$/,
                        "($1) $2-$3"
                    );

            } else if (
                value.length > 6
            ) {

                value =
                    value.replace(
                        /^(\d{2})(\d{4})(\d{0,4})$/,
                        "($1) $2-$3"
                    );

            } else if (
                value.length > 2
            ) {

                value =
                    value.replace(
                        /^(\d{2})(\d+)/,
                        "($1) $2"
                    );

            } else if (
                value.length > 0
            ) {

                value =
                    value.replace(
                        /^(\d*)/,
                        "($1"
                    );

            }


            event.target.value =
                value;

        }
    );

}


/* ==========================================================
   FORMULÁRIO → WHATSAPP
========================================================== */

/*
IMPORTANTE:

Troque o número abaixo pelo WhatsApp
real da LPZ Digital.

Formato:
55 + DDD + número

Exemplo:
5562999999999
*/

const whatsappNumber =
    "5562999746933";


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const nome =
                document
                    .getElementById("nome")
                    .value
                    .trim();

            const empresa =
                document
                    .getElementById("empresa")
                    .value
                    .trim();

            const telefone =
                document
                    .getElementById("telefone")
                    .value
                    .trim();

            const servico =
                document
                    .getElementById("servico")
                    .value;

            const mensagem =
                document
                    .getElementById("mensagem")
                    .value
                    .trim();


            /*
            Validação básica adicional.
            */

            if (
                !nome ||
                !empresa ||
                !telefone ||
                !servico
            ) {

                alert(
                    "Por favor, preencha todos os campos obrigatórios."
                );

                return;

            }


            const whatsappMessage = `
Olá! Vim através do site da LPZ Digital.

Meu nome é ${nome}.
Empresa: ${empresa}
WhatsApp: ${telefone}
Serviço de interesse: ${servico}

${mensagem
    ? `Mensagem: ${mensagem}`
    : ""
}

Gostaria de saber mais sobre os serviços da LPZ Digital.
            `.trim();


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${
                    encodeURIComponent(
                        whatsappMessage
                    )
                }`;


            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}


/* ==========================================================
   SCROLL PARA LINKS INTERNOS
========================================================== */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                /*
                Ignora links apenas "#".
                */

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    header.offsetHeight;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top:
                        targetPosition,

                    behavior:
                        "smooth"

                });

            }
        );

    }
);


/* ==========================================================
   LINK ATIVO NO MENU
========================================================== */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


function updateActiveMenu() {

    const scrollPosition =
        window.scrollY + 150;


    sections.forEach(
        (section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute(
                    "id"
                );


            const correspondingLink =
                document.querySelector(
                    `.nav-link[href="#${sectionId}"]`
                );


            if (!correspondingLink) {
                return;
            }


            if (
                scrollPosition >=
                    sectionTop &&
                scrollPosition <
                    sectionTop +
                    sectionHeight
            ) {

                navLinks.forEach(
                    (link) => {

                        link.classList.remove(
                            "active"
                        );

                    }
                );


                correspondingLink.classList.add(
                    "active"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveMenu
);

updateActiveMenu();