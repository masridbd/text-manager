const correctPin = "234432";

function checkPin() {
    const pinInput = document.getElementById("pin-input").value;
    const errorMessage = document.getElementById("error-message");

    if (pinInput === correctPin) {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("main-container").style.display = "block";
        loadText();
    } else {
        errorMessage.textContent = "Incorrect PIN. Please try again.";
    }
}

function saveText() {
    const newText = document.getElementById("new-text").value;
    if (newText.trim() === "") return;

    // Save current text
    localStorage.setItem("currentText", newText);

    // Update history
    let history = JSON.parse(localStorage.getItem("textHistory")) || [];
    history.unshift({ text: newText, timestamp: new Date().toLocaleString() });
    localStorage.setItem("textHistory", JSON.stringify(history));

    // Update UI
    loadText();
    document.getElementById("new-text").value = "";
}

function loadText() {
    const currentText = localStorage.getItem("currentText") || "No text available";
    document.getElementById("current-text").textContent = currentText;

    const history = JSON.parse(localStorage.getItem("textHistory")) || [];
    const historyList = document.getElementById("text-history");
    historyList.innerHTML = "";
    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.text} (${item.timestamp})`;
        historyList.appendChild(li);
    });
}

function downloadCurrentText() {
    const currentText = localStorage.getItem("currentText") || "No text available";
    const link = document.createElement("a");
    link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(currentText)}`;
    link.download = "current_text.txt";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Handle the /current_text.txt URL
document.addEventListener("DOMContentLoaded", () => {
    // Check if the current URL ends with /current_text.txt
    if (window.location.pathname.endsWith("/current_text.txt")) {
        downloadCurrentText();
        // Redirect back to the homepage after download
        window.location.href = "/text-manager/";
    } else {
        loadText();
    }
});    const history = JSON.parse(localStorage.getItem("textHistory")) || [];
    const historyList = document.getElementById("text-history");
    historyList.innerHTML = "";
    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.text} (${item.timestamp})`;
        historyList.appendChild(li);
    });

    // Update current_text.txt (simulated for client-side)
    updateCurrentTextFile(currentText);
}

function updateCurrentTextFile(text) {
    // Since GitHub Pages is static, we can't write to current_text.txt directly.
    // Instead, we'll make the content available for download or display.
    const link = document.createElement("a");
    link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
    link.download = "current_text.txt";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Load text on page load
document.addEventListener("DOMContentLoaded", loadText);
