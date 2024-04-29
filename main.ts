let av = 0
basic.forever(function () {
    av = SerialMaker.Averaging(pins.analogReadPin(AnalogPin.P0), 10, 1000)
    led.plotBarGraph(
    av,
    1024,
    false
    )
})
