
/**
* TEST Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

enum Keyboard_Keys {
    //% block="0"
    ZERO,
    //% block="1"
    ONE,
    //% block="2"
    TWO,
    //% block="3"
    THREE,
    //% block="4"
    FOUR,
    //% block="5"
    FIVE,
    //% block="6"
    SIX,
    //% block="7"
    SEVEN,
    //% block="8"
    EIGHT,
    //% block="9"
    NINE,
    //% block="A"
    A,
    //% block="B"
    B,
    //% block="C"
    C,
    //% block="D"
    D,
    //% block="E"
    E,
    //% block="F"
    F,
    //% block="G"
    G,
    //% block="H"
    H,
    //% block="I"
    I,
    //% block="J"
    J,
    //% block="K"
    K,
    //% block="L"
    L,
    //% block="M"
    M,
    //% block="N"
    N,
    //% block="O"
    O,
    //% block="P"
    P,
    //% block="Q"
    Q,
    //% block="R"
    R,
    //% block="S"
    S,
    //% block="T"
    T,
    //% block="U"
    U,
    //% block="V"
    V,
    //% block="W"
    W,
    //% block="X"
    X,
    //% block="Y"
    Y,
    //% block="Z"
    Z,
    //% block="DOWN"
    DOWN,
    //% block="UP"
    UP,
    //% block="LEFT"
    LEFT,
    //% block="RIGHT"
    RIGHT,
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
    //% block="PRINTSCREEN"
    PRINTSCREEN,
    //% block="ENTER"
    ENTER,
    //% block="SPACE"
    SPACE,
    //% block="DELETE"
    DELETE,
    //% block="BACKSPACE"
    BACKSPACE,
    //% block="COPY"
    COPY,
    //% block="CUT"
    CUT,
    //% block="PASTE"
    PASTE,
    //% block="VOLUMEUP"
    VOLUMEUP,
    //% block="VOLUMEDOWN"
    VOLUMEDOWN,
    //% block="VOLUMEMUTE"
    VOLUMEMUTE,
    //% block="PLAYPAUSE"
    PLAYPAUSE,
    //% block="PAGEDOWN"
    PAGEDOWN,
    //% block="PAGEUP"
    PAGEUP,
    //% block="HOME"
    HOME,
    //% block="END"
    END,
    //% block="TAB"
    TAB,
    //% block="ESC"
    ESC,
    //% block="CTRL"
    CTRL,
    //% block="ALT"
    ALT,
    //% block="SHIFT"
    SHIFT,
    //% block="WINDOWS"
    WINDOWS,
    //% block="CAPSLOCK"
    CAPSLOCK
}


enum Keyboard_Actions {
    //% block="TAP"
    TAP,
    //% block="RELEASE"
    RELEASE,
    //% block="HOLD"
    HOLD
}

enum Enable_Disable{
    //% block="ENABLE"
    ENABLE,
    //% block="DISABLE"
    DISABLE,
}

enum Direction_Words {
    //% block="LEFT"
    LEFT,
    //% block="RIGHT"
    RIGHT,
    //% block="UP"
    UP,
    //% block="DOWN"
    DOWN
}

enum Mouse_Buttons {
    L,
    M,
    R,
    All
}

enum Mouse_Button_Actions {
    //% block="CLICK"
    CLICK,
    //% block="RELEASE"
    RELEASE,
    //% block="HOLD"
    HOLD,
}



enum Mouse_Direction {
    X,
    Y
}


enum TTS_Choices {
    //% block="Hazel"
    Hazel,
    //% block="David"
    David,
    //% block="Zira"
    Zira
}

enum Sound_Choices {
    //% block="Stop"
    Stop,
    //% block="Pause"
    Pause,
    //% block="Unpause"
    Unpause
}

enum Overlay_Colours {
    //% block="crimson"
    crimson = 1,
    //% block="magenta"
    magenta,
    //% block="purple"
    purple,
    //% block="blue"
    blue,
    //% block="cyan"
    cyan,
    //% block="turquoise"
    turquoise,
    //% block="lime"
    lime,
    //% block="yellow"
    yellow,
    //% block="orange"
    orange,
    //% block="red"
    red,
    //% block="white"
    white,
    //% block="gray"
    gray,
    //% block="black"
    black
}

enum Graph_Actions{
    //% block="Clear Data"
    ClearData,
    //% block="Clear Graph"
    ClearGraph,
    //% block="Close Window"
    CloseWindow
}

enum Graph_Types {
    //% block="Line Graph"
    LineGraph,
    //% block="Column Graph"
    ColumnGraph,
    //% block="Pie Graph"
    PieGraph,
}

/**
 * Custom blocks
 */
//% groups="['Mouse Position', 'Mouse Movement', 'Mouse Buttons', 'Keyboard' , 'Graphs', 'Sound', 'Overlay', 'Date and Time', 'Files', 'Tools' ]"

namespace SerialMaker {

    //This locks or releases access to serial messaging, so that messages don't get garbled/mixed up
    //Leaving this here if needed at a later date after testing
    let isSerialBusy = false;

    function acquireLock() {
        while (isSerialBusy) {
            basic.pause(10); // Wait for the lock to be released
        }
        isSerialBusy = true;
    }

    //Example usage
    //acquireLock();
    //The serial command goes here
    //basic.pause(20);
    //releaseLock();

    function releaseLock() {
        isSerialBusy = false;
    }

    /**
    * custom block that contains no code but
    * allows users to place a comment directly in their code.
    */
    //% group="Tools"
    //% color=#ff9933
    //% block="In-Code Comment $theComment"
    //% theComment.defl="This block is just for in-code comments"
    export function comment(theComment: string): void {
        // do nothing
    }

    /**
    * sends a comment to the data log
    */
    //% group="Tools"
    //% color=#ff9933
    //% block="Send Comment $theComment"
    //% theComment.defl="Sends comments"
    export function send_comment(theComment: string): void {

        
        serial.writeLine("#" + theComment);

        basic.pause(20)
    }

    /**
    * Clears the data log
    */
    //% group="Tools"
    //% color=#ff9933
    //% block="Clear Data Log"
    export function clear_log(): void {
        serial.writeLine("CLEAR_LOG");
        basic.pause(20)
    }

    /**
     * Inserts the string "<USERNAME>" into a serial command, for SerialMaker to translate to the currently logged in username
     */
    //% block="Insert <USERNAME> into command" 
    //% group="Tools"
    //% color=#ff9933
    export function UsernamePlaceholder(): string {
        return "<USERNAME>";
    }

    /**
     * Inserts the string "<TIME>" into a serial command, for SerialMaker to translate quickly
     */
    //% block="Insert <TIME> into command" 
    //% group="Date and Time"
    //% color=#aa80ff
    export function insertCurrentTimePlaceholder(): string {
        return "<TIME>";
    }

    /**
    * Inserts the string "<DATE>" into a serial command, for SerialMaker to translate quickly
    */
    //% block="Insert <DATE> into command" 
    //% group="Date and Time"
    //% color=#aa80ff
    export function insertCurrentDatePlaceholder(): string {
        return "<DATE>";
    }

    /**
    * Enables the Keyboard and mouse translation
    */
    //% group="Tools"
    //% color=#ff9933
    //% block="%Enable_Disable keyboard and mouse translation"
    export function Keyboard_Mouse_Toggle(choice: Enable_Disable): void {
        switch (choice) {
            case Enable_Disable.ENABLE:
                serial.writeLine("START_HID");
                break;
            case Enable_Disable.DISABLE:
                serial.writeLine("STOP_HID");
                break;

        }
        basic.pause(20)
    }


    /**
    * reads a local file (csv, txt) from the 'data logs' fold in the app directory
    */
    //% group="Files"
    //% color=#b30086
    //% filename.defl="File Name.txt"
    //%line_num.defl=1
    //% block="File read from Data Logs $filename from line:$line_num"|| icon="\uf080"
    export function file_read(filename: string, line_num: number): string {
        serial.writeLine("FILE_READ," + filename + "," + line_num);
        
        const timeout = 3000; // 1 second timeout
        const interval = 50; // Check every 50ms
        let elapsedTime = 0;
        let data = "";

        while (elapsedTime < timeout) {
            // Read all available characters from the serial buffer
            data += serial.readString();

            // Check if the data ends with a newline character
            if (data.includes("\n")) {
                // Trim the newline character
                data = data.trim();

                // Check if the data hits the mx length
                if (data.length > 250) {
                    return data;
                }

                // Return the result if it's within the valid length
                return data;
            }
            // Pause for the specified interval
            basic.pause(interval);
            elapsedTime += interval;
        }

        // If no data received within the timeout period
        return "Error:Timeout";
    }

    /**
     * writes to the bottom of a local file (csv, txt)
     * Saves to 'App directory\Data Logs\<filename>.csv'
     */
    //% group="Files"
    //% color=#b30086
    //% filename.defl="File Name.txt"
    //% data.defl="Data"
    //% block="File write $data to bottom of file:$filename"|| icon="\uf080"
    export function file_add(data: string, filename: string): void {
        serial.writeLine("FILE_WRITE," + filename + "," + "ADD," + data);
        basic.pause(20)
    }

    /**
     * writes to the selected line of a local file (csv, txt)
     * Saves to 'App directory\Data Logs\<filename>.csv'
     */
    //% group="Files"
    //% color=#b30086
    //% filename.defl="File Name.txt"
    //% data.defl="Data"
    //% line_num.defl=1
    //% block="File write $data to file:$filename at line:$line_num"|| icon="\uf080"
    export function file_add_to_line(data: string, filename: string, line_num: number): void {
        serial.writeLine("FILE_WRITE," + filename + "," + line_num + "," + data);
        basic.pause(20)
    }

    /**
    * Clears the file
    */
    //% group="Files"
    //% color=#b30086
    //% filename.defl="File Name.txt"
    //% block="Empty the file:$filename"
    export function file_empty(filename: string): void {
        serial.writeLine("FILE_WRITE," + filename + ",NEW" );
        basic.pause(20)
    }


 
    /**
    * plays a local sound file (mp3, wav) from the 'sounds' folder in the app directory
    */
    //% group="Sound"
    //% color=#88cc00
    //% filename_string.defl="filename.mp3"
    //% block="Play sound $filename_string"|| icon="\uf080"
    export function play_sound(filename_string: string): void {
        serial.writeLine("SOUND," + filename_string);
        basic.pause(20)
    }

    /**
    * Stop/Pause/Unpause currently playing audio files
    */
    //% group="Sound"
    //% color=#88cc00
    //% block="Sound %choice"|| icon="\uf080"
    export function Sound_Actions(choice: Sound_Choices): void {
        switch (choice) {
            case Sound_Choices.Stop:
                serial.writeLine("SOUND,STOP_SOUND");
                break;
            case Sound_Choices.Pause:
                serial.writeLine("SOUND,PAUSE_SOUND");
                break;
            case Sound_Choices.Unpause:
                serial.writeLine("SOUND,UNPAUSE_SOUND");
                break;

        }
        basic.pause(20)
    }

    /**
    * Sets the text to speech voice
    */
    //% group="Sound"
    //% color=#88cc00
    //% block="Text to speech set %choice"|| icon="\uf080"
    export function TTS_Setting(choice: TTS_Choices): void {
        switch (choice) {
            case TTS_Choices.Hazel:
                serial.writeLine("SAY,SET_HAZEL_VOICE");
                break;
            case TTS_Choices.David:
                serial.writeLine("SAY,SET_DAVID_VOICE");
                break;
            case TTS_Choices.Zira:
                serial.writeLine("SAY,SET_ZIRA_VOICE");
                break;

        }
        basic.pause(20)

        
    }

    /**
    * Text to speech
    */
    //% group="Sound"
    //% color=#88cc00
    //% block="Text to Speech $theText"
    //% theText.defl="text to speech"
    export function text_to_speech(theText: string): void {
        serial.writeLine("SAY," + theText);
        basic.pause(20)
    }



    /**
    * Plays a beep sound for a given frequency and duration. Empty values default to 500 Hz ,500 ms
    */
    //% color=#88cc00
    //% group="Sound"
    //% block="Beep of $hertz (Hz) for duration $duration (ms) "|| icon="\uf080" 
    export function beep(hertz: number, duration: number): void {
        serial.writeLine("BEEP," + hertz + "," + duration);
        basic.pause(20)
    }

    /**
    * Starts a sine wave of given frequency continuously until the STOP command is received.
    */
    //% color=#88cc00
    //% group="Sound"
    //% block="Start sine wave of $hertz (Hz)"|| icon="\uf080" 
    export function sinewave(hertz: number): void {
        serial.writeLine("SINEWAVE," + hertz);
        basic.pause(20)
    }

    /**
    * Stops the sine wave
    */
    //% group="Sound"
    //% color=#88cc00
    //% block="Stop sine wave"
    export function stop_sine(): void {
        serial.writeLine("SINE_WAVE,STOP");
        basic.pause(20)
    }
    
    /**
    * Shows a text overlay on the computer screen with given font at given position
    * Acceptable colour names = crimson,magenta,purple,blue,cyan,turquoise,lime,yellow,orange,red,white,gray,black
    * Defaults to x:0 y:0 font:30 colour:lime
    */
    //% group="Overlay"
    //% color=#000000
    //% overlay_text.defl="text"
    //% x_pos.defl=0
    //% y_pos.defl=0
    //% size.defl=30
    //% colour.defl=Overlay_Colours.lime
    //% expandableArgumentMode="enabled"
    //% inlineInputMode=inline
    //% block="Overlay text %overlay_text|| at X:$x_pos Y:$y_pos font size:$size colour:%colour"|| icon="\uf080" color=#ff0f0f
    export function overlay(overlay_text: string, x_pos?: number, y_pos?: number, size?: number, colour?: Overlay_Colours): void {
        let colour_string = "lime"; // Default value
        switch (colour) {
            case Overlay_Colours.crimson:
                colour_string = "crimson";
                break;
            case Overlay_Colours.magenta:
                colour_string = "magenta";
                break;
            case Overlay_Colours.purple:
                colour_string = "purple";
                break;
            case Overlay_Colours.blue:
                colour_string = "blue";
                break;
            case Overlay_Colours.cyan:
                colour_string = "cyan";
                break;
            case Overlay_Colours.turquoise:
                colour_string = "turquoise";
                break;
            case Overlay_Colours.lime:
                colour_string = "lime";
                break;
            case Overlay_Colours.yellow:
                colour_string = "yellow";
                break;
            case Overlay_Colours.orange:
                colour_string = "orange";
                break;
            case Overlay_Colours.red:
                colour_string = "red";
                break;
            case Overlay_Colours.white:
                colour_string = "white";
                break;
            case Overlay_Colours.gray:
                colour_string = "gray";
                break;
            case Overlay_Colours.black:
                colour_string = "black";
                break;
        }
        
        serial.writeLine("OVERLAY," + overlay_text + "," + x_pos + "," + y_pos + "," + size + "," + colour_string);
    }

    /**
    * Clears the overlay
    */
    //% group="Overlay"
    //% color=#000000
    //% block="Clear overlay"
    export function clear_overlay(): void {
        serial.writeLine("OVERLAY,");
        basic.pause(20)
    }



    /**
    * Creates a pie graph
    * separate values with pipes e.g. 15|average to assign names to the segments
    */
    //% group="Graphs"
    //% color=#ff6666
    //% data1.shadow=math_number
    //% data2.shadow=math_number
    //% data3.shadow=math_number
    //% data4.shadow=math_number
    //% data5.shadow=math_number
    //% data6.shadow=math_number
    //% data7.shadow=math_number
    //% data8.shadow=math_number
    //% data9.shadow=math_number
    //% data10.shadow=math_number
    //% block="Pie graph add to graph 1:%data1 || 2:%data2 3:%data3 4:%data4 5:%data5 6:%data6 7:%data7 8:%data8 9:%data9 10:%data10" expandableArgumentMode="enabled" inlineInputMode="inline"
    export function pie_graph(data1: any, data2?: any, data3?: any, data4?: any, data5?: any, data6?: any, data7?: any, data8?: any, data9?: any, data10?: any): void {
        const datas = [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10,].filter(t => t !== undefined);

        serial.writeLine("PIE_GRAPH," + datas.join(","));
        basic.pause(20)
    }


    /**
    * Creates a line graph
    * separate values with pipes e.g. 15|average to assign names to the graph lines
    */
    //% group="Graphs"
    //% color=#ff6666
    //% data1.shadow=math_number
    //% data2.shadow=math_number
    //% data3.shadow=math_number
    //% data4.shadow=math_number
    //% data5.shadow=math_number
    //% data6.shadow=math_number
    //% data7.shadow=math_number
    //% data8.shadow=math_number
    //% data9.shadow=math_number
    //% data10.shadow=math_number
    //% block="Line graph add to graph 1:%data1 || 2:%data2 3:%data3 4:%data4 5:%data5 6:%data6 7:%data7 8:%data8 9:%data9 10:%data10" expandableArgumentMode="enabled" inlineInputMode="inline"
    export function line_graph(data1: any, data2?: any, data3?: any, data4?: any, data5?: any, data6?: any, data7?: any, data8?: any, data9?: any, data10?: any): void {
        const datas = [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, ].filter(t => t !== undefined);
        
        serial.writeLine("LINE_GRAPH," + datas.join(","));
        basic.pause(20)
    }

    /**
    * line graph actions
    * Clear Data = remove all data and auto-sizing information from the graph
    * Clear Graph = remove the data points, but leave the auto-size information
    * Close Window = closes the Line Graph window 
    */
    //% group="Graphs"
    //% color=#ff6666
    //% block="%Graph_Actions on the %Graph_Types"|| icon="\uf080" 
    export function line_graph_actions(action_choice: Graph_Actions, graph_choice: Graph_Types):void{

        let actionString: string;

        switch (action_choice) {
            case Graph_Actions.ClearData:
                actionString = "CLEAR_DATA";
                break;
            case Graph_Actions.ClearGraph:
                actionString = "CLEAR_GRAPH";
                break;
            case Graph_Actions.CloseWindow:
                actionString = "CLOSE_WINDOW";
                break;
        }

        let graphString: string;

        switch (graph_choice) {
            case Graph_Types.LineGraph:
                graphString = "LINE_GRAPH";
                break;
            case Graph_Types.ColumnGraph:
                graphString = "COLUMN_GRAPH";
                break;
            case Graph_Types.PieGraph:
                graphString = "PIE_GRAPH";
                break;
        }

        serial.writeLine(graphString + "," + actionString);
        basic.pause(20)
    }

    /**
    * Creates a column graph
    * separate values with pipes e.g. 15|average to assign names to the graph columns
    */
    //% group="Graphs"
    //% color=#ff6666
    //% data1.shadow=math_number
    //% data2.shadow=math_number
    //% data3.shadow=math_number
    //% data4.shadow=math_number
    //% data5.shadow=math_number
    //% data6.shadow=math_number
    //% data7.shadow=math_number
    //% data8.shadow=math_number
    //% data9.shadow=math_number
    //% data10.shadow=math_number
    //% block="Column graph add to graph 1:%data1 || 2:%data2 3:%data3 4:%data4 5:%data5 6:%data6 7:%data7 8:%data8 9:%data9 10:%data10" expandableArgumentMode="enabled" inlineInputMode="inline"
    export function column_graph(data1: any, data2?: any, data3?: any, data4?: any, data5?: any, data6?: any, data7?: any, data8?: any, data9?: any, data10?: any): void {
        const datas = [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10,].filter(t => t !== undefined);

        serial.writeLine("COLUMN_GRAPH," + datas.join(","));
        basic.pause(20)
    }


    /**
    * sends multiple characters
    */
    //% group="Keyboard"
    //% color=#1a53ff
    //% text_string.defl="Text"
    //% text_string.shadow=math_number
    //% block="Type Text $text_string"|| icon="\uf080"
    export function Type_text(text_string: any): void {
        serial.writeLine("TEXT," + text_string);
        basic.pause(20)
    }

    /**
    * Averages a value across selected time frame.
    */
    //% group="Tools"
    // note that Caml casing yields lower case
    // block text with spaces
    //% block="Average measurement of $value measured $measurements times in $time_range (ms) "|| icon="\uf080" 
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

    /**
    * Scrolls the mouse 1 row/column in the chosen direction.
    */
    //% group="Mouse Buttons"
    //% color=#ff0f0f
    //% block="Mouse scroll %choice" icon="\uf080"
    export function mouse_scroll_direction(choice: Direction_Words): void {
        let directionString: string;

        switch (choice) {
            case Direction_Words.LEFT:
                directionString = "LEFT";
                break;
            case Direction_Words.RIGHT:
                directionString = "RIGHT";
                break;
            case Direction_Words.UP:
                directionString = "UP";
                break;
            case Direction_Words.DOWN:
                directionString = "DOWN";
                break;
            default:
                directionString = "UP";
        }

        serial.writeLine("MOUSE_SCROLL," + directionString);
        basic.pause(20)
    }

    /**
    * Moves the mouse 10 pixels in the chosen direction.
    */
    //% group="Mouse Movement"
    //% color=#ff0f0f
    //% block="Mouse Move %choice 10 pixels" icon="\uf080"
    export function mouse_move_direction(choice: Direction_Words): void {
        let directionString: string;

        switch (choice) {
            case Direction_Words.LEFT:
                directionString = "LEFT";
                break;
            case Direction_Words.RIGHT:
                directionString = "RIGHT";
                break;
            case Direction_Words.UP:
                directionString = "UP";
                break;
            case Direction_Words.DOWN:
                directionString = "DOWN";
                break;
            default:
                directionString = "UP";
        }

        serial.writeLine("MOUSE_MOVE_" + directionString);
        basic.pause(20)
    }

    /**
    * Sets the mouse position in the X or Y direction (0,0 is top left)
    */
    //% group="Mouse Position"
    //% color=#ff0f0f
    //% block="Set Mouse Position %Mouse_Direction to $pixel pixel"|| icon="\uf080" color=#ff0f0f
    export function mouse_position(mouse_direction: Mouse_Direction, pixel: number) {
        serial.writeLine("MOUSE_POS_" + mouse_direction + "," + pixel);
        return;
    }

    /**
    * Sets the mouse position in the X and Y direction (0,0 is top left)
    */
    //% group="Mouse Position"
    //% color=#ff0f0f
    //% block="Set Mouse Position to X:$pixel_x and Y:$pixel_y"|| icon="\uf080" 
    export function mouse_position_xy(pixel_x: number, pixel_y: number) {
        serial.writeLine("MOUSE_POS_XY," + pixel_x + "," + pixel_y);
        return;
    }

    /**
    * Sets the mouse position in the X or Y direction as a percentage (0,0 is top left and 100,100 is lower right)
    */
    //% group="Mouse Position"
    //% color=#ff0f0f
    //% block="Set Mouse Position %Mouse_Direction Percent to $percent"|| icon="\uf080"
    export function mouse_position_percent(mouse_direction: Mouse_Direction, percent: number) {
        serial.writeLine("MOUSE_POS_%" + mouse_direction + "," + percent);
        return;
    }

    /**
    * Sets the mouse position in the X and Y direction as a percentage (0,0 is top left and 100,100 is lower right)
    */
    //% group="Mouse Position"
    //% color=#ff0f0f
    //% block="Set Mouse Position Percent to X:$percent_x Y:$percent_y"|| icon="\uf080"
    export function mouse_position_percent_xy(percent_x: number, percent_y: number) {
        serial.writeLine("MOUSE_POS_%XY," + percent_x + "," + percent_y);
        return;
    }

    /**
    * Moves the mouse in the X or Y direction by the specified amount of pixels
    */
    //% group="Mouse Movement"
    //% color=#ff0f0f
    //% block="Mouse Move %Mouse_Direction by $pixel pixels"|| icon="\uf080" 
    export function mouse_move(mouse_direction: Mouse_Direction, pixel: number) {
        serial.writeLine("MOUSE_MOVE_," + mouse_direction + "," + pixel);
        return;
    }

    /**
    * Moves the mouse in the X and Y directions by the specified amounts of pixels
    */
    //% group="Mouse Movement"
    //% color=#ff0f0f
    //% block="Mouse Move XY by X:$pixel_x Y:$pixel_y pixels"|| icon="\uf080" 
    export function mouse_move_xy(pixel_x: number, pixel_y: number) {
        serial.writeLine("MOUSE_MOVE_XY," + pixel_x + "," + pixel_y);
        return;
    }

    /**
    * Clicks, Holds or Releases the mouse buttons
    */
    //% group="Mouse Buttons"
    //% color=#ff0f0f
    //% block="Mouse button %Mouse_Buttons action %Mouse_Button_Actions" icon="\uf080"
    export function mouse_button_action(button_choice: Mouse_Buttons, action_choice: Mouse_Button_Actions): void {
        let button_string: string;
        let action_string: string;

        switch (button_choice) {
            case Mouse_Buttons.L:
                button_string = "L";
                break;
            case Mouse_Buttons.M:
                button_string = "M";
                break;
            case Mouse_Buttons.R:
                button_string = "R";
                break;
            case Mouse_Buttons.All:
                button_string = "ALL";
                break;
        }
        switch (action_choice) {
            case Mouse_Button_Actions.CLICK:
                action_string = "CLICK";
                break;
            case Mouse_Button_Actions.HOLD:
                action_string = "HOLD";
                break;
            case Mouse_Button_Actions.RELEASE:
                action_string = "RELEASE";
                break;

        }

        serial.writeLine("MOUSE_" + action_string + "," + button_string);
        basic.pause(20)
    }

    /**
    * Clicks, Holds or Releases the keyboard keys
    */
    //% group="Keyboard"
    //% color=#1a53ff
    //% block="Keyboard %Keyboard_Actions the %Keyboard_Keys key" icon="\uf080"
    export function Keyboard(action_choice: Keyboard_Actions, key_choice: Keyboard_Keys): void {
        let key_string: string;
        let action_string: string;

        if (action_choice === 0) {
            action_string = "TAP"
        }
        if (action_choice === 1) {
            action_string = "RELEASE"
        }
        if (action_choice === 2) {
            action_string = "HOLD"
        }

        if (key_choice === Keyboard_Keys.ZERO) {
            key_string = "0"
        }
        if (key_choice === Keyboard_Keys.ONE) {
            key_string = "1"
        }
        if (key_choice === Keyboard_Keys.TWO) {
            key_string = "2"
        }
        if (key_choice === Keyboard_Keys.THREE) {
            key_string = "3"
        }
        if (key_choice === Keyboard_Keys.FOUR) {
            key_string = "4"
        }
        if (key_choice === Keyboard_Keys.FIVE) {
            key_string = "5"
        }
        if (key_choice === Keyboard_Keys.SIX) {
            key_string = "6"
        }
        if (key_choice === Keyboard_Keys.SEVEN) {
            key_string = "7"
        }
        if (key_choice === Keyboard_Keys.EIGHT) {
            key_string = "8"
        }
        if (key_choice === Keyboard_Keys.NINE) {
            key_string = "9"
        }
        if (key_choice === 10) {
            key_string = "A";
        }
        if (key_choice === 11) {
            key_string = "B";
        }
        if (key_choice === 12) {
            key_string = "C";
        }
        if (key_choice === 13) {
            key_string = "D";
        }
        if (key_choice === 14) {
            key_string = "E";
        }
        if (key_choice === 15) {
            key_string = "F";
        }
        if (key_choice === 16) {
            key_string = "G";
        }
        if (key_choice === 17) {
            key_string = "H";
        }
        if (key_choice === 18) {
            key_string = "I";
        }
        if (key_choice === 19) {
            key_string = "J";
        }
        if (key_choice === 20) {
            key_string = "K";
        }
        if (key_choice === 21) {
            key_string = "L";
        }
        if (key_choice === 22) {
            key_string = "M";
        }
        if (key_choice === 23) {
            key_string = "N";
        }
        if (key_choice === 24) {
            key_string = "O";
        }
        if (key_choice === 25) {
            key_string = "P";
        }
        if (key_choice === 26) {
            key_string = "Q";
        }
        if (key_choice === 27) {
            key_string = "R";
        }
        if (key_choice === 28) {
            key_string = "S";
        }
        if (key_choice === 29) {
            key_string = "T";
        }
        if (key_choice === 30) {
            key_string = "U";
        }
        if (key_choice === 31) {
            key_string = "V";
        }
        if (key_choice === 32) {
            key_string = "W";
        }
        if (key_choice === 33) {
            key_string = "X";
        }
        if (key_choice === 34) {
            key_string = "Y";
        }
        if (key_choice === 35) {
            key_string = "Z";
        }
        if (key_choice === 36) {
            key_string = "DOWN";
        }
        if (key_choice === 37) {
            key_string = "UP";
        }
        if (key_choice === 38) {
            key_string = "LEFT";
        }
        if (key_choice === 39) {
            key_string = "RIGHT";
        }
        if (key_choice === 40) {
            key_string = "F1";
        }
        if (key_choice === 41) {
            key_string = "F2";
        }
        if (key_choice === 42) {
            key_string = "F3";
        }
        if (key_choice === 43) {
            key_string = "F4";
        }
        if (key_choice === 44) {
            key_string = "F5";
        }
        if (key_choice === 45) {
            key_string = "F6";
        }
        if (key_choice === 46) {
            key_string = "F7";
        }
        if (key_choice === 47) {
            key_string = "F8";
        }
        if (key_choice === 48) {
            key_string = "F9";
        }
        if (key_choice === 49) {
            key_string = "F10";
        }
        if (key_choice === 50) {
            key_string = "F11";
        }
        if (key_choice === 51) {
            key_string = "F12";
        }
        if (key_choice === 52) {
            key_string = "PRINTSCREEN";
        }
        if (key_choice === 53) {
            key_string = "ENTER";
        }
        if (key_choice === 54) {
            key_string = "SPACE";
        }
        if (key_choice === 55) {
            key_string = "DELETE";
        }
        if (key_choice === 56) {
            key_string = "BACKSPACE";
        }
        if (key_choice === 57) {
            key_string = "COPY";
        }
        if (key_choice === 58) {
            key_string = "CUT";
        }
        if (key_choice === 59) {
            key_string = "PASTE";
        }
        if (key_choice === 60) {
            key_string = "VOLUMEUP";
        }
        if (key_choice === 61) {
            key_string = "VOLUMEDOWN";
        }
        if (key_choice === 62) {
            key_string = "VOLUMEMUTE";
        }
        if (key_choice === 63) {
            key_string = "PLAYPAUSE";
        }
        if (key_choice === 64) {
            key_string = "PAGEDOWN";
        }
        if (key_choice === 65) {
            key_string = "PAGEUP";
        }
        if (key_choice === 66) {
            key_string = "HOME";
        }
        if (key_choice === 67) {
            key_string = "END";
        }
        if (key_choice === 68) {
            key_string = "TAB";
        }
        if (key_choice === 69) {
            key_string = "ESC";
        }
        if (key_choice === 70) {
            key_string = "CTRL";
        }
        if (key_choice === 71) {
            key_string = "ALT";
        }
        if (key_choice === 72) {
            key_string = "SHIFT";
        }
        if (key_choice === 73) {
            key_string = "WINDOWS";
        }
        if (key_choice === 74) {
            key_string = "CAPSLOCK";
        }

        serial.writeLine("KEY_" + action_string + "," + key_string);
        basic.pause(20);
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
}

/**
 * Custom blocks
 */
//% groups="['Advanced Mouse Position', 'Advanced Mouse Movement', 'Advanced Mouse Buttons', 'Advanced Keyboard' , 'Advanced Graphs', 'Advanced Sound', 'Advanced Overlay', 'Advanced Date and Time', 'Advanced Files', 'Advanced Tools' ]"

namespace SerialMaker_Advanced{

}