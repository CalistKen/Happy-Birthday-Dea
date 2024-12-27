document.addEventListener('DOMContentLoaded', function() {
    const surpriseButton = document.getElementById('surpriseButton');
    const animationDiv = document.getElementById('animation');
    const canvas = document.getElementById('birthdayCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
  
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  
    function createParticles(x, y) {
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5,
          size: Math.random() * 5 + 1,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
      }
    }
  
    function updateParticles() {
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.size *= 0.95;
  
        if (particle.size < 0.5) {
          particles.splice(index, 1);
        }
      });
    }
  
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
    }
  
    function animate() {
      updateParticles();
      drawParticles();
      requestAnimationFrame(animate);
    }
  
    surpriseButton.addEventListener('click', function() {
      animationDiv.classList.toggle('hidden');
      createParticles(window.innerWidth / 2, window.innerHeight / 2);
    });
  
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
  });