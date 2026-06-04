/* ===================================================
   GLOBALS — Device & motion detection
   =================================================== */
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* On touch devices, set video to preload metadata only to save bandwidth */
if (isTouchDevice) {
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) bgVideo.setAttribute('preload', 'metadata');
}

/* ===================================================
   SPLITTING.JS — Initialize text splitting
   =================================================== */
Splitting();

/* ===================================================
   LENIS — Smooth scroll
   =================================================== */
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

/* ===================================================
   PRELOADER — Count up then clip away
   =================================================== */
const preloaderEl = document.getElementById('preloader');
const counterEl = document.getElementById('preloader-counter');
let count = 0;

if (preloaderEl && counterEl) {
    const preloadInterval = setInterval(() => {
        count += Math.floor(Math.random() * 8) + 2;
        if (count >= 100) {
            count = 100;
            clearInterval(preloadInterval);
            counterEl.textContent = 100;
            setTimeout(() => {
                preloaderEl.classList.add('done');
                setTimeout(triggerHeroReveal, 600);
            }, 400);
            return;
        }
        counterEl.textContent = count;
    }, 40);
}

function triggerHeroReveal() {
    document.querySelectorAll('.hero [data-splitting]').forEach((el, i) => {
        setTimeout(() => el.classList.add('is-visible'), i * 150);
    });
}

/* ===================================================
   CURSOR — Mind-blowing edition (skipped on touch/reduced-motion)
   =================================================== */
const dot = document.getElementById('cursor-dot');
const circle = document.getElementById('cursor-circle');
const cursorLabel = document.getElementById('cursor-label');
const spotlight = document.getElementById('cursor-spotlight');
const trailCanvas = document.getElementById('cursor-trail');
const trailCtx = trailCanvas ? trailCanvas.getContext('2d') : null;

let mx = 0, my = 0;
let dx = 0, dy = 0;
let cx = 0, cy = 0;
let lx = 0, ly = 0;
let prevMx = 0, prevMy = 0;
let velocity = 0;
let cursorIdleFrames = 0;
let cursorRunning = false;

const trail = [];
const TRAIL_LENGTH = 45;

function resizeTrail() {
    if (!trailCanvas) return;
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
}

if (!isTouchDevice && !prefersReducedMotion) {
    resizeTrail();

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;

        if (spotlight) {
            const theme = document.documentElement.getAttribute('data-theme');
            const rgb = theme === 'light' ? 'rgba(68,0,255,0.025)' : 'rgba(200,255,0,0.03)';
            spotlight.style.background = `radial-gradient(600px circle at ${mx}px ${my}px, ${rgb}, transparent 60%)`;
        }

        // Restart cursor loop if it was idle-stopped
        if (!cursorRunning) { cursorRunning = true; requestAnimationFrame(animateCursor); }
        cursorIdleFrames = 0;
    });

    document.addEventListener('click', (e) => {
        for (let i = 0; i < 8; i++) {
            const burst = document.createElement('div');
            burst.className = 'click-burst';
            burst.style.left = e.clientX + 'px';
            burst.style.top = e.clientY + 'px';
            const angle = (Math.PI * 2 / 8) * i;
            const dist = 20 + Math.random() * 30;
            burst.style.setProperty('--bx', Math.cos(angle) * dist + 'px');
            burst.style.setProperty('--by', Math.sin(angle) * dist + 'px');
            document.body.appendChild(burst);
            setTimeout(() => burst.remove(), 600);
        }
    });

    function animateCursor() {
        const dvx = mx - prevMx;
        const dvy = my - prevMy;
        velocity = Math.sqrt(dvx * dvx + dvy * dvy);
        prevMx = mx;
        prevMy = my;

        dx += (mx - dx) * 0.2;
        dy += (my - dy) * 0.2;

        const angle = Math.atan2(dvy, dvx) * (180 / Math.PI);
        const stretch = Math.min(velocity * 0.5, 20);
        if (dot) {
            dot.style.left = dx + 'px';
            dot.style.top = dy + 'px';
            dot.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scaleX(${1 + stretch * 0.02}) scaleY(${1 - stretch * 0.01})`;
        }

        cx += (mx - cx) * 0.08;
        cy += (my - cy) * 0.08;
        if (circle) { circle.style.left = cx + 'px'; circle.style.top = cy + 'px'; }

        lx += (mx - lx) * 0.12;
        ly += (my - ly) * 0.12;
        if (cursorLabel) { cursorLabel.style.left = lx + 'px'; cursorLabel.style.top = (ly - 45) + 'px'; }

        trail.push({ x: dx, y: dy, vx: dvx, vy: dvy });
        if (trail.length > TRAIL_LENGTH) trail.shift();

        if (trailCtx) {
            trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
            const theme = document.documentElement.getAttribute('data-theme');

            if (trail.length > 2) {
                for (let i = 1; i < trail.length; i++) {
                    const p = trail[i];
                    const prev = trail[i - 1];
                    const t = i / trail.length;

                    let r, g, b;
                    if (theme === 'light') {
                        r = Math.round(68 + (0 - 68) * t);
                        g = Math.round(0 + (102 - 0) * t);
                        b = Math.round(255 + (255 - 255) * t);
                    } else {
                        r = Math.round(0 + (200 - 0) * t);
                        g = Math.round(240 + (255 - 240) * t);
                        b = Math.round(255 + (0 - 255) * t);
                    }

                    const alpha = t * 0.3;
                    const width = t * 3.5 + 0.3;

                    trailCtx.beginPath();
                    trailCtx.moveTo(prev.x, prev.y);
                    trailCtx.lineTo(p.x, p.y);
                    trailCtx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
                    trailCtx.lineWidth = width;
                    trailCtx.lineCap = 'round';
                    trailCtx.stroke();
                }

                for (let i = 0; i < trail.length; i += 3) {
                    const p = trail[i];
                    const t = i / trail.length;
                    const rgb = theme === 'light' ? '68,0,255' : '200,255,0';
                    const size = t * 2.5;
                    const alpha = t * 0.18;

                    trailCtx.beginPath();
                    trailCtx.arc(p.x, p.y, size, 0, Math.PI * 2);
                    trailCtx.fillStyle = `rgba(${rgb},${alpha})`;
                    trailCtx.fill();

                    trailCtx.beginPath();
                    trailCtx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
                    trailCtx.fillStyle = `rgba(${rgb},${alpha * 0.15})`;
                    trailCtx.fill();
                }
            }
        }

        // Stop loop after 120 idle frames (~2s) to save CPU
        if (velocity < 0.1) cursorIdleFrames++;
        else cursorIdleFrames = 0;

        if (cursorIdleFrames > 120) {
            cursorRunning = false;
            return;
        }
        requestAnimationFrame(animateCursor);
    }
    cursorRunning = true;
    animateCursor();
    if (spotlight) spotlight.classList.add('active');
}

// Hover states
const hoverTargets = document.querySelectorAll('a, button, .skill-pill, .project-card, .contact-pill, .project-card-visual');
hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-active');
        const label = el.getAttribute('data-cursor') || el.closest('[data-cursor]')?.getAttribute('data-cursor');
        if (label) {
            cursorLabel.textContent = label;
            cursorLabel.classList.add('visible');
        }
    });
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-active');
        cursorLabel.classList.remove('visible');
    });
});

/* ===================================================
   THEME
   =================================================== */
const themeBtn = document.getElementById('theme-btn');
document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');

themeBtn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

/* ===================================================
   NAV — scroll hide/show + glassmorphism
   =================================================== */
const navEl = document.getElementById('nav');
let lastScrollY = 0;
lenis.on('scroll', ({ scroll }) => {
    if (!navEl) return;
    navEl.classList.toggle('scrolled', scroll > 60);
    if (scroll > lastScrollY && scroll > 200) navEl.classList.add('hidden');
    else navEl.classList.remove('hidden');
    lastScrollY = scroll;
});

const burger = document.getElementById('nav-burger');
const menuOverlay = document.getElementById('menu-overlay');
const menuLinks = document.querySelectorAll('.menu-link');

burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('active');
    menuOverlay.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
    burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    menuOverlay.setAttribute('aria-hidden', !isOpen);
    if (isOpen) {
        lenis.stop();
    } else {
        lenis.start();
    }
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        menuOverlay.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Open menu');
        menuOverlay.setAttribute('aria-hidden', 'true');
        lenis.start();
    });
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) lenis.scrollTo(target, { offset: -80 });
    });
});

/* ===================================================
   GSAP + ScrollTrigger — Scroll animations
   =================================================== */
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.fade-up').forEach(el => {
    gsap.to(el, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
});

document.querySelectorAll('.section [data-splitting]').forEach(el => {
    ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => el.classList.add('is-visible'),
    });
});

/* ===================================================
   MARQUEE — Scroll-velocity driven
   =================================================== */
const marqueeTrack = document.getElementById('marquee-1');
let marqueeX = 0;
let scrollVelocity = 0;

lenis.on('scroll', ({ velocity }) => { scrollVelocity = velocity; });

gsap.ticker.add(() => {
    const speed = 0.5 + Math.abs(scrollVelocity) * 0.15;
    marqueeX -= speed;
    if (marqueeX < -(marqueeTrack.scrollWidth / 2)) marqueeX = 0;
    gsap.set(marqueeTrack, { x: marqueeX });
});

/* ===================================================
   STAT COUNTERS — About section
   =================================================== */
document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => {
            gsap.to({ val: 0 }, {
                val: target, duration: 1.5, ease: 'power2.out',
                onUpdate: function () { el.textContent = Math.round(this.targets()[0].val); }
            });
        }
    });
});

/* ===================================================
   MAGNETIC ELEMENTS (desktop only)
   =================================================== */
if (!isTouchDevice) document.querySelectorAll('[data-magnetic]').forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
    });
});

/* ===================================================
   SKILL PILL SCRAMBLE
   =================================================== */
document.querySelectorAll('.skill-pill').forEach(pill => {
    const original = pill.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567@#';
    let scrambleIv = null;
    pill.addEventListener('mouseenter', () => {
        if (scrambleIv) clearInterval(scrambleIv);
        let iter = 0;
        scrambleIv = setInterval(() => {
            pill.textContent = original.split('').map((c, i) =>
                i < iter ? original[i] : chars[Math.floor(Math.random() * chars.length)]
            ).join('');
            iter += 0.5;
            if (iter >= original.length) { pill.textContent = original; clearInterval(scrambleIv); scrambleIv = null; }
        }, 25);
    });
});

/* ===================================================
   3D TILT — Project cards (desktop only)
   =================================================== */
if (!isTouchDevice) document.querySelectorAll('.project-card-visual').forEach(visual => {
    visual.addEventListener('mousemove', (e) => {
        const rect = visual.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(visual, {
            rotateY: x * 12, rotateX: -y * 12, scale: 1.02,
            duration: 0.4, ease: 'power2.out',
            transformPerspective: 800,
        });
    });
    visual.addEventListener('mouseleave', () => {
        gsap.to(visual, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.6, ease: 'power2.out' });
    });
});

/* ===================================================
   VIDEO BG — Cycle aurora clips
   =================================================== */
const bgVideo2 = document.getElementById('bg-video');
if (bgVideo2) {
    if (prefersReducedMotion) {
        bgVideo2.pause();
    } else if (isTouchDevice) {
        /* On mobile: just loop the first clip, don't cycle through all 5 to save bandwidth */
        bgVideo2.loop = true;
    } else {
        const videos = ['assets/aurora1.mp4', 'assets/aurora_dawn.mp4', 'assets/aurora3.mp4', 'assets/aurora_timelapse.mp4', 'assets/aurora2.mp4'];
        let vidIdx = 0;
        bgVideo2.addEventListener('ended', () => {
            vidIdx = (vidIdx + 1) % videos.length;
            bgVideo2.style.opacity = '0';
            setTimeout(() => {
                bgVideo2.src = videos[vidIdx];
                bgVideo2.load();
                bgVideo2.play();
                bgVideo2.style.opacity = '1';
            }, 500);
        });
    }
    bgVideo2.style.transition = 'opacity 0.8s ease';
}

/* ===================================================
   TYPEWRITER — Hero role cycling
   =================================================== */
const typeRoles = ['Software Engineer', 'AI Engineer', 'Full Stack Developer', 'Cloud Architect'];
let typeRoleIdx = 0, typeCharIdx = 0, typeDeleting = false;
const typeEl = document.getElementById('hero-typewriter');

function typeLoop() {
    if (!typeEl) return;
    const current = typeRoles[typeRoleIdx];
    if (!typeDeleting) {
        typeEl.textContent = current.substring(0, typeCharIdx + 1);
        typeCharIdx++;
        if (typeCharIdx === current.length) {
            typeDeleting = true;
            setTimeout(typeLoop, 2000);
            return;
        }
    } else {
        typeEl.textContent = current.substring(0, typeCharIdx - 1);
        typeCharIdx--;
        if (typeCharIdx === 0) {
            typeDeleting = false;
            typeRoleIdx = (typeRoleIdx + 1) % typeRoles.length;
        }
    }
    setTimeout(typeLoop, typeDeleting ? 42 : 88);
}
setTimeout(typeLoop, 2800);

/* ===================================================
   GITHUB ACTIVITY STRIP (XSS-safe: uses textContent)
   =================================================== */
(async function fetchGithubActivity() {
    const el = document.getElementById('github-event');
    if (!el) return;
    try {
        const res = await fetch('https://api.github.com/users/gauthambinoy/events?per_page=15');
        if (!res.ok) throw new Error();
        const events = await res.json();
        const push = events.find(e => e.type === 'PushEvent');
        if (!push) { document.getElementById('github-strip')?.remove(); return; }
        const repo = push.repo.name.split('/')[1];
        const msg = (push.payload.commits?.[0]?.message || 'commit').split('\n')[0].slice(0, 72);
        const hours = Math.round((Date.now() - new Date(push.created_at)) / 3600000);
        const timeLabel = hours < 1 ? 'just now' : hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`;
        // Build DOM safely — no innerHTML
        el.textContent = '';
        const repoSpan = Object.assign(document.createElement('span'), { className: 'gh-repo' });
        repoSpan.textContent = repo;
        const sepSpan = Object.assign(document.createElement('span'), { className: 'gh-sep' });
        sepSpan.textContent = '/';
        const timeSpan = Object.assign(document.createElement('span'), { className: 'gh-time' });
        timeSpan.textContent = timeLabel;
        el.append(repoSpan, sepSpan, document.createTextNode(msg), timeSpan);
    } catch {
        document.getElementById('github-strip')?.remove();
    }
})();

/* ===================================================
   EXPERIENCE HORIZONTAL DRAG SCROLL
   =================================================== */
const expScroll = document.getElementById('experience-scroll');
if (expScroll) {
    let isDragging = false, dragStartX, dragScrollLeft;
    expScroll.addEventListener('mousedown', e => {
        isDragging = true;
        expScroll.classList.add('dragging');
        dragStartX = e.pageX - expScroll.offsetLeft;
        dragScrollLeft = expScroll.scrollLeft;
    });
    window.addEventListener('mouseup', () => {
        isDragging = false;
        expScroll.classList.remove('dragging');
    });
    expScroll.addEventListener('mousemove', e => {
        if (!isDragging) return;
        e.preventDefault();
        expScroll.scrollLeft = dragScrollLeft - (e.pageX - expScroll.offsetLeft - dragStartX);
    });
    expScroll.addEventListener('mouseleave', () => {
        isDragging = false;
        expScroll.classList.remove('dragging');
    });

    /* Touch support for mobile drag scroll */
    let touchStartX, touchScrollLeft;
    expScroll.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].pageX - expScroll.offsetLeft;
        touchScrollLeft = expScroll.scrollLeft;
    }, { passive: true });
    expScroll.addEventListener('touchmove', e => {
        const x = e.touches[0].pageX - expScroll.offsetLeft;
        expScroll.scrollLeft = touchScrollLeft - (x - touchStartX);
    }, { passive: true });
}

/* ===================================================
   GENERATIVE CARD ART (single debounced resize, desktop only)
   =================================================== */
const cardDrawFns = [];
(function initCardArt() {
    if (isTouchDevice) return;
    document.querySelectorAll('.project-card-visual').forEach((visual, idx) => {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none;mix-blend-mode:overlay;';
        visual.appendChild(canvas);

        function draw() {
            const w = visual.offsetWidth, h = visual.offsetHeight;
            if (!w || !h) return;
            canvas.width = w; canvas.height = h;
            const ctx = canvas.getContext('2d');
            const s = idx + 1;
            const fA = 0.0055 + s * 0.0013;
            const fB = fA * 1.77;
            const amp = 9 + s * 4.5;
            const ph = s * 1.05;
            const lines = 52;

            for (let i = 0; i < lines; i++) {
                const t = i / lines;
                const y0 = t * h;
                ctx.beginPath();
                for (let x = 0; x <= w; x += 3) {
                    const y = y0 + Math.sin(x * fA + i * ph) * amp + Math.sin(x * fB + i * 0.38) * (amp * 0.42);
                    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                ctx.strokeStyle = `rgba(255,255,255,${0.022 + t * 0.05})`;
                ctx.lineWidth = 0.7;
                ctx.stroke();
            }

            for (let i = 0; i < 22; i++) {
                const px = (((s * 1231 + i * 7919) % 997) / 997) * w;
                const py = (((s * 3571 + i * 2333) % 997) / 997) * h;
                const pr = 0.5 + ((s * 523 + i * 191) % 8) / 6;
                const pa = 0.07 + ((s * 823 + i * 347) % 10) / 28;
                ctx.beginPath();
                ctx.arc(px, py, pr, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${pa})`;
                ctx.fill();
            }
        }

        draw();
        cardDrawFns.push(draw);
    });
})();

/* ===================================================
   DEBOUNCED RESIZE — Single handler for all canvases
   =================================================== */
let resizeDebounce;
window.addEventListener('resize', () => {
    clearTimeout(resizeDebounce);
    resizeDebounce = setTimeout(() => {
        resizeTrail();
        cardDrawFns.forEach(fn => fn());
    }, 150);
});

/* ===================================================
   SKILLS RADAR CHART — Built from hardcoded constants.
   Note: innerHTML is safe here — all values are computed from
   numeric constants, never from user input or external data.
   =================================================== */
(function buildRadarChart() {
    const container = document.getElementById('skills-radar');
    if (!container) return;

    const cx = 130, cy = 130, r = 88, labelR = 112;
    const skills = [
        { label: 'AI / ML',    pct: '90%', val: 0.90, angle: -90 },
        { label: 'Code',       pct: '88%', val: 0.88, angle:   0 },
        { label: 'Stack',      pct: '85%', val: 0.85, angle:  90 },
        { label: 'Cloud',      pct: '82%', val: 0.82, angle: 180 },
    ];

    function pt(angle, radius) {
        const rad = angle * Math.PI / 180;
        return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
    }
    function fmt(n) { return n.toFixed(1); }

    const grid = [0.25, 0.5, 0.75, 1].map(lv => {
        const pts = skills.map(s => { const p = pt(s.angle, r * lv); return `${fmt(p.x)},${fmt(p.y)}`; }).join(' ');
        return `<polygon points="${pts}" fill="none" stroke="rgba(128,128,128,0.12)" stroke-width="1"/>`;
    }).join('');

    const axes = skills.map(s => {
        const p = pt(s.angle, r);
        return `<line x1="${cx}" y1="${cy}" x2="${fmt(p.x)}" y2="${fmt(p.y)}" stroke="rgba(128,128,128,0.12)" stroke-width="1"/>`;
    }).join('');

    const dataPts = skills.map(s => { const p = pt(s.angle, r * s.val); return `${fmt(p.x)},${fmt(p.y)}`; }).join(' ');

    const dots = skills.map(s => {
        const p = pt(s.angle, r * s.val);
        return `<circle cx="${fmt(p.x)}" cy="${fmt(p.y)}" r="4.5" fill="var(--accent)" class="radar-dot" filter="url(#glow)"/>`;
    }).join('');

    const labels = skills.map(s => {
        const p = pt(s.angle, labelR);
        const anchor = s.angle === 0 ? 'start' : s.angle === 180 ? 'end' : 'middle';
        const dyOff = s.angle === -90 ? -6 : s.angle === 90 ? 6 : 0;
        return `
          <text x="${fmt(p.x)}" y="${fmt(p.y + dyOff - 8)}" text-anchor="${anchor}"
                font-family="'JetBrains Mono',monospace" font-size="9" fill="var(--text3)" letter-spacing="1.5">${s.label}</text>
          <text x="${fmt(p.x)}" y="${fmt(p.y + dyOff + 7)}" text-anchor="${anchor}"
                font-family="'Syne',sans-serif" font-size="13" font-weight="800" fill="var(--accent)">${s.pct}</text>`;
    }).join('');

    container.innerHTML = `
      <svg viewBox="0 0 260 260" width="260" height="260" class="radar-svg" role="img" aria-label="Skills radar chart showing AI/ML 90%, Code 88%, Stack 85%, Cloud 82%">
        <defs>
          <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        ${grid}${axes}
        <polygon points="${dataPts}" fill="var(--accent)" fill-opacity="0.08"
                 stroke="var(--accent)" stroke-width="1.5" class="radar-polygon"/>
        ${dots}${labels}
      </svg>`;

    ScrollTrigger.create({
        trigger: container,
        start: 'top 85%',
        once: true,
        onEnter: () => {
            container.querySelector('.radar-polygon')?.classList.add('revealed');
            container.querySelectorAll('.radar-dot').forEach((d, i) =>
                setTimeout(() => d.classList.add('revealed'), 300 + i * 160));
        }
    });
})();

/* ===================================================
   SCROLL HANDLER — Batched (progress bar + back-to-top)
   =================================================== */
const progressBarEl = document.getElementById('progress-bar');
const backToTopBtn = document.getElementById('back-to-top');
let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        requestAnimationFrame(() => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (progressBarEl) progressBarEl.style.width = docHeight > 0 ? (scrollTop / docHeight * 100) + '%' : '0%';
            backToTopBtn?.classList.toggle('visible', scrollTop > window.innerHeight * 0.3);
            scrollTicking = false;
        });
        scrollTicking = true;
    }
}, { passive: true });
backToTopBtn?.addEventListener('click', () => lenis.scrollTo(0, { duration: 1.8 }));

/* ===================================================
   EMAIL OBFUSCATION — Decode on load
   =================================================== */
document.querySelectorAll('[data-mail]').forEach(a => {
    a.href = 'mailto:' + atob(a.dataset.mail);
    a.removeAttribute('data-mail');
});

/* ===================================================
   PORTFOLIO DATA SYNC — Update stats from portfolio-data.json
   Bridges the auto-synced JSON data to the live page.
   =================================================== */
(async function syncPortfolioStats() {
    try {
        const res = await fetch('portfolio-data.json');
        if (!res.ok) return;
        const data = await res.json();
        if (!data.projects || !data.totalRepos) return;

        /* Update "Public Repos" stat counter target */
        const repoStat = document.querySelector('.stat-num[data-count]');
        if (repoStat && data.totalRepos) {
            repoStat.setAttribute('data-count', data.totalRepos);
        }
    } catch { /* Silently fail — static fallback values remain */ }
})();
