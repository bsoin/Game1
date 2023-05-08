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

    // this.createEnemy("robot", 1000);
    // this.createEnemy("zombie", 1600, 50);

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
    const robots = this.map.createFromObjects("Enemies", {
      name: "robot",
      classType: Robot,
    });

    const zombies = this.map.createFromObjects("Enemies", {
      name: "zombie",
      classType: Zombie,
    });
  }

  createPlayer(name) {
    this.player = new Player(this, 400, 200, name);
    this.physics.add.collider(this.groundLayer, this.player);
  }

  // createEnemy(type, x, y = 200) {
  //   const enemy = new Enemy(this, x, y, type);
  //   this.physics.add.collider(this.groundLayer, enemy);
  //   this.enemies.push(enemy);
  // }

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

  update() {
    this.player.move(this.cursors);
  }
}
