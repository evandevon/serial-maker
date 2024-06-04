let av: Andee.Widget = null
basic.forever(function () {
    av = Andee.createWidget(
    WidgetId.Widget_1,
    WidgetType.Databox,
    WidgetPosition.Row0_Column0,
    WidgetLength.Half,
    WidgetColour.Red,
    "Title",
    "Data",
    "Units"
    )
})
