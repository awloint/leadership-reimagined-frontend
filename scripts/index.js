document.addEventListener('DOMContentLoaded', () => {
  const date = new Date()
  const year = date.getFullYear()
  const yearContent = document.querySelector('#year')
  yearContent.innerHTML = year

  // Capitalize first letter of First Name and Last Name
  document.querySelector('#firstName').onchange = e => {
    let val = document.querySelector('#firstName').value
    RegExp = /\b[a-z]/g

    val = val.charAt(0).toUpperCase() + val.substr(1)
  }

  document.querySelector('#lastName').onchange = e => {
    let val = document.querySelector('#lastName').value
    RegExp = /\b[a-z]/g

    val = val.charAt(0).toUpperCase() + val.substr(1)
  }

  document.querySelector('#email').onchange = e => {
    let val = document.querySelector('#email').value
    RegExp = /\b[a-z]/g

    val = val.toLowerCase()
  }

  const strategies = document.querySelector('#strategies')
  document.querySelector('#yes').onclick = e => {
    strategies.style.display = 'initial'
  }
  document.querySelector('#no').onclick = e => {
    strategies.style.display = 'none'
  }

  // Add intl-tel-input
  window.intlTelInputGlobals.loadUtils('scripts/utils.js')
  var input = document.querySelector('#phone')
  window.intlTelInput(input, {
    // any initialisation options go here
    initialCountry: 'ng',
    separateDialCode: true,
    hiddenInput: 'full_phone',
    utilsScript: 'scripts/utils.js'
  })

  //   Submit the form
  const form = document.querySelector('form')

  // On Form Submit
  form.addEventListener('submit', e => {
    // Check to see if form has validation errors
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    // If form doesn't have validation errors
    if (form.checkValidity() === true) {
      e.preventDefault()

      // change the button color and add the loading class
      document.querySelector('button').classList.remove('btn-danger')
      document.querySelector('button').classList.add('btn-primary')
      document.querySelector('button').innerHTML =
        'Loading <span class="spinner"><i class="fa fa-spinner fa-spin"></i></span>'

      // Create Form Variables
      const firstName = document.querySelector("input[name='firstName']").value
      const lastName = document.querySelector("input[name='lastName']").value
      const email = document.querySelector("input[name='email']").value
      const phone = document.querySelector("input[name='full_phone']").value
      const city = document.querySelector("input[name='city']").value
      const country = document.querySelector("select[name='country']").value
      const organisationalChallenges = document.querySelector(
        "textarea[name='organisationalChallenges']"
      ).value
      const alterStrategies = document.querySelector(
        "input[name='alterStrategies']"
      ).value
      const strategiesImplemented = document.querySelector(
        "textarea[name='strategiesImplemented']"
      ).value

      // construct formData
      const formBody = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        city: city,
        country: country,
        organisationalChallenges: organisationalChallenges,
        alterStrategies: alterStrategies,
        strategiesImplemented: strategiesImplemented
      }

      // send it for processing
      fetch('https://leadership-reimagined.herokuapp.com/', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formBody)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.message === 'Delegate created successfully') {
            swal(
              'Registration Successful!',
              'Your registration was successful! Check your email for the Zoom link',
              'success'
            )
            setTimeout((window.location = 'https://awlo.org'), 5000)
          } else if (data.message === 'user exists') {
            swal(
              'Already Registered!',
              'You have already registered!',
              'warning'
            )
            setTimeout((window.location = 'https://awlo.org'), 5000)
          }
        })
        .catch(err => {
          console.log('The request failed', err)
        })
    }
  })
})
