import { Scene } from "phaser";

import Player from "../entities/Player";
import Robot from "../entities/Robot";
import Zombie from "../entities/Zombie";

export default class GameScene extends Scene {
  constructor(config) {
    super({ ...config, key: "Game" });

    this.player;
    this.enemies = [];
  }

  preload() {}

  create() {
    const currentMap = this.registry.get("currentMap");
    const currentCharacter = this.registry.get("currentCharacter");

    this.map = this.make.tilemap({ key: `map-${currentMap}` });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.createGround();
    this.createEnemies();

    this.createPlayer(currentCharacter);
    this.createCamera();
  }

  createGround() {
    const groundTiles = this.map.addTilesetImage(`tiles`);

    this.groundLayer = this.map.createLayer("World", groundTiles, 0, 120);
    this.groundLayer.setCollisionByExclusion([-1]);

    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;
  }

  createEnemies() {
    this.enemies = [
      ...this.map.createFromObjects("Enemies", {
        name: "robot",
        classType: Robot,
        key: "character-robot",
      }),
      ...this.map.createFromObjects("Enemies", {
        name: "zombie",
        classType: Zombie,
        key: "character-zombie",
      }),
    ];
  }

  createPlayer(name) {
    this.player = new Player(this, 400, 200, name);
  }

  createCamera() {
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBackgroundColor("#ccedff");
  }

  update(time, delta) {
    this.player.move(this.cursors);
    this.enemies.forEach((enemy) => enemy.update(time, delta));
  }
}
