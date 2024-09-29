let question = document.getElementById("quest");
let submitBtn = document.getElementById("submit");
let counter = document.getElementsByClassName("countdown")[0];
let resultDiv = document.querySelector(".result");
let container = document.querySelector(".container");
let starter = document.getElementById("starter");
let startingSection = document.getElementsByClassName("starting-section")[0];
let correctAnsCount = 0;
let questionCounter = 0;
let getQuestObjLen;
let failedQuestionsArr = [];
container.style.display = "none";
starter.onclick = () => {
  startingSection.style.display = "none";
  container.style.display = "flex";
};

function start() {
  /* We Should Fetch Data From Data.json File
     but according to CORS Policies We simulate the data in our own js code. */

   /*Hard Coded Data*/
  let questionsOBJ = [
    {
      title: "What Is The Difference Between == and === In JavaScript?",
      answer_1: "== compares values and types",
      answer_2: "=== compares only values",
      answer_3: "== compares only values, while === compares values and types",
      answer_4: "There is no difference",
      right_answer:
        "== compares only values, while === compares values and types",
    },
    {
      title: "What Is A Promise In JavaScript?",
      answer_1: "A function that waits for data",
      answer_2:
        "A placeholder for a value that will be available in the future",
      answer_3: "An object that runs asynchronous code",
      answer_4: "A method to handle errors",
      right_answer:
        "A placeholder for a value that will be available in the future",
    },
    {
      title: "What Is The Purpose Of The CSS Box Model?",
      answer_1: "To define the layout of a webpage",
      answer_2: "To style text content",
      answer_3: "To define how elements are displayed and padded",
      answer_4: "To position elements absolutely",
      right_answer: "To define how elements are displayed and padded",
    },
    {
      title: "What Does REST Stand For In Web Development?",
      answer_1: "Real-Time Server Transfer",
      answer_2: "Representational State Transfer",
      answer_3: "Remote Execution of Services and Transactions",
      answer_4: "Request Execution Standard Transfer",
      right_answer: "Representational State Transfer",
    },
    {
      title:
        "What Is The Difference Between Block-Level And Inline Elements In HTML?",
      answer_1:
        "Block-level elements take up the full width, while inline elements take only as much space as needed",
      answer_2:
        "Block-level elements are visible, while inline elements are invisible",
      answer_3: "Inline elements have more padding by default",
      answer_4:
        "Block-level elements can be styled with CSS, but inline cannot",
      right_answer:
        "Block-level elements take up the full width, while inline elements take only as much space as needed",
    },
    {
      title: "How Can We Improve The Performance Of A Web Page?",
      answer_1: "Use external CSS files and minify JavaScript",
      answer_2: "Use fewer images",
      answer_3: "Add more animations",
      answer_4: "Use larger font sizes",
      right_answer: "Use external CSS files and minify JavaScript",
    },
    {
      title: "What Is A Media Query In CSS?",
      answer_1: "A technique to query databases using CSS",
      answer_2: "A technique to apply styles based on device screen sizes",
      answer_3: "A method to display media like images and videos",
      answer_4: "A method to change font size based on media types",
      right_answer: "A technique to apply styles based on device screen sizes",
    },
    {
      title: "What Is The Difference Between GET And POST Methods In HTTP?",
      answer_1: "GET sends data in the URL, while POST sends data in the body",
      answer_2: "POST sends encrypted data, while GET does not",
      answer_3: "GET is for sending files, while POST is for sending text",
      answer_4: "There is no difference",
      right_answer:
        "GET sends data in the URL, while POST sends data in the body",
    },
    {
      title: "What Is The Use Of Async And Defer Attributes In A Script Tag?",
      answer_1: "Both async and defer load scripts after the DOM is loaded",
      answer_2:
        "Async loads the script immediately, while defer loads it after the document is parsed",
      answer_3: "Defer loads scripts asynchronously, while async does not",
      answer_4: "Both async and defer have no effect on script loading",
      right_answer:
        "Async loads the script immediately, while defer loads it after the document is parsed",
    },
    {
      title: "What Is Cross-Origin Resource Sharing (CORS)?",
      answer_1:
        "A technique used to enable sharing resources between different websites",
      answer_2:
        "A security feature to prevent resource sharing between different domains",
      answer_3:
        "A method to allow users to access resources from other servers",
      answer_4: "A policy to limit API access across different origins",
      right_answer:
        "A technique used to enable sharing resources between different websites",
    },
  ];

  getQuestObjLen = questionsOBJ.length;
  createBullets(questionsOBJ.length);
  showQuestionOnDoc(questionsOBJ[questionCounter]);
  markAsSelected();
  submitBtn.addEventListener("click", () => {
    correctAnsCount = calcRes(
      isTrueQuestion(questionsOBJ[questionCounter], questionCounter)
    );
    if (questionCounter == questionsOBJ.length - 1) {
      console.log("Finished");
      counter.textContent = "00:00";
      clearInterval(countDown);
      showResult(questionsOBJ.length, correctAnsCount);
    } else {
      showQuestionOnDoc(questionsOBJ[++questionCounter]);
      markAsSelected();
      markBullet(questionCounter);
    }
  });
}

let markAsSelected = function () {
  let ansList = Array.from(
    document.querySelectorAll("ul li input[type='radio']")
  );
  ansList.forEach((radio) => {
    radio.addEventListener("change", () => {
      ansList.forEach((answer) =>
        answer.parentElement.classList.remove("selected")
      );
      radio.parentElement.classList.add("selected");
    });
  });
};

let isTrueQuestion = function (questionOBJ, questionNum) {
  let myAns = document.getElementsByClassName("selected")[0];
  if (myAns) {
    let text = myAns.querySelector("label").textContent.trim();
    if (text == questionOBJ.right_answer.trim()) {
      return true;
    } else {
      fillFailedAuestArr(questionNum, questionOBJ.right_answer.trim());
      return;
    }
  }
  fillFailedAuestArr(questionNum, questionOBJ.right_answer.trim());
  return false;
};

let calcRes = (res) => {
  let localCount = correctAnsCount;
  if (res) {
    localCount++;
  }
  return localCount;
};

let createBullets = function (numOfQuestions) {
  let bulletsCont = document.getElementsByClassName("bullets")[0];
  for (let i = 0; i < numOfQuestions; i++) {
    let bullet = document.createElement("div");
    bullet.classList.add("bullet");
    i == 0 ? bullet.classList.add("pass") : bullet;
    bulletsCont.appendChild(bullet);
  }
};

let markBullet = function (currentIndex) {
  let bullets = Array.from(document.getElementsByClassName("bullet"));
  bullets.forEach((bullet, index) => {
    if (index <= currentIndex) {
      bullet.classList.add("pass");
    } else {
      return;
    }
  });
};

let showResult = function (numOfQuestions, correctAnsCount) {
  resultDiv.classList.remove("hidden");
  resultDiv.classList.add("show");
  let result = document.createElement("h3");
  result.classList.add("resultText");
  if (correctAnsCount <= numOfQuestions * (1 / 3)) {
    result.textContent = "BAD";
  } else if (correctAnsCount <= numOfQuestions * (1 / 2)) {
    result.textContent = "SLIGHTLY GOOD";
  } else if (correctAnsCount == numOfQuestions * (1 / 2)) {
    result.textContent = "NOT BAD";
  } else if (correctAnsCount <= numOfQuestions * (3 / 4)) {
    result.textContent = "VERY GOOD";
  } else {
    result.textContent = "EXCELLENT";
  }
  let hint = document.createTextNode(
    `You Got ${correctAnsCount} From ${numOfQuestions}`
  );
  let h4 = document.createElement("h4");
  h4.style.color = "white";
  h4.appendChild(hint);
  resultDiv.appendChild(result);
  resultDiv.appendChild(h4);
  let questDiv;
  let text = "<br> Failed at : <br> QuestionNumber : ";
  let h3 = document.createElement("h3");
  h3.style.color = "white";
  h3.innerHTML = text;
  questDiv = document.createElement("div");
  if (failedQuestionsArr.length != 0) {
    console.log(failedQuestionsArr);
    failedQuestionsArr.forEach((question) => {
      h3.innerHTML += question[0] + " | ";
      questDiv.appendChild(h3);
    });
    console.log(questDiv);
    resultDiv.appendChild(questDiv);
  }
};

let formatTime = function (time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};

let time = 2 * 60;
let countDown = setInterval(() => {
  time--;
  counter.textContent = formatTime(time);
  if (time <= 0) {
    clearInterval(countDown);
    counter.textContent = "00:00";
    showResult(getQuestObjLen, correctAnsCount);
  }
}, 1000);

function escapeHTML(html) {
  let div = document.createElement("div");
  div.textContent = html;
  return div.innerHTML;
}

function showQuestionOnDoc(questionOBJ) {
  question.innerHTML = "";
  let questionInfo = document.createElement("div");
  let title = document.createElement("h3");
  let titleText = document.createTextNode(questionOBJ.title);
  title.appendChild(titleText);
  questionInfo.classList.add("question-info");
  questionInfo.appendChild(title);

  let answers = document.createElement("div");
  answers.classList.add("answers");
  let answersList = document.createElement("ul");
  let ansKey;
  for (let i = 1; i <= 4; i++) {
    ansKey = `answer_${i}`;
    let ans = document.createElement("li");
    ans.classList.add("answer");
    ans.insertAdjacentHTML(
      "beforeend",
      `
            <input type="radio" name="ans" id="ans${i}" />
            <label for="ans${i}">${escapeHTML(
        questionOBJ[ansKey].toString()
      )}</label>
        `
    );
    answersList.appendChild(ans);
  }

  answers.appendChild(answersList);
  questionInfo.appendChild(answers);
  question.appendChild(questionInfo);
}

let fillFailedAuestArr = (questionNum, correctAnswer) => {
  failedQuestionsArr.push([questionNum + 1, correctAnswer]);
};
start();
