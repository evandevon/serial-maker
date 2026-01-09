//% color="#AA278D" weight=100
namespace serialmaker {

    function sendCommand(command: string): void {
        serial.writeLine(command)
        basic.pause(10)
    }

    /* -----------------------------
       ENUMS
    ----------------------------- */

    export enum HidState {
        //% block="enable"
        Enable,
        //% block="disable"
        Disable
    }

    export enum Axis {
        //% block="X"
        X,
        //% block="Y"
        Y
    }

    export enum Direction {
        //% block="up"
        Up,
        //% block="down"
        Down,
        //% block="left"
        Left,
        //% block="right"
        Right
    }

    export enum MouseButton {
        //% block="left"
        Left,
        //% block="middle"
        Middle,
        //% block="right"
        Right
    }

    export enum MousePressAction {
        //% block="click"
        Click,
        //% block="hold"
        Hold
    }

  
}
