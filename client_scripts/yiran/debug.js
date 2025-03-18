
NativeEvents.onEvent($ScreenEvent$Init$Pre, e => {
    e.screen.addRenderableWidget(
        $Button.builder(
            Component.of('屏幕测试'),
            () => {
                Client.tell(e.screen)
                Client.setScreen(global.createNewScreen(e.screen, 101, 'test'))
            }
        )
            .bounds(0, 0, 100, 20)
            .build()
    )

    
    e.screen.addRenderableWidget(
        $Button.builder(
            Component.of('kjs reload client'),
            () => {
                Client.runCommand('kjs reload client_scripts')
            }
        )
            .bounds(0, 20, 100, 20)
            .build()
    )
    
    
    
    e.screen.addRenderableWidget(
        $Button.builder(
            Component.of('kjs reload server'),
            () => {
                Client.runCommand('kjs reload server_scripts')
            }
        )
            .bounds(0, 40, 100, 20)
            .build()
    )
    
    e.screen.addRenderableWidget(
        $Button.builder(
            Component.of('kjs reload startup'),
            () => {
                Client.runCommand('kjs reload startup_scripts')
            }
        )
            .bounds(0, 60, 100, 20)
            .build()
    )
})
