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

//属性计算部分
function 玩家属性值计算(
    /**
     * @type {Internal.Player}
     */
    player) {
    let 磐石之根总值 = 0
    let 风之轻语总值 = 0
    let 星火熔炉总值 = 0
    let 森灵秘语总值 = 0
    let 匠魂飨宴总值 = 0
    let 虚空遗尘总值 = 0
    let 果香织梦总值 = 0
    let 莓酿离歌总值 = 0
    let 餮魇归一总值 = 0
    let 腐嗅噬心总值 = 0
    let 潜渊共鸣总值 = 0
    let 腌痕铠胄总值 = 0
    player.stomach.container.forEach((item) => {
        //食物属性值计算
        let 均分系数 = 0;
        const 标签 = ["XKHX", "JHXY", "SLMY", "XHRL", "JFZS", "PSZG"];
        标签.forEach(标签 => {
            if (item.hasTag(标签)) 均分系数++;
        });
        let 食物 = item.getFoodProperties(player)
        if (!食物) return
        let 饥饿值 = 食物.getNutrition()
        let 饱和度 = 食物.getSaturationModifier()
        let 食物营养总价值 = Math.floor((饥饿值 + 饱和度 * 0.5) / Math.max(均分系数, 1) + 1);
        if (item.hasTag("GXZM")) {
            果香织梦总值 += 食物营养总价值
        }
        if (item.hasTag("brewinandchewin:fermented_drinks")) {
            莓酿离歌总值 += 食物营养总价值
        }
        if (item.hasTag("TYGY")) {
            餮魇归一总值 += 食物营养总价值
        }
        if (item.hasTag("shit")) {
            腐嗅噬心总值 += 食物营养总价值
        }
        if (item.hasTag("FSNJ")) {
            潜渊共鸣总值 += 食物营养总价值
        }
        if (item.hasTag("YHKZ")) {
            腌痕铠胄总值 += 食物营养总价值
        }
        if (item.hasTag("PSZG")) {
            let 磐石之根系数 = (饥饿值 - 饱和度) / 5
            磐石之根总值 += Math.max(Math.floor(食物营养总价值 * 磐石之根系数), 1)
        }
        if (item.hasTag("JFZS")) {
            let 风之轻语系数 = 饥饿值 / (Math.abs(饱和度) + 0.5) / 3
            风之轻语总值 += Math.max(Math.floor(食物营养总价值 * 风之轻语系数), 1)
        }
        if (item.hasTag("XHRL")) {
            let 星火熔炉系数 = (Math.pow(饥饿值, 1.2) + Math.pow(饱和度, 1.2)) / 10
            星火熔炉总值 += Math.max(Math.floor(食物营养总价值 * 星火熔炉系数), 1)
        }
        if (item.hasTag("SLMY")) {
            let 森灵秘语系数 = Math.log(饥饿值 + 1) * (饱和度 + 0.3) / 1.5
            森灵秘语总值 += Math.max(Math.floor(食物营养总价值 * 森灵秘语系数), 1)
        }
        if (item.hasTag("JHXY")) {
            let 匠魂飨宴系数 = ((饥饿值 / (饱和度 + 1)) + Math.sqrt(饥饿值 + 饱和度)) / 9
            匠魂飨宴总值 += Math.max(Math.floor(食物营养总价值 * 匠魂飨宴系数), 1)
        }
        if (item.hasTag("XKHX")) {
            let 虚空遗尘系数 = Math.exp(饥饿值 * 饱和度 * 0.05)
            虚空遗尘总值 += Math.max(Math.floor(食物营养总价值 * 虚空遗尘系数), 1)
        }
    })
    //将总值写入玩家持久化数据，在客户端计算时不需要
    let 持久化数据 = player.persistentData;
    let 属性表 = [
        { 属性值: 莓酿离歌总值, 属性名: '莓酿离歌' },
        { 属性值: 磐石之根总值, 属性名: '磐石之根' },
        { 属性值: 风之轻语总值, 属性名: '风之轻语' },
        { 属性值: 星火熔炉总值, 属性名: '星火熔炉' },
        { 属性值: 森灵秘语总值, 属性名: '森灵秘语' },
        { 属性值: 匠魂飨宴总值, 属性名: '匠魂飨宴' },
        { 属性值: 虚空遗尘总值, 属性名: '虚空遗尘' },
        { 属性值: 果香织梦总值, 属性名: '果香织梦' },
        { 属性值: 餮魇归一总值, 属性名: '餮魇归一' },
        { 属性值: 腐嗅噬心总值, 属性名: '腐嗅噬心' },
        { 属性值: 潜渊共鸣总值, 属性名: '潜渊共鸣' },
        { 属性值: 腌痕铠胄总值, 属性名: '腌痕铠胄' }
    ];
    属性表.forEach(配置 => {
        持久化数据.putInt(配置.属性名, 配置.属性值);
    })
}


let attributeCount = 6
let list = ["XKHX", "JHXY", "SLMY", "XHRL", "JFZS", "PSZG"]
let otherList = ['虚空遗尘', '匠魂飨宴', '森灵秘语', '星火熔炉', '风之轻语', '磐石之根']
let rot = new Quaternionf().rotateZ(2 * KMath.PI / attributeCount)
NativeEvents.onEvent($ScreenEvent$Render$Post, event => {
    let { guiGraphics, screen } = event
    if (screen.id != 101) return
    玩家属性值计算(Client.player)
    let poseStack = guiGraphics.pose()
    {
        poseStack.pushPose()
        guiGraphics.fill(0, 0, Client.window.guiScaledWidth, Client.window.guiScaledHeight, ShitDelightClientUtils.RGBA(114, 114, 114, 114))
        poseStack.translate(Client.window.guiScaledWidth / 2, Client.window.guiScaledHeight / 2, 0)
        openTick < 1 && (openTick += openTick * 0.01 + 0.01)
        list.forEach((value, index) => {
            guiGraphics["drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)"](
                Client.font, Text.translatable('shit.delight.' + value).getString(),
                Math.cos(index * KMath.PI / 3) * 120 - 20, Math.sin(index * KMath.PI / 3) * 120 - 4,
                -1, false
            )
            guiGraphics["drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)"](
                Client.font, Client.player.persistentData.getInt(otherList[index]),
                Math.cos(index * KMath.PI / 3) * 120 - 20, Math.sin(index * KMath.PI / 3) * 120 + 4,
                -1, false
            )
        })
        /*
        poseStack.pushPose()
        {
            guiGraphics.fill(2, -1, 22 + openTick * Client.player.persistentData.getInt('虚空遗尘'), 1, ShitDelightClientUtils.RGBA(170, 0, 170, 255))
            poseStack.mulPose(rot)
            guiGraphics.fill(2, -1, 22 + openTick * Client.player.persistentData.getInt('匠魂飨宴'), 1, ShitDelightClientUtils.RGBA(255, 170, 0, 255))
            poseStack.mulPose(rot)
            guiGraphics.fill(2, -1, 22+ openTick * Client.player.persistentData.getInt('森灵秘语'), 1, ShitDelightClientUtils.RGBA(0, 170, 0, 255))
            poseStack.mulPose(rot)
            guiGraphics.fill(2, -1, 22 + openTick * Client.player.persistentData.getInt('星火熔炉'), 1, ShitDelightClientUtils.RGBA(255, 85, 85, 255))
            poseStack.mulPose(rot)
            guiGraphics.fill(2, -1, 22 + openTick * Client.player.persistentData.getInt('风之轻语'), 1, ShitDelightClientUtils.RGBA(85, 255, 255, 255))
            poseStack.mulPose(rot)
            guiGraphics.fill(2, -1, 22 + openTick * Client.player.persistentData.getInt('磐石之根'), 1, ShitDelightClientUtils.RGBA(85, 85, 85, 255))
        }
        poseStack.popPose()*/
        poseStack.pushPose()
        {

            poseStack.pushPose()
            {
                for (let i = 0; i < 6; i++) {
                    poseStack.mulPose(rot)
                    for (let j = 6; j > 0; j--) {
                        guiGraphics.fill(
                            -j * 16 * Math.sin(KMath.PI / 6) -1, j * 14,
                            j * 16 * Math.sin(KMath.PI / 6) +1, j * 14 - 1,
                            -1
                        )
                    }
                    poseStack.pushPose()
                    {
                        poseStack.translate(0, 0.5, 0)
                        guiGraphics.fill(0, 0, 16 * 6+1, -1, -1)
                    }
                    poseStack.popPose()
                }
            }
            poseStack.popPose()

            simpleDrawTRIANGLE(poseStack, 0,
                16 * openTick * (Math.floor((Client.player.persistentData.getInt('虚空遗尘')) / 20) + 1),
                ShitDelightClientUtils.RGBA(170, 0, 170, 188),
                16 * openTick * (Math.floor((Client.player.persistentData.getInt('匠魂飨宴')) / 20) + 1),
                ShitDelightClientUtils.RGBA(255, 170, 0, 188)
            )
            simpleDrawTRIANGLE(poseStack, 1,
                16 * openTick * (Math.floor((Client.player.persistentData.getInt('匠魂飨宴')) / 20) + 1),
                ShitDelightClientUtils.RGBA(255, 170, 0, 188),
                16 * openTick * (Math.floor((Client.player.persistentData.getInt('森灵秘语')) / 20) + 1),
                ShitDelightClientUtils.RGBA(0, 170, 0, 188)
            )
            simpleDrawTRIANGLE(poseStack, 2,
                16 * openTick * (Math.floor((Client.player.persistentData.getInt('森灵秘语')) / 20) + 1),
                ShitDelightClientUtils.RGBA(0, 170, 0, 188),
                16 * openTick * (Math.floor((Client.player.persistentData.getInt('星火熔炉')) / 20) + 1),
                ShitDelightClientUtils.RGBA(255, 85, 85, 188)
            )
            simpleDrawTRIANGLE(poseStack, 3,
                16 * openTick * (Math.floor((Client.player.persistentData.getInt('星火熔炉')) / 20) + 1),
                ShitDelightClientUtils.RGBA(255, 85, 85, 188),
                16 * openTick * (Math.floor((Client.player.persistentData.getInt('风之轻语')) / 20) + 1),
                ShitDelightClientUtils.RGBA(85, 255, 255, 188)
            )
            simpleDrawTRIANGLE(poseStack, 4,
                16 * openTick * (Math.floor((Client.player.persistentData.getInt('风之轻语')) / 20) + 1),
                ShitDelightClientUtils.RGBA(85, 255, 255, 188),
                16 * openTick * (Math.floor((Client.player.persistentData.getInt('磐石之根')) / 20) + 1),
                ShitDelightClientUtils.RGBA(85, 85, 85, 188)
            )
            simpleDrawTRIANGLE(poseStack, 5,
                16 * openTick * (Math.floor((Client.player.persistentData.getInt('磐石之根')) / 20) + 1),
                ShitDelightClientUtils.RGBA(85, 85, 85, 188),
                16 * openTick * (Math.floor((Client.player.persistentData.getInt('虚空遗尘')) / 20) + 1),
                ShitDelightClientUtils.RGBA(170, 0, 170, 188)
            )
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
function simpleDrawTRIANGLE(poseStack, index, length1, color1, length2, color2) {
    //设置着色器为顶点位置加颜色
    $RenderSystem.setShader(() => $GameRenderer.getPositionColorShader())
    //启用混合
    $RenderSystem.enableBlend()
    let matrix4f = poseStack.last().pose()
    //获取Tesselator实例
    let Tesselator = $Tesselator.getInstance()
    //获取bufferbuilder
    let bufferbuilder = Tesselator.getBuilder()
    bufferbuilder.begin(
        //设置类型为三角形
        $VertexFormat$Mode.TRIANGLE_FAN,
        //设置顶点参数为坐标加颜色
        $DefaultVertexFormat.POSITION_COLOR
    )

    //逆时针添加顶点
    bufferbuilder
        .vertex(matrix4f, Math.cos(index * KMath.PI / 3) * length1, Math.sin(index * KMath.PI / 3) * length1, 0)
        .color(color1).endVertex()

    bufferbuilder
        .vertex(matrix4f, 0, 0, 0)
        .color(ShitDelightClientUtils.RGBA(255, 255, 255, 150)).endVertex()

    bufferbuilder
        .vertex(matrix4f, Math.cos((index + 1) * KMath.PI / 3) * length2, Math.sin((index + 1) * 2 * KMath.PI / 6) * length2, 0)
        .color(color2).endVertex()

    //绘制
    $BufferUploader.drawWithShader(bufferbuilder.end())
    //关闭混合
    $RenderSystem.disableBlend()

}
let $Tesselator = Java.loadClass('com.mojang.blaze3d.vertex.Tesselator')
let $VertexFormat$Mode = Java.loadClass('com.mojang.blaze3d.vertex.VertexFormat$Mode')
let $DefaultVertexFormat = Java.loadClass('com.mojang.blaze3d.vertex.DefaultVertexFormat')
let $GameRenderer = Java.loadClass('net.minecraft.client.renderer.GameRenderer')
let $RenderSystem = Java.loadClass('com.mojang.blaze3d.systems.RenderSystem')
let $BufferUploader = Java.loadClass('com.mojang.blaze3d.vertex.BufferUploader')
Client.tell(Math.log(1 + Client.player.persistentData.getInt('虚空遗尘')))