document.addEventListener("DOMContentLoaded", () => {
  startTerminalTyping()
  initializeAnimations()

  // ✅ EmailJS INIT (correct)
  emailjs.init("np1TNJ41IWr0kLS5h")
})

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
      typeSpeed = 1500
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      messageIndex = (messageIndex + 1) % messages.length
      typeSpeed = 500
    }

    setTimeout(type, typeSpeed)
  }

  setTimeout(type, 500)
}

function initializeAnimations() {

  // Skill animation
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
    { threshold: 0.5 }
  )

  skillLevels.forEach((skill) => observer.observe(skill))

  // Smooth scrolling
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetSection = document.querySelector(this.getAttribute("href"))
      window.scrollTo({ top: targetSection.offsetTop - 80, behavior: "smooth" })
    })
  })

  // ✅ CONTACT FORM (FIXED COMPLETELY)
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      const submitBtn = contactForm.querySelector(".submit-btn span")
      submitBtn.textContent = "TRANSMITTING..."

      emailjs.send("service_559gits", "template_oyynjc8", {
        from_name: name,
        from_email: email,
        message: message
      })
      .then(() => {
        submitBtn.textContent = "MESSAGE SENT ✓"
        contactForm.reset()

        setTimeout(() => {
          submitBtn.textContent = "TRANSMIT"
        }, 3000)
      })
      .catch((error) => {
        console.error("EmailJS error:", error)
        submitBtn.textContent = "FAILED — TRY AGAIN"

        setTimeout(() => {
          submitBtn.textContent = "TRANSMIT"
        }, 3000)
      })
    })
  }

  // Active nav link on scroll
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section")
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionId = section.getAttribute("id")
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

      if (navLink) {
        if (
          scrollPosition >= section.offsetTop &&
          scrollPosition < section.offsetTop + section.offsetHeight
        ) {
          navLink.classList.add("active")
        } else {
          navLink.classList.remove("active")
        }
      }
    })
  })

  // Parallax effect
  window.addEventListener("scroll", () => {
    const heroSection = document.querySelector(".hero")
    const scrollValue = window.scrollY

    if (scrollValue < window.innerHeight) {
      heroSection.style.backgroundPositionY = `${scrollValue * 0.5}px`
    }
  })

  // Project hover effects
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)"
      this.style.boxShadow = "0 15px 30px rgba(0,0,0,0.3)"
      this.style.borderColor = "var(--primary-color)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = ""
      this.style.boxShadow = ""
      this.style.borderColor = ""
    })
  })

  // Profile image fallback
  const profileImg = document.getElementById("profileImg")
  if (profileImg) {
    profileImg.onerror = function () {
      this.src = "https://via.placeholder.com/250x250?text=Prasad+Ganta"
    }
  }
}
