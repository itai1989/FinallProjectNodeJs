function goToHistory() {
    const userId = document.getElementById('selectUser').value;
    if (!userId) return alert("בחר מטופל קודם!");
    
    window.location.href = `/pages/history/${userId}`;
  }

  async function submitMeasurement(event) {
    event.preventDefault();

    const userId = document.getElementById('selectUser').value;
    if (!userId) return alert("בחר מטופל קודם!");

    const date = document.getElementById('date').value;
    const lowValue = document.getElementById('lowValue').value;
    const highValue = document.getElementById('highValue').value;
    const pulse = document.getElementById('pulse').value;

    try {
      const res = await fetch('/measurements', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, date, lowValue, highValue, pulse })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("המדידה נוספה בהצלחה!");
    } catch (error) {
      alert(error.message);
    }
  }