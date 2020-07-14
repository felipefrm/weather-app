const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) => {
    
    e.preventDefault()

    fetch(`/weather?address=${searchElement.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.innerHTML = data.error
                msg2.innerHTML = ""
            }
            else {
                msg1.innerHTML = data.location
                msg2.innerHTML = data.forecast

            }
        })
    })
})