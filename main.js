const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const signupMsg = document.getElementById('signupMsg');
const loginMsg = document.getElementById('loginMsg');
const profileDiv = document.getElementById('profile');

signupForm.onsubmit = async e => {
  e.preventDefault();
  signupMsg.textContent = '';
  const data = Object.fromEntries(new FormData(signupForm));
  const res = await fetch('/api/signup', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
  });
  const result = await res.json();
  if (res.ok) {
    profileDiv.innerHTML = `<b>Welcome, ${result.username}!</b><br>Email: ${result.email}`;
    profileDiv.style.display = 'block';
    signupForm.style.display = 'none';
    loginForm.style.display = 'none';
  } else {
    signupMsg.textContent = result.error;
  }
};

loginForm.onsubmit = async e => {
  e.preventDefault();
  loginMsg.textContent = '';
  const data = Object.fromEntries(new FormData(loginForm));
  const res = await fetch('/api/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
  });
  const result = await res.json();
  if (res.ok) {
    profileDiv.innerHTML = `<b>Welcome back, ${result.username}!</b><br>Email: ${result.email}`;
    profileDiv.style.display = 'block';
    signupForm.style.display = 'none';
    loginForm.style.display = 'none';
  } else {
    loginMsg.textContent = result.error;
  }
};
