import { Scene } from "phaser";

export default class GameScene extends Scene {
  constructor(config) {
    super({ ...config, key: "Game" });

    this.player = undefined;
  }

  preload() {}

  create() {
    const currentMap = this.registry.get("currentMap");
    const currentCharacter = this.registry.get("currentCharacter");

    this.map = this.make.tilemap({ key: `map-${currentMap}` });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.createGround(currentMap);
    this.createPlayer(currentCharacter);
    this.createCamera();
  }

  createGround(name) {
    const groundTiles = this.map.addTilesetImage(`tiles`);

    this.groundLayer = this.map.createLayer("World", groundTiles, 0, 120);
    this.groundLayer.setCollisionByExclusion([-1]);

    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;
  }

  createPlayer(name) {
    console.log(name);
    this.player = this.physics.add.sprite(400, 200, `character-${name}`);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.groundLayer, this.player);
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

  update() {
    const run = this.cursors.shift.isDown;
    const velocity = run ? 400 : 200;
    const animation = run ? "run" : "walk";

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-velocity);
      this.player.anims.play(animation, true);
      this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(velocity);
      this.player.anims.play(animation, true);
      this.player.flipX = false;
    } else {
      this.player.body.setVelocityX(0);
      this.player.anims.play("idle", true);
    }

    if (this.cursors.space.isDown && this.player.body.onFloor()) {
      this.player.body.setVelocityY(-400);
    }

    if (!this.player.body.onFloor()) {
      if (this.player.body.velocity.y < 0) {
        this.player.anims.play("jump", true);
      } else {
        this.player.anims.play("fall", true);
      }
    }
  }
}
