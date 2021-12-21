// ARRAY OF OBJETCS
const FORM_DATA = [
  { id: 'first', validateFn: validateName },
  { id: 'last', validateFn: validateName },
  { id: 'email', validateFn: validateEmail },
  { id: 'birthdate', date: true },
  { id: 'quantity', validateFn: validateQuantity },
  {
    id: 'checkbox1',
    eventName: 'input',
    validateFn: validateRequired,
    checkbox: true,
  },
]

// FIRSTNAME AND NAME VALIDATION (SAME EXPECTED)
function validateName(name) {
  if (name.length < 2) {
    throw new Error('Ce champ doit contenir au-moins 2 caractères.')
  }
}

// EMAIL VALIDATION
function validateEmail(email) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    throw new Error('Entrez une adresse mail valide.')
  }
}

// TOURNAMENTS AMOUNT VALIDATION
function validateQuantity(quantity) {
  if (!/^[0-9]+$/.test(quantity)) {
    throw new Error('Répondez avec un chiffre.')
  }
}

// CONDITIONS MANDATORY VALIDATION
function validateRequired(checked) {
  if (!checked) {
    throw new Error('Vous devez accepter les termes et conditions.')
  }
}

// CHOOSE A LOCATION
function validateLocation() {
  if (
    document.querySelectorAll('input[type=radio][id^=location]:checked')
      .length === 0
  ) {
    throw new Error('Veuillez choisir une ville.')
  }
}

// FORM EVENT LISTENING
for (const formData of FORM_DATA) {
  const input = document.querySelector(`#${formData.id}`)
  input.addEventListener(formData.eventName ?? 'change', e => {
    const output = document.querySelector(`#${formData.id} ~ .error`)
    output.innerHTML = ''
    if (formData.validateFn) {
      try {
        formData.validateFn(formData.checkbox ? input.checked : input.value)
      } catch (err) {
        output.innerHTML = err.message
      }
    }
  })
}

// LOCATION: VALIDATE IS CALLED WHEN THE USER CLICKS ON THE SUBMIT BUTTON
// VALIDATE ONSUBMIT BUTTON "c'est parti"
function validate() {
  let shouldContinue = true
  for (const formData of FORM_DATA) {
    const input = document.querySelector(`#${formData.id}`)
    const output = document.querySelector(`#${formData.id} ~ .error`)
    output.innerHTML = ''
    if (formData.validateFn) {
      try {
        formData.validateFn(formData.checkbox ? input.checked : input.value)
      } catch (err) {
        output.innerHTML = err.message
        shouldContinue = false
      }
    } else if (formData.date) {
      if (!input.valueAsDate) {
        output.innerHTML = 'Vous devez entrer votre date de naissance.'
        shouldContinue = false
      }
    }
  }

  const output = document.querySelector('#location1 ~ .error')
  output.innerHTML = ''
  try {
    validateLocation()
  } catch (err) {
    output.innerHTML = err.message
    shouldContinue = false
  }

  if (shouldContinue) {
    displaySuccess()
  }
  return false
}

function displaySuccess() {
  document.querySelector('#modal form').style.display = 'none'
  document.querySelector('#thanks').style.display = 'flex'
}

// on pourrait soumettre le formulaire en js via un fetch

// fetch('https://api.example.com', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     first,
//     last,
//     birthdate,
//   })
// }

//STORE MODAL FOR LATER USE
const modal = document.querySelector('#modal')

// MODAL OPENING
document.querySelectorAll('.modal-btn').forEach(btn =>
  btn.addEventListener('click', () => {
    modal.style.display = 'block'
  })
)

// MODAL CLOSING
document.querySelectorAll('.bground .close').forEach(closeBtn =>
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'
  })
)

function editNav() {
  var x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

// THANKS MODAL CLOSING
document.querySelector('.close2').addEventListener('click', () => {
  modal.style.display = 'none'
})
