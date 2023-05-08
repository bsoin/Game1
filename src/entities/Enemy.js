import { Physics } from "phaser";

export default class Enemy extends Physics.Arcade.Sprite {
  constructor(scene, type) {
    console.log("-->>", type);
    super(scene, 0, 0, `character-${type}`);

    scene.physics.add.existing(this);
    scene.physics.add.collider(scene.groundLayer, this);

    scene.add.existing(this);

    // this.setCollideWorldBounds(true);
  }
}
