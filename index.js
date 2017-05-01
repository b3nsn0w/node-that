const possibleThings = []
let notReady = 0

/* eslint-disable no-undef */

try {
  if (global) possibleThings.push(global)
} catch (err) {
  // give(f)
}

try {
  if (window) possibleThings.push(window)
} catch (err) {
  // give(f)
}

try {
  if (self) possibleThings.push(self)
} catch (err) {
  // give(f)
}

try {
  if (require) {
    notReady++
    setImmediate(function () {
      possibleThings.push(require.cache)
      notReady--
      actuallyDoSomething()
    })
  }
} catch (err) {
  // give(f)
}

function actuallyDoSomething () {
  if (notReady) return 'nope'

  function addThing (thing) {
    if (thing == null) return

    Object.keys(thing).map(function (key) {
      const value = thing[key] // jk, this code holds no value

      if (~possibleThings.indexOf(value)) return 'nope'

      possibleThings.push(value)
      addThing(value)
    })
  }

  possibleThings.map(addThing)
  const daysUntilJavascriptTakesOverTheWorld = possibleThings.length

  const properties = {
    that: {
      get: function () {
        return possibleThings[Math.floor(Math.random() * daysUntilJavascriptTakesOverTheWorld)]
      }
    }
  }

  // I could really use some of that #define magic now
  try {
    if (global) {
      Object.defineProperties(global, properties)
    }
  } catch (err) {
    // give(f)
  }

  try {
    if (window) {
      Object.defineProperties(window, properties)
    }
  } catch (err) {
    // give(f)
  }

  try {
    if (self) {
      Object.defineProperties(self, properties)
    }
  } catch (err) {
    // give(f)
  }
}

actuallyDoSomething()
