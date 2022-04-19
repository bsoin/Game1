import { Scene } from "phaser";

export default class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    console.debug("Boot.preload");
  }

  create() {
    console.debug("Boot.create");

    this.registry.set("currentMap", "yavin");
    this.registry.set("currentCharacter", "hero");

    this.scene.start("Preloader");
  }
}
