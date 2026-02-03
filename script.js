// ============================================
// ONEPERCENT Website - Main JavaScript
// ============================================

// ============================================
// 1. FULLPAGE.JS INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    new fullpage('#fullpage', {
        // Navigation
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Home', 'Philosophy', 'Service', 'Process', 'Portfolio', 'Contact'],
        showActiveTooltip: false,
        
        // Scrolling
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        scrollBar: false,
        
        // Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,
        
        // Design
        verticalCentered: true,
        
        // Events
        onLeave: function(origin, destination, direction) {
            // 섹션 떠날 때
        },
        afterLoad: function(origin, destination, direction) {
            // 섹션 도착했을 때
            initCanvasForSection(destination.index);
        }
    });
    
    // Portfolio 렌더링
    renderPortfolio();
});

// ============================================
// 2. PORTFOLIO RENDERING
// ============================================
function renderPortfolio() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    
    if (!portfolioGrid || !portfolioItems) return;
    
    portfolioGrid.innerHTML = '';
    
    portfolioItems.forEach((item, index) => {
        const portfolioCard = document.createElement('div');
        portfolioCard.className = 'portfolio-item';
        portfolioCard.setAttribute('data-animate', '');
        portfolioCard.style.transitionDelay = `${0.1 * (index + 1)}s`;
        
        portfolioCard.innerHTML = `
            <div class="portfolio-thumbnail ${item.thumbnail ? '' : 'placeholder'}">
                ${item.thumbnail ? `<img src="${item.thumbnail}" alt="${item.title}">` : ''}
            </div>
            <div class="portfolio-info">
                <div class="portfolio-category">${item.category}</div>
                <h3>${item.title}</h3>
                <div class="portfolio-client">${item.client}</div>
                <div class="portfolio-results">
                    ${item.results.map(result => `<span class="result-tag">${result}</span>`).join('')}
                </div>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioCard);
    });
}

// ============================================
// 3. CANVAS ANIMATIONS
// ============================================
const canvasAnimations = {};

function initCanvasForSection(index) {
    const canvasIds = [
        'hero-canvas',
        'philosophy-canvas',
        'service-canvas',
        'process-canvas',
        'portfolio-canvas',
        'contact-canvas'
    ];
    
    const canvasId = canvasIds[index];
    if (!canvasId) return;
    
    // 기존 애니메이션 정리
    Object.keys(canvasAnimations).forEach(id => {
        if (id !== canvasId && canvasAnimations[id]) {
            canvasAnimations[id].stop = true;
        }
    });
    
    // 새 애니메이션 시작
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    switch(index) {
        case 0:
            initHeroCanvas(canvas);
            break;
        case 1:
            initPhilosophyCanvas(canvas);
            break;
        case 2:
            initServiceCanvas(canvas);
            break;
        case 3:
            initProcessCanvas(canvas);
            break;
        case 4:
            initPortfolioCanvas(canvas);
            break;
        case 5:
            initContactCanvas(canvas);
            break;
    }
}

// ============================================
// Hero Canvas - Particle Grid
// ============================================
function initHeroCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles = [];
    const particleCount = 100;
    const connectionDistance = 150;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 107, 53, 0.6)';
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    const animation = { stop: false };
    canvasAnimations['hero-canvas'] = animation;
    
    function animate() {
        if (animation.stop) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const opacity = (1 - distance / connectionDistance) * 0.3;
                    ctx.strokeStyle = `rgba(255, 107, 53, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// Philosophy Canvas - Network Nodes
// ============================================
function initPhilosophyCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const nodes = [];
    const nodeCount = 50;
    
    class Node {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.radius = Math.random() * 3 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fill();
        }
    }
    
    for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node());
    }
    
    const animation = { stop: false };
    canvasAnimations['philosophy-canvas'] = animation;
    
    function animate() {
        if (animation.stop) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        nodes.forEach(node => {
            node.update();
            node.draw();
        });
        
        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    const opacity = (1 - distance / 120) * 0.2;
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// Service Canvas - Floating Shapes
// ============================================
function initServiceCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const shapes = [];
    const shapeCount = 20;
    
    class Shape {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 40 + 20;
            this.vx = (Math.random() - 0.5) * 0.2;
            this.vy = (Math.random() - 0.5) * 0.2;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            this.sides = Math.floor(Math.random() * 3) + 3; // 3-6 sides
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotationSpeed;
            
            if (this.x < -this.size) this.x = canvas.width + this.size;
            if (this.x > canvas.width + this.size) this.x = -this.size;
            if (this.y < -this.size) this.y = canvas.height + this.size;
            if (this.y > canvas.height + this.size) this.y = -this.size;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            ctx.beginPath();
            for (let i = 0; i < this.sides; i++) {
                const angle = (Math.PI * 2 / this.sides) * i;
                const x = Math.cos(angle) * this.size;
                const y = Math.sin(angle) * this.size;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            
            ctx.strokeStyle = 'rgba(255, 107, 53, 0.3)';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.restore();
        }
    }
    
    for (let i = 0; i < shapeCount; i++) {
        shapes.push(new Shape());
    }
    
    const animation = { stop: false };
    canvasAnimations['service-canvas'] = animation;
    
    function animate() {
        if (animation.stop) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        shapes.forEach(shape => {
            shape.update();
            shape.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// Process Canvas - Flowing Lines
// ============================================
function initProcessCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const lines = [];
    const lineCount = 8;
    
    class Line {
        constructor(index) {
            this.y = (canvas.height / (lineCount + 1)) * (index + 1);
            this.points = [];
            this.speed = Math.random() * 2 + 1;
            this.amplitude = Math.random() * 30 + 20;
            this.frequency = Math.random() * 0.02 + 0.01;
            this.offset = 0;
            
            for (let x = 0; x <= canvas.width; x += 10) {
                this.points.push({ x, y: this.y });
            }
        }
        
        update() {
            this.offset += this.speed;
            
            this.points.forEach((point, i) => {
                point.y = this.y + Math.sin((point.x + this.offset) * this.frequency) * this.amplitude;
            });
        }
        
        draw() {
            ctx.beginPath();
            ctx.moveTo(this.points[0].x, this.points[0].y);
            
            for (let i = 1; i < this.points.length; i++) {
                ctx.lineTo(this.points[i].x, this.points[i].y);
            }
            
            ctx.strokeStyle = 'rgba(255, 107, 53, 0.2)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    }
    
    for (let i = 0; i < lineCount; i++) {
        lines.push(new Line(i));
    }
    
    const animation = { stop: false };
    canvasAnimations['process-canvas'] = animation;
    
    function animate() {
        if (animation.stop) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        lines.forEach(line => {
            line.update();
            line.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// Portfolio Canvas - Grid Pattern
// ============================================
function initPortfolioCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const gridSize = 50;
    let offset = 0;
    
    const animation = { stop: false };
    canvasAnimations['portfolio-canvas'] = animation;
    
    function animate() {
        if (animation.stop) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        offset += 0.2;
        if (offset > gridSize) offset = 0;
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        
        // Vertical lines
        for (let x = -offset; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = -offset; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// Contact Canvas - Gradient Mesh
// ============================================
function initContactCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    let time = 0;
    
    const animation = { stop: false };
    canvasAnimations['contact-canvas'] = animation;
    
    function animate() {
        if (animation.stop) return;
        
        time += 0.005;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const gradient = ctx.createRadialGradient(
            canvas.width / 2 + Math.sin(time) * 100,
            canvas.height / 2 + Math.cos(time) * 100,
            0,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 2
        );
        
        gradient.addColorStop(0, 'rgba(255, 107, 53, 0.1)');
        gradient.addColorStop(0.5, 'rgba(255, 107, 53, 0.05)');
        gradient.addColorStop(1, 'rgba(255, 107, 53, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// Window Resize Handler
// ============================================
window.addEventListener('resize', function() {
    Object.keys(canvasAnimations).forEach(id => {
        const canvas = document.getElementById(id);
        if (canvas) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
    });
});
