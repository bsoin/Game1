import { Scene } from "phaser";

export default class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    console.debug("Preloader.preload");

    this.preloadMap("yavin");
    // this.preloadMap("hoth2");

    this.preloadCharacter("hero");
    this.preloadCharacter("robot");
    this.preloadCharacter("zombie");
  }

  preloadMap(name) {
    this.load.tilemapTiledJSON(`map-${name}`, `assets/maps/${name}/map.json`);

    this.load.spritesheet(`tiles`, `assets/maps/${name}/tiles.png`, {
      frameWidth: 70,
      frameHeight: 70,
    });
  }

  preloadCharacter(name) {
    this.load.atlasXML(
      `character-${name}`,
      `assets/characters/${name}/sprites.png`,
      `assets/characters/${name}/sheet.xml`
    );
  }

  create() {
    console.debug("Preloader.create");

    this.createAnimations("hero");
    this.createAnimations("robot");
    this.createAnimations("zombie");

    this.scene.start("Game");
  }

  createAnimations(name) {
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNames(`character-${name}`, {
        prefix: "walk",
        start: 0,
        end: 7,
        zeroPad: 0,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNames(`character-${name}`, {
        prefix: "run",
        start: 0,
        end: 2,
        zeroPad: 0,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "idle",
      frames: [{ key: `character-${name}`, frame: "idle" }],
      frameRate: 1,
    });

    this.anims.create({
      key: "jump",
      frames: [{ key: `character-${name}`, frame: "jump" }],
      frameRate: 1,
    });

    this.anims.create({
      key: "fall",
      frames: [{ key: `character-${name}`, frame: "fall" }],
      frameRate: 1,
    });
  }
}
