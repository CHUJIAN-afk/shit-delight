package net.minecraft.util;

import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import top.theillusivec4.curios.api.SlotContext;
import top.theillusivec4.curios.api.type.capability.ICurio;

import javax.annotation.Nullable;
import java.util.function.Consumer;

public class RingCurioItem extends Item implements ICurio {
    public RingCurioItem(Properties pProperties) {
        super(pProperties);
    }
    @Override
    public ItemStack getStack() {
        return new ItemStack(this);
    }
    @Override
    public void curioTick(SlotContext slotContext) {
    }
}
