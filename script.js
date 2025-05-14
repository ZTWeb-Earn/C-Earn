let miner = null;
let miningInterval = null;

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (!user || !pass) {
    alert("Enter both username and password.");
    return;
  }

  // Simulate login with localStorage
  localStorage.setItem("user", user);
  localStorage.setItem("points_" + user, localStorage.getItem("points_" + user) || "0");

  document.getElementById("login-container").style.display = "none";
  document.getElementById("app").style.display = "block";
  document.getElementById("displayUser").innerText = user;
  document.getElementById("points").innerText = localStorage.getItem("points_" + user);
}

function logout() {
  localStorage.removeItem("user");
  location.reload();
}

function startMining() {
  const user = localStorage.getItem("user");
  if (!user) return;

  if (!miner) {
    miner = WMP.User(user, "low", "worker", "MoneroOcean");
  }

  miner.start();

  miningInterval = setInterval(() => {
    let points = parseInt(localStorage.getItem("points_" + user) || "0");
    points += 1; // 1 point per interval (you can adjust timing)
    localStorage.setItem("points_" + user, points);
    document.getElementById("points").innerText = points;
  }, 60000); // Every 1 minute
}

function stopMining() {
  if (miner) miner.stop();
  if (miningInterval) clearInterval(miningInterval);
}
