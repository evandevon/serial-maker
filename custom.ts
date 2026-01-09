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

    export enum MouseReleaseTarget {
        //% block="left"
        Left,
        //% block="middle"
        Middle,
        //% block="right"
        Right,
        //% block="all"
        All
    }

    export enum ScrollDirection {
        //% block="up"
        Up,
        //% block="down"
        Down,
        //% block="left"
        Left,
        //% block="right"
        Right
    }

    export enum KeyAction {
        //% block="tap"
        Tap,
        //% block="hold"
        Hold,
        //% block="release"
        Release
    }

    // Fully expanded special keys
    export enum SpecialKey {
        // Directional / Navigation
        //% block="up arrow"
        Up,
        //% block="down arrow"
        Down,
        //% block="left arrow"
        Left,
        //% block="right arrow"
        Right,
        //% block="page up"
        PageUp,
        //% block="page down"
        PageDown,
        //% block="home"
        Home,
        //% block="end"
        End,
        //% block="tab"
        Tab,

        // Control keys
        //% block="escape"
        Esc,
        //% block="control"
        Ctrl,
        //% block="alt"
        Alt,
        //% block="shift"
        Shift,
        //% block="windows"
        Windows,
        //% block="caps lock"
        CapsLock,

        // Function keys
        //% block="F1"
        F1,
        //% block="F2"
        F2,
        //% block="F3"
        F3,
        //% block="F4"
        F4,
        //% block="F5"
        F5,
        //% block="F6"
        F6,
        //% block="F7"
        F7,
        //% block="F8"
        F8,
        //% block="F9"
        F9,
        //% block="F10"
        F10,
        //% block="F11"
        F11,
        //% block="F12"
        F12,
        //% block="print screen"
        PrintScreen,

        // Media keys
        //% block="volume up"
        VolumeUp,
        //% block="volume down"
        VolumeDown,
        //% block="mute"
        VolumeMute,
        //% block="play/pause"
        PlayPause,

        // Typing / Alphanumeric
        // Letters A-Z
        //% block="A"
        A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z,

        // Numbers 0-9
        //% block="0"
        Num0, Num1, Num2, Num3, Num4, Num5, Num6, Num7, Num8, Num9,

        // Other typing keys
        //% block="enter"
        Enter,
        //% block="space"
        Space,
        //% block="delete"
        Delete,
        //% block="backspace"
        Backspace,

        // Combos
        //% block="copy"
        Copy,
        //% block="cut"
        Cut,
        //% block="paste"
        Paste
    }
}
