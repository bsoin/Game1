import { Physics } from "phaser";

export default class Player extends Physics.Arcade.Sprite {
  constructor(scene, x, y, name) {
    super(scene, x, y, `character-${name}`);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
  }

  move(cursors) {
    const run = cursors.shift.isDown;
    const velocity = run ? 400 : 200;
    const animation = run ? "run" : "walk";

    // move left/right
    if (cursors.left.isDown) {
      this.body.setVelocityX(-velocity);
      this.anims.play(animation, true);
      this.flipX = true;
    } else if (cursors.right.isDown) {
      this.body.setVelocityX(velocity);
      this.anims.play(animation, true);
      this.flipX = false;
    } else {
      this.body.setVelocityX(0);
      this.anims.play("idle", true);
    }

    // jump
    if (cursors.space.isDown && this.body.onFloor()) {
      this.body.setVelocityY(-400);
    }

    // play jumping and falling animations
    if (!this.body.onFloor()) {
      if (this.body.velocity.y < 0) {
        this.anims.play("jump", true);
      } else {
        this.anims.play("fall", true);
      }
    }
  }
}
