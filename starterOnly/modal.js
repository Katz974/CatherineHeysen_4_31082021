// ARRAY OF OBJETCS
// il s agit d une constante que l on nomme par choix explicite FORM_DATA
// =
// [] signifie qu il s agit d un tableau
// {} va definir un objet a l interieur de ce tableau
// cet objet est compose de plusieurs key:value separes par des ,
// id est le nom d une key choisie librement
// ' ' signifie qu il s agit d une string
// la valeur de la string de la 1ere key correspond a des noms donnes dans le HTML qui seront appeles a tour de role par differentes fonctions
// la key id sera appelee par ttes les fonctions en la prefixant avec un #
// si id n existe pas dans le HTML, le code crashe parce qu on ne verifie pas ce qui est retourne par la fonction
// validateFn est une fonction = on peut egalement appeler des fonctions definies plus tard dans le code
// leurs noms sont choisis pour etre explicites
// date: true statue que la key date est de type booleen et a true comme valeur definie (autre valeur possible : false)
// eventName est une key qui a pour valeur une string qui est le nom de l event sur lequel on veut se hooker (par un ecouteur d evenemen/event handler)
// et qui sera attache a la methode js addEventListener()
// eventName permet d overide la valeur par defaut ('change')
// checkbox est une key de type booleen qui a true comme valeur definie
// les keys sont des accesseurs qui permettent de naviguer dans des objets

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
// il s agit de la declaration d une fonction librement nommee validateName
// elle prend un parametre (dont on precise pas le type)
// if execute une portion de code si une condition est vraie
// condition = la longueur de l argument name est inferieure a 2
// si la condition est verifiee, la commande throw est executee
// en generant un nouveau contenu pour la variable Error
// contenu dans une string
// Error est un type de base dans js, une convention js
function validateName(name) {
  if (name.length < 2) {
    throw new Error('Ce champ doit contenir au-moins 2 caractères.')
  }
}

// EMAIL VALIDATION
// il s agit de la declaration d une fonction librement nommee validateEmail
// if execute une condition de la méthode test() de l objet regex (regular expression),
// qui vérifie s'il y a une correspondance entre un texte et une expression rationnelle (si le texte la matche),
// ! negationne ce qui suit
// appliquee ici a la forme d une adresse email (cas particulier entre //)
// cette methode s applique a la chaine de caractere correspondante a l argument email
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
// id^ selecteur css = selectionne tous les elements dont les id commencent par 'location'
// si aucun n est coche (length === 0), l erreur est retournee
function validateLocation() {
  if (
    document.querySelectorAll('input[type=radio][id^=location]:checked')
      .length === 0
  ) {
    throw new Error('Veuillez choisir une ville.')
  }
}

// FORM EVENT LISTENING
//  ce bloc de code a pour mission d ecouter tous les evenements qui ont lieu dans le formulaire
// for (... of ...) = instruction, pour chaque constante formData, objet du tableau d objets FORM_DATA
// fonction
// definition d une constante librement nommee input qui est egale a l element HTML portant le nom de la valeur de la key id  d un objet du tableau d objets FORM_DATA
// sur lequel on applique un event listener. Si l objet renvoie une valeur nulle ou non definie, l event listener prend en compte l evenement "change"
// (sinon il prend la valeur specifiee dans eventName (a savoir input)
// Opérateur de coalescence des nuls (Nullish coalescing operator) ?? est un operateur logique qui regarde à gauche et si null ou undefined, il prendra la valeur à droite
// (e) nom librement donne au parametre de la fonction callback attachee a l eventListener, mecanisme qui permet d avoir acces a l event (parametre de la fonction passee en callback)
// =>
// {} scope de la fonction
// defintion d une constante librement nommee output qui pointe sur l element HTML .error suivant l element html ayant pour id
// la valeur de la key id de l objet formData du tableau d objets FORM_DATA
// ~ est un operateur. il selectionne la 1ere classe error qui est precedee d un id specifique
// on envoie a ce moment un contenu vide dans l element portant le nom de classe .error
// if (...) { try { ...} catch (err) {...}} si la fonction validate Fn est appelee sur un objet, voir si l objet est une checkbox et si cette checkbox est checked
// sinon ':' on continue en prenant en consideration la valeur de la const input
//  si aucune error n est detectee, catch est ignore
//  si une erreur est detecte, l execution de try est stoppee et catch(err) est lancee
// un message d erreur est envoye dans la variable output qui vient se loger dans l element HTML correspondant a la classe .error correspondant a l element HTML avec l id
// egale a la valuer de la key id dns l objet du tableu d objets FORM_DATA

// JE NE COMPRENDS PAS COMMENT EST FAIT LE LIEN ENTRE err.message et new Error (qui contient le msg d erreur adequat)

// le contenu de la fonction callback, contenu dans (e), est appele a s afficher dans la console (pour verifier que le fonctionnement est ok et visualiser le resultat)

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
// la fonction librement nommee validate ne prend pas de parametre
// une variable shouldContinue est definie, de type booleen
// for ... of { } pour chaque objet formData du tableau d objets FORM_DATA
// 2 constantes sont declarees comme ci-dessus, input et output
// if try catch
// si catch est appele, en plus du msg d erreur, la var shouldContinue passe a false
// une 2e condition est verifiee sur la key date
// si l input n a pas de valeur correspondant a une date, un msg d erreur est affiche via output et shouldContinue = false
// si la valeur de linput est une date, celle-ci doit correspondre a la condition qui verifie si la date entree est supereirue a la date du jour - 15 ans(clacules en millisecondes)
// si non, un msg d erreur est envoye et shouldContinue = false
// si oui, la variable souldContinue reste true et appelle la fonction displaySuccess()

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
        output.innerHTML = 'Vous devez entrer votre date de naissance.'
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

// CLOSE FORM MODAL AFTER SUBMIT, LET THANKS MODAL COME BACK
// le style de l element HTML form ayant une id #modal est passe en display none
// le style de l element HTML form ayant une id #yhanks est passe en display flex
function displaySuccess() {
  document.querySelector('#modal form').style.display = 'none'
  document.querySelector('#thanks').style.display = 'flex'
  document.querySelectorAll('input[type=radio][id^=location]').checked = false
  document.querySelectorAll('.formData').value = ''
}

//STORE MODAL FOR LATER USE
// declaration de 3 constantes, pointant sur des elements HTML ayant pour id #modal, #form-modal, #thanks
const modal = document.querySelector('#modal')
const formModal = document.querySelector('#form-modal')
const modal2 = document.querySelector('#thanks')

// MODAL OPENING
// selection de tous les elements HTML portant la classe .modal-btn
// la methode forEach() execute une fonction sur chacun de ces elements
// => arrow function
// parametre (btn)
// sur lequel un enventListener ecoute le mouse event 'click'
// => arrow function sans parametre
// le style de l element HTML form ayant une id #modal est passe en display 'block'
document.querySelectorAll('.modal-btn').forEach(btn =>
  btn.addEventListener('click', () => {
    modal.style.display = 'block'
  })
)

// MODAL CLOSING
// selection de tous les elements HTML portant la classe .bground .close
// la methode forEach() execute une fonction sur chacun de ces elements
// => arrow function
// parametre (closeBtn)
// sur lequel un enventListener ecoute le mouse event 'click'
// => arrow function sans parametre
// le style de l element HTML form ayant une id #modal est passe en display none
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

function editNav() {
  var x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
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
