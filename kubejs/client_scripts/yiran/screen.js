let $ScreenEvent$Render$Post = Java.loadClass("net.minecraftforge.client.event.ScreenEvent$Render$Post")

NativeEvents.onEvent($ScreenEvent$Render$Post, event => {
    let { guiGraphics, screen } = event
    if (screen.id != 101) return
    let poseStack = guiGraphics.pose()
    {
        poseStack.pushPose()
        poseStack.translate(Client.window.guiScaledWidth / 2, Client.window.guiScaledHeight / 2, 0)
        ShitDelightClientUtils.drawLine(guiGraphics, poseStack, 0, 0, 100, 0, 2, ShitDelightClientUtils.RGBA(255,0,255,255))
        ShitDelightClientUtils.drawLine(guiGraphics, poseStack, 0, 0, -100, 0, 2, ShitDelightClientUtils.RGBA(255,0,255,255))
        ShitDelightClientUtils.drawLine(guiGraphics, poseStack, 0, 0, 50, 88, 2, ShitDelightClientUtils.RGBA(255,0,255,255))
        ShitDelightClientUtils.drawLine(guiGraphics, poseStack, 0, 0, 50, -88, 2, ShitDelightClientUtils.RGBA(255,0,255,255))
        ShitDelightClientUtils.drawLine(guiGraphics, poseStack, 0, 0, -50, 88, 2, ShitDelightClientUtils.RGBA(255,0,255,255))
        ShitDelightClientUtils.drawLine(guiGraphics, poseStack, 0, 0, -50, -88, 2, ShitDelightClientUtils.RGBA(255,0,255,255))
        poseStack.popPose()
    }
})

if(false)
ItemEvents.firstLeftClicked(e => {
    Client.setScreen(global.createNewScreen(null, 101, 'test'))
})
