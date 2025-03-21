package zank.mods.eventjs;

import dev.latvian.mods.kubejs.KubeJSPlugin;
import dev.latvian.mods.kubejs.script.BindingsEvent;
import dev.latvian.mods.kubejs.script.ScriptType;
import dev.latvian.mods.rhino.util.wrap.TypeWrappers;
import net.minecraft.util.ShitDelightClientUtils;
import net.minecraft.util.ShitDelightUtils;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.api.distmarker.OnlyIn;
import net.minecraftforge.fml.DistExecutor;
import zank.mods.eventjs.wrapper.ClassConvertible;

public class EventJSKubeJSPlugin extends KubeJSPlugin {
    public EventJSKubeJSPlugin() {
    }

    public void registerTypeWrappers(ScriptType type, TypeWrappers typeWrappers) {
        typeWrappers.register(ClassConvertible.class, (cx, o) -> ClassConvertible.of(o));
    }

    public void registerBindings(BindingsEvent event) {
        event.add("NativeEvents", SidedNativeEvents.byType(event.manager.scriptType));
        event.add("StomachMenu",StomachMenu.class);
        event.add("ShitDelightUtils", ShitDelightUtils.INSTANCE);
        DistExecutor.unsafeRunWhenOn(Dist.CLIENT,()->()->{
            event.add("StomachScreen", StomachScreen.class);
            event.add("ShitDelightClientUtils", ShitDelightClientUtils.INSTANCE);
        });
    }
}
