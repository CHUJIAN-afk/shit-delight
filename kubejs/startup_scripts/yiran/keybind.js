KeyBindEvents.register(event => {
    event.create('debug_test', 'key.debug_test', -1, 'key.group.debug')
    //默认按键待指定
    event.create('openMenu', 'key.shit.delight.openStomachMenu', -1, 'key.shit.delight')
})
if (false)//删除按键
{
    let info = ''
    KeyBindUtil.getAllKeyName().forEach(text => {
        let name = text.slice(0, text.indexOf(":") - 1)
        let key = text.slice(text.indexOf(":") + 2)
        info += `
event.remove('${key}') //${name}`
    })
    console.log(info)
}
if (false)//修改默认按键
{
    let info = ''
    KeyBindUtil.getAllKeyName().forEach(text => {
        let name = text.slice(0, text.indexOf(":") - 1)
        let key = text.slice(text.indexOf(":") + 2)
        info += `
event.modifyKey('${key}',-1) //${name}`
    })
    console.log(info)
}
//清扫无用按键绑定
KeyBindEvents.modify(event => {
    event.remove('key.smoothCamera') //切换电影视角
    event.remove('key.spectatorOutlines') //高亮玩家（旁观者）
    event.remove('key.saveToolbarActivator') //保存快捷栏
    event.remove('key.loadToolbarActivator') //加载快捷栏
    event.remove('key.jade.narrate') //语音复述

    event.modifyKey('gui.xaero_toggle_waypoints', -1) //切换游戏内路径点
    event.modifyKey('gui.xaero_toggle_map_waypoints', -1) //切换小地图路径点
    event.modifyKey('gui.xaero_toggle_slime', -1) //切换史莱姆区块
    event.modifyKey('gui.xaero_toggle_grid', -1) //切换区块网格
    event.modifyKey('gui.xaero_instant_waypoint', -1) //快速路径点
    event.modifyKey('gui.xaero_switch_waypoint_set', -1) //切换路径点集合
    event.modifyKey('gui.xaero_display_all_sets', -1) //切换所有路径点集的渲染
    event.modifyKey('gui.xaero_toggle_light_overlay', -1) //切换光照叠加层
    event.modifyKey('gui.xaero_toggle_entity_radar', -1) //切换实体雷达
    event.modifyKey('gui.xaero_reverse_entity_radar', -1) //反转雷达渲染顺序
    event.modifyKey('gui.xaero_toggle_manual_cave_mode', -1) //切换手动洞穴模式
    event.modifyKey('gui.xaero_alternative_list_players', -1) //“玩家列表”第二键位
})
let HideKeyList = [
    'key.hotbar.1', //快捷栏1
    'key.hotbar.2', //快捷栏2
    'key.hotbar.3', //快捷栏3
    'key.hotbar.4', //快捷栏4
    'key.hotbar.5', //快捷栏5
    'key.hotbar.6', //快捷栏6
    'key.hotbar.7', //快捷栏7
    'key.hotbar.8', //快捷栏8
    'key.hotbar.9', //快捷栏9
]
//在这里隐藏会使按键为默认状态,即不读取自己的配置
ClientEvents.init(e=>{
    let newKeyMappings = []
    Client.options.keyMappings.forEach(key=>{
        if(HideKeyList.indexOf(key.name)==-1)
            newKeyMappings.push(key)
    })
    Client.options.keyMappings = newKeyMappings
})