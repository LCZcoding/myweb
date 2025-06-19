//banner begin
const carousel = document.getElementById('carousel');
const slidesContainer = carousel.querySelector('.slides-container');
const slides = carousel.querySelectorAll('.slide');
const indicatorsContainer = document.getElementById('indicators');
const totalSlides = slides.length;
let currentSlide = 0;
let interval;

// 创建指示器
for (let i = 0; i < totalSlides; i++) {
  const indicator = document.createElement('div');
  indicator.classList.add('indicator');
  indicator.addEventListener('click', () => goToSlide(i));
  indicatorsContainer.appendChild(indicator);
}

const indicators = document.querySelectorAll('.indicator');
indicators[0].classList.add('active'); // 初始化第一个指示器为激活状态

// 自动轮播
function startCarousel() {
  interval = setInterval(() => {
    nextSlide();
  }, 2000); // 每2秒切换一次
}

function stopCarousel() {
  clearInterval(interval);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlide();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlide();
}

function updateSlide() {
  // 移动轮播图
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  // 更新指示器状态
  indicators.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

// 鼠标悬停时暂停轮播
carousel.addEventListener('mouseenter', stopCarousel);
carousel.addEventListener('mouseleave', startCarousel);

// 初始化轮播
startCarousel();
//banner end
const btn = document.getElementById('likeBtn');
    const countEl = document.getElementById('likeCount');
    
    // 从localStorage获取点赞数
    let count = parseInt(localStorage.getItem('likeCount')) || 0;
    countEl.textContent = count;
    
    // 恢复点赞状态
    if (count > 0) {
      btn.classList.add('liked');
    }
    
    btn.onclick = () => {
      count++;
      countEl.textContent = count;
      btn.classList.add('liked');
      localStorage.setItem('likeCount', count); // 保存到本地存储
    };
    
    // 粒子特效代码
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        let particles = [];
        let mouse = { x: null, y: null };
        
        window.addEventListener('mousemove', (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
            createParticles(5);
        });
        
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
                
                const hue = Math.random() * 360;
                this.color = `hsl(${hue}, 100%, 70%)`;
                
                this.life = 1;
                this.fade = 0.01 + Math.random() * 0.02;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.size > 0.2) {
                    this.size -= 0.05;
                }
                
                this.life -= this.fade;
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.life;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }
        
        function createParticles(count) {
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(mouse.x, mouse.y));
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw();
                
                if (particles[i].life <= 0 || particles[i].size <= 0.2) {
                    particles.splice(i, 1);
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        animate();