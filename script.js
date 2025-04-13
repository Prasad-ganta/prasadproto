// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Boot sequence text
    const bootText = document.getElementById("bootText")
    const bootMessages = [
      "Initializing system...",
      "Loading core modules...",
      "Checking hardware components...",
      "Establishing neural connections...",
      "Loading personality matrix...",
      "Calibrating visual sensors...",
      "Activating memory banks...",
      "Loading skill database...",
      "Initializing communication protocols...",
      "System boot complete. Welcome to Prasad Ganta's portfolio.",
    ]
  
    let bootIndex = 0
    let charIndex = 0
  
    // Function to simulate typing effect for boot sequence
    function typeBootMessage() {
      if (bootIndex < bootMessages.length) {
        if (charIndex < bootMessages[bootIndex].length) {
          bootText.innerHTML += bootMessages[bootIndex].charAt(charIndex)
          charIndex++
          setTimeout(typeBootMessage, 20)
        } else {
          bootText.innerHTML += "<br><br>"
          bootIndex++
          charIndex = 0
          setTimeout(typeBootMessage, 500)
        }
      } else {
        // Boot sequence complete, show the main content
        setTimeout(() => {
          document.querySelector(".loading-screen").style.opacity = "0"
          setTimeout(() => {
            document.querySelector(".loading-screen").style.display = "none"
            document.querySelector(".container").style.opacity = "1"
  
            // Start the typing animation in the terminal
            startTerminalTyping()
  
            // Initialize other animations
            initializeAnimations()
          }, 1000)
        }, 1000)
      }
    }
  
    // Start the boot sequence
    setTimeout(typeBootMessage, 1000)
  
    // Terminal typing effect
    function startTerminalTyping() {
      const typingText = document.getElementById("typingText")
      const messages = [
        "Hello, I am Prasad Ganta.",
        "Developer | Data Scientist | Problem Solver",
        "Welcome to my portfolio.",
      ]
  
      let messageIndex = 0
      let charIndex = 0
      let isDeleting = false
  
      function type() {
        const currentMessage = messages[messageIndex]
  
        if (isDeleting) {
          typingText.textContent = currentMessage.substring(0, charIndex - 1)
          charIndex--
        } else {
          typingText.textContent = currentMessage.substring(0, charIndex + 1)
          charIndex++
        }
  
        let typeSpeed = isDeleting ? 30 : 100
  
        if (!isDeleting && charIndex === currentMessage.length) {
          // Pause at the end of typing
          typeSpeed = 1500
          isDeleting = true
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false
          messageIndex++
  
          // Cycle back to the first message if we've gone through all of them
          if (messageIndex === messages.length) {
            messageIndex = 0
          }
  
          // Pause before typing the next message
          typeSpeed = 500
        }
  
        setTimeout(type, typeSpeed)
      }
  
      // Start the typing animation
      setTimeout(type, 1000)
    }
  
    // Initialize other animations and interactions
    function initializeAnimations() {
      // Animate skill bars when they come into view
      const skillLevels = document.querySelectorAll(".skill-level")
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.animation = "skillFill 2s ease-out forwards"
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.5 },
      )
  
      skillLevels.forEach((skill) => {
        observer.observe(skill)
      })
  
      // Smooth scrolling for navigation links
      const navLinks = document.querySelectorAll(".nav-link")
      navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault()
  
          const targetId = this.getAttribute("href")
          const targetSection = document.querySelector(targetId)
  
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: "smooth",
          })
        })
      })
  
      // Form submission handling
      const contactForm = document.getElementById("contactForm")
      if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
          e.preventDefault()
  
          // Get form values
          const name = document.getElementById("name").value
          const email = document.getElementById("email").value
          const message = document.getElementById("message").value
  
          // Here you would typically send the form data to a server
          // For now, we'll just show a success message
          alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`)
  
          // Reset the form
          contactForm.reset()
        })
      }
  
      // Add active class to nav links on scroll
      window.addEventListener("scroll", () => {
        const sections = document.querySelectorAll("section")
        const scrollPosition = window.scrollY + 100
  
        sections.forEach((section) => {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          const sectionId = section.getAttribute("id")
  
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add("active")
          } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.remove("active")
          }
        })
      })
  
      // Add parallax effect to the hero section
      window.addEventListener("scroll", () => {
        const heroSection = document.querySelector(".hero")
        const scrollValue = window.scrollY
  
        if (scrollValue < window.innerHeight) {
          heroSection.style.backgroundPositionY = `${scrollValue * 0.5}px`
        }
      })
  
      // Add hover effects to project cards
      const projectCards = document.querySelectorAll(".project-card")
      projectCards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
          this.style.transform = "translateY(-10px)"
          this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.3)"
          this.style.borderColor = "var(--primary-color)"
        })
  
        card.addEventListener("mouseleave", function () {
          this.style.transform = ""
          this.style.boxShadow = ""
          this.style.borderColor = ""
        })
      })
  
      // Profile image fallback and effects
      const profileImg = document.getElementById("profileImg")
  
      // Handle image loading error
      profileImg.onerror = function () {
        this.src = "https://via.placeholder.com/250x250?text=Prasad+Ganta"
        console.log("Profile image could not be loaded. Using placeholder.")
      }
  
      // Add hover effect to profile image
      const profileFrame = document.querySelector(".profile-frame")
      profileFrame.addEventListener("mouseenter", function () {
        profileImg.style.transform = "scale(1.05)"
        this.style.boxShadow = "0 0 30px rgba(12, 255, 12, 0.5)"
      })
  
      profileFrame.addEventListener("mouseleave", function () {
        profileImg.style.transform = "scale(1)"
        this.style.boxShadow = "0 0 20px rgba(12, 255, 12, 0.3)"
      })
    }
  })
  
  // Add a class to show active nav link
  function setActiveNavLink() {
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-link")
  
    window.addEventListener("scroll", () => {
      let current = ""
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        if (window.pageYOffset >= sectionTop - 60) {
          current = section.getAttribute("id")
        }
      })
  
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })
  }
  
  // Add CSS class for active nav link
  document.addEventListener("DOMContentLoaded", () => {
    // Add this CSS rule programmatically
    const style = document.createElement("style")
    style.textContent = `
          .nav-link.active {
              color: var(--primary-color);
          }
          .nav-link.active::after {
              width: 100%;
          }
      `
    document.head.appendChild(style)
  
    // Initialize the active nav link functionality
    setActiveNavLink()
  })