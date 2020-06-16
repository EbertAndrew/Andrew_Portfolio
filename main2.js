// Store //

if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
	var removeCartItemButtons = document.getElementsByClassName('btn-danger')
	for (var i = 0; i < removeCartItemButtons.length; i++) {
		var button = removeCartItemButtons[i]
		button.addEventListener('click', removeCartItem)
	}

	var quantityInputs = document.getElementsByClassName('cart-quantity-input')
	for (var i = 0; i < quantityInputs.length; i++) {
		var input = quantityInputs[i]
		input.addEventListener('change', quantityChanged)
	}

	var addToCartButtons = document.getElementsByClassName('shop-item-button')
	for (var i = 0; i < addToCartButtons.length; i++) {
		var button = addToCartButtons[i]
		button.addEventListener('click', addToCartClicked)
	}

	document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
	alert('Thank you for your purchase')
	var cartItems = document.getElementsByClassName('cart-items')[0]
	while (cartItems.hasChildNodes()) {
		cartItems.removeChild(cartItems.firstChild)
	}
	updateCartTotal()
}

function removeCartItem(event) {
	var buttonClicked = event.target
	buttonClicked.parentElement.parentElement.remove()
	updateCartTotal()
}

function quantityChanged(event) {
	var input = event.target
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1
	}
	updateCartTotal()
}

function addToCartClicked(event) {
	var button = event.target
	var shopItem = button.parentElement.parentElement
	var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
	var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
	var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
	addItemToCart(title, price, imageSrc)
	updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
	var cartRow = document.createElement('div')
	cartRow.classList.add('cart-row')
	var cartItems = document.getElementsByClassName('cart-items')[0]
	var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
	for (var i = 0; i < cartItemNames.length; i++) {
		if (cartItemNames[i].innerText == title) {
			alert('This item is already added to the cart')
			return
		}
	}
	var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
	cartRow.innerHTML = cartRowContents
	cartItems.append(cartRow)
	cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
	cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
	var cartItemContainer = document.getElementsByClassName('cart-items')[0]
	var cartRows = cartItemContainer.getElementsByClassName('cart-row')
	var total = 0
	for (var i = 0; i < cartRows.length; i++) {
		var cartRow = cartRows[i]
		var priceElement = cartRow.getElementsByClassName('cart-price')[0]
		var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
		var price = parseFloat(priceElement.innerText.replace('$', ''))
		var quantity = quantityElement.value
		total = total + (price * quantity)
	}
	total = Math.round(total * 100) / 100
	document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}




// Blackjack //
var suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs']
var values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
var deck = new Array()


function createDeck() {
	deck = new Array()
	for (var i = 0; i < values.length; i++) {
		for (var x = 0; x < suits.length; x++) {
			var weight = parseInt(values[i])
			if (values[i] == 'J' || values[i] == 'Q' || values[i] == 'K') {
				weight = 10
			}
			if (values[i] == 'A') {
				weight = 11
			}
			var card = {
				Value: values[i],
				Suit: suits[x],
				Weight: weight
			}
			deck.push(card)

		}
	}
}

function shuffle() {
	// for every 100 turns
	// switch the values of the two random cards
	for (var i = 0; i < 100; i++) {
		var location1 = Math.floor((Math.random() * deck.length))
		var location2 = Math.floor((Math.random() * deck.length))
		var tmp = deck[location1]

		deck[location1] = deck[location2]
		deck[location2] = tmp
	}
}

var players = new Array()

function createPlayers(num) {
	players = new Array()
	for (var i = 1; i <= num; i++) {
		var hand = new Array()
		var player = {
			Name: 'Player' + i,
			ID: i,
			Points: 0,
			Hand: hand
		}
		players.push(player)
	}
}

function createPlayersUI() {
	document.getElementById('players').innerHTML = ''
	for (var i = 0; i < players.length; i++) {
		var div_player = document.createElement('div')
		var div_playerid = document.createElement('div')
		var div_hand = document.createElement('div')
		var div_points = document.createElement('div')

		div_points.className = 'points'
		div_points.id = 'points_' + i
		div_player.id = 'player_' + i
		div_player.className = 'player'
		div_hand.id = 'hand_' + i

		div_playerid.innerHTML = players[i].ID
		div_player.appendChild(div_playerid)
		div_player.appendChild(div_hand)
		div_player.appendChild(div_points)
		document.getElementById('players').appendChild(div_player)

	}
}

function startblackjack() {
	document.getElementById('btnStart').value = 'Restart'
	document.getElementById('status').style.display = ' none ';
	// deal 2 cards to every player object
	currentPlayer = 0
	createDeck()
	shuffle()
	createPlayers(3)
	createPlayersUI()
	dealHands()
	document.getElementById('player_' + currentPlayer).classList.add('active')

}

function dealHands() {
	// alternate handling cards to each player
	// 2 cards each
	for (var i = 0; i < 2; i++) {
		for (var x = 0; x < players.length; x++) {
			var card = deck.pop()
			players[x].Hand.push(card)
			renderCard(card, x)
			updatePoints()
		}
	}

	updateDeck()
}

function renderCard(card, player) {
	var hand = document.getElementById('hand_' + player)
	hand.appendChild(getCardUI(card))
}

function getCardUI(card) {
	var el = document.createElement('div')
	el.className = 'card'
	el.innerHTML = card.Suit + ' ' + card.Value
	return el
}

function getPoints(player) {
	var points = 0
	for (var i = 0; i < players[player].Hand.length; i++) {
		points += players[player].Hand[i].Weight
	}
	players[player].Points = points
	return points
}

function updatePoints() {
	for (var i = 0; i < players.length; i++) {
		getPoints(i)
		document.getElementById('points_' + i).innerHTML = players[i].Points
	}
}

function check() {
	if (players[currentPlayer].Points > 21) {
		document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].ID + 'LOST'
		document.getElementById('status').style.display = 'inline-block';
		end()
	}
}

function updateDeck() {
	document.getElementById('deckcount').innerHTML = deck.length
}

window.addEventListener('load', function () {
	createDeck()
	shuffle()
	createPlayers(1)
})


var currentPlayer = 0

function hitMe() {
	// pop a card from the deck to the current player
	// check if current player points are over 21
	var card = deck.pop()
	players[currentPlayer].Hand.push(card)
	renderCard(card, currentPlayer)
	updatePoints()
	check()
}

function stay() {
	// move on to next player if any
	if (currentPlayer != players.length - 1) {
		document.getElementById('player_' + currentPlayer).classList.remove('active')
		currentPlayer += 1
		document.getElementById('player_' + currentPlayer).classList.add('active')
	} else {
		end()
	}
}

function end() {
	var winner = -1
	var score = 0

	for (var i = 0; i < players.length; i++) {
		if (players[i].Points > score && players[i].Points < 22) {
			winner = i
		}

		score = players[i].Points

	}

	document.getElementById('status').innerHTML = 'Winner: Player ' + players[winner].ID
}


// Battleship //

var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,

	ships: [
		{ locations: [0, 0, 0], hits: ['', '', ''] },
		{ locations: [0, 0, 0], hits: ['', '', ''] },
		{ locations: [0, 0, 0], hits: ['', '', ''] }
	],

	// original hard-coded values for ship locations
	/*
		  ships: [
			  { locations: ["06", "16", "26"], hits: ["", "", ""] },
			  { locations: ["24", "34", "44"], hits: ["", "", ""] },
			  { locations: ["10", "11", "12"], hits: ["", "", ""] }
		  ],
	  */

	fire: function (guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i]
			var index = ship.locations.indexOf(guess)

			// here's an improvement! Check to see if the ship
			// has already been hit, message the user, and return true.
			if (ship.hits[index] === 'hit') {
				view.displayMessage('Oops, you already hit that location!')
				return true
			} else if (index >= 0) {
				ship.hits[index] = 'hit';
				view.displayHit(guess)
				view.displayMessage('HIT!')

				if (this.isSunk(ship)) {
					view.displayMessage('You sank my battleship!')
					this.shipsSunk++
				}
				return true
			}
		}
		view.displayMiss(guess)
		view.displayMessage('You missed.')
		return false
	},

	isSunk: function (ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] !== 'hit') {
				return false
			}
		}
		return true
	},

	generateShipLocations: function () {
		var locations
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip()
			} while (this.collision(locations))
			this.ships[i].locations = locations
		}
		console.log('Ships array: ')
		console.log(this.ships)
	},

	generateShip: function () {
		var direction = Math.floor(Math.random() * 2)
		var row, col

		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize)
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1))
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1))
			col = Math.floor(Math.random() * this.boardSize)
		}

		var newShipLocations = []
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + '' + (col + i))
			} else {
				newShipLocations.push((row + i) + '' + col)
			}
		}
		return newShipLocations
	},

	collision: function (locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i]
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true
				}
			}
		}
		return false
	}

}


var view = {
	displayMessage: function (msg) {
		var messageArea = document.getElementById('messageArea')
		messageArea.innerHTML = msg
	},

	displayHit: function (location) {
		var cell = document.getElementById(location)
		cell.setAttribute('class', 'hit')
	},

	displayMiss: function (location) {
		var cell = document.getElementById(location)
		cell.setAttribute('class', 'miss')
	}

}

var controller = {
	guesses: 0,

	processGuess: function (guess) {
		var location = parseGuess(guess)
		if (location) {
			this.guesses++
			var hit = model.fire(location)
			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage('You sank all my battleships, in ' + this.guesses + ' guesses')
			}
		}
	}
}

// helper function to parse a guess from the user

function parseGuess(guess) {
	var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

	if (guess === null || guess.length !== 2) {
		alert('Oops, please enter a letter and a number on the board.')
	} else {
		var firstChar = guess.charAt(0)
		var row = alphabet.indexOf(firstChar)
		var column = guess.charAt(1)

		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.")
		} else if (row < 0 || row >= model.boardSize ||
			column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board!")
		} else {
			return row + column
		}
	}
	return null
}

// event handlers

function handleFireButton() {
	var guessInput = document.getElementById('guessInput')
	var guess = guessInput.value.toUpperCase()

	controller.processGuess(guess)

	guessInput.value = '';
}

function handleKeyPress(e) {
	var fireButton = document.getElementById('fireButton')

	// in IE9 and earlier, the event object doesn't get passed
	// to the event handler correctly, so we use window.event instead.
	e = e || window.event

	if (e.keyCode === 13) {
		fireButton.click()
		return false
	}
}

// init - called when the page has completed loading

window.onload = init

function init() {
	// Fire! button onclick handler
	var fireButton = document.getElementById('fireButton')
	fireButton.onclick = handleFireButton

	// handle "return" key press
	var guessInput = document.getElementById('guessInput')
	guessInput.onkeypress = handleKeyPress

	// place the ships on the game board
	model.generateShipLocations()
}

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

// 360deg //

(function e(t, n, r) { function s(o, u) { if (!n[o]) { if (!t[o]) { var a = typeof require === 'function' && require; if (!u && a) return a(o, !0); if (i) return i(o, !0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = 'MODULE_NOT_FOUND', f } var l = n[o] = { exports: {} }; t[o][0].call(l.exports, function (e) { var n = t[o][1][e]; return s(n || e) }, l, l.exports, e, t, n, r) } return n[o].exports } var i = typeof require === 'function' && require; for (var o = 0; o < r.length; o++)s(r[o]); return s })({
	1: [function (require, module, exports) {
		'use strict'

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

		var _circlr = require('circlr')

		var _circlr2 = _interopRequireDefault(_circlr)

		var el = document.querySelector('.rotation')
		var btnScroll = document.querySelector('.btn-scroll')
		var btnCycle = document.querySelector('.btn-cycle')
		var btnReverse = document.querySelector('.btn-reverse')
		var btnPrev = document.querySelector('.btn-prev')
		var btnNext = document.querySelector('.btn-next')
		var btnPlay = document.querySelector('.btn-play')
		var btnPlayTo = document.querySelector('.btn-play-to')
		var camera = (0, _circlr2.default)(el).scroll(true)

		btnScroll.addEventListener('click', function (e) {
			toggleActive(e.target)
			camera.scroll(isActive(e.target))
		}, false)

		btnCycle.addEventListener('click', function (e) {
			toggleActive(e.target)
			camera.cycle(isActive(e.target))
		}, false)

		btnReverse.addEventListener('click', function (e) {
			toggleActive(e.target)
			camera.reverse(isActive(e.target))
		}, false)

		btnPrev.addEventListener('click', function () {
			camera.prev()
		}, false)

		btnNext.addEventListener('click', function () {
			camera.next()
		}, false)

		btnPlay.addEventListener('click', function (e) {
			if (e.target.innerHTML === 'Play') {
				camera.play()
				e.target.innerHTML = 'Stop'
			} else {
				camera.stop()
				e.target.innerHTML = 'Play'
			}
		}, false)

		btnPlayTo.addEventListener('click', function () {
			camera.play(0)
		}, false)

		function toggleActive(el) {
			if (isActive(el)) {
				el.className = el.className.replace(/(active)/, '')
			} else {
				el.className += ' active'
			}
		}

		function isActive(el) {
			return el.className.includes('active')
		}
	}, { circlr: 2 }],
	2: [function (require, module, exports) {
		'use strict'
		var Emitter = require('component-emitter')
		var wheel = require('eventwheel')

		module.exports = Rotation

		function Rotation(el) {
			if (!(this instanceof Rotation)) return new Rotation(el)
			if (typeof el === 'string') el = document.querySelector(el)
			this.el = el
			this.current = 0
			this.cycle(true)
			this.interval(75)
			this.start(0)
			this.onTouchStart = this.onTouchStart.bind(this)
			this.onTouchMove = this.onTouchMove.bind(this)
			this.onTouchEnd = this.onTouchEnd.bind(this)
			this.onWheel = this.onWheel.bind(this)
			this.bind()
		}

		Emitter(Rotation.prototype)

		Rotation.prototype.scroll = function (n) {
			if (this._scroll === n) return this
			this._scroll = n

			if (this._scroll) {
				wheel.bind(this.el, this.onWheel)
			} else {
				wheel.unbind(this.el, this.onWheel)
			}

			return this
		};

		Rotation.prototype.vertical = function (n) {
			this._vertical = n
			return this
		};

		Rotation.prototype.reverse = function (n) {
			this._reverse = n
			return this
		};

		Rotation.prototype.cycle = function (n) {
			this._cycle = n
			return this
		};

		Rotation.prototype.interval = function (ms) {
			this._interval = ms
			return this
		};

		Rotation.prototype.start = function (n) {
			var children = this.children()
			this.el.style.position = 'relative'
			this.el.style.width = '100%'

			for (var i = 0, len = children.length; i < len; i++) {
				children[i].style.display = 'none'
				children[i].style.width = '100%'
			}

			this.show(n)
			return this
		};

		Rotation.prototype.play = function (n) {
			if (this.timer) return
			var self = this

			function timer() {
				if (n === undefined || n > self.current) self.next()
				if (n < self.current) self.prev()
				if (n === self.current) self.stop()
			}

			this.timer = setInterval(timer, this._interval)
			return this
		};

		Rotation.prototype.stop = function () {
			clearInterval(this.timer)
			this.timer = null
			return this
		};

		Rotation.prototype.prev = function () {
			return this.show(this.current - 1)
		};

		Rotation.prototype.next = function () {
			return this.show(this.current + 1)
		};

		Rotation.prototype.show = function (n) {
			var children = this.children()
			var len = children.length
			if (n < 0) n = this._cycle ? n + len : 0
			if (n > len - 1) n = this._cycle ? n - len : len - 1
			children[this.current].style.display = 'none'
			children[n].style.display = 'block'
			if (n !== this.current) this.emit('show', n, len)
			this.current = n
			return this
		};

		Rotation.prototype.bind = function () {
			this.el.addEventListener('touchstart', this.onTouchStart, false)
			this.el.addEventListener('touchmove', this.onTouchMove, false)
			this.el.addEventListener('touchend', this.onTouchEnd, false)
			this.el.addEventListener('mousedown', this.onTouchStart, false)
			this.el.addEventListener('mousemove', this.onTouchMove, false)
			document.addEventListener('mouseup', this.onTouchEnd, false)
			if (this._scroll) wheel.bind(this.el, this.onWheel)
		};

		Rotation.prototype.unbind = function () {
			this.el.removeEventListener('touchstart', this.onTouchStart, false)
			this.el.removeEventListener('touchmove', this.onTouchMove, false)
			this.el.removeEventListener('touchend', this.onTouchEnd, false)
			this.el.removeEventListener('mousedown', this.onTouchStart, false)
			this.el.removeEventListener('mousemove', this.onTouchMove, false)
			document.removeEventListener('mouseup', this.onTouchEnd, false)
			if (this._scroll) wheel.unbind(this.el, this.onWheel)
		};

		Rotation.prototype.onTouchStart = function (event) {
			if (this.timer) this.stop()
			event.preventDefault()
			this.touch = this.getTouch(event)
			this.currentTouched = this.current
		};

		Rotation.prototype.onTouchMove = function (event) {
			if (typeof this.touch !== 'number') return
			event.preventDefault()
			var touch = this.getTouch(event)
			var len = this.children().length
			var max = this.el[this._vertical ? 'clientHeight' : 'clientWidth']
			var offset = touch - this.touch
			offset = this._reverse ? -offset : offset
			offset = Math.floor(offset / max * len)
			this.show(this.currentTouched + offset)
		};

		Rotation.prototype.onTouchEnd = function (event) {
			if (typeof this.touch !== 'number') return
			event.preventDefault()
			this.touch = null
		};

		Rotation.prototype.onWheel = function (event) {
			if (this.timer) this.stop()
			event.preventDefault()
			var delta = event.deltaY || event.detail || (-event.wheelDelta)
			delta = delta !== 0 ? delta / Math.abs(delta) : delta
			delta = this._reverse ? -delta : delta
			this[delta > 0 ? 'next' : 'prev']()
		};

		Rotation.prototype.children = function () {
			var nodes = this.el.childNodes
			var elements = []

			for (var i = 0, len = nodes.length; i < len; i++) {
				if (nodes[i].nodeType === 1) elements.push(nodes[i])
			}

			return elements
		};

		Rotation.prototype.getTouch = function (event) {
			event = /^touch/.test(event.type) ? event.changedTouches[0] : event

			return this._vertical
				? event.clientY - this.el.offsetTop
				: event.clientX - this.el.offsetLeft
		};
	}, { 'component-emitter': 3, eventwheel: 5 }],
	3: [function (require, module, exports) {
		/**
			 * Expose `Emitter`.
			 */

		if (typeof module !== 'undefined') {
			module.exports = Emitter
		}

		/**
			 * Initialize a new `Emitter`.
			 *
			 * @api public
			 */

		function Emitter(obj) {
			if (obj) return mixin(obj)
		};

		/**
			 * Mixin the emitter properties.
			 *
			 * @param {Object} obj
			 * @return {Object}
			 * @api private
			 */

		function mixin(obj) {
			for (var key in Emitter.prototype) {
				obj[key] = Emitter.prototype[key]
			}
			return obj
		}

		/**
			 * Listen on the given `event` with `fn`.
			 *
			 * @param {String} event
			 * @param {Function} fn
			 * @return {Emitter}
			 * @api public
			 */

		Emitter.prototype.on =
			Emitter.prototype.addEventListener = function (event, fn) {
				this._callbacks = this._callbacks || {};
				(this._callbacks['$' + event] = this._callbacks['$' + event] || [])
					.push(fn)
				return this
			};

		/**
			 * Adds an `event` listener that will be invoked a single
			 * time then automatically removed.
			 *
			 * @param {String} event
			 * @param {Function} fn
			 * @return {Emitter}
			 * @api public
			 */

		Emitter.prototype.once = function (event, fn) {
			function on() {
				this.off(event, on)
				fn.apply(this, arguments)
			}

			on.fn = fn
			this.on(event, on)
			return this
		};

		/**
			 * Remove the given callback for `event` or all
			 * registered callbacks.
			 *
			 * @param {String} event
			 * @param {Function} fn
			 * @return {Emitter}
			 * @api public
			 */

		Emitter.prototype.off =
			Emitter.prototype.removeListener =
			Emitter.prototype.removeAllListeners =
			Emitter.prototype.removeEventListener = function (event, fn) {
				this._callbacks = this._callbacks || {}

				// all
				if (arguments.length == 0) {
					this._callbacks = {}
					return this
				}

				// specific event
				var callbacks = this._callbacks['$' + event]
				if (!callbacks) return this

				// remove all handlers
				if (arguments.length == 1) {
					delete this._callbacks['$' + event]
					return this
				}

				// remove specific handler
				var cb
				for (var i = 0; i < callbacks.length; i++) {
					cb = callbacks[i]
					if (cb === fn || cb.fn === fn) {
						callbacks.splice(i, 1)
						break;
					}
				}
				return this
			};

		/**
			 * Emit `event` with the given args.
			 *
			 * @param {String} event
			 * @param {Mixed} ...
			 * @return {Emitter}
			 */

		Emitter.prototype.emit = function (event) {
			this._callbacks = this._callbacks || {}
			var args = [].slice.call(arguments, 1),
				callbacks = this._callbacks['$' + event]

			if (callbacks) {
				callbacks = callbacks.slice(0)
				for (var i = 0, len = callbacks.length; i < len; ++i) {
					callbacks[i].apply(this, args)
				}
			}

			return this
		};

		/**
			 * Return array of callbacks for `event`.
			 *
			 * @param {String} event
			 * @return {Array}
			 * @api public
			 */

		Emitter.prototype.listeners = function (event) {
			this._callbacks = this._callbacks || {}
			return this._callbacks['$' + event] || []
		};

		/**
			 * Check if this emitter has `event` handlers.
			 *
			 * @param {String} event
			 * @return {Boolean}
			 * @api public
			 */

		Emitter.prototype.hasListeners = function (event) {
			return !!this.listeners(event).length
		};
	}, {}],
	4: [function (require, module, exports) {
		var bind = window.addEventListener ? 'addEventListener' : 'attachEvent';
		var unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent';
		var prefix = bind !== 'addEventListener' ? 'on' : ''

		/**
		 * Bind `el` event `type` to `fn`.
		 *
		 * @param {Element} el
		 * @param {String} type
		 * @param {Function} fn
		 * @param {Boolean} capture
		 * @return {Function}
		 * @api public
		 */

		exports.bind = function (el, type, fn, capture) {
			el[bind](prefix + type, fn, capture || false)
			return fn
		};

		/**
			 * Unbind `el` event `type`'s callback `fn`.
			 *
			 * @param {Element} el
			 * @param {String} type
			 * @param {Function} fn
			 * @param {Boolean} capture
			 * @return {Function}
			 * @api public
			 */

		exports.unbind = function (el, type, fn, capture) {
			el[unbind](prefix + type, fn, capture || false)
			return fn
		};
	}, {}],
	5: [function (require, module, exports) {
		'use strict'

		/**
		 * Module dependencies
		 */

		try {
			var events = require('event')
		} catch (err) {
			var events = require('component-event')
		}

		/**
			 * Wheel events
			 */

		var wheelEventsMap = [
			'wheel',
			'mousewheel',
			'scroll',
			'DOMMouseScroll'
		]

		/**
		 * Wheel event name
		 */

		var wheelEvent = 'mousewheel'

		if (window.addEventListener) {
			for (var e = 0; e < wheelEventsMap.length; e++) {
				if ('on' + wheelEventsMap[e] in window) {
					wheelEvent = wheelEventsMap[e]
					break;
				}
			}
		}

		/**
			 * Expose bind
			 */

		module.exports = bind.bind = bind

		/**
		 * Bind
		 *
		 * @param  {Element} element
		 * @param  {Function} fn
		 * @param  {Boolean} capture
		 * @return {Function}
		 * @api public
		 */


		function bind(element, fn, capture) {
			return events.bind(element, wheelEvent, fn, capture || false)
		}

		/**
			 * Expose unbind
			 *
			 * @param  {Element} element
			 * @param  {Function} fn
			 * @param  {Boolean} capture
			 * @return {Function}
			 * @api public
			 */

		module.exports.unbind = function (element, fn, capture) {
			return events.unbind(element, wheelEvent, fn, capture || false)
		};
	}, { 'component-event': 4, event: 4 }]
}, {}, [1])
