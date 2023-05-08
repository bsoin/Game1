import Enemy from "./Enemy";

export default class Zombie extends Enemy {
  constructor(scene) {
    super(scene, `character-zombie`);
  }
}
