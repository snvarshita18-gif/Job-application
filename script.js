// script.js
// Form validation logic for the job application form

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('jobForm');
  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const dob = document.getElementById('dob');
  const position = document.getElementById('position');
  const resume = document.getElementById('resume');
  const address = document.getElementById('address');
  const coverLetter = document.getElementById('coverLetter');
  const successMessage = document.getElementById('successMessage');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearErrors();
    successMessage.textContent = '';

    if (validateForm()) {
      successMessage.textContent = 'Your application was submitted successfully.';
      form.reset();
    }
  });

  function validateForm() {
    let valid = true;

    if (!fullName.value.trim()) {
      setError(fullName, 'Full name is required.');
      valid = false;
    }

    if (!email.value.trim()) {
      setError(email, 'Email address is required.');
      valid = false;
    } else if (!isValidEmail(email.value)) {
      setError(email, 'Please enter a valid email address.');
      valid = false;
    }

    const phoneDigits = phone.value.replace(/\D/g, '');
    if (!phoneDigits) {
      setError(phone, 'Phone number is required.');
      valid = false;
    } else if (phoneDigits.length !== 10) {
      setError(phone, 'Phone number must have exactly 10 digits.');
      valid = false;
    }

    if (!dob.value) {
      setError(dob, 'Date of birth is required.');
      valid = false;
    }

    if (!isGenderSelected()) {
      setFieldsetError('gender', 'Please select your gender.');
      valid = false;
    }

    if (!position.value) {
      setError(position, 'Please choose a position.');
      valid = false;
    }

    if (!resume.files || resume.files.length === 0) {
      setError(resume, 'Please upload your resume.');
      valid = false;
    }

    if (!isAnySkillChecked()) {
      setFieldsetError('skills', 'Please select at least one skill.');
      valid = false;
    }

    if (!address.value.trim()) {
      setError(address, 'Address is required.');
      valid = false;
    }

    if (!coverLetter.value.trim()) {
      setError(coverLetter, 'Cover letter is required.');
      valid = false;
    }

    return valid;
  }

  function isValidEmail(value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  }

  function isGenderSelected() {
    const genderOptions = document.querySelectorAll('input[name="gender"]');
    return Array.from(genderOptions).some((option) => option.checked);
  }

  function isAnySkillChecked() {
    const skillOptions = document.querySelectorAll('input[name="skills"]');
    return Array.from(skillOptions).some((option) => option.checked);
  }

  function setError(inputElement, message) {
    const container = inputElement.closest('.form-group');
    const errorElement = container ? container.querySelector('.error-message') : null;
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function setFieldsetError(fieldName, message) {
    const input = document.querySelector('fieldset input[name="' + fieldName + '"]');
    if (!input) {
      return;
    }

    let fieldset = input.closest('fieldset');
    if (!fieldset) {
      return;
    }

    const errorElement = fieldset.querySelector('.error-message');
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function clearErrors() {
    const messages = form.querySelectorAll('.error-message');
    messages.forEach((message) => {
      message.textContent = '';
    });
  }
});
