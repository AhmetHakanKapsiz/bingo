let tombalaNum = document.body.querySelector(".tombala-num");
//tombalaNum.textContent = "15";
tombalaNum.style.width = window.innerWidth / 10 + "px";
tombalaNum.style.height = window.innerWidth / 10 + "px";
tombalaNum.style.lineHeight = window.innerWidth / 10 - 10 + "px";
tombalaNum.style.fontSize = window.innerWidth / 20 + "px";
tombalaNum.style.display = "";

//document.addEventListener('click', () => window.navigator.vibrate(1000));
const tombalaCell = document.body.querySelector(".tombala-row>div");

let nick = "";
const home = document.body.querySelector("#home");
const homeSpan = document.body.querySelector("#home-span");
const homeButton = document.body.querySelector("#home>button");
const openHostBtn = document.body.querySelector("#options>button:first-child");
const connectHostBtn = document.body.querySelector(
  "#options>button:last-child",
);
const options = document.body.querySelector("#options");
const game = document.body.querySelector("#game");
const previousGame = document.body.querySelector("#previous-game");
const oyunuBaslatBtn = document.body.querySelector("#previous-game>button");
const playersState = document.body.querySelector("#players-state");
const tasCekDiv = document.body.querySelector("#tas-cek");
const tasCekBtn = document.body.querySelector("#tas-cek-btn");
const gordumBtn = document.body.querySelector("#gordum-btn");
const messagesDiv = document.body.querySelector("#messages");
const gameInfo = document.body.querySelector("#messages>div");
options.style.display = "none";
game.style.display = "none";
previousGame.style.display = "none";
tasCekDiv.style.display = "none";
messagesDiv.style.display = "none";

let tombalaTumTaslar = [];
let peer;
let conn;
let conns = [];
let oyuncu = {};
let oyuncular = [];
let kazananlar = [];
let cekilenSayi;
let oyunuBaslat = function () {
  options.style.display = "none";
  game.style.display = "";
  previousGame.style.display = "none";
  tasCekDiv.style.display = "";
  tasCekBtn.style.display = "none";
  messagesDiv.style.display = "";
  tombalaTaslari();
};

let tasCek = function () {
  let rand = Math.floor(Math.random() * tombalaTumTaslar.length);
  let tas = tombalaTumTaslar[rand];
  tombalaTumTaslar.splice(rand, 1);
  return tas;
};

class Tombala {
  constructor() {
    this.tombalaNums = [];
    this.tombalaCikanTaslar = [];
    this.colNums = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.create();
  }

  create() {
    this.colNums.forEach((item, index) => {
      const num = random(index);
      this.tombalaNums.push(num);
    });

    let colNumsLength = this.colNums.length;
    for (let index = 6; index > 0; index--) {
      const randomX = Math.floor(Math.random() * colNumsLength);
      const item = this.colNums[randomX];
      const num = random(item);
      const isExist = this.tombalaNums.includes(num);
      if (isExist) {
        index++;
      } else {
        this.colNums.splice(randomX, 1);
        colNumsLength = this.colNums.length;
        this.tombalaNums.push(num);
      }
    }

    this.tombalaNums.sort((a, b) => a > b ? -1 : 1);
    delete this.colNums;
  }
}

function random(index) {
  return Math.floor(Math.random() * 10) + (index * 10);
}

function tombalaTaslari() {
  for (let index = 0; index < 90; index++) {
    tombalaTumTaslar.push(index);
  }
}

/*
setInterval(function () {
    console.log(tombalaNum.style.left);
}, 0);*/

window.addEventListener("resize", function (e) {
  let cells = this.document.querySelectorAll(".tombala-row>div");
  //console.log(e);
  for (const cell of cells) {
    cell.style.width = window.innerWidth / 10 + "px";
    cell.style.height = window.innerWidth / 10 + "px";
    cell.style.lineHeight = window.innerWidth / 10 + "px";
    cell.style.fontSize = window.innerWidth / 20 + "px";
    /*if(this.window.innerWidth < 400) {
      cell.style.border = "1px solid black";
    }*/
  }
  tombalaNum.style.width = window.innerWidth / 10 + "px";
  tombalaNum.style.height = window.innerWidth / 10 + "px";
  tombalaNum.style.lineHeight = window.innerWidth / 10 - 10 + "px";
  tombalaNum.style.fontSize = window.innerWidth / 20 + "px";
});

let cells = document.body.querySelectorAll(".tombala-row>div");

for (const cell of cells) {
  cell.style.width = window.innerWidth / 10 + "px";
  cell.style.height = window.innerWidth / 10 + "px";
  cell.style.lineHeight = window.innerWidth / 10 + "px";
  cell.style.fontSize = window.innerWidth / 20 + "px";
}

//let tombala = new Tombala();

//let tombalaRows = document.body.querySelectorAll(".tombala-row");

let tombalaOlustur = function (tombala) {
  for (const cell of cells) {
    cell.style.backgroundColor = "#ffffff";
    cell.textContent = "";
  }

  for (let index = 0; index < 9; index++) {
    let rows = [0, 1, 2];
    let altSinir = index * 10;
    let ustSinir = index * 10 + 10;
    let sayilar = tombala.tombalaNums.filter((x) =>
      x >= altSinir && x < ustSinir
    );

    for (let index2 = 0; index2 < sayilar.length; index2++) {
      let x = Math.floor(Math.random() * rows.length);
      let y = document.body.querySelector(
        ".tombala-row:nth-child(" + (rows[x] + 1) + ")" + ">div:nth-child(" +
          (index + 1) + ")",
      );
      y.textContent = sayilar[index2];
      rows.splice(x, 1);
    }
  }

  for (const cell of cells) {
    if (cell.textContent === "") {
      cell.style.backgroundColor = "#3248a8";
    }
  }
};

let tasKoy = function (x) {
  let y = 0;
  for (const cell of cells) {
    if (cell.textContent === x.toString()) {
      let yarimKare = window.innerWidth / 20;
      let tamKare = window.innerWidth / 10;
      let tombalaWidth = window.innerWidth / 100 * 90;
      let tombalaStartPoint = (window.innerWidth - tombalaWidth) / 2;

      // x.style.left = window.innerWidth / 20 + 3 + (window.innerWidth / 20 ) * 8 - (2) * 4  + "px"
      if (y % 9 === 0) {
        tombalaNum.style.left = yarimKare + 3 + "px";
      } else {
        tombalaNum.style.left = yarimKare + 3 + tamKare * (y % 9) -
          2 * (y % 9) + "px";
        if (window.innerWidth < 400) {
          tombalaNum.style.left = yarimKare + 3 + tamKare * (y % 9) + "px";
        }
      }

      // x.style.top = 10 + 3 + (window.innerWidth / 20 ) * 4  + "px"
      if (Math.floor(y / 9) === 0) {
        tombalaNum.style.top = 13 + "px";
      } else {
        tombalaNum.style.top = 13 + tamKare * Math.floor(y / 9) + "px";
      }
      /*tombalaNum.style.left = tombalaStartPoint +
        ((tombalaWidth) / 9) * (y % 9) + (Math.floor(y % 9) * -2) + "px";*/

      //let tombalaHeight = window.innerWidth / 100 * 90;
      //let tombalaEndPoint = (window.innerWidth - tombalaWidth) / 2;

      /*tombalaNum.style.top = 20 +
        ((tombalaWidth) / 9) * Math.floor(y / 9) + "px";*/
    }
    y++;
  }
};
/*
window.addEventListener("click", function (e) {
  console.log(e);
  tombalaNum.style.display = "block";
  let deger = tombala.tombalaNums[Math.floor(Math.random() * tombala.tombalaNums.length)];
  this.tasKoy(deger);
  console.log(deger);
});
*/

let kazananKontrol = function () {
  for (const oyuncu of oyuncular) {
    if (
      oyuncu.tombala.tombalaCikanTaslar.length ===
        oyuncu.tombala.tombalaNums.length &&
      !kazananlar.includes(oyuncu.id)
    ) {
      let str;
      if (kazananlar.length === 0) {
        str = oyuncu.nick + ": TOMBALA!\n " + oyuncu.nick + " 1. OLDU!";
      } else {
        str = oyuncu.nick + ": TOMBALA!";
      }
      kazananlar.push(oyuncu.id);
      let message = document.createElement("p");
      message.textContent = str;
      gameInfo.appendChild(message);
      for (const conn of conns) {
        conn.send({
          type: "kazananBildirimi",
          message: str,
        });
      }
    }
  }

  if (tombalaTumTaslar.length === 0) {
    previousGame.style.display = "block";
  }
};

homeButton.addEventListener("click", function () {
  const input = document.body.querySelector("#home>input");
  nick = input.value;
  input.value = "";
  home.style.display = "none";
  options.style.display = "";
  game.style.display = "none";
  previousGame.style.display = "none";
});

openHostBtn.addEventListener("click", async function (e) {
  const obj = await fetch("/getHost").then((response) => response.json());
  if (obj.host === null) {
    peer = new Peer(
      "" + Math.floor(Math.random() * 2 ** 18).toString(36).padStart(4, 0),
      {
        host: location.hostname,
        debug: 1,
        port: 9000,
        path: "/conn",
      },
    );

    window.peer = peer;

    peer.on("open", async (id) => {
      let result = await postData("/openHost", { host: id });
      if (result) {
        home.style.display = "none";
        options.style.display = "none";
        game.style.display = "none";
        previousGame.style.display = "";
        oyuncu = {
          id: 1,
          nick: nick,
          tombala: {},
          conn: null,
        };
        oyuncular.push(oyuncu);
      } else {
        alert("Ana Bilgisayar Bir Sebepten Dolayı Açılamadı.");
      }
    });

    peer.on("connection", function (connection) {
      console.log("Bağlantı");
      conns.push(connection);

      connection.on("open", () => {
        connection.on("data", (data) => {
          if (data.type === "ilkGiris") {
            const p = document.createElement("p");
            p.textContent = data.message;
            playersState.appendChild(p);
            for (const item of conns) {
              item.send(data);
            }
            let oyuncuIdler = [];
            for (const oyuncu of oyuncular) {
              oyuncuIdler.push(oyuncu.id);
            }
            let max = Math.max(...oyuncuIdler) + 1;
            let xOyuncu = {
              id: max,
              nick: data.nick,
              tombala: {},
              conn: null,
            };
            //oyuncular.push(...xOyuncu);
            connection.send({
              type: "ilkGirisOyuncuBildirimi",
              oyuncu: xOyuncu,
            });
            xOyuncu.conn = connection;
            oyuncular.push(xOyuncu);
            //connection.send("sa");
          } else if (data.type === "tasBende") {
            let xOyuncu = oyuncular.find((x) => x.id === data.oyuncuId);
            if (
              xOyuncu.tombala.tombalaNums.findIndex((x) => x === data.sayi) > -1
            ) {
              xOyuncu.tombala.tombalaCikanTaslar.push(data.sayi);
            }
            kazananKontrol();
          }
        });
      });
    });
  } else {
    alert(
      "Halihazırda açık bir ana bilgisayar var." +
        " Bir Ana Bilgisayar'a Bağlan butonuna tıklayarak bağlanabilirsin",
    );
  }
});

connectHostBtn.addEventListener("click", async function (e) {
  const obj = await fetch("/getHost").then((response) => response.json());
  if (obj.host === null) {
    alert("Açık bir ana bilgisayar yok");
  } else {
    console.log(obj);
    peer = new Peer(
      "" + Math.floor(Math.random() * 2 ** 18).toString(36).padStart(4, 0),
      {
        host: location.hostname,
        debug: 1,
        port: 9000,
        path: "/conn",
      },
    );

    window.peer = peer;

    peer.on("open", (id) => {
      //alert("Numaran: " + id);
      conn = peer.connect(obj.host);

      conn.on("open", () => {
        options.style.display = "none";
        game.style.display = "none";
        previousGame.style.display = "";
        messagesDiv.style.display = "none";
        oyunuBaslatBtn.style.display = "none";

        //conn.send(nick + " oyuncusu oyuna giriş yaptı");
        conn.send({
          type: "ilkGiris",
          nick: nick,
          message: nick + " oyuncusu oyuna giriş yaptı",
        });
        conn.on("data", function (data) {
          if (data.type === "ilkGiris") {
            const p = document.createElement("p");
            p.textContent = data.message;
            playersState.appendChild(p);
          } else if (data.type === "func") {
            eval(data.name + "();");
            oyuncu.tombala = data.tombala;
            tombalaOlustur(data.tombala);
          } else if (data.type === "tasCekme") {
            cekilenSayi = data.sayi;
            tasGeldi();
          } else if (data.type === "ilkGirisOyuncuBildirimi") {
            data.oyuncu.conn = conn;
            oyuncu = data.oyuncu;
          } else if (data.type === "countdown") {
            let countdownh1 = document.querySelector("#tas-cek>h1");
            countdownh1.textContent = data.countdown;
            countdown = data.countdown;
            if (countdown === 0 && tombalaNum.isPlaced !== true) {
              tombalaNum.style.display = "none";
            }
          } else if (data.type === "kazananBildirimi") {
            let message = document.createElement("p");
            message.textContent = data.message;
            gameInfo.appendChild(message);
          }
        });
      });
    });
    /*
    peer.on("connection", (connection) => {
      options.style.display = "none";
      game.style.display = "none";
      previousGame.style.display = "";
      messagesDiv.style.display = "none";
    });*/
  }
});

oyunuBaslatBtn.addEventListener("click", function () {
  oyunuBaslat();
  tasCekBtn.style.display = "";

  for (const oyuncu of oyuncular) {
    oyuncu.tombala = new Tombala();
  }
  tombalaOlustur(oyuncular[0].tombala);

  for (const conn of conns) {
    let tombala = oyuncular.find((x) => x.conn === conn).tombala;
    conn.send({ type: "func", name: "oyunuBaslat", tombala: tombala });
  }
});

let tasGeldi = function () {
  let zIndex = tombalaNum.style.zIndex;
  tombalaNum = document.createElement("div");
  tombalaNum.classList.add("tombala-num");
  game.prepend(tombalaNum);
  tombalaNum.style.width = window.innerWidth / 10 + "px";
  tombalaNum.style.height = window.innerWidth / 10 + "px";
  tombalaNum.style.lineHeight = window.innerWidth / 10 - 10 + "px";
  tombalaNum.style.fontSize = window.innerWidth / 20 + "px";
  tombalaNum.style.display = "block";
  tombalaNum.style.zIndex = Number(zIndex) + 1;
  tombalaNum.style.left = window.innerWidth / 2 + 50 + "px";
  tombalaNum.style.top = window.innerHeight / 3 + "px";
  tombalaNum.textContent = cekilenSayi;
};

let countdown = 6;
let timeClearX;
let timeClearY;
let timeFuncX = function () {
  timeClearX = setTimeout(() => {
    clearInterval(timeClearY);
  }, 5000);
};

let timeFuncY = function () {
  timeClearY = setInterval(() => {
    countdown--;
    let countdownh1 = document.querySelector("#tas-cek>h1");
    countdownh1.textContent = countdown;
    for (const conn of conns) {
      conn.send({
        type: "countdown",
        countdown: countdown,
      });
    }
    if (countdown === 0) {
      clearInterval(timeClearY);
      if (tombalaNum.isPlaced !== true) {
        tombalaNum.style.display = "none";
      }
      //tombalaNum.style.display = "none";
      countdown = 6;
    }
  }, 1000);
};

tasCekBtn.addEventListener("click", function () {
  if (countdown === 6) {
    let rand = Math.floor(Math.random() * tombalaTumTaslar.length);
    cekilenSayi = tombalaTumTaslar[rand];
    for (const oyuncu of oyuncular) {
      if (oyuncu.id !== 1) {
        oyuncu.conn.send({
          type: "tasCekme",
          sayi: cekilenSayi,
          oyuncuId: oyuncu.id,
        });
      }
    }
    tasGeldi();
    tombalaTumTaslar.splice(rand, 1);
    if (tombalaTumTaslar.length === 0) {
      tasCekBtn.style.display = "none";
    }
    timeFuncY();
  } else {
    alert("Gerisayım bitmeden taş çekemezsin!");
  }
});

gordumBtn.addEventListener("click", function () {
  /*for (const oyuncu of oyuncular) {
    if (oyuncu.id === 1 && oyuncu.tombala.tombalaNums.includes(cekilenSayi)) {
      tasKoy(cekilenSayi);
    }
  }*/

  if (countdown !== 0) {
    if (oyuncu.tombala.tombalaNums.findIndex((x) => x === cekilenSayi) > -1) {
      tombalaNum.isPlaced = true;
      tasKoy(cekilenSayi);

      if (oyuncu.id !== 1) {
        conn.send({
          oyuncuId: oyuncu.id,
          type: "tasBende",
          sayi: cekilenSayi,
        });
      } else {
        oyuncu.tombala.tombalaCikanTaslar.push(cekilenSayi);
        kazananKontrol();
      }
    } else {
      alert(tombalaNum.textContent + " sayısı sende yok");
      //tombalaNum.style.display = "none";
    }
  } else {
    alert("Maalesef geri sayım doldu!");
  }

  if (countdown === 6) {
    alert("Maalesef geri sayım doldu!");
  }
});

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  });
  console.log(data);
  return response.json(); // parses JSON response into native JavaScript objects
}
