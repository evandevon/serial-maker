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

    /* ------------------------------------------------------------------
    * SYSTEM VARIABLE REQUESTS
    * ------------------------------------------------------------------ */

    /**
     * System variable request types
     */
    export enum SystemRequest {
        //% block="current time (hh:mm:ss)"
        Time,
        //% block="detailed time (hh:mm:ss:ms)"
        DetailedTime,
        //% block="current date (dd/mm/yyyy)"
        Date,
        //% block="year"
        Year,
        //% block="month"
        Month,
        //% block="day"
        Day,
        //% block="hour"
        Hour,
        //% block="minute"
        Minute,
        //% block="second"
        Second
    }

    function systemRequestToCommand(request: SystemRequest): string {
        switch (request) {
            case SystemRequest.Time: return "REQUEST_TIME"
            case SystemRequest.DetailedTime: return "REQUEST_DETAILED_TIME"
            case SystemRequest.Date: return "REQUEST_DATE"
            case SystemRequest.Year: return "REQUEST_YEAR"
            case SystemRequest.Month: return "REQUEST_MONTH"
            case SystemRequest.Day: return "REQUEST_DAY"
            case SystemRequest.Hour: return "REQUEST_HOUR"
            case SystemRequest.Minute: return "REQUEST_MINUTE"
            case SystemRequest.Second: return "REQUEST_SECOND"
        }
        return "REQUEST_TIME"
    }

    /**
     * Request system time/date from computer
     */
    //% block="request system %request"
    //% group="Tools"
    export function requestSystemVariable(request: SystemRequest): void {
        sendCommand(systemRequestToCommand(request))
    }


    /* -----------------------------
       MOUSE COMMANDS
    ----------------------------- */

    // Move mouse 10 pixels visually in a direction
    //% block="move mouse %direction by 10 pixels"
    //% group="Mouse Move"
    export function moveMouseDirection(direction: Direction): void {
        sendCommand("MOUSE_MOVE_" + dirChar(direction))
    }

    // Move mouse along an axis by value
    //% block="move mouse %axis by %value pixels"
    //% value.min=-100 value.max=100
    //% group="Mouse Move"
    export function moveMouseAxis(axis: Axis, value: number): void {
        sendCommand("MOUSE_MOVE_" + axisChar(axis) + "," + value)
    }

    // Move mouse X/Y pixels
    //% block="move mouse X %x Y %y pixels"
    //% group="Mouse Move"
    export function moveMouseXY(x: number, y: number): void {
        sendCommand("MOUSE_MOVE_XY," + x + "," + y)
    }

    /**
     * Move mouse to absolute X and Y position
     */
    //% block="set mouse position to X %x Y %y"
    //% group="Mouse Position"
    export function moveMouseXYAbsolute(x: number, y: number): void {
        sendCommand("MOUSE_POS_XY," + x + "," + y)
    }

    // Set mouse absolute position
    //% block="set mouse %axis position to %value pixels"
    //% group="Mouse Position"
    export function setMousePosition(axis: Axis, value: number): void {
        sendCommand("MOUSE_POS_" + axisChar(axis) + "," + value)
    }

    // Set mouse percent position
    //% block="set mouse %axis position to %value percent"
    //% value.min=0 value.max=100
    //% group="Mouse Position"
    export function setMousePositionPercent(axis: Axis, value: number): void {
        sendCommand("MOUSE_POS_%" + axisChar(axis) + "," + value)
    }

    // Mouse click/hold
    //% block="mouse %action %button"
    //% group="Mouse Buttons"
    export function mousePress(action: MousePressAction, button: MouseButton): void {
        let cmd = action === MousePressAction.Click ? "MOUSE_CLICK," : "MOUSE_HOLD,"
        sendCommand(cmd + buttonChar(button))
    }

    // Mouse release
    //% block="mouse release %target"
    //% group="Mouse Buttons"
    export function mouseRelease(target: MouseReleaseTarget): void {
        sendCommand("MOUSE_RELEASE," + releaseChar(target))
    }

    // Mouse scroll
    //% block="mouse scroll wheel %direction"
    //% group="Mouse Buttons"
    export function mouseScroll(direction: ScrollDirection): void {
        sendCommand("MOUSE_SCROLL," + scrollChar(direction))
    }

    /* -----------------------------
       KEYBOARD COMMANDS
    ----------------------------- */

    // Single key action
    //% block="keyboard %action %key"
    //% group="Keyboard"
    export function keyboardKey(action: KeyAction, key: SpecialKey): void {
        let prefix = "KEY_TAP,"
        if (action === KeyAction.Hold) prefix = "KEY_HOLD,"
        if (action === KeyAction.Release) prefix = "KEY_RELEASE,"
        sendCommand(prefix + keyName(key))
    }


    // Type arbitrary text
    //% block="type text %text"
    //% group="Keyboard"
    export function typeText(text: string): void {
        sendCommand("TEXT," + text)
    }


    /* ------------------------------------------------------------------
    * SOUND & SPEECH
    * ------------------------------------------------------------------ */

    /**
     * Text to speech voice options
     */
    export enum SpeechVoice {
        //% block="Hazel"
        Hazel,
        //% block="David"
        David,
        //% block="Zira"
        Zira
    }

    /**
     * Set text to speech voice
     */
    //% block="set speech voice to %voice"
    //% group="Sound and Speech"
    export function setSpeechVoice(voice: SpeechVoice): void {
        sendCommand(speechVoiceToCommand(voice))
    }

    function speechVoiceToCommand(voice: SpeechVoice): string {
    switch (voice) {
        case SpeechVoice.Hazel:
            return "SAY,SET_HAZEL_VOICE"
        case SpeechVoice.David:
            return "SAY,SET_DAVID_VOICE"
        case SpeechVoice.Zira:
            return "SAY,SET_ZIRA_VOICE"
    }
    return "SAY,SET_HAZEL_VOICE"
    }


    /**
     * Speak text using computer voice
     */
    //% block="Text to speech %text"
    //% group="Sound and Speech"
    export function say(text: string): void {
        sendCommand("SAY," + text)
    }

    /* ------------------------------------------------------------------
    * BEEP
    * ------------------------------------------------------------------ */

    /**
     * Standard beep (500Hz, 500ms)
     */
    //% block="beep"
    //% group="Sound and Speech"
    export function beep(): void {
        sendCommand("BEEP")
    }

    /**
     * Custom beep
     */
    //% block="beep at %frequency Hz for %duration ms"
    //% frequency.min=20 frequency.max=20000 frequency.defl=500
    //% duration.min=1 duration.defl=500
    //% group="Sound and Speech"
    export function beepCustom(frequency: number, duration: number): void {
        sendCommand("BEEP," + frequency + "," + duration)
    }

    /* ------------------------------------------------------------------
    * SOUND FILE PLAYBACK
    * ------------------------------------------------------------------ */

    export enum SoundControl {
        //% block="stop"
        Stop,
        //% block="pause"
        Pause,
        //% block="unpause"
        Unpause
    }

    /**
     * Play a sound file (.wav or .mp3)
     */
    //% block="play sound file %filename"
    //% group="Sound and Speech"
    export function playSound(filename: string): void {
        sendCommand("SOUND," + filename)
    }

    /**
     * Control sound playback
     */
    //% block="sound file %control"
    //% group="Sound and Speech"
    export function controlSound(control: SoundControl): void {
        if (control === SoundControl.Stop) {
            sendCommand("SOUND,STOP_SOUND")
        } else if (control === SoundControl.Pause) {
            sendCommand("SOUND,PAUSE_SOUND")
        } else {
            sendCommand("SOUND,UNPAUSE_SOUND")
        }
    }

    /* ------------------------------------------------------------------
    * SINE WAVE
    * ------------------------------------------------------------------ */

    /**
     * Start continuous sine wave
     */
    //% block="start sine wave at %frequency Hz"
    //% frequency.min=20 frequency.max=20000 frequency.defl=500
    //% group="Sound and Speech"
    export function startSineWave(frequency: number): void {
        sendCommand("SINE_WAVE," + frequency)
    }

    /**
     * Stop sine wave
     */
    //% block="stop sine wave"
    //% group="Sound and Speech"
    export function stopSineWave(): void {
        sendCommand("SINE_WAVE,STOP")
    }

    /* ------------------------------------------------------------------
    * TEXT OVERLAY
    * ------------------------------------------------------------------ */

    /**
     * Overlay text colour
     */
    export enum OverlayColour {
        //% block="crimson"
        Crimson,
        //% block="magenta"
        Magenta,
        //% block="purple"
        Purple,
        //% block="blue"
        Blue,
        //% block="cyan"
        Cyan,
        //% block="turquoise"
        Turquoise,
        //% block="lime"
        Lime,
        //% block="yellow"
        Yellow,
        //% block="orange"
        Orange,
        //% block="red"
        Red,
        //% block="white"
        White,
        //% block="gray"
        Gray,
        //% block="black"
        Black
    }

    function overlayColourToString(colour: OverlayColour): string {
        switch (colour) {
            case OverlayColour.Crimson: return "crimson"
            case OverlayColour.Magenta: return "magenta"
            case OverlayColour.Purple: return "purple"
            case OverlayColour.Blue: return "blue"
            case OverlayColour.Cyan: return "cyan"
            case OverlayColour.Turquoise: return "turquoise"
            case OverlayColour.Lime: return "lime"
            case OverlayColour.Yellow: return "yellow"
            case OverlayColour.Orange: return "orange"
            case OverlayColour.Red: return "red"
            case OverlayColour.White: return "white"
            case OverlayColour.Gray: return "gray"
            case OverlayColour.Black: return "black"
        }
        return "white"
    }

    /**
     * Simple text overlay (defaults used)
     */
    //% block="overlay text %text"
    //% group="Text Overlay"
    export function overlayText(text: string): void {
        sendCommand("OVERLAY," + text)
    }

    /**
     * Advanced text overlay
     */
    //% block="overlay text %text at X %x Y %y size %size colour %colour"
    //% size.min=1 size.defl=30
    //% group="Text Overlay"
    export function overlayTextAdvanced(
        text: string,
        x: number,
        y: number,
        size: number,
        colour: OverlayColour
    ): void {
        sendCommand(
            "OVERLAY," +
            text + "," +
            x + "," +
            y + "," +
            size + "," +
            overlayColourToString(colour)
        )
    }

    /**
     * Clear text overlay
     */
    //% block="clear text overlay"
    //% group="Text Overlay"
    export function clearOverlay(): void {
        sendCommand("OVERLAY,")
    }


   


}
