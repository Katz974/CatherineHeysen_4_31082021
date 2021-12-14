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
const modalCloseButton = modalbg.querySelector('.close')
console.log(modalCloseButton)

// launch modal event
modalBtn.forEach(btn => btn.addEventListener('click', launchModal))

// launch modal form
function launchModal() {
  modalbg.style.display = 'block'
}

// close modal event
modalCloseButton.addEventListener('click', closeModal)

// close lodal form
function closeModal() {
  modalbg.style.display = 'none'
}

// close modal event
// modalCloseButton.forEach(btn => btn.addEventListener('click', closeModal))

// // close modal form
// function closeModal(event) {
//   event.preventDefault()
//   event.stopPropagation()
//   modalbg.style.display = 'none'
// }
