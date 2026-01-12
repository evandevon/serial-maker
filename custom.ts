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
    // Navigation
    Up,
    Down,
    Left,
    Right,
    PageUp,
    PageDown,
    Home,
    End,
    Tab,

    // Control
    Esc,
    Ctrl,
    Alt,
    Shift,
    Windows,
    CapsLock,

    // Function keys
    F1, F2, F3, F4, F5, F6,
    F7, F8, F9, F10, F11, F12,

    PrintScreen,

    // Media
    VolumeUp,
    VolumeDown,
    VolumeMute,
    PlayPause,

    // Letters
    A, B, C, D, E, F, G, H, I, J,
    K, L, M, N, O, P, Q, R, S, T,
    U, V, W, X, Y, Z,

    // Numbers
    Num0, Num1, Num2, Num3, Num4,
    Num5, Num6, Num7, Num8, Num9,

    // Other
    Enter,
    Space,
    Delete,
    Backspace,

    // Combos
    Copy,
    Cut,
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
    switch (key) {

        // Navigation
        case SpecialKey.Up: return "UP"
        case SpecialKey.Down: return "DOWN"
        case SpecialKey.Left: return "LEFT"
        case SpecialKey.Right: return "RIGHT"
        case SpecialKey.PageUp: return "PAGE_UP"
        case SpecialKey.PageDown: return "PAGE_DOWN"
        case SpecialKey.Home: return "HOME"
        case SpecialKey.End: return "END"
        case SpecialKey.Tab: return "TAB"

        // Control
        case SpecialKey.Esc: return "ESC"
        case SpecialKey.Ctrl: return "CTRL"
        case SpecialKey.Alt: return "ALT"
        case SpecialKey.Shift: return "SHIFT"
        case SpecialKey.Windows: return "WIN"
        case SpecialKey.CapsLock: return "CAPS_LOCK"

        // Function keys
        case SpecialKey.F1: return "F1"
        case SpecialKey.F2: return "F2"
        case SpecialKey.F3: return "F3"
        case SpecialKey.F4: return "F4"
        case SpecialKey.F5: return "F5"
        case SpecialKey.F6: return "F6"
        case SpecialKey.F7: return "F7"
        case SpecialKey.F8: return "F8"
        case SpecialKey.F9: return "F9"
        case SpecialKey.F10: return "F10"
        case SpecialKey.F11: return "F11"
        case SpecialKey.F12: return "F12"

        case SpecialKey.PrintScreen: return "PRINT_SCREEN"

        // Media
        case SpecialKey.VolumeUp: return "VOLUME_UP"
        case SpecialKey.VolumeDown: return "VOLUME_DOWN"
        case SpecialKey.VolumeMute: return "VOLUME_MUTE"
        case SpecialKey.PlayPause: return "PLAY_PAUSE"

        // Letters
        case SpecialKey.A: return "A"
        case SpecialKey.B: return "B"
        case SpecialKey.C: return "C"
        case SpecialKey.D: return "D"
        case SpecialKey.E: return "E"
        case SpecialKey.F: return "F"
        case SpecialKey.G: return "G"
        case SpecialKey.H: return "H"
        case SpecialKey.I: return "I"
        case SpecialKey.J: return "J"
        case SpecialKey.K: return "K"
        case SpecialKey.L: return "L"
        case SpecialKey.M: return "M"
        case SpecialKey.N: return "N"
        case SpecialKey.O: return "O"
        case SpecialKey.P: return "P"
        case SpecialKey.Q: return "Q"
        case SpecialKey.R: return "R"
        case SpecialKey.S: return "S"
        case SpecialKey.T: return "T"
        case SpecialKey.U: return "U"
        case SpecialKey.V: return "V"
        case SpecialKey.W: return "W"
        case SpecialKey.X: return "X"
        case SpecialKey.Y: return "Y"
        case SpecialKey.Z: return "Z"

        // Numbers
        case SpecialKey.Num0: return "0"
        case SpecialKey.Num1: return "1"
        case SpecialKey.Num2: return "2"
        case SpecialKey.Num3: return "3"
        case SpecialKey.Num4: return "4"
        case SpecialKey.Num5: return "5"
        case SpecialKey.Num6: return "6"
        case SpecialKey.Num7: return "7"
        case SpecialKey.Num8: return "8"
        case SpecialKey.Num9: return "9"

        // Other
        case SpecialKey.Enter: return "ENTER"
        case SpecialKey.Space: return "SPACE"
        case SpecialKey.Delete: return "DELETE"
        case SpecialKey.Backspace: return "BACKSPACE"

        // Combos
        case SpecialKey.Copy: return "CTRL+C"
        case SpecialKey.Cut: return "CTRL+X"
        case SpecialKey.Paste: return "CTRL+V"

        default:
            return "UNKNOWN"
            }
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
    //% block="Update MBit Live Display"
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

        serial.writeLine("5x5_DISPLAY," + Display_Grid);
        basic.pause(20);
        return;
    }
    

    /**
     * Sends a comment to the log
     */
    //% block="send comment %text"
    //% group="Tools"
    //% text.defl="This is a comment"
    export function comment(text: string): void {
        sendCommand("#" + text)
    }

    /**
     * Clear the computer log
     */
    //% block="clear log"
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
    //% group="Mouse Move from current position"
    export function moveMouseDirection(direction: Direction): void {
        sendCommand("MOUSE_MOVE_" + dirChar(direction))
    }

    // Move mouse along an axis by value
    //% block="move mouse %axis by %value pixels"
    //% value.min=-100 value.max=100
    //% group="Mouse Move from current position"
    export function moveMouseAxis(axis: Axis, value: number): void {
        sendCommand("MOUSE_MOVE_" + axisChar(axis) + "," + value)
    }

    // Move mouse X/Y pixels
    //% block="move mouse X %x Y %y pixels"
    //% group="Mouse Move from current position"
    export function moveMouseXY(x: number, y: number): void {
        sendCommand("MOUSE_MOVE_XY," + x + "," + y)
    }

    /**
     * Move mouse to absolute X and Y position
     */
    //% block="set mouse position to X %x Y %y"
    //% group="Mouse Position (Screen)"
    export function moveMouseXYAbsolute(x: number, y: number): void {
        sendCommand("MOUSE_POS_XY," + x + "," + y)
    }

    // Set mouse absolute position
    //% block="set mouse %axis position to %value pixels"
    //% group="Mouse Position (Screen)"
    export function setMousePosition(axis: Axis, value: number): void {
        sendCommand("MOUSE_POS_" + axisChar(axis) + "," + value)
    }

    // Set mouse percent position
    //% block="set mouse %axis position to %value percent"
    //% value.min=0 value.max=100
    //% group="Mouse Position (Screen)"
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
    //% text.defl="Some text goes here"
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
    //% text.defl="Hello World"
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
    //% block="play sound file from /Sounds/%filename"
    //% group="Sound and Speech"
    //% filename.defl="Alert 1.wav"
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


    /* ------------------------------------------------------------------
    * LOCAL FILE
    * ------------------------------------------------------------------ */

    /**
     * File write mode
     */
    export enum FileWriteMode {
        //% block="add"
        Add,
        //% block="new (clear file)"
        New
    }

    function fileWriteModeToString(mode: FileWriteMode): string {
        switch (mode) {
            case FileWriteMode.Add: return "ADD"
            case FileWriteMode.New: return "NEW"
        }
        return "ADD"
    }

    /* ------------------------------------------------------------------
    * FILE WRITE
    * ------------------------------------------------------------------ */

    /**
     * Write text to a file (add or clear)
     */
    //% block="file write to /Data Logs/%filename mode %mode text %text"
    //% group="Local File Actions"
    //% filename.defl="file.txt"
    export function fileWrite(
        filename: string,
        mode: FileWriteMode,
        text: string
    ): void {
        sendCommand(
            "FILE_WRITE," +
            filename + "," +
            fileWriteModeToString(mode) + "," +
            text
        )
    }

    /**
     * Write text to a specific line in a file stored on your computer
     */
    //% block="file write file /Data Logs/%filename at line %line text %text"
    //% line.min=1
    //% group="Local File Actions"
    //% filename.defl="file.txt"

    export function fileWriteLine(
        filename: string,
        line: number,
        text: string
    ): void {
        sendCommand(
            "FILE_WRITE," +
            filename + "," +
            line + "," +
            text
        )
    }

    /**
     * Clear a file stored on your computer
     */
    //% block="clear file  /Data Logs/%filename"
    //% group="Local File Actions"
    //% filename.defl="file.txt"
    export function fileClear(filename: string): void {
        sendCommand("FILE_WRITE," + filename + ",NEW")
    }

    /* ------------------------------------------------------------------
    * FILE READ
    * ------------------------------------------------------------------ */

    /**
     * Request a specific line from a file stored on your computer
     */
    //% block="Request data from file /Data Logs/%filename line %line"
    //% line.min=1
    //% group="Local File Actions"
    //% filename.defl="file.txt"
    export function fileRead(filename: string, line: number): void {
        sendCommand(
            "FILE_READ," +
            filename + "," +
            line
        )
    }

    /* ------------------------------------------------------------------
    * GRAPH CONTROLS
    * ------------------------------------------------------------------ */

    export enum GraphControl {
        //% block="clear data (reset scaling)"
        ClearData,
        //% block="clear graph (keep scaling)"
        ClearGraph,
        //% block="close window"
        CloseWindow
    }

    export enum GraphType {
        //% block="Line Graph"
        Line = 0,
        //% block="Column Graph"
        Column = 1,
        //% block="Pie Graph"
        Pie = 2
    }

    /* ------------------------------------------------------------------
    * LINE GRAPH
    * ------------------------------------------------------------------ */

    export enum LineNumber {
        //% block="1" 
        One = 1,
        //% block="2"
        Two = 2,
        //% block="3"
        Three = 3,
        //% block="4"
        Four = 4,
        //% block="5"
        Five = 5,
        //% block="6"
        Six = 6,
        //% block="7"
        Seven = 7,
        //% block="8"
        Eight = 8,
        //% block="9"
        Nine = 9,
        //% block="10"
        Ten = 10
    }

    /**
     * Send a value (and optional name) to a specific line in the line graph
     */
    //% block="line graph set line %line value %value name %name"
    //% name.defl=""
    //% group="Graphs"
    export function lineGraphSetLine(
        line: LineNumber,
        value: number,
        name: string
    ): void {
        let payload = name && name.length > 0 ? `${value}|${name}` : `${value}`

        // Pad with empty fields so Python receives correct line index
        let parts: string[] = []
        for (let i = 1; i <= 10; i++) {
            parts.push(i === line ? payload : "")
        }

        sendCommand("LINE_GRAPH," + parts.join(","))
    }

    /* ------------------------------------------------------------------
    * COLUMN GRAPH
    * ------------------------------------------------------------------ */
    /**
     * Column numbers 1–30 (numeric dropdown)
     */
    export enum ColumnNumber {
        //% block="1"  internal name _1
        _1 = 1,
        //% block="2"
        _2 = 2,
        //% block="3"
        _3 = 3,
        //% block="4"
        _4 = 4,
        //% block="5"
        _5 = 5,
        //% block="6"
        _6 = 6,
        //% block="7"
        _7 = 7,
        //% block="8"
        _8 = 8,
        //% block="9"
        _9 = 9,
        //% block="10"
        _10 = 10,
        //% block="11"
        _11 = 11,
        //% block="12"
        _12 = 12,
        //% block="13"
        _13 = 13,
        //% block="14"
        _14 = 14,
        //% block="15"
        _15 = 15,
        //% block="16"
        _16 = 16,
        //% block="17"
        _17 = 17,
        //% block="18"
        _18 = 18,
        //% block="19"
        _19 = 19,
        //% block="20"
        _20 = 20,
        //% block="21"
        _21 = 21,
        //% block="22"
        _22 = 22,
        //% block="23"
        _23 = 23,
        //% block="24"
        _24 = 24,
        //% block="25"
        _25 = 25,
        //% block="26"
        _26 = 26,
        //% block="27"
        _27 = 27,
        //% block="28"
        _28 = 28,
        //% block="29"
        _29 = 29,
        //% block="30"
        _30 = 30
    }


    /**
     * Send a value (and optional name) to a specific column in the column graph
     */
    //% block="column graph set column %column value %value name %name"
    //% name.defl=""
    //% group="Graphs"
    export function columnGraphSetColumn(
        column: ColumnNumber,   // numeric dropdown 1–30
        value: number,
        name: string
    ): void {
        const payload = name && name.length > 0 ? `${value}|${name}` : `${value}`

        const parts: string[] = []
        for (let i = 1; i <= 30; i++) {
            parts.push(i === column ? payload : "")
        }

        sendCommand("COLUMN_GRAPH," + parts.join(","))
    }



    /**
     * Control a graph window (Line, Column, or Pie)
     */
    //% block="%graph %control"
    //% group="Graphs"
    export function graphControl(
        graph: GraphType,
        control: GraphControl
    ): void {
        let prefix = ""
        if (graph === GraphType.Line) {
            prefix = "LINE_GRAPH"
        } else if (graph === GraphType.Column) {
            prefix = "COLUMN_GRAPH"
        } else if (graph === GraphType.Pie) {
            prefix = "PIE_GRAPH"
        }

        if (control === GraphControl.ClearData) {
            sendCommand(`${prefix},CLEAR_DATA`)
        } else if (control === GraphControl.ClearGraph) {
            sendCommand(`${prefix},CLEAR_GRAPH`)
        } else {
            sendCommand(`${prefix},CLOSE_WINDOW`)
        }
    }


    /* ------------------------------------------------------------------
    * PIE GRAPH
    * ------------------------------------------------------------------ */

    export enum PieSegment {
        //% block="1" _1=1
        _1 = 1,
        //% block="2"
        _2 = 2,
        //% block="3"
        _3 = 3,
        //% block="4"
        _4 = 4,
        //% block="5"
        _5 = 5,
        //% block="6"
        _6 = 6,
        //% block="7"
        _7 = 7,
        //% block="8"
        _8 = 8,
        //% block="9"
        _9 = 9,
        //% block="10"
        _10 = 10,
        //% block="11"
        _11 = 11,
        //% block="12"
        _12 = 12,
        //% block="13"
        _13 = 13,
        //% block="14"
        _14 = 14,
        //% block="15"
        _15 = 15,
        //% block="16"
        _16 = 16,
        //% block="17"
        _17 = 17,
        //% block="18"
        _18 = 18,
        //% block="19"
        _19 = 19,
        //% block="20"
        _20 = 20,
        //% block="21"
        _21 = 21,
        //% block="22"
        _22 = 22,
        //% block="23"
        _23 = 23,
        //% block="24"
        _24 = 24,
        //% block="25"
        _25 = 25,
        //% block="26"
        _26 = 26,
        //% block="27"
        _27 = 27,
        //% block="28"
        _28 = 28,
        //% block="29"
        _29 = 29,
        //% block="30"
        _30 = 30
    }


    //% block="pie graph set segment %segment value %value name %name"
    //% group="Graphs"
    export function pieGraphSetSegment(
        segment: PieSegment,
        value: number,
        name: string
    ): void {
        // Safety check
        if (segment < 1) segment = 1
        if (segment > 30) segment = 30

        // Payload for this segment
        const payload = name && name.length > 0 ? `${value}|${name}` : `${value}`

        // Build all 30 fields
        const parts: string[] = []
        for (let i = 1; i <= 30; i++) {
            parts.push(i === segment ? payload : "")
        }

        sendCommand("PIE_GRAPH," + parts.join(","))
    }

    /* ------------------------------------------------------------------
    * GUI COMMANDS
    * ------------------------------------------------------------------ */

    export enum GuiFont {
        // Formal / academic
        //% block="Times New Roman"
        TimesNewRoman,
        //% block="Cambria"
        Cambria,
        //% block="Georgia"
        Georgia,
        //% block="Palatino Linotype"
        Palatino,

        // Professional / body text
        //% block="Segoe UI"
        SegoeUI,
        //% block="Calibri"
        Calibri,
        //% block="Arial"
        Arial,
        //% block="Tahoma"
        Tahoma,
        //% block="Verdana"
        Verdana,

        // Headings / strong presence
        //% block="Arial Black"
        ArialBlack,
        //% block="Impact"
        Impact,

        // Technical / monospace
        //% block="Consolas"
        Consolas,
        //% block="Courier New"
        CourierNew,
        //% block="Lucida Console"
        LucidaConsole,

        // Informal / friendly
        //% block="Trebuchet MS"
        TrebuchetMS,
        //% block="Segoe Print"
        SegoePrint,
        //% block="Comic Sans MS"
        ComicSans,

        // Utility
        //% block="MS Sans Serif"
        MSSansSerif,
        //% block="Symbol"
        Symbol
    }

    function guiFontToString(font: GuiFont): string {
    switch (font) {
        case GuiFont.TimesNewRoman: return "Times New Roman"
        case GuiFont.Cambria: return "Cambria"
        case GuiFont.Georgia: return "Georgia"
        case GuiFont.Palatino: return "Palatino Linotype"

        case GuiFont.SegoeUI: return "Segoe UI"
        case GuiFont.Calibri: return "Calibri"
        case GuiFont.Arial: return "Arial"
        case GuiFont.Tahoma: return "Tahoma"
        case GuiFont.Verdana: return "Verdana"

        case GuiFont.ArialBlack: return "Arial Black"
        case GuiFont.Impact: return "Impact"

        case GuiFont.Consolas: return "Consolas"
        case GuiFont.CourierNew: return "Courier New"
        case GuiFont.LucidaConsole: return "Lucida Console"

        case GuiFont.TrebuchetMS: return "Trebuchet MS"
        case GuiFont.SegoePrint: return "Segoe Print"
        case GuiFont.ComicSans: return "Comic Sans MS"

        case GuiFont.MSSansSerif: return "MS Sans Serif"
        case GuiFont.Symbol: return "Symbol"
        }
    return "Arial"
    }



    /**
     * Create or update a GUI button
     */
    //% block="GUI button name %name x %x y %y width %w height %h text %text"
    //% group="Graphical User Interface (GUI)"
    //% name.defl="Btn1"
    //% text.defl="This is a button"
    export function guiButton(
        name: string,
        x: number,
        y: number,
        w: number,
        h: number,
        text: string
    ): void {
        sendCommand(
            `GUI,BUTTON,${name},${x},${y},${w},${h},${text}`
        )
    }


    /**
     * Create or update a GUI input field
     */
    //% block="GUI input %name x %x y %y font size %size text %text"
    //% group="Graphical User Interface (GUI)"
    //% name.defl="Input1"
    //% text.defl="Enter text here"
    export function guiInput(
        name: string,
        x: number,
        y: number,
        size: number,
        text: string
    ): void {
        sendCommand(
            `GUI,INPUT,${name},${x},${y},${size},${text}`
        )
    }


    /**
     * Create or update a GUI checkbox
     */
    //% block="GUI checkbox %name x %x y %y font size %size state %state text %text"
    //% group="Graphical User Interface (GUI)"
    //% name.defl="Chk1"
    //% text.defl="This is a checkbox"
    export function guiCheckbox(
        name: string,
        x: number,
        y: number,
        size: number,
        state: boolean,
        text: string
    ): void {
        sendCommand(
            `GUI,CHECKBOX,${name},${x},${y},${size},${state ? 1 : 0},${text}`
        )
    }


    /**
     * Create or update a GUI slider
     */
    //% block="GUI slider %name x %x y %y width %w height %h min %min max %max value %value font colour %colour"
    //% group="Graphical User Interface (GUI)"
    //% name.defl="Slider1"
    //% colour.defl="black"
    export function guiSlider(
        name: string,
        x: number,
        y: number,
        w: number,
        h: number,
        min: number,
        max: number,
        value: number,
        colour: string
    ): void {
        sendCommand(
            `GUI,SLIDER,${name},${x},${y},${w},${h},${min},${max},${value},${colour}`
        )
    }

    /**
     * Create or update an image
     */
    //% block="GUI image name: %name file %file x %x y %y width %w height %h rotation %rot"
    //% group="Graphical User Interface (GUI)"
    //% name.defl="Img1"
    export function guiImage(
        name: string,
        file: string,
        x: number,
        y: number,
        w: number,
        h: number,
        rot: number
    ): void {
        sendCommand(
            `GUI,IMAGE,${name},${file},${x},${y},${w},${h},${rot}`
        )
    }

    /**
     * Create or update a rectangle
     */
    //% block="GUI rectangle %name centre x %cx centre y %cy width %w height %h colour %col rotation %rot"
    //% group="Graphical User Interface (GUI)"
    //% name.defl="Rect1"
    export function guiRectangle(
        name: string,
        cx: number,
        cy: number,
        w: number,
        h: number,
        col: string,
        rot: number
    ): void {
        sendCommand(
            `GUI,RECTANGLE,${name},${cx},${cy},${w},${h},${col},${rot}`
        )
    }

    /**
     * Create or update a circle
     */
    //% block="GUI circle %name centre x %cx centre y %cy radius %r colour %col"
    //% group="Graphical User Interface (GUI)"
    //% name.defl="Circ1"
    //% col.defl="blue"
    //% cx.defl="20"
    //% cy.defl="20"
    //% r.defl="20"
    export function guiCircle(
        name: string,
        cx: number,
        cy: number,
        r: number,
        col: string
    ): void {
        sendCommand(
            `GUI,CIRCLE,${name},${cx},${cy},${r},${col}`
        )
    }

    /**
     * Create or update text
     */
    //% block="GUI text name %name x %x y %y text %text size %size font %font colour %col"
    //% group="Graphical User Interface (GUI)"
    //% name.defl="Txt1"
    //% x.defl="0"
    //% y.defl="50"
    //% size.defl="18"
    //% font.defl=GuiFont.SegoeUI
    //% col.defl="black"
    //% text.defl="This is some text"
    export function guiText(
        name: string,
        x: number,
        y: number,
        text: string,
        size: number,
        font: GuiFont,
        col: string
    ): void {
        sendCommand(
            `GUI,TEXT,${name},${x},${y},${text},${size},${guiFontToString(font)},${col}`
        )
    }


    /**
    * Create or update a horizontal progress bar
    */
    //% block="GUI horizontal progress name %name x %x y %y width %w height %h progress value %val max %max bar colour %bar font size %fs font colour %fc text %text"
    //% group="Graphical User Interface (GUI)"
    //% name.defl="HProgress1"
    //% x.defl="0"
    //% y.defl="200"
    //% w.defl="200"
    //% h.defl="50"
    //% val.defl="50"
    //% max.defl="100"
    //% bar.defl="blue"
    //% fs.defl="18"
    //% fc.defl="black"
    //% text.defl="Horizontal Progress"
    export function guiHProgress(
        name: string,
        x: number,
        y: number,
        w: number,
        h: number,
        val: number,
        max: number,
        bar: string,
        fs: number,
        fc: string,
        text: string
    ): void {
        sendCommand(
            `GUI,HPROGRESS,${name},${x},${y},${w},${h},${val},${max},${bar},${fs},${fc},${text}`
        )
    }

    /**
     * Create or update a vertical progress bar
     */
    //% block="GUI vertical progress name %name x %x y %y width %w height %h progress value %val max %max bar colour %bar font size %fs font colour %fc text %text"
    //% group="Graphical User Interface (GUI)"
    //% name.defl="VProgress1"
    //% x.defl="0"
    //% y.defl="200"
    //% w.defl="50"
    //% h.defl="200"
    //% val.defl="50"
    //% max.defl="100"
    //% bar.defl="blue"
    //% fs.defl="18"
    //% fc.defl="black"
    //% text.defl="Vertical Progress"
    export function guiVProgress(
        name: string,
        x: number,
        y: number,
        w: number,
        h: number,
        val: number,
        max: number,
        bar: string,
        fs: number,
        fc: string,
        text: string
    ): void {
        sendCommand(
            `GUI,VPROGRESS,${name},${x},${y},${w},${h},${val},${max},${bar},${fs},${fc},${text}`
        )
    }
    


    /**
     * Remove a GUI object by name
     */
    //% block="GUI delete object with name %name"
    //% group="Graphical User Interface (GUI)"
    //% name.defl="btn1"
    export function guiClearName(name: string): void {
        sendCommand(`GUI,CLEAR,${name}`)
    }

    /**
     * Remove all GUI objects
     */
    //% block="GUI delete all objects"
    //% group="Graphical User Interface (GUI)"
    export function guiClearAll(): void {
        sendCommand(`GUI,CLEAR,ALL`)
    }

    /**
     * Hide the Serial GUI window
     */
    //% block="GUI hide window"
    //% group="Graphical User Interface (GUI)"
    export function guiHide(): void {
        sendCommand(`GUI,HIDE`)
    }

    /**
     * Showthe Serial GUI window
     */
    //% block="GUI show window x %x y %y width %w height %h background %bg always on top %top"
    //% group="Graphical User Interface (GUI)"
    //% bg.defl="white"
    //% w.defl="200"
    //% h.defl="200"
    export function guiShow(
        x: number,
        y: number,
        w: number,
        h: number,
        bg: string,
        top: boolean
    ): void {
        sendCommand(
            `GUI,SHOW,${x},${y},${w},${h},${bg},${top ? 1 : 0}`
        )
    }


}
