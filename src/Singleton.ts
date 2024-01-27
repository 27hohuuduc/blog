export default class Singleton {

    private static instances: Map<string, object> = new Map()

    public static getInstance<T extends object>(type: { new(): T }): T {
        let instance = Singleton.instances.get(type.name)
        if (!instance) {
            instance = new type()
            Singleton.instances.set(type.name, instance)
        }
        return instance as T
    }

}