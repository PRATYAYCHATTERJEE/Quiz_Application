const form = document.getElementById('joinForm');
const joinBtn = document.getElementById('joinBtn');
const participantCount = document.getElementById('participantCount');
const currentDate = document.getElementById('currentDate');
const currentTime = document.getElementById('currentTime');

const fields = {
  name: document.getElementById('name'),
  department: document.getElementById('department'),
  year: document.getElementById('year'),
  phone: document.getElementById('phone'),
};

const errors = {
  name: document.getElementById('nameError'),
  department: document.getElementById('departmentError'),
  year: document.getElementById('yearError'),
  phone: document.getElementById('phoneError'),
};

function setError(fieldName, message) {
  errors[fieldName].textContent = message;
}

function clearErrors() {
  Object.values(errors).forEach((el) => {
    el.textContent = '';
  });
}

function validateForm() {

  let isValid = true;

  clearErrors();

  const name = fields.name.value.trim();

  if (!name) {
    setError('name', 'Name is required.');
    isValid = false;
  }

  if (!fields.department.value) {
    setError('department', 'Please select a department.');
    isValid = false;
  }

  if (!fields.year.value) {
    setError('year', 'Please select a year.');
    isValid = false;
  }

  if (!/^\d{10}$/.test(fields.phone.value)) {
    setError('phone', 'Phone number must be exactly 10 digits.');
    isValid = false;
  }

  return isValid;

}

function createRipple(event) {

  const button = event.currentTarget;

  const ripple = document.createElement('span');

  const rect = button.getBoundingClientRect();

  const size = Math.max(rect.width, rect.height);

  ripple.className = 'ripple';

  ripple.style.width = ripple.style.height = `${size}px`;

  ripple.style.left = `${event.clientX - rect.left}px`;

  ripple.style.top = `${event.clientY - rect.top}px`;

  button.appendChild(ripple);

  setTimeout(() => ripple.remove(), 550);

}

joinBtn.addEventListener('click', createRipple);

// ======================================
// Register Participant
// ======================================

form.addEventListener('submit', async function (event) {

  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  joinBtn.classList.add('loading');
  joinBtn.querySelector('.text').textContent = 'Joining Quiz...';

  const participant = {

    name: fields.name.value.trim(),

    department: fields.department.value,

    year: fields.year.value,

    phone: fields.phone.value.trim()

  };

  try {

    const response = await fetch("http://localhost:5000/api/participants/register", {

      method: "POST",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify(participant)

    });

    const result = await response.json();

    if (result.success) {

      // Save participant details
      localStorage.setItem("participantId", result.data._id);

      localStorage.setItem("participantName", participant.name);

      localStorage.setItem("participantDepartment", participant.department);

      localStorage.setItem("participantYear", participant.year);

      localStorage.setItem("participantPhone", participant.phone);

      setTimeout(() => {

        window.location.href = "quiz2.html";

      }, 1100);

    } else {

      alert(result.message);

      joinBtn.classList.remove("loading");

      joinBtn.querySelector(".text").textContent = "Join Quiz";

    }

  } catch (error) {

    console.error(error);

    alert("Cannot connect to server.");

    joinBtn.classList.remove("loading");

    joinBtn.querySelector(".text").textContent = "Join Quiz";

  }

});

function updateClock() {

  const now = new Date();

  currentDate.textContent = now.toLocaleDateString('en-US', {

    month: 'short',

    day: 'numeric',

    year: 'numeric'

  });

  currentTime.textContent = now.toLocaleTimeString('en-US', {

    hour: 'numeric',

    minute: '2-digit'

  });

}

// Dummy Participant Count
participantCount.textContent = String(245 + Math.floor(Math.random() * 18));

updateClock();

setInterval(updateClock, 1000);