document.addEventListener("DOMContentLoaded", () => {
    
    // 1. TEXTO DINÁMICO (Efecto Typing/Rotation en el Hero)
    const textElement = document.querySelector('.dynamic-text');
    const words = ["Sistemas Escalables", "Arquitectura Web", "Soluciones de Negocio", "Apps de Escritorio"];
    let wordIndex = 0;

    setInterval(() => {
        textElement.style.opacity = 0;
        setTimeout(() => {
            wordIndex = (wordIndex + 1) % words.length;
            textElement.textContent = words[wordIndex];
            textElement.style.opacity = 1;
        }, 500); // Espera a que desvanezca para cambiar
    }, 3000);

    textElement.style.transition = "opacity 0.5s ease";

    // 2. INTERSECTION OBSERVER (Animaciones Nivel Dios sin librerías pesadas)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Dispara cuando el 15% del elemento es visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade clase activa para mostrar (fade up/left/right)
                entry.target.classList.add('reveal-active');
                
                // Si es una barra de progreso, anímala
                if (entry.target.classList.contains('skill-wrapper')) {
                    const fill = entry.target.querySelector('.progress-fill');
                    if (fill) fill.style.width = fill.getAttribute('data-target');
                }
                
                observer.unobserve(entry.target); // Solo anima una vez por rendimiento
            }
        });
    }, observerOptions);

    // Observar elementos de revelado general
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .skill-wrapper').forEach(el => {
        revealObserver.observe(el);
    });

    // 3. EFECTO DE GLOW EN TARJETAS AL PASAR EL MOUSE (Interactividad Premium)
    const interactiveCards = document.querySelectorAll('.interactive-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Pasa las coordenadas al CSS a través de variables
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 4. ACTUALIZAR NAVBAR ACTIVO DURANTE EL SCROLL
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});