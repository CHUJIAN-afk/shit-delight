// priority: 99999
// 遇到了加载顺序问题 所以把loadclass搬到这里来了
let $Screen = Java.loadClass("net.minecraft.client.gui.screens.Screen")
let $ScreenEvent$Init$Pre = Java.loadClass("net.minecraftforge.client.event.ScreenEvent$Init$Pre")
let $ScreenEvent$Render$Post = Java.loadClass("net.minecraftforge.client.event.ScreenEvent$Render$Post")
let $Button = Java.loadClass('net.minecraft.client.gui.components.Button')
