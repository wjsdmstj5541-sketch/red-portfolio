/* ============================================
   RED DOT PORTFOLIO - Script
   "하나의 붉은 점으로부터 이미지 세계가 시작된다"
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========== Image Database ==========
    const imageDB = {
        'black mood': [
            { src: 'images/black mood/0.jpg' },
            { src: 'images/black mood/1.jpg' },
            { src: 'images/black mood/수경-125-편집.jpg' },
            { src: 'images/black mood/수경-128-편집.jpg' },
            { src: 'images/black mood/수경-152-편집.jpg' },
            { src: 'images/black mood/수경-9-편집.jpg' },
            { src: 'images/black mood/수경-96-편집.jpg' },
            { src: 'images/black mood/수경-99-편집.jpg' },
        ],
        'bloom': [
            { src: 'images/bloom/0.jpg' },
            { src: 'images/bloom/1.jpg' },
            { src: 'images/bloom/251213 누드+오브제0993.jpg' },
            { src: 'images/bloom/251213 누드+오브제1005-편집-2.jpg' },
        ],
        'snap': [
            { src: 'images/snap/_DSC2994-편집.jpg' },
            { src: 'images/snap/_DSC5336-1.jpg' },
            { src: 'images/snap/_DSC5354-1.jpg' },
            { src: 'images/snap/_DSC5410-1.jpg' },
            { src: 'images/snap/_DSC5448-1.jpg' },
            { src: 'images/snap/_DSC5460-1.jpg' },
            { src: 'images/snap/파일 19.jpg' },
            { src: 'images/snap/파일 30.jpg' },
            { src: 'images/snap/파일 31.jpg' },
            { src: 'images/snap/파일 32.jpg' },
            { src: 'images/snap/파일 33.jpg' },
            { src: 'images/snap/파일 34.jpg' },
        ],
        '영물': [
            { src: 'images/영물/파일 11.jpg' },
            { src: 'images/영물/파일 12.jpg' },
            { src: 'images/영물/파일 15.jpg' },
            { src: 'images/영물/파일 16.jpg' },
            { src: 'images/영물/파일 17.jpg' },
            { src: 'images/영물/파일 23.jpg' },
            { src: 'images/영물/파일 4.jpg' },
        ],
        'Polaroids': [
            { src: 'images/Polaroids/12.jpg' },
            { src: 'images/Polaroids/13.jpg' },
            { src: 'images/Polaroids/14.jpg' },
            { src: 'images/Polaroids/18.jpg' },
            { src: 'images/Polaroids/5.jpg' },
            { src: 'images/Polaroids/c.jpg' },
        ],
        'Narcissism': [
            { src: 'images/Narcissism/0.jpg' },
            { src: 'images/Narcissism/1.jpg' },
            { src: 'images/Narcissism/10.jpg' },
            { src: 'images/Narcissism/12.jpg' },
            { src: 'images/Narcissism/3 2.jpg' },
            { src: 'images/Narcissism/5.jpg' },
        ],
        '추의 미학': [
            { src: 'images/추의 미학/_DSC4079-편집-편집.jpg' },
            { src: 'images/추의 미학/test-291-편집.jpg' },
            { src: 'images/추의 미학/test-520-편집-편집.jpg' },
            { src: 'images/추의 미학/test-707-편집.jpg' },
            { src: 'images/추의 미학/수경-233-편집-편집.jpg' },
            { src: 'images/추의 미학/전은서.jpg' },
        ],
    };

    // ========== State ==========
    let currentImages = [];
    let currentIndex = 0;
    let isTransitioning = false;
    let hasEntered = false;

    // ========== DOM Elements ==========
    const intro = document.getElementById('intro');
    const theDot = document.getElementById('theDot');
    const world = document.getElementById('world');
    const nav = document.getElementById('nav');
    const navDot = document.getElementById('navDot');
    const navCategories = document.getElementById('navCategories');
    const currentImage = document.getElementById('imageA');
    const ghostImage = document.getElementById('imageB');
    const galleryCounter = document.getElementById('galleryCounter');
    const counterCurrent = document.getElementById('counterCurrent');
    const counterTotal = document.getElementById('counterTotal');
    const cursor = document.getElementById('cursor');
    const cursorTrail = document.getElementById('cursorTrail');
    const galleryContainer = document.getElementById('galleryContainer');
    const indexOverlay = document.getElementById('indexOverlay');
    const indexGrid = document.getElementById('indexGrid');
    const indexToggle = document.getElementById('indexToggle');
    const contactOverlay = document.getElementById('contactOverlay');
    const categoryGlitchText = document.getElementById('categoryGlitchText');
    const teleX = document.getElementById('teleX');
    const teleY = document.getElementById('teleY');
    const chips = [
        document.getElementById('chip1'),
        document.getElementById('chip2'),
        document.getElementById('chip3')
    ];
    let isIndexOpen = false;
    let isContactOpen = false;

    // Dual layer refs
    let layerFront = currentImage;  // currently showing
    let layerBack = ghostImage;     // next to show

    // ========== Custom Cursor ==========
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let cursorX = mouseX, cursorY = mouseY;
    let trailX = mouseX, trailY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.classList.add('visible');
        cursorTrail.classList.add('visible');
        
        if (hasEntered && !isIndexOpen && !isContactOpen) {
            teleX.textContent = `X:${String(mouseX).padStart(4, '0')}`;
            teleY.textContent = `Y:${String(mouseY).padStart(4, '0')}`;
            
            // Magnetic effect for the navigation dot
            const isMobile = window.innerWidth <= 768;
            const navDotBaseX = isMobile ? 25 : 45; // Approx padding + radius
            const navDotBaseY = isMobile ? 25 : 35;
            
            const dx = mouseX - navDotBaseX;
            const dy = mouseY - navDotBaseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
                const pullFactor = 0.15;
                const tx = dx * pullFactor;
                const ty = dy * pullFactor;
                const scale = distance < 20 ? 1.2 : 1;
                navDot.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
            } else {
                navDot.style.transform = `translate(0px, 0px) scale(1)`;
            }

            // Directional Cursor
            if (!cursor.classList.contains('hovering') && mouseY > 100) {
                if (mouseX < window.innerWidth * 0.35) {
                    cursor.textContent = '〈';
                } else if (mouseX > window.innerWidth * 0.65) {
                    cursor.textContent = '〉';
                } else {
                    cursor.textContent = '';
                }
            } else {
                cursor.textContent = '';
            }
        } else {
            cursor.textContent = '';
        }
    });

    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('visible');
        cursorTrail.classList.remove('visible');
        navDot.style.transform = `translate(0px, 0px) scale(1)`;
    });

    // Slightly delayed cursor - "alive" feeling
    function updateCursor() {
        // Main cursor: slight lag
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        cursorX += dx * 0.15;
        cursorY += dy * 0.12;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Trail: even more lag
        const tdx = mouseX - trailX;
        const tdy = mouseY - trailY;
        trailX += tdx * 0.06;
        trailY += tdy * 0.05;
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';

        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Cursor hover states
    document.addEventListener('mouseover', (e) => {
        const target = e.target;
        if (target.closest('.the-dot') || target.closest('.nav-cat') || target.closest('.nav-dot-anchor') || target.closest('.nav-index-btn') || target.closest('.index-thumb') || target.closest('.contact-link')) {
            cursor.classList.add('hovering');
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target;
        if (target.closest('.the-dot') || target.closest('.nav-cat') || target.closest('.nav-dot-anchor') || target.closest('.nav-index-btn') || target.closest('.index-thumb') || target.closest('.contact-link')) {
            cursor.classList.remove('hovering');
        }
    });

    // ========== Cinematic Audio Design ==========
    function playCinematicEnterSound() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        
        const ctx = new AudioContext();
        
        // 1. Deep Sub-Bass Rumble
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(45, ctx.currentTime); // Start low
        osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 3.5); // Drop even lower
        
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.8); // Swell up
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 4); // Slow fade out
        
        // 2. Analog Air / Film Texture
        const bufferSize = ctx.sampleRate * 4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.5;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(80, ctx.currentTime); // Very muffled
        filter.frequency.linearRampToValueAtTime(300, ctx.currentTime + 1); // Open up slightly
        filter.frequency.linearRampToValueAtTime(40, ctx.currentTime + 3.5); // Close down
        
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0, ctx.currentTime);
        noiseGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.5);
        noiseGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3.5);
        
        // Connect and play
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        
        osc.start();
        noise.start();
        osc.stop(ctx.currentTime + 4);
        noise.stop(ctx.currentTime + 4);
    }

    // ========== PHASE 1: The Dot Click ==========
    function enterWorld() {
        if (hasEntered) return;
        hasEntered = true;

        playCinematicEnterSound(); // Trigger sound on entry
        theDot.classList.add('clicked'); // Hide satellites instantly

        const dotCore = theDot.querySelector('.dot-core');
        const dotRect = dotCore.getBoundingClientRect();
        const navTarget = getNavDotTarget();

        // Clone the dot for animation
        dotCore.classList.add('launching');
        dotCore.style.left = dotRect.left + 'px';
        dotCore.style.top = dotRect.top + 'px';
        dotCore.style.width = dotRect.width + 'px';
        dotCore.style.height = dotRect.height + 'px';

        // Hide whisper
        const whisper = document.querySelector('.intro-whisper');
        whisper.style.opacity = '0';
        whisper.style.transition = 'opacity 0.3s ease';

        // Animate dot to nav position
        requestAnimationFrame(() => {
            dotCore.style.transition = 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)';
            dotCore.style.left = navTarget.x + 'px';
            dotCore.style.top = navTarget.y + 'px';
            dotCore.style.width = '10px';
            dotCore.style.height = '10px';
            dotCore.style.boxShadow = '0 0 15px rgba(196, 59, 59, 0.3)';
        });

        // Fade intro bg
        setTimeout(() => {
            intro.classList.add('exiting');
            intro.style.background = 'transparent';
            intro.style.transition = 'background 0.8s ease';
        }, 400);

        // Activate world
        setTimeout(() => {
            world.classList.add('active');
        }, 600);

        // Show nav
        setTimeout(() => {
            nav.classList.add('visible');
        }, 900);

        // Hide intro, show gallery
        setTimeout(() => {
            intro.classList.add('gone');
            loadCategory('all');
            galleryCounter.classList.add('visible');
        }, 1400);
    }

    function getNavDotTarget() {
        // Approximate nav dot position
        const isMobile = window.innerWidth <= 768;
        return {
            x: isMobile ? 15 : 40,
            y: isMobile ? 20 : 28,
        };
    }

    theDot.addEventListener('click', enterWorld);
    theDot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') enterWorld();
    });

    // ========== Image Loading ==========
    function getAllImages() {
        let all = [];
        for (const cat in imageDB) {
            all = all.concat(imageDB[cat]);
        }
        // Shuffle for discovery
        return shuffleArray(all);
    }

    function shuffleArray(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // ========== Nav Dot: Contact Toggle ==========
    navDot.addEventListener('click', () => {
        isContactOpen = !isContactOpen;
        if (isContactOpen) {
            contactOverlay.classList.add('active');
            if (isIndexOpen) closeIndex();
        } else {
            contactOverlay.classList.remove('active');
        }
    });

    // Close contact overlay on click outside
    contactOverlay.addEventListener('click', (e) => {
        if (e.target === contactOverlay) {
            isContactOpen = false;
            contactOverlay.classList.remove('active');
        }
    });

    // ========== Glitch Typing Effect ==========
    function typeGlitchText(element, text) {
        element.classList.add('visible');
        const chars = '!<>-_\\\\/[]{}—=+*^?#_';
        let iterations = 0;
        const targetText = `[ ${text} ]`;
        
        clearInterval(element.glitchInterval);
        
        element.glitchInterval = setInterval(() => {
            element.innerText = targetText.split('').map((char, index) => {
                if (index < iterations) {
                    return targetText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');
            
            if (iterations >= targetText.length) {
                clearInterval(element.glitchInterval);
            }
            iterations += 1 / 3;
        }, 30);
    }

    // ========== Image Loading & Category Glitch ==========
    function loadCategory(category) {
        if (category === 'all') {
            currentImages = getAllImages();
        } else {
            currentImages = shuffleArray([...(imageDB[category] || [])]);
        }
        currentIndex = 0;
        updateCounter();

        // Trigger typing glitch in bottom corner
        typeGlitchText(categoryGlitchText, category === 'all' ? 'the world' : category);

        showImage(0);
    }

    function extractAndSetColors(imgElement) {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            canvas.width = 3;
            canvas.height = 3;
            ctx.drawImage(imgElement, 0, 0, 3, 3);
            const data = ctx.getImageData(0, 0, 3, 3).data;
            
            const indices = [0, 4 * 4, 8 * 4];
            for(let i=0; i<3; i++) {
                const r = data[indices[i]];
                const g = data[indices[i]+1];
                const b = data[indices[i]+2];
                if (r !== undefined) {
                    chips[i].style.background = `rgb(${r}, ${g}, ${b})`;
                }
            }
        } catch(e) {
            // Silently fail if cross-origin rules block canvas read
        }
    }

    // ========== Gallery Navigation ==========
    function showImage(index, direction = 0) {
        if (isTransitioning || currentImages.length === 0) return;
        isTransitioning = true;

        const img = new Image();
        img.onload = () => {
            extractAndSetColors(img);
            // Prepare the back layer with new image
            layerBack.src = img.src;
            layerBack.style.filter = 'none';
            layerBack.style.transform = 'translate(-50%, -50%)';
            layerBack.classList.remove('fading-out');

            // Crossfade: back layer comes forward
            requestAnimationFrame(() => {
                layerBack.classList.add('active');
                layerFront.classList.remove('active');
                layerFront.classList.add('fading-out');

                // Swap roles
                const temp = layerFront;
                layerFront = layerBack;
                layerBack = temp;

                // Clean up after transition
                setTimeout(() => {
                    layerBack.classList.remove('fading-out');
                    isTransitioning = false;
                }, 1100);
            });

            updateCounter();
        };

        img.onerror = () => {
            isTransitioning = false;
            if (direction > 0) { currentIndex = (currentIndex + 1) % currentImages.length; showImage(currentIndex, 1); }
            else if (direction < 0) { currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length; showImage(currentIndex, -1); }
        };

        img.src = encodeURI(currentImages[index].src.normalize('NFD'));
    }

    function nextImage() {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex + 1) % currentImages.length;
        showImage(currentIndex, 1);
    }

    function prevImage() {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        showImage(currentIndex, -1);
    }

    function updateCounter() {
        const current = String(currentIndex + 1).padStart(2, '0');
        const total = String(currentImages.length).padStart(2, '0');

        // Trigger glitch
        counterCurrent.classList.remove('glitch');
        void counterCurrent.offsetWidth; // force reflow
        counterCurrent.classList.add('glitch');

        setTimeout(() => {
            counterCurrent.textContent = current;
            counterTotal.textContent = total;
        }, 100);
    }

    // ========== Navigation: Click Areas ==========
    galleryContainer.addEventListener('click', (e) => {
        if (isTransitioning) return;
        const rect = galleryContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;

        if (clickX < width * 0.35) {
            prevImage();
        } else if (clickX > width * 0.65) {
            nextImage();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!hasEntered) {
            if (e.key === 'Enter' || e.key === ' ') enterWorld();
            return;
        }
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextImage();
        }
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevImage();
        }
    });

    // Touch/Swipe
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;

    galleryContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isSwiping = true;
    }, { passive: true });

    galleryContainer.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        isSwiping = false;
        const dx = touchStartX - e.changedTouches[0].clientX;
        const dy = touchStartY - e.changedTouches[0].clientY;

        // Only horizontal swipes
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) nextImage();
            else prevImage();
        }
    }, { passive: true });

    // Mouse wheel
    let wheelTimeout;
    document.addEventListener('wheel', (e) => {
        if (!hasEntered || isTransitioning) return;
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            if (e.deltaY > 0 || e.deltaX > 0) nextImage();
            else prevImage();
        }, 80); // Slightly delayed response
    }, { passive: true });

    // ========== Category Buttons ==========
    navCategories.addEventListener('click', (e) => {
        const btn = e.target.closest('.nav-cat');
        if (!btn || isTransitioning) return;

        // Update active state
        document.querySelectorAll('.nav-cat').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (isIndexOpen) closeIndex();

        const category = btn.dataset.category;
        loadCategory(category);
    });



    // ========== INDEX MODE ==========
    function buildIndex() {
        indexGrid.innerHTML = '';

        const count = currentImages.length;
        const isMobile = window.innerWidth <= 768;

        // Dynamic columns based on image count
        let cols;
        if (isMobile) {
            cols = count <= 4 ? 2 : 3;
        } else {
            if (count <= 4) cols = 2;
            else if (count <= 6) cols = 3;
            else if (count <= 9) cols = 3;
            else if (count <= 16) cols = 4;
            else cols = Math.min(6, Math.ceil(Math.sqrt(count)));
        }

        indexGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

        currentImages.forEach((imgData, i) => {
            const thumb = document.createElement('div');
            thumb.className = 'index-thumb';
            thumb.innerHTML = `<img src="${imgData.src}" alt="" loading="lazy"><span class="thumb-num">${String(i + 1).padStart(2, '0')}</span>`;

            thumb.addEventListener('click', () => {
                currentIndex = i;

                // Pre-load and set on front layer
                const preImg = new Image();
                preImg.onload = () => {
                    layerBack.src = preImg.src;
                    layerBack.style.filter = 'none';
                    layerBack.style.transform = 'translate(-50%, -50%)';
                    layerBack.classList.remove('fading-out');
                    layerBack.classList.add('active');
                    layerFront.classList.remove('active');

                    const temp = layerFront;
                    layerFront = layerBack;
                    layerBack = temp;

                    updateCounter();
                    closeIndex();
                    isTransitioning = false;
                };
                preImg.src = encodeURI(currentImages[i].src.normalize('NFD'));
            });

            indexGrid.appendChild(thumb);

            // Staggered reveal (Cascade)
            setTimeout(() => {
                thumb.classList.add('visible');
            }, 50 + i * 45);
        });
    }

    function openIndex() {
        isIndexOpen = true;
        buildIndex();
        indexOverlay.classList.add('active');
        indexToggle.classList.add('active');
        galleryCounter.style.opacity = '0';
    }

    function closeIndex() {
        isIndexOpen = false;
        indexOverlay.classList.remove('active');
        indexToggle.classList.remove('active');
        galleryCounter.style.opacity = '';
    }

    function toggleIndex() {
        if (isIndexOpen) closeIndex();
        else openIndex();
    }

    indexToggle.addEventListener('click', toggleIndex);

    // Escape key closes index
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isIndexOpen) {
            closeIndex();
        }
    });

    // ========== Preload first images of each category ==========
    function preloadImages() {
        for (const cat in imageDB) {
            if (imageDB[cat].length > 0) {
                const img = new Image();
                img.src = imageDB[cat][0].src;
            }
        }
    }

    // Delay preload to not interfere with intro
    setTimeout(preloadImages, 3000);

});
