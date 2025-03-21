//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package dev.latvian.mods.kubejs.core.mixin.common;

import dev.latvian.mods.kubejs.KubeJSPlugin;
import dev.latvian.mods.kubejs.core.InventoryKJS;
import dev.latvian.mods.kubejs.core.PlayerKJS;
import dev.latvian.mods.kubejs.player.KubeJSInventoryListener;
import dev.latvian.mods.kubejs.stages.Stages;
import dev.latvian.mods.kubejs.util.AttachedData;
import dev.latvian.mods.kubejs.util.KubeJSPlugins;
import dev.latvian.mods.rhino.util.RemapForJS;
import dev.latvian.mods.rhino.util.RemapPrefixForJS;
import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.ListTag;
import net.minecraft.util.Stomach;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.ItemStack;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Shadow;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

import java.util.ArrayList;

@RemapPrefixForJS("kjs$")
@Mixin(
        value = {Player.class},
        priority = 1001
)
public abstract class PlayerMixin implements PlayerKJS {
    private Stages kjs$stages;
    private AttachedData<Player> kjs$attachedData;
    private KubeJSInventoryListener kjs$inventoryChangeListener;

    public PlayerMixin() {
    }

    public Stages kjs$getStages() {
        if (this.kjs$stages == null) {
            this.kjs$stages = Stages.create(this.kjs$self());
        }

        return this.kjs$stages;
    }

    public InventoryKJS kjs$getInventory() {
        return (InventoryKJS) this.kjs$self().getInventory();
    }

    public InventoryKJS kjs$getCraftingGrid() {
        return (InventoryKJS) this.kjs$self().inventoryMenu.getCraftSlots();
    }

    public AttachedData<Player> kjs$getData() {
        if (this.kjs$attachedData == null) {
            this.kjs$attachedData = new AttachedData(this.kjs$self());
            KubeJSPlugins.forEachPlugin(this.kjs$attachedData, KubeJSPlugin::attachPlayerData);
        }

        return this.kjs$attachedData;
    }

    @Shadow
    @RemapForJS("closeMenu")
    public abstract void m_6915_();

    public KubeJSInventoryListener kjs$getInventoryChangeListener() {
        if (this.kjs$inventoryChangeListener == null) {
            this.kjs$inventoryChangeListener = new KubeJSInventoryListener((Player) (Object) this);
        }

        return this.kjs$inventoryChangeListener;
    }

    private Stomach Stomach;
    public Stomach getStomach() {
        return Stomach;
    }

    @Inject(at = @At("RETURN"),method = "m_7380_")
    public void sd$addAdditionalSaveData(CompoundTag pCompound, CallbackInfo ci) {
        pCompound.put("Stomach", this.Stomach.save());
    }

    @Inject(at = @At("RETURN"), method = "m_7378_")
    public void sd$readAdditionalSaveData(CompoundTag pCompound, CallbackInfo ci) {
        this.Stomach = new Stomach((Player) (Object) this, pCompound.getList("Stomach", 10));
    }
}
