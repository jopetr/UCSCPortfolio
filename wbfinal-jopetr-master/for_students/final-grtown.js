
/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import * as T from "../libs/CS559-Three/build/three.module.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import { StreetBlock, Ground, Store, Resteraunt, ApartmentBuilding, Bank, PalmTree, BackGroundCar, ConstructionSite,PoliceStation, StationaryCar } from "../for_students/final-grtown-objects.js";

import { GrBulldozer, GrCrane, GrDumptruck, GrExcavator} from "./construction-objects.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import {main} from "../examples/main.js";
import {GrAdvancedSwing, GrCarousel, GrColoredRoundabout, Tent} from "./park-objects.js";
import {GetawayCar, PoliceCar1, PoliceCar2} from "./heist-objects.js";
import { Copter } from "./copters.js";
/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */

// make the world

let url = [];
url[0] = "./images/skybox/Right.png";
url[1] = "./images/skybox/Left.png";
url[2] = "./images/skybox/Top.png";
url[3] = "./images/skybox/Front.png";
url[4] = "./images/skybox/Back.png";
url[5] = "./images/skybox/Bottom.png";
let skytext = new T.CubeTextureLoader().load(url);

let world = new GrWorld({
    width: 800,
    height: 600,
    groundplane: false,
    //ambient: false,
    lightBrightness: 0.02,
    //groundplanesize: 20 // make the ground plane big enough for a world of stuff
});

let s = new T.DirectionalLight(new T.Color( 1, 0.8, 0.8 ), 3);
//T.SpotLight("rgb(1, 0, 0)");
s.lookAt(0,0,0);
s.position.set(-100, 30, 0);
world.add(new GrObject("DirectionalLight", s));

let target = new T.WebGLCubeRenderTarget(100);
let cam = new T.CubeCamera(1, 100, target);
cam.position.set(0,15,0);
world.add(new GrObject("camera", cam));

world.scene.background = skytext;
let blck1 = new StreetBlock(1);
world.add(blck1);
blck1.objects[0].position.x+=7.5;
blck1.objects[0].position.z+=7.5;
let blck2 = new StreetBlock(2);
world.add(blck2);
blck2.objects[0].rotateY(Math.PI/2);
blck2.objects[0].position.x+=7.5;
blck2.objects[0].position.z-=7.5;
let blck3 = new StreetBlock(3);
world.add(blck3);
blck3.objects[0].rotateY(Math.PI);
blck3.objects[0].position.x-=7.5;
blck3.objects[0].position.z-=7.5;
let blck4 = new StreetBlock(4);
world.add(blck4);
blck4.objects[0].rotateY(3*Math.PI/2);
blck4.objects[0].position.x-=7.5;
blck4.objects[0].position.z+=7.5;

let grnd = new Ground();
world.add(grnd);

class CenterBlock extends GrObject {
    constructor() {
        let c = new T.Group();
        let g = new T.CylinderBufferGeometry(8,8,0.1);
        let tex = new T.TextureLoader().load("./images/concrete.jpg");
        let m = new T.MeshStandardMaterial({map: tex})
        let b = new T.Mesh(g, m);
        c.add(b);
        b.position.y+=0.05;
        g = new T.CylinderBufferGeometry(5,5,1);
        let b2 = new T.Mesh(g, m);
        c.add(b2);
        b2.position.y+=0.6;
        let geo = new T.TorusKnotGeometry(2,1);
        let tl = new T.CubeTextureLoader().load(url);
        let  mat = new T.MeshBasicMaterial({
            envMap: tl
        });
        let obj = new T.Mesh(geo, mat);
        c.add(obj);
        obj.position.y+=4;
        super("CenterBlock", c);
        this.obj = obj;
    }
    stepWorld(step, timeOfDay) {
        this.obj.material.envMap = target.texture;
        cam.update(world.renderer, world.scene);
    }
}

world.add(new CenterBlock());

// Buildings

let p1 = new Store(1);
let scale = 5;
p1.setScale(scale, scale, scale);
p1.objects[0].position.set(-15,0,38);
p1.objects[0].rotateY(Math.PI);
world.add(p1);

let p2 = new Store(0);
p2.setScale(scale, scale, scale);
p2.objects[0].position.set(-28,0,38);
p2.objects[0].rotateY(Math.PI);
world.add(p2);

let p3 = new Resteraunt(0);
p3.setScale(scale, scale, scale);
p3.objects[0].position.set(-38,0,28);
p3.objects[0].rotateY(Math.PI/2);
world.add(p3);

let p4 = new Resteraunt(1);
p4.setScale(scale, scale, scale);
p4.objects[0].position.set(-38,0,18);
p4.objects[0].rotateY(Math.PI/2);
world.add(p4);

let a1 = new ApartmentBuilding();
a1.setScale(scale, scale, scale);
a1.objects[0].position.set(35,0,-35);
a1.objects[0].rotateY(3*Math.PI/2);
world.add(a1);

let b1 = new Bank();
scale = 10;

b1.objects[0].position.set(-40,2.6,-15);
b1.setScale(scale, scale, scale);

b1.objects[0].rotateY(3*Math.PI/2);
world.add(b1);

let ps = new PoliceStation();
world.add(ps);
ps.objects[0].position.set(20,0,42.5);
ps.objects[0].scale.set(1.5,1.5,1.5);

// Misc Plants

let ptpos = [
    10, 0,42,
    12,0,37,
    9,0, 45,
    30,0,40,
    32,0,43,
    31, 0, 45,
    29, 0, 37,
    -40,0,40,
    -20,0,45,
    -34, 0, 43,
    -28, 0, 47,
    -46, 0, 43,
    -13, 0, 42,
    -42, 0, 47,
    -45, 0, 20,
    -44, 0, 24,
    -47, 0, 31,
    -38, 0, 37,
    -40, 0, 12,
    40, 0, -12,
    38, 0, -10.5,
    35, 0, -17,
    41, 0, -20,
    44, 0, -22,
    43, 0, -17,
    17, 0, -43,
    22, 0, -41,
    15, 0, -38,
    12, 0, -35,
    11, 0, -38,
    -42, 0, -28,
    -37, 0, -33,
    -47, 0, -36,
    -33, 0, -45,
    -12, 0, -43,
];
for (let i=0; i<ptpos.length;i+=3) {
    let pt = new PalmTree(i/3);
    let offy = 2*Math.random();
    pt.setScale(2,2+offy);

    pt.objects[0].position.set(ptpos[i],ptpos[i+1]+offy,ptpos[i+2]);
    pt.objects[0].rotateY(Math.random()*Math.PI*2);
    world.add(pt);
    
}

// Background cars

for (let i = 0; i<12; i++) {
    let c = new BackGroundCar(i);
    world.add(c);
}

// Park

let t = new Tent();
world.add(t);
t.objects[0].position.set(-40,0,-40);
let r1 = new GrAdvancedSwing();
world.add(r1);
r1.objects[0].position.set(-32,0,-40);
let r2 = new GrCarousel();
world.add(r2);
r2.objects[0].position.set(-24,0,-42);
let r3 = new GrColoredRoundabout();
world.add(r3);
r3.objects[0].position.set(-16,0,-38);

// Construction Site

let cs = new ConstructionSite();
world.add(cs);
cs.objects[0].position.set(40.5,0.1,28);
let cs1 = new GrCrane({size: 1.3});
world.add(cs1);
cs1.objects[0].position.set(42.5, 0, 36);
let cs2 = new GrBulldozer();
world.add(cs2);
cs2.objects[0].position.set(40, 0.65,42);
let cs3 = new GrExcavator();
world.add(cs3);
cs3.objects[0].position.set(38, 0.65,26);
let cs4 = new GrDumptruck();
world.add(cs4);
cs4.objects[0].position.set(44, 0.5, 17);

// Heist

let g = new GetawayCar();
world.add(g);
let pc1 = new PoliceCar1();
world.add(pc1);
let pc2 = new PoliceCar2();
world.add(pc2);

// Stationary Cars

let pos = [
    -32,-25,
    -32,-19,
    -32,-11,
    -32,30,
    -32,16,
    -25, 32,
    -19, 32,
    25, -32,
    17, -32,
    32, -20,


];
let rot = [
    0,
    0,
    0,
    0,
    0,
    1/2,
    1/2,
    3/2,
    3/2,
    1,
];
for (let i=0; i<pos.length; i+=2) {
    let sc = new StationaryCar(i/2);
    world.add(sc);
    sc.objects[0].position.set(pos[i], 0.4, pos[i+1]);
    sc.objects[0].rotation.y = rot[i/2]*Math.PI;
}

// Copter

let c = new Copter();
world.add(c);
c.objects[0].scale.set(4,4,4);



// put stuff into the world
// this calls the example code (that puts a lot of objects into the world)
// you can look at it for reference, but do not use it in your assignment
//main(world);

// while making your objects, be sure to identify some of them as "highlighted"

///////////////////////////////////////////////////////////////
// because I did not store the objects I want to highlight in variables, I need to look them up by name
// This code is included since it might be useful if you want to highlight your objects here
function highlight(obName) {
    const toHighlight = world.objects.find(ob => ob.name === obName);
    if (toHighlight) {
        toHighlight.highlighted = true;
    } else {
        throw `no object named ${obName} for highlighting!`;
    }
}
// of course, the student should highlight their own objects, not these

/*highlight("SimpleHouse-5");
highlight("Helicopter-0");
highlight("Track Car");
highlight("MorphTest");*/
highlight("PalmTree0");
highlight("BackGroundCar0");
highlight("Resteraunt0");
highlight("Store0");
highlight("Bank");
highlight("ConstructionSite");
highlight("StreetBlock1");
highlight("CenterBlock");
highlight("ApartmentBuilding");
highlight("Copter");
highlight("GetawayCar");
highlight("PoliceCar1");
highlight("Carousel-0");
highlight("Bulldozer-0");
highlight("Crane-0");
highlight("DumpTruck-0");
highlight("StationaryCar1");



///////////////////////////////////////////////////////////////
// build and run the UI
// only after all the objects exist can we build the UI
// @ts-ignore       // we're sticking a new thing into the world
world.ui = new WorldUI(world);
// now make it go!
world.go();

