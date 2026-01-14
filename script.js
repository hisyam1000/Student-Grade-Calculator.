// 1. Array untuk simpan data (Konsep: Arrays/Lists)
let subjects = JSON.parse(localStorage.getItem("studentData")) || [];

// Papar data sedia ada bila buka page
displayData();

function addSubject() {
    const name = document.getElementById("subjectName").value;
    const mark = parseFloat(document.getElementById("marks").value);

    // 2. Input Validation (Konsep: Selection/If-Else)
    if (name === "" || isNaN(mark) || mark < 0 || mark > 100) {
        alert("Sila masukkan nama subjek dan markah yang sah (0-100)!");
        return;
    }

    // 3. Menentukan Gred (Konsep: Selection)
    let grade = "";
    if (mark >= 80) grade = "A";
    else if (mark >= 60) grade = "B";
    else if (mark >= 40) grade = "C";
    else grade = "F";

    // Simpan ke dalam array
    subjects.push({ name, mark, grade });
    
    // 4. Data Persistence (Konsep: Local Storage)
    localStorage.setItem("studentData", JSON.stringify(subjects));
    
    displayData();
}

function displayData() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    let total = 0;

    // 5. Memproses data (Konsep: Loops)
    subjects.forEach((item, index) => {
        total += item.mark;
        tableBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.mark}</td>
                <td>${item.grade}</td>
                <td><button onclick="deleteItem(${index})">X</button></td>
            </tr>`;
    });

    // 6. Pengiraan Purata (Konsep: Calculations)
    const avg = subjects.length > 0 ? (total / subjects.length).toFixed(2) : 0;
    document.getElementById("averageScore").innerText = avg;
    document.getElementById("finalStatus").innerText = avg >= 40 ? "LULUS" : "GAGAL";
}

function deleteItem(index) {
    subjects.splice(index, 1);
    localStorage.setItem("studentData", JSON.stringify(subjects));
    displayData();
}

function clearData() {
    localStorage.clear();
    subjects = [];
    displayData();
}
