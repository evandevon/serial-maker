input.onButtonPressed(Button.A, function () {
    SerialMaker.play_sound("Alert 1.wav")
})
input.onButtonPressed(Button.B, function () {
    SerialMaker.Sound_Actions(Sound_Choices.Stop)
})
