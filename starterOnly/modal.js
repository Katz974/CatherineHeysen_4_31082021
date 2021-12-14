// Array of objects
const FORM_DATA = [
  { id: 'first', status: 'default', errorMsg: null, validateFn: validateName },
  { id: 'last', status: 'default', errorMsg: null, validateFn: validateName },
  { id: 'email', status: 'default', errorMsg: null, validateFn: validateEmail },
  { id: 'birthdate', status: 'default', errorMsg: null },
  {
    id: 'quantity',
    status: 'default',
    errorMsg: null,
    validateFn: validateQuantity,
  },
  { id: 'location1', status: 'default', errorMsg: null },
  { id: 'location2', status: 'default', errorMsg: null },
  { id: 'location3', status: 'default', errorMsg: null },
  { id: 'location4', status: 'default', errorMsg: null },
  { id: 'location5', status: 'default', errorMsg: null },
  { id: 'location6', status: 'default', errorMsg: null },
  { id: 'checkbox1', status: 'default', errorMsg: null },
]

// validation prenom et nom
function validateName(name) {
  if (name.length < 2) {
    throw new Error('Entrez au moins 2 lettres.')
  }
}

// validation email
function validateEmail(email) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    throw new Error('Entrez une adresse mail valide.')
  }
  console.log('Entrez une adresse mail valide.')
}

// validation quantite tournois
function validateQuantity(quantity) {
  if (/^[0-9]+$/.test(quantity)) {
    throw new Error('Répondez avec un chiffre.')
  }
  console.Error('Répondez avec un chiffre.')
}

// validate onsubmit button "c'est parti"
function validate() {
  for (const formData of FORM_DATA) {
    const input = document.querySelector(`#${formData.id}`)
    if (formData.validateFn) {
      try {
        formData.validateFn(input.value)
      } catch (err) {
        console.error(err)
        return false
      }
    }
    console.log(input.value)
  }
  return true
}

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
