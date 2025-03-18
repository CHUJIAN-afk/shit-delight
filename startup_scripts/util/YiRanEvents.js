// priority: 88888

const YiRanEvents = {}
/**
 * 
 * @param {(event:PotionHandler)} event 
 */
YiRanEvents.PotionRegister = (event) => {
    event(PotionHandler)
    PotionHandler._overBuild()
}

let Potion$Namespace = {}
let PotionHandler = {
    /** @deprecated */
    _overBuild() {
        if (this.point$Name == '') return
        let point$Name = this.point$Name
        let effectList = this.effectList
        Potion$Namespace[this.point$Namespace].register(point$Name, () => new $Potion(point$Name, effectList.map(value => new $MobEffectInstance(value.effect, value.duration, value.amplifier))))
        console.log(this.point$Name)
        this.effectList = []
        this.point$Name = ''
        this.point$Namespace = ''
    },
    /**
     * 
     * @param {Internal.MobEffect_} effect 
     * @param {number} time 
     * @param {number} level 
     * @returns 
     */
    addEffect(effect, time, level) {
        this.effectList.push({ effect: effect, duration: time, amplifier: level })
        return this
    },
    /**
     * 
     * @param {string} name 
     */
    create(name) {
        this._overBuild()
        let namespace
        if (name.indexOf(':') == -1) {
            namespace = 'kubejs'
        }
        else {
            namespace = name.slice(0, name.indexOf(':'))
            name = name.slice(name.indexOf(':') + 1)
        }
        if (Potion$Namespace[namespace] == undefined) {
            Potion$Namespace[namespace] = $DeferredRegister["create(net.minecraftforge.registries.IForgeRegistry,java.lang.String)"]($ForgeRegistries.POTIONS, namespace)
            Potion$Namespace[namespace].register($EventBuses.getModEventBus('kubejs').get())
        }
        this.point$Name = name
        this.point$Namespace = namespace
        return this
    },
    effectList: [],
    point$Name: '',
    point$Namespace: '',
}