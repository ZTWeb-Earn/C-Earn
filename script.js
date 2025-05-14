let miner = null;
let mining = false;
let points = 0;
let pointInterval = null;

// Check for saved login
window.onload = () => {
  if (localStorage.getItem('consentGiven') === 'true') {
    document.getElementById('consent').style.display = 'none';
  } else {
    document.getElementById('consent').classList.add('show');
  }

  if (localStorage.getItem('user')) {
    const username = localStorage.getItem('user');
    showApp(username);
  }
};

// Login logic
function login() {
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();

  if (user && pass) {
    localStorage.setItem('user', user);
    showApp(user);
  } else {
    alert('Please enter both username and password.');
  }
}

// Show main app
function showApp(user) {
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  document.getElementById('displayUser').textContent = user;

  const savedPoints = localStorage.getItem(`${user}_points`);
  points = savedPoints ? parseInt(savedPoints) : 0;
  document.getElementById('points').textContent = points;
}

// Start mining
function startMining() {
  if (!miner) {
    const walletAddress = "YOUR_MONERO_WALLET_ADDRESS"; // Replace this!
    miner = WMP.Anonymous(walletAddress, "low", "ZTWebUser");
  }

  miner.start();
  mining = true;

  document.getElementById('miningStatus').style.display = 'block';
  alert('Mining Started!');
  
  pointInterval = setInterval(() => {
    points++;
    document.getElementById('points').textContent = points;
    const user = localStorage.getItem('user');
    localStorage.setItem(`${user}_points`, points);
  }, 60000);
}

// Stop mining
function stopMining() {
  if (miner) miner.stop();
  mining = false;
  clearInterval(pointInterval);

  document.getElementById('miningStatus').style.display = 'none';
  alert('Mining Stopped!');
}

// Consent functions
function declineMining() {
  document.getElementById('consent').classList.remove('show');
  document.getElementById('consent').style.display = 'none';
}

function logout() {
  localStorage.removeItem('user');
  location.reload();
}
