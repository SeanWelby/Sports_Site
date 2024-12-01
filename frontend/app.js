document.getElementById("search-input").addEventListener("input", function(e) {
    const query = e.target.value.toLowerCase();
    const rows = document.querySelectorAll("#stats-table tr");
    rows.forEach(row => {
        const playerName = row.querySelector("td:first-child") ? row.querySelector("td:first-child").textContent.toLowerCase() : '';
        if (playerName.includes(query)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

fetch('http://localhost:3000/api/players')
  .then(response => response.json())
  .then(data => {
    const statsElement = document.getElementById("stats-table");
    data.forEach(player => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${player.name}</td><td>${player.stats}</td>`;
      statsElement.appendChild(row);
    });
  })
  .catch(error => console.error('Error fetching player data:', error));
