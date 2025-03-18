let $ScreenEvent$Init$Pre = Java.loadClass("net.minecraftforge.client.event.ScreenEvent$Init$Pre")
let $Button = Java.loadClass('net.minecraft.client.gui.components.Button')


let addWidght = (screen, x, y, w, h,  text,action) => {
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
let addWidghtWithSize = (screen, x, y, sizeX,sizeY,  text,action) => {
    addWidght(screen, x-sizeX/2, y-sizeY/2, sizeX, sizeY, text, action)
}

KeyBindEvents.firstKeyPress('debug_test',e=>{
    Client.setScreen(global.createNewScreen(null, 404, 'test'))
})

NativeEvents.onEvent($ScreenEvent$Init$Pre, event => {
    let { screen } = event
    switch (Number(screen.id)) {
        case 404:
            let CW = Client.window.guiScaledWidth/2
            let CH = Client.window.guiScaledHeight/2
        addWidght(screen,0,0,100,20,'屏幕测试',()=>{
            Client.tell(screen)
            Client.setScreen(global.createNewScreen(screen, 101, 'test'))
        })
        addWidghtWithSize(screen,CW,CH+20,88,20,'kjs reload client',()=>Client.runCommand('kjs reload client_scripts'))
        addWidghtWithSize(screen,CW,CH-20,88,20,'kjs reload server',()=>Client.runCommand('kjs reload server_scripts'))
        addWidghtWithSize(screen,CW,CH+60,88,20,'kjs reload startup',()=>Client.runCommand('kjs reload startup_scripts'))
        addWidghtWithSize(screen,CW,CH-60,88,20,'reload',()=>Client.runCommand('reload'))


        break
    }
})
