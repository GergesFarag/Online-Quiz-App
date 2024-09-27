let question = document.getElementById("quest");
let submitBtn = document.getElementById("submit");
let counter = document.getElementsByClassName("countdown")[0];
let resultDiv = document.querySelector(".result");
let container = document.querySelector(".container")
let starter = document.getElementById("starter")
let startingSection = document.getElementsByClassName("starting-section")[0]
let correctAnsCount = 0;
let questionCounter = 0;
let getQuestObjLen;
let failedQuestionsArr  = [];
container.style.display = "none"
starter.onclick = () =>{
  startingSection.style.display = "none"
  container.style.display = "flex"
}

function getDataFromJSON() {
  const req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (req.readyState == 4 && req.statusText == "OK") {
      let questionsOBJ = JSON.parse(req.responseText);
      getQuestObjLen = questionsOBJ.length
      createBullets(questionsOBJ.length);
      showQuestionOnDoc(questionsOBJ[questionCounter]);
      markAsSelected();
      submitBtn.addEventListener("click", () => {
        correctAnsCount = calcRes(
          isTrueQuestion(questionsOBJ[questionCounter] , questionCounter)
        );
        if (questionCounter == questionsOBJ.length - 1) {
          console.log("Finished");
          counter.textContent = "00:00"
          clearInterval(countDown)
          showResult(questionsOBJ.length, correctAnsCount);
        } else {
          showQuestionOnDoc(questionsOBJ[++questionCounter]);
          markAsSelected();
          markBullet(questionCounter);
        }
      });
    }
  };
  req.open("GET", "Data.json", true);
  req.send();
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

let isTrueQuestion = function (questionOBJ , questionNum) {
  let myAns = document.getElementsByClassName("selected")[0];
  if (myAns) {
    let text = myAns.querySelector("label").textContent.trim();
    if(text == questionOBJ.right_answer.trim()){
      return true;
    }else{
      fillFailedAuestArr(questionNum , questionOBJ.right_answer.trim())
      return;
    }
  }
  fillFailedAuestArr(questionNum , questionOBJ.right_answer.trim())
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
  let text = "<br> Failed at : <br> QuestionNumber : "
  let h3 = document.createElement("h3")
  h3.style.color = "white"
  h3.innerHTML = text
  questDiv = document.createElement("div")
  if(failedQuestionsArr.length != 0){
    console.log(failedQuestionsArr)
    failedQuestionsArr.forEach(question => {
      h3.innerHTML += question[0] + " | "
      questDiv.appendChild(h3)
    })
    console.log(questDiv)
    resultDiv.appendChild(questDiv)
  }
};


let formatTime = function (time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};


let time = 2 * 60 + 30;
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

let fillFailedAuestArr = (questionNum , correctAnswer) => {
  failedQuestionsArr.push([questionNum+1 , correctAnswer])
}
getDataFromJSON();
