document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            let inquiries = JSON.parse(localStorage.getItem("inquiries")) || [];
            const inquiry = {
                username: document.getElementById("username").value,
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                company: document.getElementById("company").value,
                country: document.getElementById("country").value,
                jobTitle: document.getElementById("jobTitle").value,
                jobDetails: document.getElementById("jobDetails").value
            };
            inquiries.push(inquiry);
            localStorage.setItem("inquiries", JSON.stringify(inquiries));
            document.getElementById("successMsg").innerText = "Inquiry sent successfully!";
            form.reset();
        });
    }

    const storedInquiries = JSON.parse(localStorage.getItem("inquiries")) || [];

    if (document.getElementById("inquiryCount")) {
        if (localStorage.getItem("adminLoggedIn") !== "true") {
            window.location.href = "login.html";
        } else {
            document.getElementById("inquiryCount").innerText = storedInquiries.length;
            const tableBody = document.getElementById("inquiryTableBody");
            storedInquiries.forEach(inquiry => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${inquiry.username}</td>
                    <td>${inquiry.name}</td>
                    <td>${inquiry.email}</td>
                    <td>${inquiry.phone}</td>
                    <td>${inquiry.company}</td>
                    <td>${inquiry.country}</td>
                    <td>${inquiry.jobTitle}</td>
                    <td>${inquiry.jobDetails}</td>
                `;
                tableBody.appendChild(row);
            });
        }
    }

    const loginForm = document.getElementById("adminLoginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("adminUsername").value;
            const password = document.getElementById("adminPassword").value;
            if (username === "admin" && password === "admin123") {
                localStorage.setItem("adminLoggedIn", "true");
                window.location.href = "admin.html";
            } else {
                document.getElementById("loginError").innerText = "Invalid credentials!";
            }
        });
    }

const counters = document.querySelectorAll(".count-up");
let counted = false;

  function animateCountUp() {
    if (counted) return;

    const section = document.querySelector("#why-choose-us");
    const sectionTop = section.getBoundingClientRect().top;
    const trigger = window.innerHeight - 100;

    if (sectionTop < trigger) {
      counters.forEach(counter => {
        const updateCount = () => {
          const target = +counter.getAttribute("data-target");
          const count = +counter.innerText;
          const increment = target / 100;

          if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 15);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });
      counted = true;
    }
  }

  window.addEventListener("scroll", animateCountUp);


});



