// Menu toggle functionality
const menuBtn = document.getElementById('menuBtn');
const header = document.getElementById('header');

menuBtn.addEventListener('click', () => {
    header.classList.toggle('menu-open');
    menuBtn.querySelector('i').classList.toggle('fa-bars');
    menuBtn.querySelector('i').classList.toggle('fa-times');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        header.classList.remove('menu-open');
        menuBtn.querySelector('i').classList.add('fa-bars');
        menuBtn.querySelector('i').classList.remove('fa-times');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active navigation links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Cursor effect simplificado para el texto "Desarrollador Web"
document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        // Asegurar que no haya elementos previos
        const existingCursor = typingElement.querySelector('.cursor');
        if (existingCursor) {
            existingCursor.remove();
        }
        
        // Agregar solo el cursor simple
        const cursorElement = document.createElement('span');
        cursorElement.className = 'cursor';
        typingElement.appendChild(cursorElement);
        
        // Animación simple de parpadeo
        setInterval(() => {
            cursorElement.style.opacity = cursorElement.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
});

// Reveal animations on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target); // Dejar de observar después de revelar
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.section-title, .about-info, .about-card, .skills-section, .skill-card, .project-card, .contact-form').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Add fade-in effect to sections
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    adjustForMobile();
});

// Detectar si estamos en un dispositivo móvil
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function adjustForMobile() {
    if (!isMobile) return;
    
    // 1. Optimizar las animaciones de scroll para móviles
    const mobileObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    };
    
    // Crear un nuevo observer optimizado para móviles
    const mobileObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                mobileObserver.unobserve(entry.target);
            }
        });
    }, mobileObserverOptions);
    
    // Aplicar el nuevo observer a los elementos revelables
    document.querySelectorAll('.reveal').forEach(el => {
        mobileObserver.observe(el);
    });
    
    // 2. Cerrar el menú móvil al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (header.classList.contains('menu-open') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('#menuBtn')) {
            header.classList.remove('menu-open');
            if (menuBtn.querySelector('i').classList.contains('fa-times')) {
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
            }
        }
    });
    
    // 3. Mejorar la experiencia táctil
    const touchElements = document.querySelectorAll('.btn, .nav-links a, .social-icon, .project-card, .skill-card');
    touchElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        el.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
}

// Optimizar los eventos de scroll con throttling
function throttle(fn, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return fn(...args);
    };
}

// Aplicar throttling a los eventos de scroll
window.onscroll = throttle(function() {
    // Header scroll effect
    if (window.scrollY > 100) {
        document.getElementById('header').classList.add('scrolled');
    } else {
        document.getElementById('header').classList.remove('scrolled');
    }
    
    // Active navigation links
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 100);

// Manejo del formulario de contacto
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".contact-form");
    const successMessage = document.querySelector(".form-success-message");
    
    if (form) {
        form.addEventListener("submit", function(e) {
            const submitBtn = form.querySelector(".submit-btn");
            
            // Cambiar el texto del botón durante el envío
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
            }
            
            // Si el formulario se envía sin el manejo de Netlify (en desarrollo local)
            if (!window.location.href.includes("netlify") && !e.defaultPrevented) {
                e.preventDefault();
                
                // Simular un envío exitoso después de 1.5 segundos
                setTimeout(function() {
                    // Ocultar los campos del formulario
                    Array.from(form.querySelectorAll(".form-group, .submit-btn")).forEach(
                        el => el.style.display = "none"
                    );
                    
                    // Mostrar el mensaje de éxito
                    if (successMessage) {
                        successMessage.style.display = "block";
                    } else {
                        // Si no existe el elemento de éxito, crearlo
                        const newSuccessMessage = document.createElement('div');
                        newSuccessMessage.className = 'form-success-message';
                        newSuccessMessage.innerHTML = `
                            <div class="success-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <h3>¡Mensaje Enviado!</h3>
                            <p>Gracias por contactarme. Te responderé lo antes posible.</p>
                        `;
                        form.appendChild(newSuccessMessage);
                    }
                    
                    // Limpiar el formulario
                    form.reset();
                }, 1500);
            } else if (window.location.href.includes("netlify")) {
                // En Netlify, guardar estado para detectar envío exitoso
                localStorage.setItem('formSubmitted', 'true');
            }
        });
        
        // Verificar si venimos de un envío exitoso (para Netlify)
        if (localStorage.getItem('formSubmitted') === 'true' && 
            window.location.href.includes("?submit=success")) {
            // Limpiar el estado
            localStorage.removeItem('formSubmitted');
            
            // Mostrar un mensaje de éxito
            const formContainer = document.querySelector('.contact-content');
            if (formContainer) {
                formContainer.innerHTML = `
                    <div class="form-success-message" style="display:block; width:100%;">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>¡Mensaje Enviado!</h3>
                        <p>Gracias por contactarme. Te responderé lo antes posible.</p>
                        <button onclick="window.location.href='${window.location.pathname}'" 
                                class="btn" style="margin-top:20px;">
                            Volver
                        </button>
                    </div>
                `;
            }
        }
    }
});