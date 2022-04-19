import { Physics } from "phaser";

export default class Enemy extends Physics.Arcade.Sprite {
  constructor(scene, x, y, type) {
    super(scene, x, y, `character-${type}`);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
  }
}
