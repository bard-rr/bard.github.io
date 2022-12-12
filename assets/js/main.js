/**
 * Template Name: Selecao - v4.9.1
 * Template URL: https://bootstrapmade.com/selecao-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scroll with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  /*Bard specific code for the toc and case study*/
  const caseStudy = document.getElementById("case-study");
  const caseStudyText = document.querySelector(".prose");
  const toc = document.getElementById("toc");
  const tocLinks = document.querySelectorAll("#toc a");
  const tocLinksCount = tocLinks.length;

  // Handlers
  const handleScroll = (event) => {
    handleTocVisibility();
    handleTocSelection();
  };

  const handleResize = () => {
    handleProseSize();
    handleTocVisibility();
    handleTocSelection();
  };

  const handlePageLoad = () => {
    handleProseSize();
    handleTocVisibility();
    handleTocSelection();
  };

  const handleProseSize = () => {
    if (window.innerWidth >= 1280) {
      caseStudyText.classList.remove("prose-lg");
      caseStudyText.classList.add("prose-xl");
    } else if (window.innerWidth >= 1024) {
      caseStudyText.classList.remove("prose-xl");
      caseStudyText.classList.add("prose-lg");
    } else {
      caseStudyText.classList.remove("prose-lg");
      caseStudyText.classList.remove("prose-xl");
    }
  };

  const handleTocVisibility = () => {
    const tocIsVisible = () => {
      const caseStudyTopIsVisible = window.scrollY >= caseStudy.offsetTop;
      const caseStudyBottomIsVisible =
        window.scrollY + window.innerHeight >
        caseStudy.offsetHeight + caseStudy.offsetTop;

      return caseStudyTopIsVisible && !caseStudyBottomIsVisible;
    };
    if (tocIsVisible()) {
      toc.classList.add("show");
    } else {
      toc.classList.remove("show");
    }
  };

  const handleTocSelection = () => {
    const clearSelectedToc = () => {
      const selectedTocItems = document.querySelectorAll("#toc .selected");
      const subItems = document.querySelectorAll(`li.subitem.show`);

      //hide any open subitems
      subItems.forEach((subItem) => {
        subItem.classList.remove("show");
      });

      //remove the selected items
      selectedTocItems.forEach((selectedTocItem) => {
        selectedTocItem.classList.remove("selected");
      });
    };

    const selectTocItem = (link) => {
      const tocItem = link.closest("li");
      const dataSection = tocItem.dataset.section;
      const subItems = document.querySelectorAll(
        `li.subitem[data-section="${dataSection}"]`
      );

      subItems.forEach((subItem) => {
        subItem.classList.add("show");
      });

      tocItem.classList.add("selected");
    };

    //do nothing if we don't want to show the toc
    if (!toc.classList.contains("show")) return;

    //for each link in the toc
    for (let i = tocLinksCount - 1; i >= 0; i--) {
      const link = tocLinks[i];
      //link.hash is the place the anchor links to.
      if (!link.hash) continue;
      const target = document.querySelector(link.hash);

      //if the target exists and its reasonable far away
      if (!!target && target.offsetTop <= window.scrollY + 16 * 2) {
        clearSelectedToc();
        selectTocItem(link, target);

        break;
      }
    }
  };

  // Helpers
  const throttle = (callback, wait) => {
    let prevent = false;

    return function (event) {
      if (!prevent) {
        callback(event);
        prevent = true;
        setTimeout(function () {
          prevent = false;
        }, wait);
      }
    };
  };

  //events
  document.addEventListener("DOMContentLoaded", handlePageLoad);
  document.addEventListener("scroll", throttle(handleScroll, 16));
  window.addEventListener("resize", throttle(handleResize, 16));
})();
