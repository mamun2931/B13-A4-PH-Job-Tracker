let interviewList = [];
let rejectedList = [];
let currentStatus = "all";

const totalLabel = document.getElementById("total");
const interviewLabel = document.getElementById("interview");
const rejectedLabel = document.getElementById("rejected");
const countSpan = document.getElementById("count");
const allTotalLabel = document.getElementById("all-total");
const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("all-interview");
const rejectedBtn = document.getElementById("all-rejected");
const allCardSection = document.getElementById("all-card");
const filterSection = document.getElementById("filtered-section");
const mainContainer = document.querySelector("main");

function calculateCount() {
    const allCards = allCardSection.querySelectorAll(".card");
    const totalJobs = allCards.length;
    if (totalJobs === 0 && currentStatus === "all") {
        allCardSection.innerHTML = showEmptyDraft();
    }
      totalLabel.innerText = totalJobs;
    interviewLabel.innerText = interviewList.length;
    rejectedLabel.innerText = rejectedList.length;
    allTotalLabel.innerText = totalJobs;
    if (currentStatus === "all") {
        countSpan.innerText = totalJobs;
    } else if (currentStatus === "interview") {
        countSpan.innerText = interviewList.length;
    } else {
        countSpan.innerText = rejectedList.length;
    }
}
calculateCount();

function toggleStyle(selectedBtn) {
    allBtn.classList.remove("btn-primary");
    interviewBtn.classList.remove("btn-primary");
    rejectedBtn.classList.remove("btn-primary");
    selectedBtn.classList.add("btn-primary");
}

allBtn.addEventListener("click", function() {
    currentStatus = "all";
    toggleStyle(this);
    allCardSection.classList.remove("hidden");
    filterSection.classList.add("hidden");
    
    calculateCount();
});

interviewBtn.addEventListener("click", function() {
    currentStatus = "interview";
    toggleStyle(this);
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderFilteredList(interviewList);
    calculateCount();
});

rejectedBtn.addEventListener("click", function() {
    currentStatus = "rejected";
    toggleStyle(this);
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderFilteredList(rejectedList);
    calculateCount();
});

mainContainer.addEventListener("click", function (e) {
    const card = e.target.closest(".card");
    if (!card) return;
    const title = card.querySelector(".tittle").innerText;

    if (e.target.classList.contains("btn-delete") || e.target.closest(".btn-delete")) {
        if (currentStatus === "all") {
            card.remove();
            interviewList = interviewList.filter(i => i.title !== title);
            rejectedList = rejectedList.filter(r => r.title !== title);
        } else {
            interviewList = interviewList.filter(i => i.title !== title);
            rejectedList = rejectedList.filter(r => r.title !== title);
            updateMainCardStatus(title, "Not Applied");
            
            if (currentStatus === "interview") renderFilteredList(interviewList);
            else renderFilteredList(rejectedList);
        }
        calculateCount();
        return;
    }

    if (e.target.classList.contains("interview-btn") || e.target.classList.contains("rejected-btn")) {
        const jobData = {
            title,
            job: card.querySelector(".jobs").innerText,
            time: card.querySelector(".time").innerText,
            notes: card.querySelector(".notes").innerText
        };

        if (e.target.classList.contains("interview-btn")) {
            jobData.status = "Interview";
            if (!interviewList.find(i => i.title === title)) interviewList.push(jobData);
            rejectedList = rejectedList.filter(r => r.title !== title);
            updateMainCardStatus(title, "Interview");
        } 
        else if (e.target.classList.contains("rejected-btn")) {
            jobData.status = "Rejected";
            if (!rejectedList.find(r => r.title === title)) rejectedList.push(jobData);
            interviewList = interviewList.filter(i => i.title !== title);
            updateMainCardStatus(title, "Rejected");
        }
        if (currentStatus === "interview") renderFilteredList(interviewList);
        if (currentStatus === "rejected") renderFilteredList(rejectedList);
        
        calculateCount();
    }
});


  function updateMainCardStatus(title, statusText) {
    const allCards = allCardSection.querySelectorAll(".card");
    allCards.forEach(card => {
        if (card.querySelector(".tittle").innerText === title) {
            card.querySelector(".statuss").innerText = statusText;
        }
    });
}

function renderFilteredList(list) {
    filterSection.innerHTML = "";
    if (list.length === 0) {
        filterSection.innerHTML = showEmptyDraft();
    } 
    else {
        list.forEach(item => {
            filterSection.innerHTML += `
                <div class="card w-9/11 m-auto border border-white bg-base-300 p-5 rounded-lg mt-5 space-y-4">
                    <div class="flex justify-between items-center">
                        <h3 class="tittle font-bold text-[#002C5C]">${item.title}</h3>
                        <button class="btn-delete"><i class="fa-regular fa-trash-can pointer-events-none"></i></button>
                    </div>
                    <p class="jobs text-[#323B49]">${item.job}</p>
                    <p class="time text-[#323B49]">${item.time}</p>
                    <h3 class="statuss btn btn-soft text-[#002C5C] h-10 w-30">${item.status}</h3>
                    <p class="notes text-[#323B49]">${item.notes}</p>
                    <div class="flex gap-2">
                        <button class="interview-btn btn btn-soft btn-success font-bold">Interview</button>
                        <button class="rejected-btn btn btn-soft btn-error font-bold">Rejected</button>
                    </div>
                </div>`;
        });
    }
}

function showEmptyDraft() {
    return `
        <div class="w-9/11 m-auto border rounded-lg bg-base-300 mt-5 border-white py-15">
            <div class="text-center space-y-4">
                <div class="flex justify-center"><img src="jobs.png" alt="No Jobs"></div>
                <h3 class="font-bold text-xl">No Jobs available</h3>
                <p>Check back soon for new opportunities</p>
            </div>
        </div>
    `;
}