basic.forever(function () {
    for (let index = 0; index < 100; index++) {
        SerialMaker.line_graph(input.acceleration(Dimension.X))
        basic.pause(50)
    }
})
