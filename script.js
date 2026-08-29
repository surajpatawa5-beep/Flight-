// ==========================================
// VARANASI AIR
// STEP 4
// ==========================================


// ==========================================
// SCENE
// ==========================================

const scene =
new THREE.Scene();

scene.background =
new THREE.Color(0x79c9ee);

scene.fog =
new THREE.Fog(
  0x79c9ee,
  700,
  7000
);


// ==========================================
// CAMERA
// ==========================================

const camera =
new THREE.PerspectiveCamera(
  65,
  innerWidth / innerHeight,
  .1,
  15000
);

camera.position.set(
  -40,
  18,
  30
);


// ==========================================
// RENDERER
// ==========================================

const renderer =
new THREE.WebGLRenderer({
  antialias:true
});

renderer.setSize(
  innerWidth,
  innerHeight
);

renderer.setPixelRatio(
  Math.min(
    devicePixelRatio,
    2
  )
);

document
.getElementById("game")
.appendChild(
  renderer.domElement
);


// ==========================================
// LIGHT
// ==========================================

scene.add(
new THREE.HemisphereLight(
  0xffffff,
  0x555555,
  1.6
)
);

const sun =
new THREE.DirectionalLight(
  0xffffff,
  2
);

sun.position.set(
  1000,
  1500,
  800
);

scene.add(sun);


// ==========================================
// GROUND
// ==========================================

const ground =
new THREE.Mesh(

  new THREE.PlaneGeometry(
    8000,
    8000
  ),

  new THREE.MeshStandardMaterial({
    color:0x508c48
  })

);

ground.rotation.x =
-Math.PI/2;

scene.add(ground);


// ==========================================
// GANGA
// ==========================================

const river =
new THREE.Mesh(

  new THREE.PlaneGeometry(
    900,
    8000
  ),

  new THREE.MeshStandardMaterial({
    color:0x1677c8,

    transparent:true,

    opacity:.88
  })

);

river.rotation.x =
-Math.PI/2;

river.position.set(
  -650,
  .04,
  0
);

scene.add(river);


// ==========================================
// GHATS
// ==========================================

function createGhat(
  x,
  z
){

  for(
    let i=0;
    i<8;
    i++
  ){

    const step =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        80,
        2,
        20
      ),

      new THREE.MeshStandardMaterial({
        color:0xb88655
      })

    );

    step.position.set(
      x,
      i,
      z+i*20
    );

    scene.add(step);
  }
}

createGhat(
  -250,
  300
);

createGhat(
  -250,
  -200
);


// ==========================================
// RUNWAY
// ==========================================

const runway =
new THREE.Mesh(

  new THREE.BoxGeometry(
    45,
    .35,
    1200
  ),

  new THREE.MeshStandardMaterial({
    color:0x303030
  })

);

runway.position.y=.17;

scene.add(runway);


// ==========================================
// RUNWAY LIGHTS
// ==========================================

for(
  let z=-580;
  z<=580;
  z+=40
){

  const light =
  new THREE.Mesh(

    new THREE.SphereGeometry(
      .7,
      8,
      8
    ),

    new THREE.MeshBasicMaterial({
      color:0xffffaa
    })

  );

  light.position.set(
    -24,
    1,
    z
  );

  scene.add(light);


  const light2 =
  light.clone();

  light2.position.x=24;

  scene.add(light2);
}


// ==========================================
// RUNWAY MARKINGS
// ==========================================

for(
  let z=-570;
  z<570;
  z+=45
){

  const mark =
  new THREE.Mesh(

    new THREE.BoxGeometry(
      3,
      .4,
      22
    ),

    new THREE.MeshBasicMaterial({
      color:0xffffff
    })

  );

  mark.position.set(
    0,
    .4,
    z
  );

  scene.add(mark);
}


// ==========================================
// AIRPORTS
// ==========================================

const airports = [

  {
    name:
    "Varanasi Airport",

    x:0,
    z:430
  },

  {
    name:
    "Ayodhya Airport",

    x:900,
    z:-900
  },

  {
    name:
    "Prayagraj Airport",

    x:-1100,
    z:900
  }

];


// ==========================================
// AIRPORT BUILDING
// ==========================================

function createAirport(
  data
){

  const group =
  new THREE.Group();


  const building =
  new THREE.Mesh(

    new THREE.BoxGeometry(
      150,
      35,
      90
    ),

    new THREE.MeshStandardMaterial({
      color:0xd9d9d9
    })

  );

  building.position.y=17.5;

  group.add(building);


  const glass =
  new THREE.Mesh(

    new THREE.BoxGeometry(
      125,
      20,
      2
    ),

    new THREE.MeshStandardMaterial({
      color:0x49b9e8
    })

  );

  glass.position.set(
    0,
    18,
    46
  );

  group.add(glass);


  const roof =
  new THREE.Mesh(

    new THREE.BoxGeometry(
      165,
      5,
      100
    ),

    new THREE.MeshStandardMaterial({
      color:0x444444
    })

  );

  roof.position.y=38;

  group.add(roof);


  group.position.set(
    data.x,
    0,
    data.z
  );

  scene.add(group);
}


airports.forEach(
  createAirport
);


// ==========================================
// CITY BUILDINGS
// ==========================================

function createBuilding(
  x,
  z
){

  const height =
  8 +
  Math.random()*45;

  const size =
  12 +
  Math.random()*18;


  const building =
  new THREE.Mesh(

    new THREE.BoxGeometry(
      size,
      height,
      size
    ),

    new THREE.MeshStandardMaterial({
      color:
      new THREE.Color(
        .4+
        Math.random()*.25,

        .3+
        Math.random()*.2,

        .18
      )
    })

  );


  building.position.set(
    x,
    height/2,
    z
  );

  scene.add(building);
}


for(
  let i=0;
  i<350;
  i++
){

  const x =
  (Math.random()-.5)*3500;

  const z =
  (Math.random()-.5)*3500;


  if(
    Math.abs(x)<160 &&
    Math.abs(z)<650
  ){

    continue;
  }


  createBuilding(
    x,
    z
  );
}


// ==========================================
// TREES
// ==========================================

function createTree(
  x,
  z
){

  const trunk =
  new THREE.Mesh(

    new THREE.CylinderGeometry(
      1,
      1,
      8,
      8
    ),

    new THREE.MeshStandardMaterial({
      color:0x654321
    })

  );

  trunk.position.set(
    x,
    4,
    z
  );

  scene.add(trunk);


  const leaves =
  new THREE.Mesh(

    new THREE.SphereGeometry(
      5,
      10,
      10
    ),

    new THREE.MeshStandardMaterial({
      color:0x277a35
    })

  );

  leaves.position.set(
    x,
    10,
    z
  );

  scene.add(leaves);
}


for(
  let i=0;
  i<150;
  i++
){

  const x =
  (Math.random()-.5)*3000;

  const z =
  (Math.random()-.5)*3000;


  createTree(
    x,
    z
  );
}


// ==========================================
// CLOUDS
// ==========================================

function createCloud(
  x,
  y,
  z
){

  const cloud =
  new THREE.Group();


  for(
    let i=0;
    i<5;
    i++
  ){

    const part =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        15+
        Math.random()*10,
        12,
        12
      ),

      new THREE.MeshStandardMaterial({
        color:0xffffff
      })

    );


    part.position.x =
    i*18;


    cloud.add(part);
  }


  cloud.position.set(
    x,
    y,
    z
  );


  scene.add(cloud);
}


for(
  let i=0;
  i<20;
  i++
){

  createCloud(
    (Math.random()-.5)*5000,
    300+
    Math.random()*300,
    (Math.random()-.5)*5000
  );
}


// ==========================================
// PLANE
// ==========================================

const plane =
new THREE.Group();


// BODY

const body =
new THREE.Mesh(

  new THREE.CylinderGeometry(
    1.8,
    1.8,
    13,
    24
  ),

  new THREE.MeshStandardMaterial({
    color:0xf5f5f5
  })

);

body.rotation.z =
Math.PI/2;

plane.add(body);


// NOSE

const nose =
new THREE.Mesh(

  new THREE.ConeGeometry(
    1.8,
    3.5,
    24
  ),

  new THREE.MeshStandardMaterial({
    color:0xe53935
  })

);

nose.rotation.z =
-Math.PI/2;

nose.position.x=8;

plane.add(nose);


// WINGS

const wings =
new THREE.Mesh(

  new THREE.BoxGeometry(
    2,
    .35,
    24
  ),

  new THREE.MeshStandardMaterial({
    color:0xffffff
  })

);

plane.add(wings);


// TAIL

const tail =
new THREE.Mesh(

  new THREE.BoxGeometry(
    3,
    .3,
    8
  ),

  new THREE.MeshStandardMaterial({
    color:0xffffff
  })

);

tail.position.x=-5;

plane.add(tail);


// VERTICAL TAIL

const vtail =
new THREE.Mesh(

  new THREE.BoxGeometry(
    3,
    4,
    .4
  ),

  new THREE.MeshStandardMaterial({
    color:0xe53935
  })

);

vtail.position.set(
  -5,
  2,
  0
);

plane.add(vtail);


// ENGINES

function createEngine(z){

  const engine =
  new THREE.Mesh(

    new THREE.CylinderGeometry(
      .7,
      .7,
      4,
      16
    ),

    new THREE.MeshStandardMaterial({
      color:0x555555
    })

  );

  engine.rotation.z=
  Math.PI/2;

  engine.position.set(
    2,
    -.6,
    z
  );

  plane.add(engine);
}

createEngine(5);
createEngine(-5);


// LANDING GEAR

const landingGear =
new THREE.Group();


function wheel(
  x,
  z
){

  const leg =
  new THREE.Mesh(

    new THREE.BoxGeometry(
      .3,
      2,
      .3
    ),

    new THREE.MeshStandardMaterial({
      color:0x444444
    })

  );

  leg.position.set(
    x,
    -2,
    z
  );

  landingGear.add(leg);


  const tire =
  new THREE.Mesh(

    new THREE.TorusGeometry(
      .65,
      .18,
      8,
      16
    ),

    new THREE.MeshStandardMaterial({
      color:0x111111
    })

  );

  tire.rotation.y=
  Math.PI/2;

  tire.position.set(
    x,
    -3,
    z
  );

  landingGear.add(tire);
}


wheel(2,4);
wheel(2,-4);
wheel(-4,0);

plane.add(
  landingGear
);


// COCKPIT

const cockpit =
new THREE.Mesh(

  new THREE.SphereGeometry(
    1.5,
    16,
    16
  ),

  new THREE.MeshStandardMaterial({
    color:0x174d66,

    transparent:true,

    opacity:.75
  })

);

cockpit.scale.set(
  1.5,
  .7,
  1.2
);

cockpit.position.set(
  4,
  1,
  0
);

plane.add(cockpit);


// START

plane.position.set(
  0,
  2,
  430
);

plane.rotation.y=
Math.PI;

scene.add(plane);


// ==========================================
// GAME DATA
// ==========================================

let speed=0;

let fuel=100;

let money=0;

let passengers=0;

let gearDown=true;

let cameraMode=0;

let missionStage=0;

let destinationIndex=0;

let mission=
"Airport पर passengers लेने जाएँ";


let left=false;
let right=false;
let up=false;
let down=false;
let throttle=false;


// ==========================================
// CONTROLS
// ==========================================

function holdButton(
  id,
  callback
){

  const button =
  document.getElementById(id);


  button.addEventListener(
    "touchstart",
    e=>{
      e.preventDefault();
      callback(true);
    },
    {passive:false}
  );


  button.addEventListener(
    "touchend",
    e=>{
      e.preventDefault();
      callback(false);
    },
    {passive:false}
  );


  button.addEventListener(
    "mousedown",
    ()=>{
      callback(true);
    }
  );


  button.addEventListener(
    "mouseup",
    ()=>{
      callback(false);
    }
  );
}


holdButton(
  "left",
  v=>left=v
);

holdButton(
  "right",
  v=>right=v
);

holdButton(
  "up",
  v=>up=v
);

holdButton(
  "down",
  v=>down=v
);

holdButton(
  "throttle",
  v=>throttle=v
);


// ==========================================
// BRAKE
// ==========================================

function brake(){

  speed-=25;

  if(speed<0)
    speed=0;
}


document
.getElementById("brake")
.addEventListener(
  "touchstart",
  e=>{
    e.preventDefault();
    brake();
  },
  {passive:false}
);

document
.getElementById("brake")
.addEventListener(
  "mousedown",
  brake
);


// ==========================================
// GEAR
// ==========================================

function toggleGear(){

  gearDown=
  !gearDown;

  landingGear.visible=
  gearDown;

  document.getElementById(
    "gear"
  ).innerText=
  gearDown ?
  "DOWN" :
  "UP";

  showMessage(
    gearDown ?
    "🛞 Landing Gear DOWN" :
    "🛞 Landing Gear UP"
  );
}


document
.getElementById("gearBtn")
.addEventListener(
  "click",
  toggleGear
);


// ==========================================
// CAMERA
// ==========================================

document
.getElementById("cameraBtn")
.addEventListener(
  "click",
  ()=>{

    cameraMode++;

    if(cameraMode>2)
      cameraMode=0;

    const names=[
      "Outside Camera",
      "Chase Camera",
      "Cockpit Camera"
    ];

    showMessage(
      "🎥 "+
      names[cameraMode]
    );
  }
);


// ==========================================
// DESTINATION
// ==========================================

document
.getElementById("destinationBtn")
.addEventListener(
  "click",
  ()=>{

    destinationIndex++;

    if(
      destinationIndex>=
      airports.length
    ){

      destinationIndex=0;
    }


    document.getElementById(
      "destination"
    ).innerText=
    airports[
      destinationIndex
    ].name;


    showMessage(
      "📍 Destination:\n"+
      airports[
        destinationIndex
      ].name
    );
  }
);


// ==========================================
// MESSAGE
// ==========================================

function showMessage(
  text
){

  const box =
  document.getElementById(
    "message"
  );

  box.innerText=text;

  box.style.display=
  "block";


  clearTimeout(
    window.msgTimer
  );


  window.msgTimer=
  setTimeout(
    ()=>{
      box.style.display=
      "none";
    },
    2500
  );
}


// ==========================================
// PASSENGERS
// ==========================================

function checkPassengers(){

  const airport =
  airports[0];


  const distance =
  plane.position.distanceTo(
    new THREE.Vector3(
      airport.x,
      2,
      airport.z
    )
  );


  if(

    missionStage===0 &&

    distance<180 &&

    speed<25 &&

    plane.position.y<10 &&

    gearDown

  ){

    passengers=20;

    money+=1000;

    missionStage=1;

    mission=
    "Passengers लेकर उड़ें";

    showMessage(
      "🧑‍🤝‍🧑 20 Passengers Boarded!\n"+
      "💰 +₹1000"
    );
  }
}


// ==========================================
// DESTINATION LANDING
// ==========================================

function checkDestinationLanding(){

  if(
    missionStage!==1
  )
    return;


  const target =
  airports[
    destinationIndex
  ];


  const distance =
  plane.position.distanceTo(
    new THREE.Vector3(
      target.x,
      plane.position.y,
      target.z
    )
  );


  if(
    distance<180 &&

    plane.position.y<12 &&

    speed<50 &&

    gearDown
  ){

    money+=3000;

    passengers=0;

    missionStage=2;

    mission=
    "Flight Complete!";


    showMessage(
      "🛬 PERFECT LANDING!\n"+
      "🧑‍🤝‍🧑 Passengers उतर गए\n"+
      "💰 +₹3000"
    );
  }
}


// ==========================================
// FUEL
// ==========================================

function updateFuel(){

  if(throttle){

    fuel-=.018;
  }


  if(fuel<0){

    fuel=0;

    speed-=.4;

    if(speed<0)
      speed=0;
  }


  if(
    fuel<20 &&
    fuel>0 &&
    Math.random()<.008
  ){

    showMessage(
      "⚠️ LOW FUEL!"
    );
  }
}


// ==========================================
// STEERING
// ==========================================

function steering(){

  if(left){

    plane.rotation.y+=.025;

    plane.rotation.z+=.025;
  }


  if(right){

    plane.rotation.y-=.025;

    plane.rotation.z-=.025;
  }


  if(up){

    plane.rotation.x-=.018;
  }


  if(down){

    plane.rotation.x+=.018;
  }
}


// ==========================================
// PLANE MOVEMENT
// ==========================================

function movePlane(){

  const direction =
  new THREE.Vector3(
    1,
    0,
    0
  );


  direction.applyQuaternion(
    plane.quaternion
  );


  direction.normalize();


  plane.position.add(
    direction.multiplyScalar(
      speed*.015
    )
  );
}


// ==========================================
// TAKEOFF
// ==========================================

function takeoff(){

  if(
    speed>90 &&
    plane.position.y<20 &&
    !up
  ){

    plane.position.y+=.12;
  }
}


// ==========================================
// CAMERA FOLLOW
// ==========================================

function updateCamera(){

  let offset;


  if(cameraMode===0){

    offset=
    new THREE.Vector3(
      -40,
      18,
      0
    );

  }


  if(cameraMode===1){

    offset=
    new THREE.Vector3(
      -25,
      9,
      15
    );

  }


  if(cameraMode===2){

    offset=
    new THREE.Vector3(
      5,
      1,
      0
    );

  }


  offset.applyQuaternion(
    plane.quaternion
  );


  const target =
  plane.position
  .clone()
  .add(offset);


  camera.position.lerp(
    target,
    .09
  );


  if(cameraMode===2){

    const look =
    new THREE.Vector3(
      45,
      1,
      0
    );


    look.applyQuaternion(
      plane.quaternion
    );


    look.add(
      plane.position
    );


    camera.lookAt(
      look
    );

  }else{

    camera.lookAt(
      plane.position
    );
  }
}


// ==========================================
// MINIMAP
// ==========================================

function updateMap(){

  const dot =
  document.getElementById(
    "playerDot"
  );


  const scale=.035;


  let x =
  60 +
  plane.position.x*scale;


  let z =
  60 +
  plane.position.z*scale;


  x=Math.max(
    5,
    Math.min(
      120,
      x
    )
  );


  z=Math.max(
    5,
    Math.min(
      120,
      z
    )
  );


  dot.style.left=
  x+"px";


  dot.style.top=
  z+"px";
}


// ==========================================
// HUD
// ==========================================

function updateHUD(){

  document.getElementById(
    "speed"
  ).innerText=
  Math.round(speed);


  document.getElementById(
    "altitude"
  ).innerText=
  Math.round(
    Math.max(
      0,
      plane.position.y
    )
  );


  document.getElementById(
    "fuel"
  ).innerText=
  Math.round(fuel);


  document.getElementById(
    "passengers"
  ).innerText=
  passengers;


  document.getElementById(
    "money"
  ).innerText=
  money;


  document.getElementById(
    "mission"
  ).innerText=
  mission;
}


// ==========================================
// KEYBOARD
// ==========================================

document.addEventListener(
  "keydown",
  e=>{

    if(e.key==="ArrowLeft")
      left=true;

    if(e.key==="ArrowRight")
      right=true;

    if(e.key==="ArrowUp")
      up=true;

    if(e.key==="ArrowDown")
      down=true;

    if(e.key===" ")
      throttle=true;

    if(
      e.key.toLowerCase()==="g"
    )
      toggleGear();

    if(
      e.key.toLowerCase()==="c"
    ){

      cameraMode++;

      if(cameraMode>2)
        cameraMode=0;
    }
  }
);


document.addEventListener(
  "keyup",
  e=>{

    if(e.key==="ArrowLeft")
      left=false;

    if(e.key==="ArrowRight")
      right=false;

    if(e.key==="ArrowUp")
      up=false;

    if(e.key==="ArrowDown")
      down=false;

    if(e.key===" ")
      throttle=false;
  }
);


// ==========================================
// GAME LOOP
// ==========================================

function animate(){

  requestAnimationFrame(
    animate
  );


  // SPEED

  if(
    throttle &&
    fuel>0
  ){

    speed+=.75;

    if(speed>300)
      speed=300;

  }else{

    speed-=.15;

    if(speed<0)
      speed=0;
  }


  steering();

  movePlane();

  takeoff();

  updateFuel();

  checkPassengers();

  checkDestinationLanding();

  updateCamera();

  updateMap();

  updateHUD();


  renderer.render(
    scene,
    camera
  );
}


// ==========================================
// RESIZE
// ==========================================

window.addEventListener(
  "resize",
  ()=>{

    camera.aspect=
    innerWidth/
    innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      innerWidth,
      innerHeight
    );
  }
);


// ==========================================
// START
// ==========================================

landingGear.visible=true;

showMessage(
  "✈️ VARANASI AIR\n"+
  "Airport पर जाकर passengers लें"
);

animate();
