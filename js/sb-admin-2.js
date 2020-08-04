document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const sideBar = document.querySelector('.sidebar');
  const scrollToTopBtn = document.querySelector('.scroll-to-top');

  // Sidebar toggle
  document.querySelectorAll('#sidebarToggle, #sidebarToggleTop').forEach((element) => {
    element.addEventListener('click', () => {
      // Update body
      body.classList.toggle('sidebar-toggled');

      if (sideBar.classList.contains('toggled')) {
        // Expand sidebar
        sideBar.classList.remove('toggled');
      } else {
        collapseMenus();

        // Collapse sidebar
        sideBar.classList.add('toggled');
      }
    });
  });

  // Close any open menu accordions when window is resized below 768px
  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      collapseMenus();
    }

    // Toggle the side navigation when window is resized below 480px
    if (window.innerWidth < 480 && !sideBar.classList.contains('toggled')) {
      body.classList.add('sidebar-toggled');
      sideBar.classList.add('toggled');
      collapseMenus();
    }
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      e.preventDefault();

      const e0 = e.originalEvent;

      const delta = e0.wheelDelta || -e0.detail;

      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    }
  });

  // Scroll to top button appear
  document.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
      fadeIn(scrollToTopBtn, 'inline');
    } else {
      fadeOut(scrollToTopBtn);
    }
  });

  // Smooth scrolling
  scrollToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();

    window.scrollTo({
      'behavior': 'smooth',
      'left': 0,
      'top': 0,
    });
  });

  /**
   * Collapse open menus
   */
  function collapseMenus() {
    sideBar.querySelectorAll('.collapse.show').forEach((section) => {
      section.classList.remove('show');
    });
  }
});

/**
 * Fade out and hide element.
 *
 * @param {Element} el Element to fade.
 */
function fadeOut(el) {
  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = 'none';
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

/**
 * Show and fade in element.
 *
 * @param {Element} el Element to fade.
 * @param {string} [display] Element display type.
 */
function fadeIn(el, display = 'block') {
  el.style.display = display;

  (function fade() {
    let val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

