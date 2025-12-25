document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.message-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (n >= slides.length) currentSlide = 0;
        if (n < 0) currentSlide = slides.length - 1;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            resetInterval();
        });
    });
    
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000); // Muda a cada 5 segundos
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    function createSnowflakes() {
        const snowflakeContainer = document.createElement('div');
        snowflakeContainer.className = 'snowflakes-container';
        snowflakeContainer.style.position = 'fixed';
        snowflakeContainer.style.top = '0';
        snowflakeContainer.style.left = '0';
        snowflakeContainer.style.width = '100%';
        snowflakeContainer.style.height = '100%';
        snowflakeContainer.style.pointerEvents = 'none';
        snowflakeContainer.style.zIndex = '5';
        
        document.body.appendChild(snowflakeContainer);
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const snowflake = document.createElement('div');
                snowflake.className = 'snowflake';
                snowflake.innerHTML = '❄';
                snowflake.style.left = Math.random() * 100 + 'vw';
                snowflake.style.animationDuration = Math.random() * 5 + 5 + 's';
                snowflake.style.animationDelay = Math.random() * 5 + 's';
                snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
                snowflake.style.opacity = Math.random() * 0.5 + 0.3;
                
                snowflakeContainer.appendChild(snowflake);
                
                setTimeout(() => {
                    snowflake.remove();
                }, 15000);
            }, i * 200);
        }
    }
    
    function createChristmasLights() {
        const colors = ['#FF0000', '#00FF00', '#FFFF00', '#FFA500', '#FFFFFF'];
        
        for (let position of ['top', 'bottom']) {
            const lightContainer = document.createElement('div');
            lightContainer.className = 'christmas-lights';
            lightContainer.style.position = 'fixed';
            lightContainer.style.left = '0';
            lightContainer.style.width = '100%';
            lightContainer.style.height = '20px';
            lightContainer.style.pointerEvents = 'none';
            lightContainer.style.zIndex = '5';
            lightContainer.style.display = 'flex';
            lightContainer.style.justifyContent = 'space-around';
            
            if (position === 'top') {
                lightContainer.style.top = '20px';
            } else {
                lightContainer.style.bottom = '20px';
            }
            
            document.body.appendChild(lightContainer);
            
            for (let i = 0; i < 20; i++) {
                const light = document.createElement('div');
                light.className = 'christmas-light';
                light.style.backgroundColor = colors[i % colors.length];
                light.style.animationDelay = (i * 0.2) + 's';
                lightContainer.appendChild(light);
            }
        }
    }
    
    function animateTitle() {
        const title = document.getElementById('christmas-title');
        const text = title.textContent;
        title.innerHTML = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            if (text[i] === ' ') {
                span.innerHTML = '&nbsp;';
            }
            
            title.appendChild(span);
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, i * 100);
        }
    }
    
    function init() {
        showSlide(currentSlide);
        startInterval();
        
        createSnowflakes();
        createChristmasLights();
        animateTitle();
        
        setInterval(createSnowflakes, 15000);
    }
    
    init();
});