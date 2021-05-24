export class Configuration {
  private static instance: Configuration

  private configs

  // eslint-disable-next-line no-useless-constructor
  private constructor() {}

  public static getInstance(): Configuration {
    if (!Configuration.instance) {
      Configuration.instance = new Configuration()
      // Configuration.instance.load()
    }

    return Configuration.instance
  }

  load(): Configuration {
    try {
      const localConfigs = JSON.parse(localStorage.getItem('configs')) || {}

      this.configs = {
        ...this.configs,
        ...localConfigs
      }

      console.log('loaded new configs', localConfigs)
    } catch (e) {
      console.error(e)
    }

    return this
  }

  add(config: any): Configuration {
    if (config) {
      this.configs = {
        ...this.configs,
        ...config
      }

      localStorage.setItem('configs', JSON.stringify(this.configs))

      console.log('add new config', config, this.configs)
    }

    return this
  }

  update(key: string, newValue: string | number | boolean): Configuration {
    if (this.configs) {
      this.configs[key] = newValue

      console.log('configuration updates', this.configs)

      localStorage.setItem('configs', JSON.stringify(this.configs))
    }

    return this
  }

  get(key: string): string | number | boolean {
    if (!this.configs) {
      return null
    }

    return this.configs[key]
  }

  getAll(): any {
    return this.configs
  }
}
