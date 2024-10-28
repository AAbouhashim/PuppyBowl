// Fetch player roster
const fetchPlayers = async () => {
  try {
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2049-FTB-ET-WEB-FT/players`);
    const responseData = await response.json();
    console.log(responseData.data);
    return responseData.data.players;
  } catch (error) {
    console.error(`No Response from Server.`, error);
  }
};

// Render puppies to the Free Agents section
const renderPuppies = async () => {
  const players = await fetchPlayers();
  const freeAgentsSection = document.getElementById(`free-agents`);

  players.forEach(player => {
    const puppyUL = document.createElement(`ul`);
    puppyUL.classList.add("puppy-entry");

    puppyUL.innerHTML = `
      <li id="name">${player.name}</li>
      <li><img src="${player.imageUrl}" alt="${player.name}"></li>
      <li id="breed-status">${player.breed} --- <span class="status">${player.status.toUpperCase()}</span></li>
      <li id="add-to-roster"><button>Add to Roster</button></li>
    `;

    // Add click event listener to the "Add to Roster" button
    const addButton = puppyUL.querySelector("button");
    addButton.addEventListener("click", () => moveToRoster(puppyUL));

    freeAgentsSection.appendChild(puppyUL);
  });
};

// Move a puppy from Free Agents to Your Winning Team
const moveToRoster = (puppyUL) => {
  const teamRosterSection = document.getElementById("puppy-roster");

  // Update status to "field"
  const statusSpan = puppyUL.querySelector(".status");
  statusSpan.textContent = "FIELD";

  // Replace "Add to Roster" button with "Remove from Roster" button
  const addButton = puppyUL.querySelector("button");
  addButton.textContent = "Remove from Roster";
  addButton.removeEventListener("click", () => moveToRoster(puppyUL));
  addButton.addEventListener("click", () => removeFromRoster(puppyUL));

  // Append the puppy to the "Your Winning Team" section
  teamRosterSection.appendChild(puppyUL);
};

// Remove a puppy from "Your Winning Team" and return to "Free Agents"
const removeFromRoster = (puppyUL) => {
  const freeAgentsSection = document.getElementById("free-agents");

  // Update status to "bench"
  const statusSpan = puppyUL.querySelector(".status");
  statusSpan.textContent = "BENCH";

  // Replace "Remove from Roster" button with "Add to Roster" button
  const removeButton = puppyUL.querySelector("button");
  removeButton.textContent = "Add to Roster";
  removeButton.removeEventListener("click", () => removeFromRoster(puppyUL));
  removeButton.addEventListener("click", () => moveToRoster(puppyUL));

  // Move the puppy back to the Free Agents section
  freeAgentsSection.appendChild(puppyUL);
};

// Initial call to fetch and render free agent puppies
renderPuppies();

