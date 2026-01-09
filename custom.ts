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

    /* -----------------------------
       HELPERS
    ----------------------------- */

    function axisChar(axis: Axis): string {
        return axis === Axis.X ? "X" : "Y"
    }

    function dirChar(dir: Direction): string {
        if (dir === Direction.Up) return "UP"
        if (dir === Direction.Down) return "DOWN"
        if (dir === Direction.Left) return "LEFT"
        return "RIGHT"
    }

    function buttonChar(button: MouseButton): string {
        if (button === MouseButton.Left) return "L"
        if (button === MouseButton.Middle) return "M"
        return "R"
    }

    function releaseChar(target: MouseReleaseTarget): string {
        if (target === MouseReleaseTarget.Left) return "L"
        if (target === MouseReleaseTarget.Middle) return "M"
        if (target === MouseReleaseTarget.Right) return "R"
        return "ALL"
    }

    function scrollChar(dir: ScrollDirection): string {
        if (dir === ScrollDirection.Up) return "UP"
        if (dir === ScrollDirection.Down) return "DOWN"
        if (dir === ScrollDirection.Left) return "LEFT"
        return "RIGHT"
    }

    function keyName(key: SpecialKey): string {
        return SpecialKey[key].toUpperCase()
    }

    /* -----------------------------
       TOOLS
    ----------------------------- */

    //% block="keyboard and mouse control %state"
    //% group="Tools"
    export function setHid(state: HidState): void {
        sendCommand(state === HidState.Enable ? "START_HID" : "STOP_HID")
    }

    //% color=#2db300
    //% group="Tools"
    //% block="Update Live Display"
    export function SendDisplayOverSerial() {
        let Display_Grid = "";
        let Y_Pos = 0;
        let X_Pos = 0;

        for (let index1 = 0; index1 <= 4; index1++) {
            Y_Pos = index1;
            for (let index2 = 0; index2 <= 4; index2++) {
                X_Pos = index2;
                if (led.point(X_Pos, Y_Pos)) {
                    Display_Grid = "" + Display_Grid + "1";
                } else {
                    Display_Grid = "" + Display_Grid + "0";
                }
            }
        }

        serial.writeLine("DISPLAY," + Display_Grid);
        basic.pause(20);
        return;
    }
    

    /**
     * Sends a comment to the log
     */
    //% block="send comment %text"
    //% group="Tools"
    export function comment(text: string): void {
        sendCommand("#" + text)
    }

    /**
     * Clear the computer log
     */
    //% block="clear data log"
    //% group="Tools"
    export function clearLog(): void {
        sendCommand("CLEAR_LOG")
    }

    /**
    * Averages a value across selected time frame.
    */
    //% group="Tools"
    // note that Caml casing yields lower case
    // block text with spaces
    //% block="Average measurement of $value measured $measurements times over $time_range (ms) "|| icon="\uf080" 
    export function Averaging(value: number, measurements: number, time_range: number): number {
        let average = 0
        let delay = time_range / measurements
        for (let index = 0; index < measurements; index++) {
            average += value
            basic.pause(delay)
        }
        average = average / measurements
        return average;
    }



}
