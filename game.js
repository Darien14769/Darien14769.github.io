const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: "game",
  backgroundColor: "#900",
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.spritesheet("perro-spritesheet-run", "./Fox_Fox_run.png", {
    frameWidth: 750,
    frameHeiht: 750,
  });
  this.load.spritesheet("perro-spritesheet-idle", "./Fox_Fox_Idle01.png", {
    frameWidth: 750,
    frameHeiht: 750,
  });
}

function create() {
  this.perroCorriendo = this.add.sprite(300, 400, "perro-spritesheet-run");

  this.anims.create({
    key: "perro-run",
    frames: this.anims.generateFrameNumbers("perro-spritesheet-run", {
      start: 0,
      end: 24,
    }),
    frameRate: 40,
    repeat: -1,
  });

  this.anims.create({
    key: "perro-idle",
    frames: this.anims.generateFrameNumbers("perro-spritesheet-idle", {
      start: 24,
      end: 1,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.add
    .rectangle(400, 200, 700, 150, 0x000000, 0.8)
    .setStrokeStyle(2, 0xffffff);

  this.add.text(130, 200, "¡Bienvenido al juego, jugador!", {
    fontFamily: "Arial",
    fontSize: "20px",
    color: "#ffffff",
    wordWrap: { width: 500 },
  });

  const boton = this.add
    .text(650, 250, "Continuar", {
      fontFamily: "Arial",
      fontSize: "18px",
      color: "#00ff00",
      backgroundColor: "#222222",
      padding: { x: 10, y: 5 },
    })
    .setInteractive();

  boton.on("pointerdown", () => {
    console.log("click");
  });

  this.keys = this.input.keyboard.createCursorKeys();

  this.sound.context.suspend().then(() => {
    console.log("Audio suspendido manualmente al inicio");
  });
  
}
let reposo = true;
function update() {
  if (reposo == true) {
    this.perroCorriendo.anims.play("perro-idle", true);
  }
  if (this.keys.left.isDown) {
    this.perroCorriendo.anims.play("perro-run", true);
    reposo = false;
  }
  if (this.keys.left.isUp) {
    reposo = true;
  }

  console.log(reposo);
}

// if (this.keys.left.isDown) {
//   this.perroCorriendo.anims.play("perro-run", true);
// } else if (this.keys.left.isUp) {
//   this.perroCorriendo.anims.play("perro-idle", false);
// }
// if (this.perroCorriendo.anims.currentAnim?.key !== "perro-run") {
//   this.perroCorriendo.anims.play("perro-idle", true);
// }
