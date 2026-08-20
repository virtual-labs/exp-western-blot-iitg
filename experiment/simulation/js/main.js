document.addEventListener('DOMContentLoaded', () => {
    // 25-step Western Blot sequence configuration
    const steps = [
        {
            src: './images/1.mp4',
            caption: 'Step 1: Dispose of the media in the petri dish into a beaker'
        },
        {
            src: './images/2.mp4',
            caption: 'Step 2: Wash the cells in the petri dish with PBS twice'
        },
        {
            src: './images/3.mp4',
            caption: 'Step 3: Add PBS and scrape the dish, then collect the virus-infected cell lysate, and store it on ice after centrifuging it'
        },
        {
            src: './images/4.mp4',
            caption: 'Step 4: Dispose of the buffer in the flask and mix the marker into the vial. Heat the protein samples at 95 °C to denature the protein structure.'
        },
        {
            src: './images/5.mp4',
            caption: 'Step 5: Centrifuge the heated protein sample'
        },
        {
            src: './images/6.mp4',
            caption: 'Step 6: Assemble the casting frame, then lock and mount the Gasket.'
        },
        {
            src: './images/7.mp4',
            caption: 'Step 7: Add the Resolving gel to the Gasket. Add a layer of Isopropanol and dispose of it after the gel has solidified.'
        },
        {
            src: './images/8.mp4',
            caption: 'Step 8: Wash with water and dispose of the excess water. Add the stacking gel, then carefully insert the comb into the gasket.'
        },
        {
            src: './images/9.mp4',
            caption: 'Step 9: Remove the holder, then remove the gasket. Assemble the gasket and lock the assembly.'
        },
        {
            src: './images/10.mp4',
            caption: 'Step 10: Transfer the Assembly into the Tank and Add  Transfer Buffer to the Assembly'
        },
        {
            src: './images/11.mp4',
            caption: 'Step 11: Add the Transfer Buffer to the Tank and Take the Comb out carefully. Load the marker and samples and run the gel.'
        },
        {
            src: './images/12.mp4',
            caption: 'Step 12: Carefully remove the Gel cassette'
        },
        {
            src: './images/13.mp4',
            caption: 'Step 13: Scrape the Wells carefully. Soak the Nitrocellulose membrane and the blotting sheets in the Transfer Buffer.'
        },
        {
            src: './images/14.mp4',
            caption: 'Step 14: Transfer the Nitrocellulose sheet to the base of the transfer unit'
        },
        {
            src: './images/15.mp4',
            caption: 'Step 15: Align the Gel over the Nitrocellulose membrane'
        },
        {
            src: './images/16.mp4',
            caption: 'Step 16: Cover the gel with the soaking sheets and use a roller to ensure complete contact with the membrane surface. Set up the Power Blotter.'
        },
        {
            src: './images/17.mp4',
            caption: 'Step 17: Take the Membrane out of the Powerblotter and transfer it to the container, and wash with TBST'
        },
        {
            src: './images/18.mp4',
            caption: 'Step 18: Wash the nitrocellulose paper  with 1x TBST twice'
        },
        {
            src: './images/19.mp4',
            caption: 'Step 19: Block the membrane by adding Blocking Buffer and putting on a slow rocker for 2 hours'
        },
        {
            src: './images/20.mp4',
            caption: 'Step 20: Wash the membrane with TBST in a Fast Wash twice'
        },
        {
            src: './images/21.mp4',
            caption: 'Step 21: Primary Antibody Incubation at 4°C  overnight on a slow rocker'
        },
        {
            src: './images/22.mp4',
            caption: 'Step 22: Secondary Antibody incubation  for 2 hours on a slow rocker'
        },
        {
            src: './images/23.mp4',
            caption: 'Step 23: ECL reagent preparation in a dark room'
        },
        {
            src: './images/24.mp4',
            caption: 'Step 24: Transfer the Blot into a black box and completely cover the Blot surface with Luminol. Then place the blot in the gel doc.'
        },
        {
            src: './images/25.mp4',
            caption: 'Step 25: Visualise the blot and detect the bands.'
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
