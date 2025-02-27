async function fetchMeasurements(event) {
    event.preventDefault();

    const userId = "<%= user_id %>";
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const tableBody = document.getElementById('measurementsTable');

    if (!startDate || !endDate) return alert("יש לבחור טווח תאריכים!");

    try {
      const res = await fetch(`/measurements/history/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start_date: startDate, end_date: endDate })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      tableBody.innerHTML = "";
      if (data.measurements.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='4'>לא נמצאו מדידות בטווח התאריכים שנבחר</td></tr>";
        return;
      }

      data.measurements.forEach(m => {
        const row = document.createElement("tr");

        let lowColor = m.is_low_low ? "blue" : "black"; // רק נמוך מהממוצע נחשב חריג
        let highColor = m.is_high ? "red" : "black";
        let pulseColor = m.is_pulse_high ? "red" : m.is_pulse_low ? "blue" : "black";

        row.innerHTML = `
          <td>${m.time.split("T")[0]}</td>
          <td style="color: ${lowColor}">${m.lowValue}</td>
          <td style="color: ${highColor}">${m.highValue}</td>
          <td style="color: ${pulseColor}">${m.pulse}</td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      tableBody.innerHTML = `<tr><td colspan="4">${error.message}</td></tr>`;
    }
  }