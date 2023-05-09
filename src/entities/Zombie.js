import Enemy from "./Enemy";

export default class Zombie extends Enemy {
  WALK_VELOCITY = 100;

  constructor(scene) {
    super(scene, "zombie");
  }
}
