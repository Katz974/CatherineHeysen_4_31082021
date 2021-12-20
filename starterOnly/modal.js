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
  // { id: 'checkbox2'},
]

// FIRSTNAME AND NAME VALIDATION (SAME EXPECTED)
function validateName(name) {
  if (name.length < 2) {
    throw new error(
      'Veuillez entrer 2 caractères ou plus pour le champ du nom.'
    )
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
    throw new Error(
      'Vous devez vérifier que vous acceptez les termes et conditions.'
    )
  }
}

// LOCATION: VALIDATE IS CALLED WHEN THE USER CLICKS ON THE SUBMIT BUTTON
function validateLocation() {
  if (
    document.querySelectorAll('input[type=radio][id^=location]:checked')
      .length === 0
  ) {
    throw new Error('Vous devez choisir une option.')
  }
}
