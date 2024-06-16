input.onButtonPressed(Button.A, function () {
    SerialMaker.file_add_to_line("Data", "Data File", 0)
    basic.pause(100)
})
input.onButtonPressed(Button.B, function () {
    SerialMaker.Sound_Actions(Sound_Choices.Stop)
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
	
})
basic.forever(function () {
	
})
