
        // Loading Screen
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.querySelector('.loading-screen').classList.add('hidden');
            }, 1000);
        });


        // --- CUSTOM CURSOR SCRIPT ---
        const dot = document.querySelector('.cursor-dot');
        const outline = document.querySelector('.cursor-outline');
        
        // Hide cursor on mobile
        if (window.innerWidth > 640) {
            let dotX = 0, dotY = 0;
            let outlineX = 0, outlineY = 0;
            let mouseX = 0, mouseY = 0;

            // Update mouse position
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            // Smooth animation loop
            function animateCursor() {
                // Instant dot follow
                dotX += (mouseX - dotX) * 1;
                dotY += (mouseY - dotY) * 1;
                
                // Smooth outline follow with delay
                outlineX += (mouseX - outlineX) * 0.12;
                outlineY += (mouseY - outlineY) * 0.12;
                
                dot.style.left = dotX + 'px';
                dot.style.top = dotY + 'px';
                
                outline.style.left = outlineX + 'px';
                outline.style.top = outlineY + 'px';
                
                requestAnimationFrame(animateCursor);
            }

            animateCursor();

            // Hover effects
            const hoverElements = document.querySelectorAll('a, button, .reel-item, .stat-item, .skill-card, .control-btn, .social-link, .dot');
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    outline.classList.add('expand');
                });
                
                el.addEventListener('mouseleave', () => {
                    outline.classList.remove('expand');
                });
            });

            // Hide cursor when leaving window
            document.addEventListener('mouseleave', () => {
                dot.style.opacity = '0';
                outline.style.opacity = '0';
            });

            document.addEventListener('mouseenter', () => {
                dot.style.opacity = '1';
                outline.style.opacity = '1';
            });
        }
        // --- END CUSTOM CURSOR ---


        
        // GSAP Smooth Animations
        gsap.registerPlugin(ScrollTrigger);

        // Simple fade-in animations for all sections
        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power2.out'
            });
        });

        // Navbar scroll effect
        const nav = document.querySelector('.nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Mobile Menu
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');

        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active'); // For potential "X" icon animation
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });

        // Testimonials Slider
        const testimonials = [
            {
                text: "Bhau, the editing is number one! Every video was totally worth the money 💯 You did such good work for the amount we paid, made the videos really well, and delivered them on time. Thank you so much for the videos 😊🥰",
                author: "Rajesh Kumar",
                role: "CEO, TechVision India"
            },
            {
                text: "We wanted short ad videos for our electronics store, and Darshan delivered exactly what we needed — eye-catching, creative, and impactful. He’s our go-to editor now!",
                author: "Dipak Electronics",
                role: "Owner Of Dipak Electronics"
            },
            {
                text: "We’ve worked with Darshan multiple times now, and every project turns out amazing. His consistency, creativity, and professionalism make him a valuable part of our media team.",
                author: "------",
                role: "P.G Resort"
            }
        ];

        let currentTestimonial = 0;
        const testimonialText = document.getElementById('testimonialText');
        const testimonialAuthor = document.getElementById('testimonialAuthor');
        const testimonialRole = document.getElementById('testimonialRole');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const dots = document.querySelectorAll('.dot');

        function updateTestimonial(index) {
            gsap.to('.testimonial-card', {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    testimonialText.textContent = testimonials[index].text;
                    testimonialAuthor.textContent = testimonials[index].author;
                    testimonialRole.textContent = testimonials[index].role;

                    dots.forEach((dot, i) => {
                        dot.classList.toggle('active', i === index);
                    });

                    gsap.to('.testimonial-card', {
                        opacity: 1,
                        duration: 0.3
                    });
                }
            });
        }

        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial(currentTestimonial);
        });

        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            updateTestimonial(currentTestimonial);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                updateTestimonial(currentTestimonial);
            });
        });

        // Auto-advance testimonials
        let testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial(currentTestimonial);
        }, 5000);

        // Pause auto-advance on hover (optional but good UX)
        document.querySelector('.testimonials-container').addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });

        document.querySelector('.testimonials-container').addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                updateTestimonial(currentTestimonial);
            }, 5000);
        });

        
        // --- NEW VIDEO MODAL SCRIPT ---
        const reelItems = document.querySelectorAll('.reel-item');
        const videoModal = document.getElementById('videoModal');
        const closeModalBtn = document.getElementById('closeModal');
        const modalVideo = document.getElementById('modalVideoPlayer');

        reelItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoPath = item.getAttribute('data-video');
                
                if (videoPath) {
                    modalVideo.src = videoPath;
                    videoModal.classList.add('active'); // Show the modal
                    modalVideo.play();
                }
            });
        });

        function closeModal() {
            videoModal.classList.remove('active'); // Hide the modal
            modalVideo.pause();
            modalVideo.src = ""; // Stop the video
        }

        closeModalBtn.addEventListener('click', closeModal);
        
        // Also close if clicking the background
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeModal();
            }
        });
        // --- END NEW VIDEO MODAL SCRIPT ---


        // Contact Form (No alert)
        document.querySelector('.contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = e.target.querySelector('.submit-btn');
            submitBtn.textContent = 'Message Sent!';
            submitBtn.disabled = true; // Prevent multiple clicks

            setTimeout(() => {
                 submitBtn.textContent = 'Send Message';
                 submitBtn.disabled = false;
                 e.target.reset();
            }, 3000);
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });


        gsap.registerPlugin(ScrollTrigger);

// Header reveal
gsap.from(".section-header", {
  scrollTrigger: {
    trigger: ".section-header",
    start: "top 75%",
    scrub: 1,
  },
  y: 50,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
});

// Image parallax + fade-in
gsap.from(".about-image img", {
  scrollTrigger: {
    trigger: ".about-content",
    start: "top 85%",
    scrub: 1,
    
  },
  y: 100,
  opacity: 0,
  scale: 1.1,
  ease: "power2.out"
});

// Text slide-in
gsap.from(".about-text", {
  scrollTrigger: {
    trigger: ".about-content",
    start: "top 80%",
      scrub: 1,
  },
  x: -100,
  opacity: 0,
  duration: 1.3,
  ease: "power4.out"
});

gsap.from(".skills-grid",{
  y: 50,
  scale:0.9,
  opacity: 0,
  duration: 0.5,
  ease: "back.out(2)",
    scrollTrigger: {
    trigger: ".skill-card",
    start: "top 95%",
    scrub: 1,}
});

gsap.from("#phead",{
  x: 50,
  scale:0.9,
  opacity: 0,
  stagger:0.05,
  duration: 1,
  ease: "back.out(2)",
    scrollTrigger: {
    trigger: "#phead",
    start: "top 95%",
    scrub: 1,}
});

gsap.from(".skill-icon ",{
  opacity: 0,
  stagger:0.05,
  duration: 1,
  ease: "back.out(2)",
    scrollTrigger: {
    trigger: ".skill-icon ",
    start: "top 95%",
    scrub: 1,}
});



// Service cards stagger in
gsap.from(".services-grid", {
  scrollTrigger: {
    trigger: ".service-card",
    start: "top 80%",
    scrub: 0.5,
  },
  y: 80,
  opacity: 0,
  duration: 1.4,
  stagger: 0.5,
  ease: "power4.out"
});

// Parallax float effect while scrolling
gsap.utils.toArray(".service-card").forEach((card, i) => {
  gsap.to(card, {
    scrollTrigger: {
      trigger: card,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
    y: i % 2 === 0 ? -30 : -60, // alternating gentle float
    ease: "none"
  });
});

// Icon pop-in with slight rotation
gsap.from(".service-icon i", {
  scrollTrigger: {
    trigger: ".services-grid",
    start: "top 100%",
    scrub:0.5,
  },
  scale: 0,
  rotation: 45,
  opacity: 0,
  duration: 0.9,
  stagger: 0.1,
  ease: "back.out(2)"
});

gsap.from("#shead",{
  x: 50,
  scale:0.9,
  opacity: 0,
  stagger:0.15,
  duration: 1,
  ease: "back.out(2)",
    scrollTrigger: {
    trigger: "#shead",
    start: "top 95%",
    scrub: 1,}
});


  gsap.registerPlugin(ScrollTrigger);

  // 🎬 Scroll animation for reel cards
  gsap.from(".reel-grid", {
    scrollTrigger: {
      trigger: ".reel-item",
      start: "top 70%",
      toggleActions: "play none none reverse"
    },
    y: 50,
    opacity: 0,
    duration:1.2,
    ease: "power3.out",
  });

  
gsap.from("#thead",{
  x: 50,
  scale:0.9,
  opacity: 0,
  stagger:0.15,
  duration: 1,
  ease: "back.out(2)",
    scrollTrigger: {
    trigger: "#thead",
    start: "top 95%",
    scrub: 1,}
});

   // Contact info side (text + details + social)
  gsap.from(".contact-info", {
    scrollTrigger: {
      trigger: ".contact-content",
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    x: -60,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
  });

  // Each contact detail item stagger
  gsap.from(".contact-item", {
    scrollTrigger: {
      trigger: ".contact-info",
      start: "top 75%",
      toggleActions: "play none none reverse"
    },
    y: -20,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.15,
    delay: 0.2
  });

  // Social links float in one by one
  gsap.from(".social-links", {
    scrollTrigger: {
      trigger: ".contact-info",
      start: "top 100%",    
    },
    scale: 0.8,
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: "back.out(1.7)",
    stagger: 0.1
  });

//   // Contact form fade + lift
//   gsap.from(".contact-form", {
//     scrollTrigger: {
//       trigger: ".contact-form",
//       start: "top 85%",
//       toggleActions: "play none none reverse"
//     },
//     y: 100,
//     opacity: 0,
//     duration: 1.2,
//     ease: "power3.out"
//   });

  // Form fields animate slightly staggered
//   gsap.from(".form-group", {
//     scrollTrigger: {
//       trigger: ".contact-form",
//       start: "top 85%",
//       toggleActions: "play none none reverse"
//     },
//     y: 20,
//     opacity: 0,
//     duration: 0.8,
//     ease: "power2.out",
//     stagger: 0.15,
//     delay: 0.2
//   });

//   // Submit button pop
//   gsap.from(".submit-btn", {
//     scrollTrigger: {
//       trigger: ".contact-form",
//       start: "top 80%",
//       toggleActions: "play none none reverse"
//     },
//     scale: 0.9,
//     opacity: 0,
//     duration: 0.6,
//     ease: "back.out(1.7)",
//     delay: 0.4
//   });

 