function editNav() {
  var x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

// DOM Elements
const modalbg = document.querySelector('.bground')
const modalBtn = document.querySelectorAll('.modal-btn')
const formData = document.querySelectorAll('.formData')

// launch modal event
modalBtn.forEach(btn => btn.addEventListener('click', launchModal))

// launch modal form
function launchModal() {
  modalbg.style.display = 'block'
}

// close modal form
function closeModal(event) {
  event.preventDefault()
  event.stopPropagation()
  modalbg.style.display = 'none'
}

const modalCloseButton = modalbg.querySelectorAll('.close')

// close modal event
modalCloseButton.forEach(btn => btn.addEventListener('click', closeModal))
