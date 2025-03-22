package net.minecraft.util;

import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.ItemStack;
import net.minecraftforge.eventbus.api.Event;

public class StomachRandomTickEvent extends Event {
    public Player player;
    public ItemStack itemStack;

    public StomachRandomTickEvent(Player player, ItemStack itemStack) {
        this.player = player;
        this.itemStack = itemStack;
    }
}
