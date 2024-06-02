let average = 0
input.onButtonPressed(Button.A, function () {
	
})
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
	
})
basic.forever(function () {
    for (let index = 0; index < 50; index++) {
        average = input.acceleration(Dimension.X)
        serial.writeLine("MOUSE_POS_%X," + average)
    }
})
