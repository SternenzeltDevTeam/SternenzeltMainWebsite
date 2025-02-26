const canvas = document.getElementById('constellationCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 150; 

const rootStyles = getComputedStyle(document.documentElement);
const vectorColorLight = rootStyles.getPropertyValue('--vector-color-light').trim();
const vectorColorDark = rootStyles.getPropertyValue('--vector-color-dark').trim();

function getRandomColor() {
    const rand = Math.random();
    if (rand < 0.1) {
        return 'rgba(255, 255, 255, 1)'; 
    } else if (rand < 0.5) {
        return 'rgba(255, 255, 255, 0.55)'; 
    } else {
        return 'rgba(255, 255, 255, 0.25)'; 
    }
}

function createStar(x, y) {
    return {
        x: x !== undefined ? x : Math.random() * canvas.width,
        y: y !== undefined ? y : Math.random() * canvas.height,
        radius: Math.random() * 5 + 3, 
        vx: (Math.random() * 0.2 - 0.1) * 1.875, 
        vy: (Math.random() * 0.2 - 0.1) * 1.875, 
        color: getRandomColor(), 
        vectorColor: Math.random() > 0.5 ? vectorColorLight : vectorColorDark 
    };
}

for (let i = 0; i < numStars; i++) {
    stars.push(createStar());
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        ctx.fillStyle = star.color; 
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < stars.length; j++) {
            const star2 = stars[j];
            const dx = star.x - star2.x;
            const dy = star.y - star2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(star2.x, star2.y);
                ctx.strokeStyle = star.vectorColor; 
                ctx.stroke();
            }
        }

        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
    }
}

function animate() {
    drawStars();
    setTimeout(() => {
        requestAnimationFrame(animate);
    }, 1000 / 60); 
}

function addStar() {
    const newStar = createStar();
    stars.push(newStar);

    setTimeout(() => {
        const index = stars.indexOf(newStar);
        if (index !== -1) {
            stars.splice(index, 1);
        }
    }, 5000);

    if (stars.length < numStars) {
        setTimeout(addStar, 2000); 
    }
}

canvas.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const dx = star.x - mouseX;
        const dy = star.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            star.vx += dx * 0.000625;
            star.vy += dy * 0.000625; 
        }
    }
});

canvas.addEventListener('click', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const newStar = createStar(mouseX, mouseY);
    stars.push(newStar);

    setTimeout(() => {
        const index = stars.indexOf(newStar);
        if (index !== -1) {
            stars.splice(index, 1);
        }
    }, 5000);
});

animate();
addStar();
