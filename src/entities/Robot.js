import Enemy from "./Enemy";

export default class Robot extends Enemy {
  WALK_VELOCITY = 150;

  constructor(scene) {
    super(scene, "robot");
  }
}
