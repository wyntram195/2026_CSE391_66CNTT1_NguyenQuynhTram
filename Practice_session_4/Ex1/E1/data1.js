let students = [];
let filteredStudents = [];
let sortAsc = true;

const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");
const stats = document.getElementById("stats");
const searchInput = document.getElementById("search");
const filterRank = document.getElementById("filterRank");
const sortScore = document.getElementById("sortScore");
const arrow = document.getElementById("arrow");

function getRank(score){
    if(score >= 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5) return "Trung bình";
    return "Yếu";
}

function applyFilters(){
    let keyword = searchInput.value.toLowerCase();
    let rank = filterRank.value;
    filteredStudents = students.filter(s=>{
        let matchName = s.name.toLowerCase().includes(keyword);
        return matchName && (rank === "all" || getRank(s.score) === rank);
    });
    filteredStudents.sort((a,b)=>{

return sortAsc ? a.score-b.score : b.score-a.score;

});

renderTable();

}

function renderTable(){

    tableBody.innerHTML = "";

    filteredStudents.forEach((sv,index)=>{

        let tr = document.createElement("tr");

        if(sv.score < 5){
            tr.classList.add("low-score");
        }

        tr.innerHTML = `
            <td>${index+1}</td>
            <td>${sv.name}</td>
            <td>${sv.score}</td>
            <td>${getRank(sv.score)}</td>
            <td>
                <button data-index="${index}" class="deleteBtn">Xóa</button>
            </td>
        `;

        tableBody.appendChild(tr);

    });

    updateStats();
}

function updateStats(){

    let total = students.length;

    let avg = 0;

    if(total > 0){
        let sum = students.reduce((a,b)=> a + b.score,0);
        avg = (sum/total).toFixed(2);
    }

    stats.innerText = `Tổng SV: ${total} | Điểm TB: ${avg}`;
}

function addStudent(){

    let name = nameInput.value.trim();
    let score = parseFloat(scoreInput.value);

    if(name === "" || isNaN(score) || score < 0 || score > 10){
        alert("Vui lòng nhập đúng họ tên và điểm từ 0-10");
        return;
    }

    students.push({
        name: name,
        score: score
    });

    renderTable();
    nameInput.value = "";
    scoreInput.value = "";

    applyFilters();

    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();
}

addBtn.addEventListener("click",addStudent);

scoreInput.addEventListener("keypress",function(e){
    if(e.key === "Enter"){
        addStudent();
    }
});

tableBody.addEventListener("click",function(e){

    if(e.target.classList.contains("deleteBtn")){

        let index = e.target.dataset.index;

        students.splice(index,1);
        applyFilters();
        renderTable();
    }

});
searchInput.addEventListener("input",applyFilters);
filterRank.addEventListener("change",applyFilters);
sortScore.addEventListener("click",()=>{
    sortAsc = !sortAsc;
    arrow.textContent = sortAsc ? "▲" : "▼";
    applyFilters();
});
