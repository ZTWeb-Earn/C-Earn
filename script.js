let miner = null;
let miningInterval = null;

// Button animation and popup
function animateButton(button, message) {
  button.classList.add("clicked");
  setTimeout(() => button.classList.remove("clicked"), 200);

  // Popup message
  const popup = document.createElement("div");
  popup.innerText = message;
  popup.className = "popup-message";
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 2000);
}

// Login system using localStorage
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (!user || !pass) {
    alert("Please enter both username and password.");
    return;
  }

  localStorage.setItem("user", user);
  localStorage.setItem("points_" + user, localStorage.getItem("points_" + user) || "0");

  document.getElementById("login-container").style.display = "none";
  document.getElementById("app").style.display = "block";
  document.getElementById("displayUser").innerText = user;
  document.getElementById("points").innerText = localStorage.getItem("points_" + user);
}

// Logout function
function logout() {
  localStorage.removeItem("user");
  location.reload();
}

// Start mining Monero using WebMinerPool and count points
function startMining() {
  const user = localStorage.getItem("user");
  if (!user) return;

  const walletAddress = "47BXT5PE6B26tEmKEqn3xrB39MGra1jCP2dv7kZ131eJfMGuucwKnhbggyc8q4j3xvdc5kmUw9fi6UQ7N3i1Rz88QdxEp97"; // Replace this!

  if (!miner) {
    miner = WMP.Anonymous(walletAddress, "low", "MoneroOcean");
  }

  miner.start();

  miningInterval = setInterval(() => {
    let points = parseInt(localStorage.getItem("points_" + user) || "0");
    points += 1;
    localStorage.setItem("points_" + user, points);
    document.getElementById("points").innerText = points;
  }, 60000); // 1 point per minute

  animateButton(document.querySelector("button[onclick='startMining()']"), "Mining Started!");
}

// Stop mining and clear timer
function stopMining() {
  if (miner) miner.stop();
  if (miningInterval) clearInterval(miningInterval);

  animateButton(document.querySelector("button[onclick='stopMining()']"), "Mining Stopped!");
}
