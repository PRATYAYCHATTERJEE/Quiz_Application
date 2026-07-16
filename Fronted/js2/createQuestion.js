console.log("✅ createQuestion.js loaded");

document.addEventListener("DOMContentLoaded", () => {
    initializeCreateQuestion();
});

// =========================
// Initialize Page
// =========================
function initializeCreateQuestion() {
    console.log("Initialize Create Question");
    const form = document.getElementById("addQuestionForm");

    if (!form) return;

    initializeImageUpload();
    initializeFinishButton();

}

// =========================
// Image Upload
// =========================
function initializeImageUpload() {

    const uploadArea = document.getElementById("uploadArea");
    const imageUpload = document.getElementById("imageUpload");
    const imagePreview = document.getElementById("imagePreview");

    if (!uploadArea || !imageUpload) return;

    uploadArea.addEventListener("click", () => {
        imageUpload.click();
    });

    uploadArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        
        uploadArea.classList.add("dragging");
    });

    uploadArea.addEventListener("dragleave", () => {
        uploadArea.classList.remove("dragging");
    });

    uploadArea.addEventListener("drop", (e) => {

        e.preventDefault();

        uploadArea.classList.remove("dragging");

        if (e.dataTransfer.files.length > 0) {

            imageUpload.files = e.dataTransfer.files;

            previewImage();

        }

    });

    imageUpload.addEventListener("change", previewImage);

    function previewImage() {

        const file = imageUpload.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            imagePreview.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
            `;

            imagePreview.classList.remove("hidden");

        };

        reader.readAsDataURL(file);

    }

}

// =========================
// Finish Button
// =========================
function initializeFinishButton() {

    console.log("Initializing Finish Button");

    const finishBtn = document.getElementById("finishBtn");

    if (!finishBtn) {
        console.log("Button not found");
        return;
    }

    console.log("Button found");

    finishBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    const questionData = getQuestionData();

    console.log(questionData);

    await saveQuestion(questionData);

    console.log("Save Finished");

});
}
// =========================
// Validation
// =========================
function validateForm() {

    if (!document.getElementById("questionDesc").value.trim()) {
        alert("Question is required.");
        return false;
    }

    if (!document.getElementById("optionA").value.trim()) {
        alert("Option A is required.");
        return false;
    }

    if (!document.getElementById("optionB").value.trim()) {
        alert("Option B is required.");
        return false;
    }

    if (!document.getElementById("optionC").value.trim()) {
        alert("Option C is required.");
        return false;
    }

    if (!document.getElementById("optionD").value.trim()) {
        alert("Option D is required.");
        return false;
    }

    if (!document.getElementById("correctAnswer").value) {
        alert("Please select the correct answer.");
        return false;
    }

    if (!document.getElementById("category").value) {
        alert("Please select a category.");
        return false;
    }

    if (!document.getElementById("difficulty").value) {
        alert("Please select difficulty.");
        return false;
    }

    const marks = Number(document.getElementById("marks").value);

    if (marks <= 0) {
        alert("Marks must be greater than zero.");
        return false;
    }

    return true;

}

// =========================
// Get Form Data
// =========================
function getQuestionData() {

    return {

        question: document.getElementById("questionDesc").value.trim(),

        options: [

            document.getElementById("optionA").value.trim(),

            document.getElementById("optionB").value.trim(),

            document.getElementById("optionC").value.trim(),

            document.getElementById("optionD").value.trim()

        ],

        correctAnswer: {

            "Option A": 0,
            "Option B": 1,
            "Option C": 2,
            "Option D": 3

        }[document.getElementById("correctAnswer").value],

        category: document.getElementById("category").value,

        difficulty: document.getElementById("difficulty").value,

        marks: Number(document.getElementById("marks").value),

        image: document.getElementById("imageUpload").files.length
            ? document.getElementById("imageUpload").files[0].name
            : ""

    };

}

// =========================
// Save Question
// =========================
async function saveQuestion(questionData) {

    try {

        const response = await fetch("http://localhost:5000/api/questions", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(questionData)

        });

        const result = await response.json();

        if (result.success) {

            alert("✅ Question Saved Successfully");

            clearForm();

            // We'll replace this later
            // renderPage("questions");

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);

        alert("Server connection failed.");

    }

}

// =========================
// Clear Form
// =========================
function clearForm() {

    document.getElementById("addQuestionForm").reset();

    const imagePreview = document.getElementById("imagePreview");

    if (imagePreview) {

        imagePreview.innerHTML = "";

        imagePreview.classList.add("hidden");

    }

}

window.initializeCreateQuestion = initializeCreateQuestion;