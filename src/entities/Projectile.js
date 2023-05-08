import { Physics } from "phaser";

export default class Projectile extends Physics.Arcade.Sprite {
  constructor(scene, x, y, direction, name) {
    super(scene, x, y, `projectile-${name}`);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);

    this.setVelocity(direction.x, direction.y);
  }

  move() {}
}
