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
    //% block="file write to %filename mode %mode text %text"
    //% group="Local File Actions"
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
    //% block="file write file %filename at line %line text %text"
    //% line.min=1
    //% group="Local File Actions"
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
    //% block="clear file %filename"
    //% group="Local File Actions"
    export function fileClear(filename: string): void {
        sendCommand("FILE_WRITE," + filename + ",NEW")
    }

    /* ------------------------------------------------------------------
    * FILE READ
    * ------------------------------------------------------------------ */

    /**
     * Request a specific line from a file stored on your computer
     */
    //% block="Request data from file %filename line %line"
    //% line.min=1
    //% group="Local File Actions"
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

    /**
     * Create or update a GUI button
     */
    //% block="GUI button %name x %x y %y width %w height %h text %text"
    //% group=""Graphical User Interface (GUI)"
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
    //% block="GUI text %name x %x y %y text %text size %size font %font colour %col"
    //% group="Graphical User Interface (GUI)"
    export function guiText(
        name: string,
        x: number,
        y: number,
        text: string,
        size: number,
        font: string,
        col: string
    ): void {
        sendCommand(
            `GUI,TEXT,${name},${x},${y},${text},${size},${font},${col}`
        )
    }

    /**
    * Create or update a horizontal progress bar
    */
    //% block="GUI horizontal progress %name x %x y %y width %w height %h value %val max %max bar colour %bar font size %fs font colour %fc text %text"
    //% group="Graphical User Interface (GUI)"
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
    //% block="GUI vertical progress %name x %x y %y width %w height %h value %val max %max bar colour %bar font size %fs font colour %fc text %text"
    //% group="Graphical User Interface (GUI)"
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
     * Hide the Serial GUI window
     */
    //% block="GUI hide window"
    //% group="Graphical User Interface (GUI)"
    export function guiHide(): void {
        sendCommand(`GUI,HIDE`)
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
     * Remove a GUI object by name
     */
    //% block="GUI delete object with name %name"
    //% group="Graphical User Interface (GUI)"
    export function guiClearName(name: string): void {
        sendCommand(`GUI,CLEAR,${name}`)
    }

    /**
     * Showthe Serial GUI window
     */
    //% block="GUI show window x %x y %y width %w height %h background %bg always on top %top"
    //% group="Graphical User Interface (GUI)"
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

