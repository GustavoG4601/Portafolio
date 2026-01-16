// Añade este código a un nuevo archivo llamado "mouse-effects.js"

// Efecto de rastro del mouse
document.addEventListener('DOMContentLoaded', function() {
    // Crear el contenedor para el rastro del mouse
    const mouseTrailContainer = document.createElement('div');
    mouseTrailContainer.className = 'mouse-trail-container';
    document.body.appendChild(mouseTrailContainer);
    
    // Número de puntos en el rastro
    const trailLength = 20;
    const trails = [];
    
    // Crear los puntos del rastro
    for (let i = 0; i < trailLength; i++) {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        // Tamaño decreciente y opacidad para los puntos más alejados
        trail.style.width = (10 - (i * 0.4)) + 'px';
        trail.style.height = (10 - (i * 0.4)) + 'px';
        trail.style.opacity = 1 - (i / trailLength);
        mouseTrailContainer.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0
        });
    }
    
    // Variables para rastrear la posición del mouse
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    let timer = null;
    
    // Actualizar la posición del mouse
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
        
        // Reiniciar el temporizador cada vez que el mouse se mueve
        clearTimeout(timer);
        timer = setTimeout(() => {
            isMoving = false;
        }, 100);
    });
    
    // Animar el rastro
    function animateTrail() {
        // Solo animar si el mouse se está moviendo
        if (isMoving) {
            // La primera posición siempre sigue al mouse
            trails[0].x = mouseX;
            trails[0].y = mouseY;
            
            // Las demás posiciones siguen a la anterior con un retraso
            for (let i = 1; i < trails.length; i++) {
                trails[i].x += (trails[i-1].x - trails[i].x) * 0.3;
                trails[i].y += (trails[i-1].y - trails[i].y) * 0.3;
            }
            
            // Actualizar las posiciones de los elementos
            for (let i = 0; i < trails.length; i++) {
                trails[i].element.style.transform = `translate(${trails[i].x - 5}px, ${trails[i].y - 5}px)`;
            }
        }
        
        requestAnimationFrame(animateTrail);
    }
    
    // Iniciar la animación
    animateTrail();
    
    // Detector de dispositivo móvil para deshabilitar el efecto en táctiles
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }
    
    // Ocultar en dispositivos móviles
    if (isMobileDevice()) {
        mouseTrailContainer.style.display = 'none';
    }
});

