package net.minecraft.util;

import net.minecraft.core.NonNullList;
import net.minecraft.world.SimpleContainer;
import net.minecraft.world.item.ItemStack;

import java.util.List;

public class NoSimpleContainer extends SimpleContainer {
    public final List<ItemStack> items;

    public NoSimpleContainer(ItemStack... pItems) {
        super(pItems);
        this.items = List.of (pItems);
    }
}
