import Phaser from "phaser";

import Boot from "./scenes/Boot";
import Preloader from "./scenes/Preloader";
import Game from "./scenes/Game";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 550 },
      debug: false,
    },
  },
  scene: [Boot, Preloader, Game],
};

export default new Phaser.Game(config);
