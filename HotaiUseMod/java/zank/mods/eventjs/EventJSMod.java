package zank.mods.eventjs;

import net.minecraft.client.gui.screens.MenuScreens;
import net.minecraft.world.inventory.MenuType;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.api.distmarker.OnlyIn;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.eventbus.api.Event;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.fml.DistExecutor;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.IModBusEvent;
import net.minecraftforge.fml.event.lifecycle.FMLClientSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;

import java.util.function.Supplier;

@Mod("eventjs")
public class EventJSMod {
    public static final String MOD_ID = "eventjs";
    public static final String NAME = "EventJS";
    static IEventBus MOD_BUS;
    public Supplier<MenuType<StomachMenu>> STOMACH_MENU_3x3;

    @OnlyIn(Dist.CLIENT)
    public void clientStartup(FMLClientSetupEvent event) {
        MenuScreens.register(StomachMenu.STOMACH_MENU_3x3.get(), StomachScreen::new);
        MenuScreens.register(StomachMenu.STOMACH_MENU_9x2.get(), StomachScreen::new);
        MenuScreens.register(StomachMenu.STOMACH_MENU_9x3.get(), StomachScreen::new);
        MenuScreens.register(StomachMenu.STOMACH_MENU_9x4.get(), StomachScreen::new);
        MenuScreens.register(StomachMenu.STOMACH_MENU_9x5.get(), StomachScreen::new);
        MenuScreens.register(StomachMenu.STOMACH_MENU_9x6.get(), StomachScreen::new);
    }

    public EventJSMod() {
        MOD_BUS = FMLJavaModLoadingContext.get() == null ? null : FMLJavaModLoadingContext.get().getModEventBus();
        Class<StomachScreen> arg = StomachScreen.class;

        StomachMenu.MENU.register(EventJSMod.MOD_BUS);
        DistExecutor.unsafeRunWhenOn(Dist.CLIENT, () -> () -> {
            MOD_BUS.addListener(this::clientStartup);
        });

    }

    public static IEventBus selectBus(Class<? extends Event> eventType) {
        return IModBusEvent.class.isAssignableFrom(eventType) ? MOD_BUS : MinecraftForge.EVENT_BUS;
    }
}
