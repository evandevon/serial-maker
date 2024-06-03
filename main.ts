basic.forever(function () {
    if (input.isGesture(Gesture.LogoUp)) {
        SerialMaker.mouse_move_direction(Direction_Words.UP)
    }
    if (input.isGesture(Gesture.LogoDown)) {
        SerialMaker.mouse_move_direction(Direction_Words.DOWN)
    }
    if (input.isGesture(Gesture.TiltLeft)) {
        SerialMaker.mouse_move_direction(Direction_Words.LEFT)
    }
    if (input.isGesture(Gesture.TiltRight)) {
        SerialMaker.mouse_move_direction(Direction_Words.RIGHT)
    }
})
