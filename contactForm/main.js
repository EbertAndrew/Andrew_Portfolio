// Contact Form //

console.log('It works')

$(document).ready(function () {
	$('.submit').click(function (event) {
		console.log('Clicked button')

		var email = $('.email').val()
		var name = $('.name').val()
		var message = $('.message').val()
		var statusElm = $('.status')
		statusElm.empty()

		if (email.length > 5 && email.includes('@') && email.includes('.')) {
			statusElm.append('')
		} else {
			event.preventDefault()
			statusElm.append('<div>Email is not valid</div>')
		}

		if (name.length >= 2) {
			statusElm.append('')
		} else {
			event.preventDefault()
			statusElm.append('<div>Your Name is too short</div>')
		}

		if (message.length >= 10) {
			statusElm.append('')
		} else {
			event.preventDefault()
			statusElm.append('<div>Message is too short</div>')
		}
	})
});