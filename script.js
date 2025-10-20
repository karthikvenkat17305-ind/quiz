const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupInfo = document.getElementById("popup-info");
const popupImage = document.getElementById("popup-image");
const questionImage = document.getElementById("question-image");
const closePopup = document.getElementById("closePopup");
const finalPopup = document.getElementById("finalPopup");
const finalScore = document.getElementById("final-score");
const finishBtn = document.getElementById("finishBtn");
const progressBar = document.getElementById("progress");
const progressImagesContainer = document.getElementById("progress-images");

let currentQuestion = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;

// 🎯 Define your specific images
const correctImgs = [
  "images/i5.png", // for first 2 correct answers
  "images/i6.png"  // for next 2 correct answers
];

const wrongImgs = [
  "images/i7.png", // for first 2 wrong answers
  "images/i8.png"  // for next 2 wrong answers
];

// 🧠 Quiz Data
const quizData = [
  {
    q: "Who are you?",
    options: ["Bekku", "Makku", "Keerthi", "Keerthana"],
    correct: "Bekku",
    info: "Very good, anyway no chips!!",
    img: "images/i4.png"
  },
  {
    q: "Which is the spl date for makku?",
    options: ["21 oct", "22 oct", "23 oct", "24 oct"],
    correct: "21 oct",
    info: "That's my girl!!!!! Two chocis for you",
    img: "images/i3.png"
  },
  {
    q: "What does makku do to bekku when she is with him?",
    options: ["Bite her","Pinches her cheeks like it was his cheeks!","Learn with her","Sleeps"],
    correct: "Pinches her cheeks like it was his cheeks!",
    info: "You got it! You very well know about your makku!!! Thats Impressive!",
    img: "images/i2.png"
  },
  {
    q: "Who is makku fav girl?",
    options: ["Bekku","Bekku","Bekku","Bekku"],
    correct: "Bekku",
    info: "You find it! Bekku is makku's only fav girl!!!!",
    img: "images/i1.png"
  }
];

// 🟢 Initialize progress images
quizData.forEach(q => {
  const img = document.createElement("img");
  img.src = q.img;
  progressImagesContainer.appendChild(img);
});

// 🔄 Load question
function loadQuestion() {
  const qData = quizData[currentQuestion];
  questionEl.textContent = qData.q;
  questionImage.src = qData.img;
  optionsEl.innerHTML = "";
  nextBtn.disabled = true;

  qData.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opt;
    btn.addEventListener("click", () => checkAnswer(btn, qData));
    optionsEl.appendChild(btn);
  });
}

// ✅ Check Answer
function checkAnswer(btn, qData) {
  const allBtns = document.querySelectorAll(".option");
  allBtns.forEach(b => b.disabled = true);

  let popupImg;

  if (btn.textContent === qData.correct) {
    btn.classList.add("correct");
    score++;
    correctCount++;

    // pick correct image based on how many correct so far
    if (correctCount <= 2) popupImg = correctImgs[0];
    else popupImg = correctImgs[1];

    showPopup(true, qData.info, popupImg);
    nextBtn.disabled = false;
    progressImagesContainer.children[currentQuestion].classList.add("completed");
  } else {
    btn.classList.add("wrong");
    wrongCount++;

    // pick wrong image based on how many wrong so far
    if (wrongCount <= 2) popupImg = wrongImgs[0];
    else popupImg = wrongImgs[1];

    showPopup(false, qData.info, popupImg);
  }

  // Update progress bar
  progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
}

// 💬 Show popup
function showPopup(isCorrect, info, imgSrc) {
  popupImage.src = imgSrc;
  popupInfo.textContent = info;
  popup.classList.remove("hidden");
  popupTitle.textContent = isCorrect ? "✅ Correct!" : "❌ Wrong!";
  popup.classList.toggle("correct-popup", isCorrect);
  popup.classList.toggle("wrong-popup", !isCorrect);
}

// ❌ or ✅ Close popup
closePopup.addEventListener("click", () => {
  popup.classList.add("hidden");
  if (document.querySelector(".option.correct")) {
    nextBtn.disabled = false;
  } else {
    loadQuestion();
  }
});

// ➡️ Next Question
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showFinalPopup();
  }
});

// 🏁 Final popup
function showFinalPopup() {
  finalScore.textContent = `You got ${score} / ${quizData.length} correct! 🎉`;
  finalPopup.classList.remove("hidden");
}

finishBtn.addEventListener("click", () => {
  window.location.href = "https://outromakku.neocities.org/"; // redirect
});

loadQuestion();
