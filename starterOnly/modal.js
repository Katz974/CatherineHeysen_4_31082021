// ARRAY OF OBJETCS

const FORM_DATA = [
  { id: 'first', validateFn: validateName },
  { id: 'last', validateFn: validateName },
  { id: 'email', validateFn: validateEmail },
  { id: 'birthdate', date: true },
  { id: 'quantity', validateFn: validateQuantity },
  { id: 'location1', validateFn: validateLocation },
  { id: 'location2', validateFn: validateLocation },
  { id: 'location3', validateFn: validateLocation },
  { id: 'location4', validateFn: validateLocation },
  { id: 'location5', validateFn: validateLocation },
  { id: 'location6', validateFn: validateLocation },
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
  if (!/^[0-9]+$/.test(quantity) || quantity > 99) {
    throw new Error('Répondez avec un chiffre inférieur à 100.')
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
    input.style.border = ''
    if (formData.validateFn) {
      try {
        formData.validateFn(formData.checkbox ? input.checked : input.value)
      } catch (err) {
        output.innerHTML = err.message
        input.style.border = '2px solid #e54858'
      }
    }
    console.log(e)
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
    input.style.border = ''
    if (formData.validateFn) {
      try {
        formData.validateFn(formData.checkbox ? input.checked : input.value)
      } catch (err) {
        output.innerHTML = err.message
        input.style.border = '2px solid #e54858'
        shouldContinue = false
      }
    } else if (formData.date) {
      if (!input.valueAsDate) {
        output.innerHTML = 'Vous devez renseigner votre date de naissance.'
        input.style.border = '2px solid #e54858'
        shouldContinue = false
      } else if (
        Date.now() - input.valueAsDate.getTime() <
        15 * 365 * 24 * 60 * 60 * 1000
      ) {
        output.innerHTML = 'Vous devez avoir au-moins 15 ans.'
        input.style.border = '2px solid #e54858'
        shouldContinue = false
      }
    }
  }
  if (shouldContinue) {
    displaySuccess()
  }
  return false
}

// CLOSE FORM MODAL AFTER SUBMIT, LET THANKS MODAL COME BACK, UNSET INPUTS

function displaySuccess() {
  document.querySelector('#modal form').style.display = 'none'
  document.querySelector('#thanks').style.display = 'flex'
  document
    .querySelectorAll('input[type=radio][id^=location]')
    .forEach(location => {
      location.checked = false
    })
  document.querySelectorAll('.formData input').forEach(input => {
    input.value = ''
  })
}

//STORE MODAL FOR LATER USE

const modal = document.querySelector('#modal')
const formModal = document.querySelector('#form-modal')
const modal2 = document.querySelector('#thanks')

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

// THANKS MODAL CLOSING, LET FORM MODAL COME BACK WITH MODAL BTN CALL

document.querySelector('.close2').addEventListener('click', () => {
  modal.style.display = 'none'
  modal2.style.display = 'none'
  formModal.style.display = 'block'
})

// TRANSFORM ICON INTO NAVIGATION BAR

function editNav() {
  var x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}
