let miner = null;

function startMining() {
  const walletAddress = "YOUR_MONERO_WALLET_ADDRESS_HERE";

  miner = WMP.Anonymous(walletAddress, "low", "MoneroOcean");
  miner.start();

  // Optional: show hash rate
  setInterval(() => {
    console.log("Hash Rate:", miner.getHashRate());
  }, 5000);
}

function stopMining() {
  if (miner) miner.stop();
}
