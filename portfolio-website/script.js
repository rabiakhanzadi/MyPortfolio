document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');

        // Optional: Change burger icon to 'X' when menu is open
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
             menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Optional: Close mobile menu when a link is clicked
    const allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Optional: Add active class to nav link on scroll (Simple version)
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('header').offsetHeight; // Get actual header height
    window.addEventListener('scroll', navHighlighter);

    function navHighlighter() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - headerHeight - 10; // Adjusted offset using dynamic header height + small buffer
            let sectionId = current.getAttribute('id');
            let link = document.querySelector('.nav-links a[href*=' + sectionId + ']');

            if (link) { // Check if link exists
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    // Remove active class from all links first
                    allNavLinks.forEach(l => l.classList.remove('active'));
                    // Add active class to the current link
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });

         // Highlight home link when scrolled to the very top
         const homeLink = document.querySelector('.nav-links a[href="#home"]');
         if (scrollY < sections[0].offsetTop - headerHeight - 10) {
             allNavLinks.forEach(l => l.classList.remove('active'));
             if (homeLink) homeLink.classList.add('active');
         }
    }

    // Initial call to set active link on page load/refresh
     setTimeout(navHighlighter, 100); // Delay slightly to ensure layout is stable


});