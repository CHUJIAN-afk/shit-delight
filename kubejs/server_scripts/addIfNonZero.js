const addIfNonZero = (color, name, value) => {
    if (value !== 0) {
        return `${color}${name}§7${value}`;
    }
    return null;
};
ItemEvents.rightClicked(event => {
    const player = event.player;
    if (player.shiftKeyDown && player.mainHandItem.id == "kubejs:magnifying_glass") {
        (() => {
            const lines = [
                "==便携性胃镜==",
                addIfNonZero("", "每分钟消化数", Math.floor(6000 / (30000 / ((磐石之根总值 + 风之轻语总值 + 星火熔炉总值 + 森灵秘语总值 + 匠魂飨宴总值 + 虚空遗尘总值) * (100 - 腐嗅噬心总值*1.5) / 100))) / 100),
                addIfNonZero("§8", "磐石之根", 磐石之根总值),
                addIfNonZero("§b", "风之轻语", 风之轻语总值),
                addIfNonZero("§c", "星火熔炉", 星火熔炉总值),
                addIfNonZero("§2", "森灵秘语", 森灵秘语总值),
                addIfNonZero("§6", "匠魂飨宴", 匠魂飨宴总值),
                addIfNonZero("§5", "虚空遗尘", 虚空遗尘总值),
                addIfNonZero("§a", "果香织梦", 果香织梦总值),
                addIfNonZero("§4", "莓酿离歌", 莓酿离歌总值),
                addIfNonZero("§9", "餮魇归一", 餮魇归一总值),
                addIfNonZero("§6", "腐嗅噬心", 腐嗅噬心总值),
                addIfNonZero("§3", "潜渊共鸣", 潜渊共鸣总值),
                addIfNonZero("§7", "腌痕铠胄", 腌痕铠胄总值),
            ];

            const filtered = lines.filter(line => line !== null);
            if (filtered.length > 1) {
                player.tell(filtered.join("\n"));
            }else{
                player.setStatusMessage("§6胃里空空如也");
            }
        })();
    }
    if(!player.shiftKeyDown && player.mainHandItem.id == "kubejs:magnifying_glass"){
        player.openInventoryGUI(event.player.enderChestInventory,Component.translatable("胃"))
    }
});

BlockEvents.rightClicked("ender_chest",event=>{
    event.cancel()
})
