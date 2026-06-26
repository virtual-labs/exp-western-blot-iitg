document.addEventListener('DOMContentLoaded', () => {
    // 25-step Western Blot sequence configuration
    const steps = [
        {
            src: './images/1.mp4',
            caption: 'Step 1: Collect the virus-infected cell lysate in a microcentrifuge tube.'
        },
        {
            src: './images/2.mp4',
            caption: 'Step 2: Add an appropriate volume of protein lysis buffer containing SDS and reducing agent to the lysate.'
        },
        {
            src: './images/3.mp4',
            caption: 'Step 3: Mix the sample gently by pipetting or vortexing to ensure complete lysis and uniform distribution of sample components.'
        },
        {
            src: './images/4.mp4',
            caption: 'Step 4: Heat the protein samples at 95 °C for 10 minutes in a heating block to denature the protein structure.'
        },
        {
            src: './images/5.mp4',
            caption: 'Step 5: Immediately place the heated samples on ice to cool and preserve denatured states.'
        },
        {
            src: './images/6.mp4',
            caption: 'Step 6: Centrifuge the denatured cell lysate at 12,000g for 5 minutes at 4 °C to pellet cellular debris.'
        },
        {
            src: './images/7.mp4',
            caption: 'Step 7: Collect the supernatant containing denatured viral proteins and place on ice before loading.'
        },
        {
            src: './images/8.mp4',
            caption: 'Step 8: Clean glass plates with ethanol, dry, and assemble the SDS-PAGE gel plates and casting frame.'
        },
        {
            src: './images/9.mp4',
            caption: 'Step 9: Pour the prepared resolving gel monomer solution into the glass plate cassette.'
        },
        {
            src: './images/10.mp4',
            caption: 'Step 10: Overlay resolving gel with isopropanol or water to prevent oxidation and ensure a flat gel interface.'
        },
        {
            src: './images/11.mp4',
            caption: 'Step 11: After resolving gel polymerizes, pour off the overlay and pour the stacking gel solution.'
        },
        {
            src: './images/12.mp4',
            caption: 'Step 12: Insert the clean well-forming comb into the stacking gel and allow it to polymerize fully.'
        },
        {
            src: './images/13.mp4',
            caption: 'Step 13: Remove the comb and assemble the gel cassette inside the electrophoresis chamber tank.'
        },
        {
            src: './images/14.mp4',
            caption: 'Step 14: Fill the inner and outer buffer chambers with 1X SDS-PAGE running buffer.'
        },
        {
            src: './images/15.mp4',
            caption: 'Step 15: Carefully load a pre-stained protein molecular weight marker into the first designated well.'
        },
        {
            src: './images/16.mp4',
            caption: 'Step 16: Load the denatured protein samples into the subsequent wells using a micropipette.'
        },
        {
            src: './images/17.mp4',
            caption: 'Step 17: Connect electrodes to the power supply and run at constant voltage until the dye front reaches the bottom.'
        },
        {
            src: './images/18.mp4',
            caption: 'Step 18: Disassemble the gel cassette, remove the gel, and cut the PVDF membrane to fit.'
        },
        {
            src: './images/19.mp4',
            caption: 'Step 19: Activate the PVDF membrane by soaking it in 100% methanol for 15-30 seconds.'
        },
        {
            src: './images/20.mp4',
            caption: 'Step 20: Equilibrate the activated PVDF membrane, gel, filter papers, and sponges in transfer buffer.'
        },
        {
            src: './images/21.mp4',
            caption: 'Step 21: Assemble the transfer sandwich: sponge, filter paper, gel, membrane, filter paper, sponge, and close cassette.'
        },
        {
            src: './images/22.mp4',
            caption: 'Step 22: Place the transfer cassette into the transfer tank and run the electro-transfer at recommended conditions.'
        },
        {
            src: './images/23.mp4',
            caption: 'Step 23: Block the membrane in 5% skimmed milk or BSA in TBST for 1 hour at room temperature to prevent non-specific binding.'
        },
        {
            src: './images/24.mp4',
            caption: 'Step 24: Incubate the membrane with primary antibody specific to the viral protein for 1-2 hours at RT or overnight at 4 °C.'
        },
        {
            src: './images/25.mp4',
            caption: 'Step 25: Wash the membrane 3 times with TBST, incubate with enzyme-conjugated secondary antibody (1 hour), wash again, add substrate, and detect bands.'
        }
    ];

    let currentIndex = 0;

    const sliderVideo = document.getElementById('sliderVideo');
    const slideCaption = document.getElementById('slideCaption');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const stepCounter = document.getElementById('stepCounter');
    const progressBar = document.getElementById('progressBar');
    const indicatorsContainer = document.getElementById('indicators');

    // Initialize dot indicators
    function initIndicators() {
        indicatorsContainer.innerHTML = '';
        steps.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => jumpToSlide(index));
            indicatorsContainer.appendChild(dot);
        });
    }

    // Update the layout and slide content
    function updateSlide() {
        const step = steps[currentIndex];

        // Apply fade-out animation to the media element
        sliderVideo.classList.add('fade-out');

        setTimeout(() => {
            // Update source and load video
            sliderVideo.src = step.src;
            sliderVideo.load();

            // Wait for video data to load to prevent visual stutter/grey backgrounds
            sliderVideo.onloadeddata = () => {
                sliderVideo.classList.remove('fade-out');
                // Automatically play the video (with volume muted to prevent browser blocks)
                sliderVideo.play().catch(e => console.log('Playback prevented by browser policies:', e));
            };

            // Update caption content
            slideCaption.style.animation = 'none';
            slideCaption.offsetHeight; // trigger reflow
            slideCaption.style.animation = null;
            slideCaption.textContent = step.caption;

            // Update text counter and progress bar
            stepCounter.textContent = `Step ${currentIndex + 1} of ${steps.length}`;
            const progressPercentage = ((currentIndex + 1) / steps.length) * 100;
            progressBar.style.width = `${progressPercentage}%`;

            // Update dot indicators states
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            // Enable/disable navigation buttons
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === steps.length - 1;

        }, 250); // Matches the CSS transition duration
    }

    function goToNext() {
        if (currentIndex < steps.length - 1) {
            currentIndex++;
            updateSlide();
        }
    }

    // Handle video end to automatically trigger next step
    sliderVideo.addEventListener('ended', () => {
        if (currentIndex < steps.length - 1) {
            goToNext();
        }
    });

    function goToPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlide();
        }
    }

    function jumpToSlide(index) {
        if (index !== currentIndex && index >= 0 && index < steps.length) {
            currentIndex = index;
            updateSlide();
        }
    }

    // Event Listeners
    nextBtn.addEventListener('click', goToNext);
    prevBtn.addEventListener('click', goToPrev);

    // Initial setup
    initIndicators();
    updateSlide();
});
