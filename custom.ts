
/**
* TEST Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

enum Keyboard_Keys {
    
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
    //% block="Click"
    Click,
    //% block="Release"
    Release,
    //% block="Hold"
    Hold,
    //% block="Double Click"
    Double_Click
}


enum Mouse_Direction {
    X,
    Y
}

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * Custom blocks
 */
//% groups="['Mouse', 'Keyboard' , 'Graphs', 'Sound', 'Overlay', 'Requests', 'Files', ]"

namespace SerialMaker {

    /**
    * Averages a value across selected time frame.
    */
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
    //% group="Mouse Commands"
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
    //% group="Mouse Commands"
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
    //% group="Mouse Commands"
    //% color=#ff0f0f
    //% block="Set Mouse Position %Mouse_Direction to $pixel pixel"|| icon="\uf080" color=#ff0f0f
    export function mouse_position(mouse_direction: Mouse_Direction, pixel: number){
        serial.writeLine("MOUSE_POS_" + mouse_direction + "," + pixel);
        return;
    }

    /**
    * Sets the mouse position in the X and Y direction (0,0 is top left)
    */
    //% group="Mouse Commands"
    //% color=#ff0f0f
    //% block="Set Mouse Position to X:$pixel_x and Y:$pixel_y"|| icon="\uf080" 
    export function mouse_position_xy(pixel_x: number, pixel_y: number) {
        serial.writeLine("MOUSE_POS_XY," + pixel_x + "," + pixel_y);
        return;
    }

    /**
    * Sets the mouse position in the X or Y direction as a percentage (0,0 is top left and 100,100 is lower right)
    */
    //% group="Mouse Commands"
    //% color=#ff0f0f
    //% block="Set Mouse Position %Mouse_Direction Percent to $percent"|| icon="\uf080"
    export function mouse_position_percent(mouse_direction: Mouse_Direction, percent: number) {
        serial.writeLine("MOUSE_POS_%" + mouse_direction + "," + percent);
        return;
    }

    /**
    * Sets the mouse position in the X and Y direction as a percentage (0,0 is top left and 100,100 is lower right)
    */
    //% group="Mouse Commands"
    //% color=#ff0f0f
    //% block="Set Mouse Position Percent to X:$percent_x Y:$percent_y"|| icon="\uf080"
    export function mouse_position_percent_xy(percent_x: number, percent_y: number) {
        serial.writeLine("MOUSE_POS_%XY," + percent_x + "," + percent_y);
        return;
    }

    /**
    * Moves the mouse in the X or Y direction by the specified amount of pixels
    */
    //% group="Mouse Commands"
    //% color=#ff0f0f
    //% block="Mouse Move %Mouse_Direction by $pixel pixels"|| icon="\uf080" 
    export function mouse_move(mouse_direction: Mouse_Direction, pixel: number) {
        serial.writeLine("MOUSE_MOVE_," + mouse_direction + "," + pixel);
        return;
    }

    /**
    * Moves the mouse in the X and Y directions by the specified amounts of pixels
    */
    //% group="Mouse Commands"
    //% color=#ff0f0f
    //% block="Mouse Move XY by X:$pixel_x Y:$pixel_y pixels"|| icon="\uf080" 
    export function mouse_move_xy(pixel_x: number, pixel_y: number) {
        serial.writeLine("MOUSE_MOVE_XY," + pixel_x + "," + pixel_y);
        return;
    }

    /**
    * Clicks, Holds or Releases the mouse buttons
    */
    //% group="Mouse Commands"
    //% color=#ff0f0f
    //% block="Mouse button %Mouse_Buttons action %Mouse_Button_Actions" icon="\uf080"
    export function mouse_button_action(button_choice:Mouse_Buttons ,action_choice: Mouse_Button_Actions): void {
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
            case Mouse_Button_Actions.Click:
                action_string = "CLICK";
                break;
            case Mouse_Button_Actions.Hold:
                action_string = "HOLD";
                break;
            case Mouse_Button_Actions.Release:
                action_string = "RELEASE";
                break;

        }

        serial.writeLine("MOUSE_" + action_string + "," + button_string);
        basic.pause(20)
    }

    //% color=#2db300
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
        basic.pause(50);
        return;
    }

    //% block="Test Block for %choice"
    export function test(choice: MyEnum) {

    }



    /**
       * Wait until button is pressed
       * @param button the button to wait for eg: Button.A
       */
    //% blockId=WaitUntilBlocks_wait_until_button_is_pressed
    //% block="wait until button %button is pressed"
    //% weight=100
    //% jsdoc.loc.nl="Wacht tot een knop is ingedrukt."
    //% button.loc.nl="De knop waar je op wacht, bijvoorbeeld knop A."
    export function waitUntilButtonPressed(button: Button): void {
        while (!input.buttonIsPressed(button)) {
            basic.pause(20);
        }
    }

    /**
       * Wait until button is released
       * @param button the button to wait for eg: Button.A
       */
    //% blockId=WaitUntilBlocks_wait_until_button_is_released
    //% block="wait until button %button is released"
    //% block.loc.de="warte bis Knopf %button losgelassen"
    //% block.loc.sv-SE="vänta tills knapp %button släpps"
    //% block.loc.fr="attendre jusqu'à ce que le bouton %button soit relaché"
    //% block.loc.nl="wacht tot knop %button is losgelaten"
    //% weight=95
    //% jsdoc.loc.nl="Wacht tot een knop is losgelaten oftewel niet meer is ingedrukt."
    //% button.loc.nl="De knop waar je op wacht, bijvoorbeeld knop A."
    export function waitUntilButtonReleased(button: Button): void {
        while (input.buttonIsPressed(button)) {
            basic.pause(20);
        }
    }
    

}


