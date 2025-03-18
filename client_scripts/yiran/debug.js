
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
let addWidghtWithSize = (screen, x, y, size,  text,action) => {
    addWidght(screen, x-size/2, y-size/2, size/2, size/2, text, action)
}

KeyBindEvents.firstKeyPress('debug_test',e=>{
    Client.setScreen(global.createNewScreen(null, 404, 'test'))
})

NativeEvents.onEvent($ScreenEvent$Init$Pre, event => {
    let { screen } = event
    Client.tell(screen.id)
    switch (Number(screen.id)) {
        case 404:
        addWidght(screen,0,0,100,20,'屏幕测试',()=>{
            Client.tell(e.screen)
            Client.setScreen(global.createNewScreen(e.screen, 101, 'test'))
        })
        addWidght(screen,0,20,100,20,'kjs reload client',()=>Client.runCommand('kjs reload client_scripts'))
        addWidght(screen,0,40,100,20,'kjs reload server',()=>Client.runCommand('kjs reload server_scripts'))
        addWidght(screen,0,60,100,20,'kjs reload startup',()=>Client.runCommand('kjs reload startup_scripts'))
        break
    }
})
