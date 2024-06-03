
/**
* TEST Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/
enum Direction_Words {
    "LEFT",
    "RIGHT",
    "UP",
    "DOWN"
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
//% color="#AA278D" weight=100
namespace SerialMaker {

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

    //% block ="Mouse Move %Direction_Words 10 pixels"|| icon="\uf080"
    export function mouse_move_direction(choice: Direction_Words) {
        serial.writeLine("MOUSE_MOVE_" + choice);
        return;
    }

    //% block="Set Mouse Position %Mouse_Direction to $pixel pixel"|| icon="\uf080" 
    export function mouse_position(mouse_direction: Mouse_Direction, pixel: number){
        serial.writeLine("MOUSE_POS_," + mouse_direction + "," + pixel);
        return;
    }

    //% block="Set Mouse Move %Mouse_Direction by $pixel pixel"|| icon="\uf080" 
    export function mouse_move(mouse_direction: Mouse_Direction, pixel: number) {
        serial.writeLine("MOUSE_MOVE_," + mouse_direction + "," + pixel);
        return;
    }

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


