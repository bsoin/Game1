import { Physics } from "phaser";

const IDLE_MODE = "idle";
const WALKING_MODE = "walking";

export default class Enemy extends Physics.Arcade.Sprite {
  WALK_VELOCITY = 100;

  constructor(scene, type) {
    super(scene, 0, 0, type);

    this.type = type;
    this.mode = IDLE_MODE;

    scene.add.existing(this);

    scene.physics.add.existing(this);
    scene.physics.add.collider(scene.groundLayer, this);

    // this.setCollideWorldBounds(true);
  }

  get walking() {
    return this.mode === WALKING_MODE;
  }

  update(time, delta) {
    this.setBodySize(70, 128);

    if (
      (this.body.blocked.down && !this.walking) ||
      (this.body.blocked.left && this.walking)
    ) {
      this.walk(1);
    }

    if (this.body.blocked.right && this.walking) {
      this.walk(-1);
    }

    if (!this.isNextGroundTileCollidable()) {
      this.turnAround();
    }
  }

  walk(direction) {
    this.mode = WALKING_MODE;

    this.body.setVelocityX(this.WALK_VELOCITY * direction);
    this.anims.play(`${this.type}-walk`, true);
    this.flipX = direction > 0 ? false : true;
  }

  turnAround() {
    this.setVelocityX(-this.body.velocity.x);
    this.flipX = !this.flipX;
  }

  isNextGroundTileCollidable() {
    return this.scene.map.getTileAtWorldXY(
      this.x + (this.flipX ? -30 : 30),
      this.y + this.height / 2 + 35
    )?.collideUp;
  }
}
