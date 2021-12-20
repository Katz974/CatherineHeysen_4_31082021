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
