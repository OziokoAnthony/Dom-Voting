"use strict";
const names = [
    "Anthony", "Augustine", "James", "Charlse", "David",
    "Christopher", "Ifeanyi", "Rita", "Loveth", "Chidinma",
    "Victor", "Amara", "Majesty", "Gabriel", "Peter",
    "Abigail", "Kosisochukwu", "Lilian", "Bonaventure", "Stephine"
];
let voters = JSON.parse(localStorage.getItem("voters") || "null");
let votes = JSON.parse(localStorage.getItem("votes") || "null");
if (!voters) {
    voters = {};
    names.forEach(function (name) {
        voters[name] = false;
    });
}
if (!votes) {
    votes = {};
    names.forEach(function (name) {
        votes[name] = 0;
    });
}
const voter = document.getElementById("voter");
const contestant = document.getElementById("contestant");
const voteBtn = document.getElementById("voteBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const total = document.getElementById("total");
const cast = document.getElementById("cast");
const left = document.getElementById("left");
const winner = document.getElementById("winner");
const winnerVotes = document.getElementById("winnerVotes");
const result = document.getElementById("result");
function saveData() {
    localStorage.setItem("voters", JSON.stringify(voters));
    localStorage.setItem("votes", JSON.stringify(votes));
}
function showResults() {
    result.innerHTML = "";
    let totalVotes = 0;
    let winningName = "";
    let highestVotes = 0;
    let numberVoted = 0;
    names.forEach(function (name) {
        totalVotes += votes[name];
        if (votes[name] > highestVotes) {
            highestVotes = votes[name];
            winningName = name;
        }
        if (voters[name]) {
            numberVoted++;
        }
    });
    total.textContent = String(names.length);
    cast.textContent = String(numberVoted);
    left.textContent = String(names.length - numberVoted);
    if (totalVotes === 0) {
        winner.textContent = "No votes yet";
        winnerVotes.textContent = "0 votes";
    }
    else {
        winner.textContent = winningName;
        winnerVotes.textContent = highestVotes + (highestVotes === 1 ? " vote" : " votes");
    }
    names.forEach(function (name) {
        let percentage = 0;
        if (totalVotes > 0) {
            percentage = (votes[name] / totalVotes) * 100;
        }
        const row = document.createElement("div");
        row.className = "row";
        const nameDiv = document.createElement("div");
        nameDiv.className = "name";
        const nameText = document.createElement("span");
        nameText.textContent = name;
        const voteText = document.createElement("span");
        voteText.textContent = votes[name] + (votes[name] === 1 ? " vote" : " votes");
        nameDiv.appendChild(nameText);
        nameDiv.appendChild(voteText);
        const bar = document.createElement("div");
        bar.className = "bar";
        const fill = document.createElement("div");
        fill.style.width = percentage + "%";
        bar.appendChild(fill);
        row.appendChild(nameDiv);
        row.appendChild(bar);
        result.appendChild(row);
    });
}
voteBtn.addEventListener("click", function () {
    const selectedVoter = voter.value;
    const selectedContestant = contestant.value;
    if (selectedVoter === "") {
        message.textContent = "Please select your name.";
        message.className = "error";
        return;
    }
    if (selectedContestant === "") {
        message.textContent = "Please select who you want to vote for.";
        message.className = "error";
        return;
    }
    if (voters[selectedVoter]) {
        message.textContent = "You have already voted.";
        message.className = "error";
        return;
    }
    votes[selectedContestant]++;
    voters[selectedVoter] = true;
    saveData();
    showResults();
    message.textContent = selectedVoter + " voted for " + selectedContestant + ".";
    message.className = "success";
    voter.value = "";
    contestant.value = "";
});
resetBtn.addEventListener("click", function () {
    if (!confirm("Reset all votes?")) {
        return;
    }
    names.forEach(function (name) {
        voters[name] = false;
        votes[name] = 0;
    });
    saveData();
    showResults();
    voter.value = "";
    contestant.value = "";
    message.textContent = "All votes have been reset.";
    message.className = "success";
});
showResults();
