// Sistema de órbitas tecnológicas mejorado
document.addEventListener('DOMContentLoaded', function() {
    // Detección de dispositivos móviles
    const isMobileDevice = function() {
        // Comprobación por ancho de pantalla
        const isMobileWidth = window.innerWidth <= 768;
        
        // Comprobación por user agent
        const isMobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Comprobación por características táctiles
        const hasTouchScreen = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
        
        return isMobileWidth || (isMobileAgent && hasTouchScreen);
    };
    
    const isMobile = isMobileDevice();
    console.log("¿Dispositivo móvil detectado?", isMobile);
    
    if (!isMobile) {
        console.log("Configurando sistema orbital para desktop");
        setupOrbitSystem();
    } else {
        console.log("Dispositivo móvil detectado. Sistema orbital desactivado.");
    }
});

function setupOrbitSystem() {
    // Obtener el contenedor de la imagen de perfil
    const heroImage = document.querySelector('.hero-image');
    
    if (!heroImage) {
        console.log("No se encontró el contenedor de imagen de héroe");
        return;
    }
    
    // Crear el contenedor de órbitas
    const orbitContainer = document.createElement('div');
    orbitContainer.className = 'orbit-container';
    orbitContainer.id = 'orbit-container';
    heroImage.appendChild(orbitContainer);
    
    // Tecnologías a mostrar - actualizado para incluir Node.js, Tailwind y PHP
    const technologies = [
      { name: 'HTML', icon: 'fab fa-html5', color: '#E34F26' },
      { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933' },
      { name: 'CSS', icon: 'fab fa-css3-alt', color: '#1572B6' },
      { name: 'Bootstrap', icon: 'fab fa-bootstrap', color: '#7952B3' },
      { name: 'MySQL', icon: 'fas fa-database', color: '#00758F' },
      { name: 'JavaScript', icon: 'fab fa-js', color: '#F7DF1E' },
      { name: 'React', icon: 'fab fa-react', color: '#61DBFB' },
      { name: 'Java', icon: 'fab fa-java', color: '#007396' },
      { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032' },
      { 
        name: 'Python', 
        type: 'img', 
        src: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg', 
        color: '#181717' 
      },
      { 
        name: 'Tailwind CSS', 
        type: 'img', 
        src: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg', 
        color: '#38B2AC'
      },
      { name: 'PHP', icon: 'fab fa-php', color: '#777BB4' }
    ];

    
    // Crear las órbitas
    const numberOfOrbits = 3;
    
    for (let i = 0; i < numberOfOrbits; i++) {
        // Crear la órbita
        const orbit = document.createElement('div');
        orbit.className = `orbit orbit-${i+1}`;
        orbitContainer.appendChild(orbit);
        
        // Número de tecnologías en esta órbita - ajustado para 12 tecnologías
        const techsPerOrbit = [4, 4, 4]; // Distribuir 12 tecnologías en 3 órbitas
        const techPerOrbit = techsPerOrbit[i];
        
        // Distribuir las tecnologías en esta órbita
        for (let j = 0; j < techPerOrbit; j++) {
            // Calcular el índice para obtener la tecnología
            let techIndex;
            if (i === 0) {
                techIndex = j;
            } else if (i === 1) {
                techIndex = 4 + j;
            } else {
                techIndex = 8 + j;
            }
            
            const tech = technologies[techIndex];
            
            // Crear el icono de tecnología
            const techIcon = document.createElement('div');
            techIcon.className = 'tech-icon';
            
            // Añadir el contenido según el tipo
            if (tech.type === 'img') {
                const img = document.createElement('img');
                img.src = tech.src;
                img.alt = tech.name;
                techIcon.appendChild(img);
            } else {
                const icon = document.createElement('i');
                icon.className = tech.icon;
                icon.style.color = tech.color;
                techIcon.appendChild(icon);
            }
            
            // Añadir el tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'tech-tooltip';
            tooltip.textContent = tech.name;
            techIcon.appendChild(tooltip);
            
            // Posicionar en la órbita
            const angle = (360 / techPerOrbit) * j;
            const radians = angle * (Math.PI / 180);
            
            // Obtener las dimensiones de la órbita
            const orbitStyles = window.getComputedStyle(orbit);
            const orbitWidth = parseFloat(orbitStyles.width);
            const orbitHeight = parseFloat(orbitStyles.height);
            
            // Calcular posición en la elipse
            const x = (orbitWidth / 2) * Math.cos(radians);
            const y = (orbitHeight / 2) * Math.sin(radians);
            
            // Posicionar
            techIcon.style.left = `calc(50% + ${x}px)`;
            techIcon.style.top = `calc(50% + ${y}px)`;
            techIcon.style.transform = 'translate(-50%, -50%)';
            
            // Añadir a la órbita
            orbit.appendChild(techIcon);
            
            // Contrarrestar la rotación de la órbita para mantener el icono derecho
            const orbitDuration = 20 + i * 10; // 20s, 30s, 40s
            const direction = i % 2 === 0 ? 1 : -1; // normal o reverse
            
            techIcon.style.animation = `tech-bob 3s ease-in-out infinite, orbit-rotation ${orbitDuration}s linear infinite ${direction === 1 ? 'reverse' : 'normal'}`;
        }
    }
}

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', function() {
    // Verificar si ahora estamos en móvil o desktop
    const isMobileWidth = window.innerWidth <= 768;
    
    // Obtener el sistema orbital actual (si existe)
    const orbitContainer = document.getElementById('orbit-container');
    
    if (isMobileWidth && orbitContainer) {
        // Si ahora estamos en móvil y el sistema orbital existe, lo eliminamos
        orbitContainer.remove();
        console.log("Cambiado a móvil - Sistema orbital eliminado");
    } else if (!isMobileWidth && !orbitContainer) {
        // Si ahora estamos en desktop y no hay sistema orbital, lo creamos
        console.log("Cambiado a desktop - Creando sistema orbital");
        setupOrbitSystem();
    }
});