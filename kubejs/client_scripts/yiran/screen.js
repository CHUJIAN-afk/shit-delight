let $ScreenEvent$Render$Post = Java.loadClass("net.minecraftforge.client.event.ScreenEvent$Render$Post")
let $ScreenEvent$Opening = Java.loadClass("net.minecraftforge.client.event.ScreenEvent$Opening")
let openTick = 0
NativeEvents.onEvent($ScreenEvent$Opening, event => {
    switch (Number(event.screen.id)) {
        case 101:
            openTick = 0
            break
    }

})

let attributeCount = 6
let list = ["XKHX", "JHXY", "SLMY", "XHRL", "JFZS", "PSZG"]
let rot = new Quaternionf().rotateZ(2 * KMath.PI / attributeCount)
NativeEvents.onEvent($ScreenEvent$Render$Post, event => {
    let { guiGraphics, screen } = event
    if (screen.id != 101) return
    let poseStack = guiGraphics.pose()
    {
        poseStack.pushPose()
        poseStack.translate(Client.window.guiScaledWidth / 2, Client.window.guiScaledHeight / 2, 0)
        guiGraphics.fill(-200, -150, 200, 150, ShitDelightClientUtils.RGBA(114, 114, 114, 114))
        openTick < 1 && (openTick += openTick * 0.01 + 0.01)
        list.forEach((value, index) => {
            guiGraphics["drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)"](
                Client.font, Text.translatable('shit.delight.' + value).getString(),
                Math.cos(index * KMath.PI / 3) * 120 - 20, Math.sin(index * KMath.PI / 3) * 120 - 4,
                -1, false
            )
        })
        poseStack.pushPose()
        {
            guiGraphics.fill(2, -1, 2 + openTick * 100, 1, ShitDelightClientUtils.RGBA(170, 0, 170, 255))
            poseStack.mulPose(rot)
            guiGraphics.fill(2, -1, 2 + openTick * 100, 1, ShitDelightClientUtils.RGBA(255, 170, 0, 255))
            poseStack.mulPose(rot)
            guiGraphics.fill(2, -1, 2 + openTick * 100, 1, ShitDelightClientUtils.RGBA(0, 170, 0, 255))
            poseStack.mulPose(rot)
            guiGraphics.fill(2, -1, 2 + openTick * 100, 1, ShitDelightClientUtils.RGBA(255, 85, 85, 255))
            poseStack.mulPose(rot)
            guiGraphics.fill(2, -1, 2 + openTick * 100, 1, ShitDelightClientUtils.RGBA(85, 255, 255, 255))
            poseStack.mulPose(rot)
            guiGraphics.fill(2, -1, 2 + openTick * 100, 1, ShitDelightClientUtils.RGBA(85, 85, 85, 255))
        }
        poseStack.popPose()

        // guiGraphics.fill(0, -1, openTick * 100, 1, ShitDelightClientUtils.RGBA(42 * 2.55, 0 * 2.55, 42 * 2.55, 255))
        // poseStack.mulPose(rot)
        // guiGraphics.fill(0, -1, openTick * 100, 1, ShitDelightClientUtils.RGBA(42 * 2.55, 42 * 2.55, 0 * 2.55, 255))
        // poseStack.mulPose(rot)
        // guiGraphics.fill(0, -1, openTick * 100, 1, ShitDelightClientUtils.RGBA(0 * 2.55, 42 * 2.55, 0 * 2.55, 255))
        // poseStack.mulPose(rot)
        // guiGraphics.fill(0, -1, openTick * 100, 1, ShitDelightClientUtils.RGBA(63 * 2.55, 21 * 2.55, 21 * 2.55, 255))
        // poseStack.mulPose(rot)
        // guiGraphics.fill(0, -1, openTick * 100, 1, ShitDelightClientUtils.RGBA(21 * 2.55, 63 * 2.55, 63 * 2.55, 255))
        // poseStack.mulPose(rot)
        // guiGraphics.fill(0, -1, openTick * 100, 1, ShitDelightClientUtils.RGBA(21 * 2.55, 21 * 2.55, 21 * 2.55, 255))

        // ShitDelightClientUtils.drawLine(guiGraphics, poseStack, 0, 0, openTick*100, openTick*0, 2, ShitDelightClientUtils.RGBA(255,0,255,255))
        // ShitDelightClientUtils.drawLine(guiGraphics, poseStack, 0, 0, openTick*-100, openTick*0, 2, ShitDelightClientUtils.RGBA(255,0,255,255))
        // ShitDelightClientUtils.drawLine(guiGraphics, poseStack, 0, 0, openTick*50, openTick*88, 2, ShitDelightClientUtils.RGBA(255,0,255,255))
        // ShitDelightClientUtils.drawLine(guiGraphics, poseStack, 0, 0, openTick*50, openTick*-88, 2, ShitDelightClientUtils.RGBA(255,0,255,255))
        // ShitDelightClientUtils.drawLine(guiGraphics, poseStack, 0, 0, openTick*-50, openTick*88, 2, ShitDelightClientUtils.RGBA(255,0,255,255))
        // ShitDelightClientUtils.drawLine(guiGraphics, poseStack, 0, 0, openTick*-50, openTick*-88, 2, ShitDelightClientUtils.RGBA(255,0,255,255))
        poseStack.popPose()
    }
})

if (false)
    ItemEvents.firstLeftClicked(e => {
        Client.setScreen(global.createNewScreen(null, 101, 'test'))
    })
