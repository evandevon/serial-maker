input.onButtonPressed(Button.B, function () {
    SerialMaker.line_graph_actions(Graph_Actions.ClearData, Graph_Types.ColumnGraph)
    SerialMaker.file_add_to_line("", "Data File.txt", 1)
})
basic.forever(function () {
    while (input.buttonIsPressed(Button.A)) {
        SerialMaker.column_graph(input.acceleration(Dimension.X), input.acceleration(Dimension.Y), input.acceleration(Dimension.Z))
        basic.pause(100)
    }
})
