input.onButtonPressed(Button.A, function () {
	
})
buttonClicks.onButtonDown(buttonClicks.AorB.A, function () {
	
})
input.onButtonPressed(Button.B, function () {
    SerialMaker.clear_overlay()
})
buttonClicks.onButtonHeld(buttonClicks.AorB.A, function () {
	
})
basic.forever(function () {
    SerialMaker.SendDisplayOverSerial()
    basic.pause(20)
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        led.toggle(randint(0, 4), randint(0, 4))
    }
})
