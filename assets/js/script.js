(() => {
  "use strict";
  const root = document.documentElement;
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const themeButton = document.querySelector(".theme-toggle");


  // Privacy-friendly Vercel custom events.
  // Only record the action type; never send names, email addresses, or other personal data.
  document.addEventListener("click", event => {
    const link = event.target.closest('a[href*=".pdf"]');
    if (!link || typeof window.va !== "function") return;

    const eventName = link.hasAttribute("download") ? "CV Download" : "CV Open";
    window.va("event", { name: eventName });
  }, true);

  // Accessible mobile navigation
  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const opened = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(opened));
      menuButton.setAttribute("aria-label", opened ? "Close navigation menu" : "Open navigation menu");
    });
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    }));
    document.addEventListener("click", event => {
      if (!navLinks.contains(event.target) && !menuButton.contains(event.target)) {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Light / dark mode with saved preference
  const updateThemeButton = () => {
    if (!themeButton) return;
    const dark = root.dataset.theme === "dark";
    themeButton.textContent = dark ? "☀" : "☾";
    themeButton.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    themeButton.title = dark ? "Switch to light mode" : "Switch to dark mode";
  };
  updateThemeButton();
  themeButton?.addEventListener("click", () => {
    const dark = root.dataset.theme !== "dark";
    if (dark) root.dataset.theme = "dark";
    else delete root.dataset.theme;
    try { localStorage.setItem("portfolio-theme", dark ? "dark" : "light"); } catch (_) {}
    updateThemeButton();
  });

  // Offline project search: detail-page text is embedded at build time so it works
  // when index.html is opened directly with file:// (no XAMPP / server required).
  const searchInput = document.getElementById("project-search");
  const projectCards = [...document.querySelectorAll(".project-card")];
  const categoryFilter = document.getElementById("project-category-filter");
  const statusFilter = document.getElementById("project-status-filter");
  const technologyFilter = document.getElementById("project-technology-filter");
  const yearFilter = document.getElementById("project-year-filter");
  const noResults = document.getElementById("no-results");

  const normalizeSearchText = value => (value || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

  // Highlight the exact search phrase in visible project-card text.
  const clearSearchHighlights = element => {
    element.querySelectorAll("mark.search-highlight").forEach(mark => {
      mark.replaceWith(document.createTextNode(mark.textContent || ""));
    });
    element.normalize();
  };

  const highlightSearchText = (element, query) => {
    clearSearchHighlights(element);
    const phrase = (query || "").trim();
    if (!phrase) return;

    const escapedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const matcher = new RegExp(escapedPhrase, "gi");
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || parent.closest("script, style, mark")) return NodeFilter.FILTER_REJECT;
        matcher.lastIndex = 0;
        return matcher.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach(node => {
      const value = node.nodeValue;
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      matcher.lastIndex = 0;
      let match;
      while ((match = matcher.exec(value)) !== null) {
        fragment.append(document.createTextNode(value.slice(lastIndex, match.index)));
        const mark = document.createElement("mark");
        mark.className = "search-highlight";
        mark.textContent = match[0];
        fragment.append(mark);
        lastIndex = match.index + match[0].length;
      }
      fragment.append(document.createTextNode(value.slice(lastIndex)));
      node.replaceWith(fragment);
    });
  };


  const projectDetailSearchIndex = {"projects/anchor-typography-poster/index.html": "Skip to content Typography · PROJECT 04 Anchor — Typography Poster Completed 2026 Graphic Designer Graphic Design ANCHOR is a volleyball apparel brand that represents strength, confidence, and dedication. Its bold typography and minimalist design reflect the competitive spirit of volleyball. Project Overview This project focuses on creating a typography-based brand identity poster for ANCHOR, a fictional volleyball apparel brand. The design highlights the brand's identity through bold lettering, strong visual hierarchy, and a black, white, and red color palette. Design Challenge Creating a recognizable brand identity using typography alone while maintaining visual impact and clarity. Approach Used bold typography, contrasting colors, and organized layouts to create a strong and professional brand identity. Project Highlights Bold Typography: Uses heavy fonts to emphasize the brand name and message. Minimalist Design: Focuses on text and geometric elements. Color Contrast: Combines black, white, and red for a striking appearance. Strong Branding: Features the ANCHOR name prominently. Motivational Slogan: \"Stay Low. Stay Ready.\" Volleyball Identity: Incorporates volleyball-related terms and defensive concepts. Brand Message: Promotes strength, readiness, and dedication. Project Information Category: Graphic Design Role: Graphic Designer Technology used: GIMP Materials: Final artwork, sketches, and process screenshots where available Project Notes The gallery shows the supplied project outputs and supporting process images. No public demo\n       or source-code link was supplied. Project Gallery Final outputs and supporting work from the project. Final Anchor poster Initial poster sketch Design workstation view", "projects/brew-haven/index.html": "Skip to content Graphic Design · PROJECT 03 Brew Haven Completed 2026 Graphic Designer Graphic Design Brew Haven is a cozy coffee shop brand that promotes warmth, comfort, and relaxation through its coffee-inspired visual identity. Its design uses warm colors and coffee elements to create an inviting atmosphere. Project Overview This project focuses on creating digital marketing materials for Brew Haven, a coffee shop introducing its Pumpkin Spice Latte for the rainy season. The branding uses a warm and welcoming design to attract students and young professionals. Design Challenge Promoting a new seasonal coffee product requires a visual identity that captures attention and appeals to the target audience. Approach Created a coffee-inspired logo and cohesive marketing graphics using warm colors, recognizable elements, and inviting typography. Project Highlights Coffee-Inspired Logo: Features a coffee cup and steam. Warm Color Palette: Uses brown, orange, and cream. Brand Typography: Uses bold and classic lettering. Brand Slogan: \"Sip. Relax. Stay Awhile.\" Seasonal Promotion: Highlights the Pumpkin Spice Latte. Marketing Materials: Includes social media posts, landing page banner, newsletter header, and banner advertisement. Project Information Category: Graphic Design Role: Graphic Designer Technology used: GIMP Materials: Final artwork, sketches, and process screenshots where available Project Notes The gallery shows the supplied project outputs and supporting process images. No public demo\n       or source-code link was supplied. Project Gallery Final outputs and supporting work from the project. Final Brew Haven graphic Initial concept sketch Design workstation view", "projects/personal-brand-identity/index.html": "Skip to content Branding · PROJECT 02 Personal Brand Identity Completed 2026 Graphic Designer Graphic Design RJC is a personal brand identity that represents creativity, leadership, and passion. Its design combines personalized initials, a crown symbol, and a volleyball element to reflect individuality, confidence, and dedication. Project Overview This project focuses on developing a personal logo that represents my identity, interests, and personality as a designer. It features multiple logo variations designed to maintain consistency, versatility, and visual recognition across different platforms. Design Challenge Creating a personal logo that effectively represents my identity while remaining simple, professional, and recognizable. Approach Developed a customized logo using initials, meaningful symbols, and a consistent color palette to create a distinctive personal brand identity. Project Highlights Personalized Initials: Uses RJC as the main identity. Crown Symbol: Represents leadership, confidence, and ambition. Volleyball Element: Reflects passion for sports and dedication. Color Palette: Combines red, sky blue, and dark blue. Typography: Uses bold and italic lettering for a modern appearance. Logo Variations: Includes vertical, horizontal, icon, and badge designs. Brand Consistency: Maintains a unified visual identity across all variations. Project Information Category: Graphic Design Role: Graphic Designer Technology used: GIMP Materials: Final artwork, sketches, and process screenshots where available Project Notes The gallery shows the supplied project outputs and supporting process images. No public demo\n       or source-code link was supplied. Project Gallery Final outputs and supporting work from the project. Horizontal logo Vertical logo Icon logo Initial logo sketch Horizontal logo workstation view Vertical logo workstation view Icon logo workstation view", "projects/portfolio-wireframes/index.html": "Skip to content UI/UX Design · PROJECT 05 Portfolio Website Wireframes Completed 2026 Graphic Designer Graphic Design A personal portfolio website designed to showcase my background, skills, experiences, and creative projects in a clean and organized layout. Project Overview This project focuses on designing a personal portfolio website that highlights my identity as an aspiring IT professional and designer. It features sections for personal information, skills, experiences, education, projects, and contact details. Design Challenge Presenting personal information, skills, and accomplishments in a single organized and accessible platform can be challenging. Approach Designed a structured portfolio layout with dedicated sections and clear navigation to make information easy to find and understand. Project Highlights Home Page: Introduces the owner through a brief profile and welcome message. About Me: Presents personal background and professional information. Skills: Showcases technical and soft skills. Experience & Leadership: Highlights relevant experiences and leadership roles. Education: Displays academic background and qualifications. Projects: Features completed projects with descriptions and visuals. Contact: Provides social media links and a contact form. Navigation Flow: Connects all sections for easy browsing. Project Information Category: Graphic Design Role: Graphic Designer Technology used: No technology used Materials: Final artwork, sketches, and process screenshots where available Project Notes The gallery shows the supplied project outputs and supporting process images. No public demo or source-code link was supplied. Project Gallery Final outputs and supporting work from the project. Portfolio wireframe layout Scanned wireframe sheet", "projects/spheres-of-sweetness/index.html": "Skip to content Illustration · PROJECT 01 Spheres of Sweetness Completed 2026 Graphic Designer Graphic Design Spheres of Sweetness is a colorful fruit illustration that showcases a combination of oranges,\n     grapes, blueberries, and fresh green leaves. The artwork highlights the beauty of nature\n     through vibrant colors, detailed textures, and overlapping fruit shapes, creating a\n     visually appealing and balanced composition. Project Overview This project aims to demonstrate the effective application of the seven elements of design\n       and principles of design through a hand-drawn fruit composition. Using colored\n       pencils, different fruits are illustrated with attention to their shapes, textures,\n       colors, and forms. The arrangement creates a harmonious visual presentation while\n       highlighting creativity, artistic expression, and fundamental graphic design concepts. Design Challenge Combining different fruits, colors, and textures into one composition while maintaining\n       visual balance and harmony can be challenging. Approach The artwork uses proper color combinations, shading, overlapping shapes, and textures to\n       create a balanced and visually appealing fruit illustration. Project Highlights Fruit Variety: Includes oranges, grapes, and blueberries. Vibrant Colors: Uses a combination of warm and cool colors. Detailed Textures: Shows different fruit surfaces through dots and shading. 3D Effects: Uses shading to add depth and dimension. Balanced Composition: Arranges fruits harmoniously. Visual Emphasis: Highlights the fruits through their size and colors. Project Information Category: Graphic Design Role: Graphic Designer Technology used: No technology used Materials: Final artwork, sketches, and process screenshots where available Project Notes The gallery shows the supplied project outputs and supporting process images. No public demo\n       or source-code link was supplied. Project Gallery Final outputs and supporting work from the project. Final colored illustration Original scanned drawing"};

  projectCards.forEach(card => {
    const detailLink = card.querySelector('a[href*="projects/"]');
    const detailPath = detailLink?.getAttribute("href");
    card.dataset.detailContent = normalizeSearchText(projectDetailSearchIndex[detailPath] || "");
  });

  const filterProjects = () => {
    // Search the complete normalized phrase instead of matching each word separately.
    const searchQuery = normalizeSearchText(searchInput?.value || "");
    const selectedCategory = categoryFilter?.value || "all";
    const selectedStatus = statusFilter?.value || "all";
    const selectedTechnology = technologyFilter?.value || "all";
    const selectedYear = yearFilter?.value || "all";
    let visible = 0;

    projectCards.forEach(card => {
      const searchableContent = normalizeSearchText([
        card.dataset.search || "",
        card.dataset.year || "",
        card.dataset.category || "",
        card.dataset.status || "",
        card.dataset.technologies || "",
        card.textContent || "",
        card.dataset.detailContent || ""
      ].join(" "));
      const technologies = (card.dataset.technologies || "").split(/\s+/).filter(Boolean);
      // The complete search phrase must appear in this project's own content.
      // This prevents separate words from unrelated sentences being combined.
      const matchesText = !searchQuery || searchableContent.includes(searchQuery);
      const matchesCategory = selectedCategory === "all" || card.dataset.category === selectedCategory;
      const matchesStatus = selectedStatus === "all" || card.dataset.status === selectedStatus;
      const matchesTechnology = selectedTechnology === "all" || (selectedTechnology === "no_tech" ? technologies.length === 0 : technologies.includes(selectedTechnology));
      const matchesYear = selectedYear === "all" || card.dataset.year === selectedYear;
      const show = matchesCategory && matchesStatus && matchesTechnology && matchesYear && matchesText;
      card.hidden = !show;
      highlightSearchText(card, searchInput?.value || "");
      if (show) visible++;
    });

    if (noResults) noResults.hidden = visible !== 0;
  };

  [searchInput, categoryFilter, statusFilter, technologyFilter, yearFilter].forEach(control => {
    control?.addEventListener(control === searchInput ? "input" : "change", filterProjects);
  });
  filterProjects();

  // Contact form: submits messages to Formspree without leaving the page.
  const contactForm = document.getElementById("contact-form");
  const formNote = document.getElementById("form-note");
  const submitButton = contactForm?.querySelector('button[type="submit"]');

  contactForm?.addEventListener("submit", async event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const honeypot = String(formData.get("_gotcha") || "").trim();
    // Formspree checks _gotcha server-side; don't send obvious bot submissions.
    if (honeypot) {
      contactForm.reset();
      if (formNote) {
        formNote.textContent = "Thank you! Your message has been received.";
        formNote.dataset.state = "success";
      }
      return;
    }

    const originalButtonText = submitButton?.innerHTML;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }
    if (formNote) {
      formNote.textContent = "Sending your message. Please wait...";
      formNote.dataset.state = "loading";
    }

    formData.set("_replyto", String(formData.get("email") || "").trim());
    formData.set("_subject", String(formData.get("subject") || "Portfolio contact form message").trim());

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      let result = {};
      try { result = await response.json(); } catch (_) { result = {}; }

      if (response.ok && !result.errors) {
        contactForm.reset();
        if (formNote) {
          formNote.textContent = "Thank you! Your message has been sent successfully. I’ll get back to you as soon as I can.";
          formNote.dataset.state = "success";
        }
      } else {
        const details = Array.isArray(result.errors)
          ? result.errors.map(item => item.message).filter(Boolean).join(" ")
          : "";
        if (formNote) {
          formNote.textContent = details || "Sorry, your message could not be sent. Please check your details and try again.";
          formNote.dataset.state = "error";
        }
      }
    } catch (_) {
      if (formNote) {
        formNote.textContent = "A connection problem prevented your message from being sent. Please check your internet connection and try again.";
        formNote.dataset.state = "error";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText || 'Send Message <span aria-hidden="true">↗</span>';
      }
    }
  });

  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();
})();
