// All neccessary variable declaration
let quizHomeContainer = document.querySelector('.quiz-home-container')
let quizRulesContainer = document.querySelector('.quiz-rules-container')
let dynamicQuizContainer = document.querySelector('.dynamic-quiz-container')
let dynamicQuizResultContainer = document.querySelector('.dynamic-quiz-result-container')
let dynamicQuestion = document.querySelector('.dynamic-question')
let dynamicQuestionNumbering = document.querySelector('.dynamic-question-numbering')
let optionOne = document.querySelector('.option-1')
let optionTwo = document.querySelector('.option-2')
let optionThree = document.querySelector('.option-3')
let optionFour = document.querySelector('.option-4')
let quizFooterNumbering = document.querySelector('.quiz-footer-numering')
let quizFooterTotal = document.querySelector('.quiz-footer-totalQuiz')
let nextQuizBtn = document.getElementById('next-quiz-btn')
let optionList = document.querySelector('.option_list')
let options = document.querySelectorAll('.option')
let dynamicQuizHeadingCounter = document.querySelector('.dynamic-quiz-heading-counter')
let dynamicQuizHeadingHorizontalBar = document.querySelector('.dynamic-quiz-heading-horizontal-bar')
let resultPageValidAns = document.getElementById('resultPageValidAns')
let resultPageTotalAns = document.getElementById('resultPageTotalAns')

let clockTimerAudio = new Audio('./assets/clock-timer.mp3')
let successAudio = new Audio('./assets/success.mp3')
let errorAudio = new Audio('./assets/error.mp3')

let icon = null
let validAns = 0

// start quiz btn
document.getElementById('start-quiz-button').addEventListener('click', (e) => {
  quizHomeContainer.style.display = 'none'
  quizRulesContainer.style.display = 'block'
})

// default quiz by pressing continue quiz btn
document.getElementById('continue-quiz-btn').addEventListener('click', () => {
  // play clock timer audio
  clockTimerAudio.currentTime = 0
  clockTimerAudio.play()
  dynamicQuizContainer.style.display = 'block'
  quizRulesContainer.style.display = 'none'
  showQuizQuestions(0)
  validateOption(0)
  quizHeadingCounter(22)
})

// next btn for quiz
let dynamicIndex = 0
let quizHeadingCounterInterval;
nextQuizBtn.addEventListener('click', () => {
  nextQuizBtn.style.display = 'none'
  dynamicIndex++
  if (dynamicIndex < questions.length) {
    // play clockTimer Audio
    clockTimerAudio.currentTime = 0
    clockTimerAudio.play()

    showQuizQuestions(dynamicIndex)
    validateOption(dynamicIndex)
    clearInterval(quizHeadingCounterInterval)
    quizHeadingCounter(22)
  } else {
    resultPageValidAns.innerText = validAns
    resultPageTotalAns.innerText = questions.length
    clearInterval(quizHeadingCounterInterval)
    dynamicQuizResultContainer.style.display = 'block'
    dynamicQuizContainer.style.display = 'none'
  }
})

// Replay Quiz Button
document.getElementById('replay-quiz-btn').addEventListener('click', () => {
  // Reload the webpage
  location.reload()
  // dynamicIndex = 0
  // dynamicQuizResultContainer.style.display = 'none'
  // quizHomeContainer.style.display = 'block'
})
// Quit Quiz Button


// validation quiz option
function validateOption(ind) {
  // default for quiz option
  for (option of options) {
    option.style.backgroundColor = 'rgb(254, 215, 170)'
    option.style.color = 'black'
    option.style.pointerEvents = 'auto'
  }

  // When click quiz option
  optionList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {

      // icon remove if already have
      if (icon != null) {
        icon.remove()
        icon = null
      }

      // current clock timer audio stop and reset
      clockTimerAudio.pause()
      clockTimerAudio.currentTIme = 0


      // nextQuizBtn visible when select a option
      nextQuizBtn.style.display = 'block'
      clearInterval(quizHeadingCounterInterval)

      if (e.target.innerText === questions[ind].answer) {
        validAns++
        // play charming sound for correct ans
        successAudio.play()
        successAudio.currentTime = 0
        errorAudio.pause()

        setColorAndBg(e.target, 'white', '#2ecc71')
        createIcon(e.target, 'fa-solid fa-check icon')
      } else {
        // play warning sound for wrong ans
        errorAudio.play()
        errorAudio.volume = .4
        errorAudio.currentTime = 0

        setColorAndBg(e.target, 'white', '#eb4034')
        createIcon(e.target, 'fa-solid fa-xmark icon')
        // if ans is incorrect then automatically selected the correct ans
        for (option of options) {
          if (option.innerText === questions[ind].answer) {
            setColorAndBg(option, 'white', '#2ecc71')
            createIcon(option, 'fa-solid fa-check icon')
          }
        }
      }

      // if user select a option then disabled all options
      for (option of options) {
        pointerEventNone(option)
      }
    }
  })

}

//  dynamic change Quiz
function showQuizQuestions(dynamicIndex) {
  dynamicQuestion.innerText = questions[dynamicIndex].question
  dynamicQuestionNumbering.innerText = `${questions[dynamicIndex].numb}.`
  quizFooterNumbering.innerText = questions[dynamicIndex].numb
  applyOptionByIndex(dynamicIndex)
}


//apply quiz ans function
function applyOptionByIndex(ind) {
  optionOne.innerText = questions[ind].options[0]
  optionTwo.innerText = questions[ind].options[1]
  optionThree.innerText = questions[ind].options[2]
  optionFour.innerText = questions[ind].options[3]
}

// function for pointer event none 
function pointerEventNone(option) {
  option.style.pointerEvents = 'none'
}

// set color and bg color
function setColorAndBg(element, color, bgColor) {
  element.style.color = color
  element.style.backgroundColor = bgColor
}

// add icon
function createIcon(element, classess) {
  icon = document.createElement('i')
  icon.className = classess
  element.appendChild(icon)
}

// Dynamic Quiz Heading Counter
function quizHeadingCounter(time) {
  dynamicQuizHeadingCounter.innerText = time
  time--
  let widthTimeCalc = 100 / time
  let updateWidthTimeCalc = widthTimeCalc
  dynamicQuizHeadingHorizontalBar.style.width = '0%'
  quizHeadingCounterInterval = setInterval(timer, 1000)
  function timer() {
    dynamicQuizHeadingCounter.innerText = time
    if (time > 0) {
      dynamicQuizHeadingHorizontalBar.style.width = `${updateWidthTimeCalc}%`
      updateWidthTimeCalc += widthTimeCalc
      if (time < 10) {
        dynamicQuizHeadingCounter.innerText = `0${time}`
      }
      time--
    } else {
      // current clock timer audio paused
      clockTimerAudio.pause()
      clockTimerAudio.currentTIme = 0
      for (option of options) {
        if (option.innerText === questions[dynamicIndex].answer) {
          setColorAndBg(option, 'white', '#2ecc71')
          createIcon(option, 'fa-solid fa-check icon')
        }
        pointerEventNone(option)
      }
      nextQuizBtn.style.display = 'block'
      dynamicQuizHeadingCounter.innerText = `00`
      clearInterval(quizHeadingCounterInterval)
    }
  }
}