const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const upperCaseLetters = lowerCaseLetters.toUpperCase()
const numbers = '1234567890'
const symbols = '`~!@$%^&*()-_+={}[]|;:"<>,.?/'

module.exports = function generatePassword(req, res) {
  const userOptions = returnUserOptions(req)
  const collection = returnLettersCollection(userOptions)
  const randomPassword = []

  if (collection.length === 0) {
    randomPassword.push(...'There is no valid character in your selection')
  } else {
    for (let i = 0; i < userOptions.length; i++) {
      const randomIndex = Math.floor(Math.random() * collection.length)
      randomPassword.push(collection[randomIndex])

      // if we don't want password with duplicate letters
      // randomPassword.push(...collection.splice(randomIndex, 1))
    }
  }

  return res.render('index', { password: randomPassword.join(''), options: userOptions })
}

function returnUserOptions(req) {
  const userOptions = {}

  if (req.body.length) {
    userOptions.length = parseInt(req.body.length)
  }

  if (req.body.lowercase) {
    userOptions.lowercase = req.body.lowercase
  }

  if (req.body.uppercase) {
    userOptions.uppercase = req.body.uppercase
  }

  if (req.body.numbers) {
    userOptions.numbers = req.body.numbers
  }

  if (req.body.symbols) {
    userOptions.symbols = req.body.symbols
  }

  if (req.body.excludeCharacters) {
    userOptions.excludeCharacters = req.body.excludeCharacters
  }

  return userOptions
}

function returnLettersCollection(userOptions) {
  const collection = []

  if (userOptions.lowercase === 'on') {
    collection.push(...lowerCaseLetters)
  }

  if (userOptions.uppercase === 'on') {
    collection.push(...upperCaseLetters)
  }

  if (userOptions.numbers === 'on') {
    collection.push(...numbers)
  }

  if (userOptions.symbols === 'on') {
    collection.push(...symbols)
  }


  if (userOptions.excludeCharacters) {
    if (userOptions.excludeCharacters.length > 0) {
      const lettersToExclude = [...userOptions.excludeCharacters]
      return collection.filter(letter => !lettersToExclude.includes(letter))

      // this is the first version I wrote
      // using while loop to splice out characters

      // while (lettersToExclude.length > 0) {
      //   const targetLetter = lettersToExclude.pop()
      //   const indexToRemove = collection.findIndex(element => element === targetLetter)
      //   if (indexToRemove !== -1) {
      //     collection.splice(indexToRemove, 1)
      //   }
      // }
    }
  }

  return collection
}