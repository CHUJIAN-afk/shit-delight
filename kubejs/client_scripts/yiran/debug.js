let $ScreenEvent$Init$Pre = Java.loadClass("net.minecraftforge.client.event.ScreenEvent$Init$Pre")
let $Button = Java.loadClass('net.minecraft.client.gui.components.Button')
let $ScreenEvent$Render$Post = Java.loadClass("net.minecraftforge.client.event.ScreenEvent$Render$Post")
let $EditBox = Java.loadClass('net.minecraft.client.gui.components.EditBox')


let addWidght = (screen, x, y, w, h, text, action) => {
    screen.addRenderableWidget(
        $Button.builder(
            Component.of(text),
            action
        )
            .pos(x, y)
            .size(w, h)
            .build()
    )
}
let addWidghtWithSize = (screen, x, y, sizeX, sizeY, text, action) => {
    addWidght(screen, x - sizeX / 2, y - sizeY / 2, sizeX, sizeY, text, action)
}

KeyBindEvents.firstKeyPress('debug_test', e => {
    Client.setScreen(global.createNewScreen(null, 404, 'test'))
})

NativeEvents.onEvent($ScreenEvent$Init$Pre, event => {
    let { screen } = event
    switch (Number(screen.id)) {
        case 404:
            let CW = Client.window.guiScaledWidth / 2
            let CH = Client.window.guiScaledHeight / 2
            addWidght(screen, 0, 0, 100, 20, '屏幕测试', () => {
                Client.tell(screen)
                Client.setScreen(global.createNewScreen(screen, 101, 'test'))
            })
            addWidghtWithSize(screen, CW + 55, CH - 88, 88, 20, 'reload', () => Client.runCommand('reload'))
            addWidghtWithSize(screen, CW - 55, CH - 88, 88, 20, 'kjs reload server', () => Client.runCommand('kjs reload server_scripts'))
            addWidghtWithSize(screen, CW + 55, CH - 60, 88, 20, 'kjs reload client', () => Client.runCommand('kjs reload client_scripts'))
            addWidghtWithSize(screen, CW - 55, CH - 60, 88, 20, 'kjs reload startup', () => Client.runCommand('kjs reload startup_scripts'))
            addWidghtWithSize(screen, CW, CH -32, 110+88, 20, 'probejs dump', () => Client.runCommand('probejs dump'))

            let textBox = new $EditBox(Client.font,50,100,100,20,Component.of('aaa'))
            addWidghtWithSize(screen, 50, 30, 50, 20, 'liiii', () => console.log(event.getListenersList()))
            addWidghtWithSize(screen, 120, 30, 50, 20, 'xxxxxxx', () => Client.tell(screen.children()))
            screen.addRenderableWidget(textBox)

            break
    }
})
NativeEvents.onEvent($ScreenEvent$Render$Post, event => {
    let { guiGraphics, screen } = event
    switch (Number(screen.id)) {
        case 404:
            let text = ''
            screen.children().forEach(child => {
                if (child instanceof $EditBox)
                    text = child.getValue()
            })
            guiGraphics["drawString(net.minecraft.client.gui.Font,java.lang.String,float,float,int,boolean)"](
                Client.font, text, 25, 120, -1, true
            )
            break
    }
})
if(false){
let $ForgeRegistries = Java.loadClass("net.minecraftforge.registries.ForgeRegistries")
let printf = ''
$ForgeRegistries.ATTRIBUTES.forEach(v=>{
    let key = v.descriptionId
    printf += `\n/`+`/${Text.translatable(key).getString()}\n/`+`/${Text.translatable(key+'.desc').getString()}\n"${key}"`
})
console.log(printf)
}
let $Stomach = Java.loadClass("net.minecraft.util.Stomach")
NetworkEvents.dataReceived('update', e => {
    Client.player.setStomach(new $Stomach(Client.player, e.data.Stomach))
})