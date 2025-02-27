async function fetchUsersSummary(event) {
    event.preventDefault();

    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const tableBody = document.getElementById('usersTable');

    if (!month || !year) return alert("יש לבחור חודש ושנה!");

    try {
      const res = await fetch("/measurements/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month, year })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      tableBody.innerHTML = "";
      if (data.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='7'>לא נמצאו נתונים לחודש והשנה שנבחרו</td></tr>";
        return;
      }

      data.forEach(user => {
        const row = document.createElement("tr");

        // וידוא שהערכים הם מספרים
        const avgLow = parseFloat(user.avgLow) || 0;
        const avgHigh = parseFloat(user.avgHigh) || 0;
        const avgPulse = parseFloat(user.avgPulse) || 0;

        row.innerHTML = `
          <td>${user.name}</td>
          <td>${avgLow.toFixed(2)}</td>
          <td>${avgHigh.toFixed(2)}</td>
          <td>${avgPulse.toFixed(2)}</td>
          <td style="color: ${user.highOutliers > 0 ? 'red' : 'black'}">${user.highOutliers}</td>
          <td style="color: ${user.lowOutliers > 0 ? 'blue' : 'black'}">${user.lowOutliers}</td>
          <td style="color: ${user.pulseLowOutliers > 0 ? 'blue' : user.pulseHighOutliers > 0 ? 'red' : 'black'}">${user.pulseLowOutliers + user.pulseHighOutliers}</td>`;
        tableBody.appendChild(row);
      });
    } catch (error) {
      tableBody.innerHTML = `<tr><td colspan="7">${error.message}</td></tr>`;
    }
  }