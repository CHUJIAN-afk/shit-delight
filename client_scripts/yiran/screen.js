
NativeEvents.onEvent($ScreenEvent$Render$Post, event => {
    let { guiGraphics, screen } = event
    if (screen.id != 101) return
    let poseStack = guiGraphics.pose()
    {
        poseStack.pushPose()
        poseStack.translate(Client.window.guiScaledWidth / 2, Client.window.guiScaledHeight / 2, 0)
        global.drawLine(guiGraphics, poseStack, 0, 0, 100, 0, 2, -1)
        global.drawLine(guiGraphics, poseStack, 0, 0, -100, 0, 2, -1)
        global.drawLine(guiGraphics, poseStack, 0, 0, 50, 88, 2, -1)
        global.drawLine(guiGraphics, poseStack, 0, 0, 50, -88, 2, -1)
        global.drawLine(guiGraphics, poseStack, 0, 0, -50, 88, 2, -1)
        global.drawLine(guiGraphics, poseStack, 0, 0, -50, -88, 2, -1)
        poseStack.popPose()
    }
})
ItemEvents.firstLeftClicked(e => {
    Client.setScreen(global.createNewScreen(null, 101, 'test'))
})

NativeEvents.onEvent($ScreenEvent$Init$Pre, e => {
    e.screen.addRenderableWidget(
        $Button.builder(
            Component.of('test'),
            () => {
                Client.tell(e.screen)
                Client.setScreen(global.createNewScreen(e.screen, 101, 'test'))
            }
        )
            .bounds(0, 0, 100, 20)
            .build()
    )
})