
global.createNewScreen = (screen,id, name) =>
    new JavaAdapter(
        $Screen,
        {
            lastScreen:screen,
            _id: id,
            getId(){
                return this._id
            },
            m_7379_(){
                Client.setScreen(this.lastScreen)
            },
        },
        Component.of(name)
    )

global.drawLine = (guiGraphics, poseStack, x1, y1, x2, y2, w, color) => {
    let dx = x2 - x1
    let dy = y2 - y1
    let length = Math.sqrt(dx * dx + dy * dy)
    color = color || -1
    poseStack.pushPose()
    poseStack.translate((x1 + x2) / 2, (y1 + y2) / 2, 0)
    poseStack.mulPose(new Quaternionf().rotateZ(Math.atan2(dy, dx)))
    poseStack.translate(0, -w / 2, 0)
    guiGraphics.fill(-length / 2, 0, length / 2, w, color)
    poseStack.popPose()
}
