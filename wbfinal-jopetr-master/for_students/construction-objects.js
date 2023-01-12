/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { Scene } from "../libs/CS559-Three/build/three.module.js";

function degreesToRadians(deg) {
  return (deg * Math.PI) / 180;
}

let craneObCtr = 0;

// A simple crane
/**
 * @typedef CraneProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrCrane extends GrObject {
  /**
   * @param {CraneProperties} params
   */
  constructor(params = {}) {
    let crane = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 0.5,
      bevelEnabled: false
    };

    // first, we define the base of the crane.
    // Just draw a curve for the shape, then use three's "ExtrudeGeometry"
    // to create the shape itself.
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(-0.5, 0);
    base_curve.lineTo(-0.5, 2);
    base_curve.lineTo(-0.25, 2.25);
    base_curve.lineTo(-0.25, 5);
    base_curve.lineTo(-0.2, 5);
    base_curve.lineTo(-0.2, 5.5);
    base_curve.lineTo(0.2, 5.5);
    base_curve.lineTo(0.2, 5);
    base_curve.lineTo(0.25, 5);
    base_curve.lineTo(0.25, 2.25);
    base_curve.lineTo(0.5, 2);
    base_curve.lineTo(0.5, 0);
    base_curve.lineTo(-0.5, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let crane_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7
    });
    let base = new T.Mesh(base_geom, crane_mat);
    crane.add(base);
    base.translateZ(-0.25);

    // Use a similar process to create the cross-arm.
    // Note, we create a group for the arm, and move it to the proper position.
    // This ensures rotations will behave nicely,
    // and we just have that one point to work with for animation/sliders.
    let arm_group = new T.Group();
    crane.add(arm_group);
    arm_group.translateY(4.5);
    let arm_curve = new T.Shape();
    arm_curve.moveTo(-1.5, 0);
    arm_curve.lineTo(-1.5, 0.25);
    arm_curve.lineTo(-0.5, 0.5);
    arm_curve.lineTo(4, 0.4);
    arm_curve.lineTo(4, 0);
    arm_curve.lineTo(-1.5, 0);
    let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
    let arm = new T.Mesh(arm_geom, crane_mat);
    arm_group.add(arm);
    arm.translateZ(-0.25);

    // Finally, add the hanging "wire" for the crane arm,
    // which is what carries materials in a real crane.
    // The extrusion makes this not look very wire-like, but that's fine for what we're doing.
    let wire_group = new T.Group();
    arm_group.add(wire_group);
    wire_group.translateX(3);
    let wire_curve = new T.Shape();
    wire_curve.moveTo(-0.25, 0);
    wire_curve.lineTo(-0.25, -0.25);
    wire_curve.lineTo(-0.05, -0.3);
    wire_curve.lineTo(-0.05, -3);
    wire_curve.lineTo(0.05, -3);
    wire_curve.lineTo(0.05, -0.3);
    wire_curve.lineTo(0.25, -0.25);
    wire_curve.lineTo(0.25, 0);
    wire_curve.lineTo(-0.25, 0);
    let wire_geom = new T.ExtrudeGeometry(wire_curve, exSettings);
    let wire_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3
    });
    let wire = new T.Mesh(wire_geom, wire_mat);
    wire_group.add(wire);
    wire.translateZ(-0.25);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // This is also where we define parameters for UI sliders.
    // These have format "name," "min", "max", "starting value."
    // Sliders are standardized to have 30 "steps" per slider,
    // so if your starting value does not fall on one of the 30 steps,
    // the starting value in the UI may be slightly different from the starting value you gave.
    super(`Crane-${craneObCtr++}`, crane, [
      ["x", -4, 4, 0],
      ["z", -4, 4, 0],
      ["theta", 0, 360, 0],
      ["wire", 1, 3.5, 2],
      ["arm_rotation", 0, 360, 0]
    ]);
    // Here, we store the crane, arm, and wire groups as part of the "GrCrane" object.
    // This allows us to modify transforms as part of the update function.
    this.whole_ob = crane;
    this.arm = arm_group;
    this.wire = wire_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    crane.scale.set(scale, scale, scale);
    this.time = 0;
  }

  // Wire up the wire position and arm rotation to match parameters,
  // given in the call to "super" above.
  update(paramValues) {
    //this.whole_ob.position.x = paramValues[0];
    //this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[0]);
    this.wire.position.x = paramValues[1];
    this.arm.rotation.y = degreesToRadians(paramValues[2]);
  }

  stepWorld(delta, timeOfDay) {
    this.time+=delta/20;
    let u = ((this.time)%100)/100;
    let t = 0;
    if (u<=0.5) {
        t = u*2;
    }
    else {
        t = 1-2*(u-0.5);
    }
    this.update([180,1+3*t, 45*t]);
  }
}

let excavatorObCtr = 0;

// A simple excavator
/**
 * @typedef ExcavatorProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrExcavator extends GrObject {
  /**
   * @param {ExcavatorProperties} params
   */
  constructor(params = {}) {
    let excavator = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2
    };

    // As with the crane, we define the base (treads) of the excavator.
    // We draw a line, then extrude the line with ExtrudeGeometry,
    // to get the "cutout" style object.
    // Note, for this object, we translate each piece by 0.25 on the negative x-axis.
    // This makes rotation about the y-axis work nicely
    // (since the extrusion happens along +z, a y-rotation goes around an axis on the back face of the piece,
    //  rather than an axis through the center of the piece).
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(-1, 0);
    base_curve.lineTo(-1.2, 0.2);
    base_curve.lineTo(-1.2, 0.4);
    base_curve.lineTo(-1, 0.6);
    base_curve.lineTo(1, 0.6);
    base_curve.lineTo(1.2, 0.4);
    base_curve.lineTo(1.2, 0.2);
    base_curve.lineTo(1, 0);
    base_curve.lineTo(-1, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let excavator_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7
    });
    let base = new T.Mesh(base_geom, excavator_mat);
    excavator.add(base);
    base.translateZ(-0.2);

    // We'll add the "pedestal" piece for the cab of the excavator to sit on.
    // It can be considered a part of the treads, to some extent,
    // so it doesn't need a group of its own.
    let pedestal_curve = new T.Shape();
    pedestal_curve.moveTo(-0.35, 0);
    pedestal_curve.lineTo(-0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0);
    pedestal_curve.lineTo(-0.35, 0);
    let pedestal_geom = new T.ExtrudeGeometry(pedestal_curve, exSettings);
    let pedestal = new T.Mesh(pedestal_geom, excavator_mat);
    excavator.add(pedestal);
    pedestal.translateY(0.6);
    pedestal.translateZ(-0.2);

    // For the cab, we create a new group, since the cab should be able to spin on the pedestal.
    let cab_group = new T.Group();
    excavator.add(cab_group);
    cab_group.translateY(0.7);
    let cab_curve = new T.Shape();
    cab_curve.moveTo(-1, 0);
    cab_curve.lineTo(1, 0);
    cab_curve.lineTo(1.2, 0.35);
    cab_curve.lineTo(1, 0.75);
    cab_curve.lineTo(0.25, 0.75);
    cab_curve.lineTo(0, 1.5);
    cab_curve.lineTo(-0.8, 1.5);
    cab_curve.lineTo(-1, 1.2);
    cab_curve.lineTo(-1, 0);
    let cab_geom = new T.ExtrudeGeometry(cab_curve, exSettings);
    let cab = new T.Mesh(cab_geom, excavator_mat);
    cab_group.add(cab);
    cab.translateZ(-0.2);

    // Next up is the first part of the bucket arm.
    // In general, each piece is just a series of line segments,
    // plus a bit of extra to get the geometry built and put into a group.
    // We always treat the group as the "pivot point" around which the object should rotate.
    // It is helpful to draw the lines for extrusion with the zero at our desired "pivot point."
    // This minimizes the fiddling needed to get the piece placed correctly relative to its parent's origin.
    // The remaining few pieces are very similar to the arm piece.
    let arm_group = new T.Group();
    cab_group.add(arm_group);
    arm_group.position.set(-0.8, 0.5, 0);
    let arm_curve = new T.Shape();
    arm_curve.moveTo(-2.25, 0);
    arm_curve.lineTo(-2.35, 0.15);
    arm_curve.lineTo(-1, 0.5);
    arm_curve.lineTo(0, 0.25);
    arm_curve.lineTo(-0.2, 0);
    arm_curve.lineTo(-1, 0.3);
    arm_curve.lineTo(-2.25, 0);
    let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
    let arm_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3
    });
    let arm = new T.Mesh(arm_geom, arm_mat);
    arm_group.add(arm);
    arm.translateZ(-0.2);

    let forearm_group = new T.Group();
    arm_group.add(forearm_group);
    forearm_group.position.set(-2.1, 0, 0);
    let forearm_curve = new T.Shape();
    forearm_curve.moveTo(-1.5, 0);
    forearm_curve.lineTo(-1.5, 0.1);
    forearm_curve.lineTo(0, 0.15);
    forearm_curve.lineTo(0.15, 0);
    forearm_curve.lineTo(-1.5, 0);
    let forearm_geom = new T.ExtrudeGeometry(forearm_curve, exSettings);
    let forearm = new T.Mesh(forearm_geom, arm_mat);
    forearm_group.add(forearm);
    forearm.translateZ(-0.2);

    let bucket_group = new T.Group();
    forearm_group.add(bucket_group);
    bucket_group.position.set(-1.4, 0, 0);
    let bucket_curve = new T.Shape();
    bucket_curve.moveTo(-0.25, -0.9);
    bucket_curve.lineTo(-0.5, -0.5);
    bucket_curve.lineTo(-0.45, -0.3);
    bucket_curve.lineTo(-0.3, -0.2);
    bucket_curve.lineTo(-0.15, 0);
    bucket_curve.lineTo(0.1, 0);
    bucket_curve.lineTo(0.05, -0.2);
    bucket_curve.lineTo(0.5, -0.7);
    bucket_curve.lineTo(-0.25, -0.9);
    let bucket_geom = new T.ExtrudeGeometry(bucket_curve, exSettings);
    let bucket = new T.Mesh(bucket_geom, arm_mat);
    bucket_group.add(bucket);
    bucket.translateZ(-0.2);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // The parameters for sliders are also defined here.
    super(`Excavator-${excavatorObCtr++}`, excavator, [
      ["x", -10, 10, 0],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["spin", 0, 360, 0],
      ["arm_rotate", 0, 50, 45],
      ["forearm_rotate", 0, 90, 45],
      ["bucket_rotate", -90, 45, 0]
    ]);
    // As with the crane, we save the "excavator" group as the "whole object" of the GrExcavator class.
    // We also save the groups of each object that may be manipulated by the UI.
    this.whole_ob = excavator;
    this.cab = cab_group;
    this.arm = arm_group;
    this.forearm = forearm_group;
    this.bucket = bucket_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    excavator.scale.set(scale, scale, scale);
    this.time = 0;
  }

  // As with the crane, we wire up each saved group with the appropriate parameter defined in the "super" call.
  // Note, with the forearm, there is an extra bit of rotation added, which allows us to create a rotation offset,
  // while maintaining a nice 0-90 range for the slider itself.
  update(paramValues) {
    //this.whole_ob.position.x = paramValues[0];
    //this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[4]);
    this.cab.rotation.y = degreesToRadians(paramValues[0]);
    this.arm.rotation.z = degreesToRadians(-paramValues[1]);
    this.forearm.rotation.z = degreesToRadians(paramValues[2]) + Math.PI / 16;
    this.bucket.rotation.z = degreesToRadians(paramValues[3]);
  }

  stepWorld(delta, timeOfDay) {
    this.time+=delta/20;
    let u = ((this.time)%100)/100;
    let t = 0;
    if (u<=0.5) {
        t = u*2;
    }
    else {
        t = 1-2*(u-0.5);
    }
    this.update([45*t, 30*t, 60*t, 30*t, 105]);
  }
}


let bulldozerObCtr = 0;
// A simple bulldozer
/**
 * @typedef BulldozerProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
 export class GrBulldozer extends GrObject {
  /**
   * @param {BulldozerProperties} params
   */
  constructor(params = {}) {
    let bulldozer = new T.Group();

    let bdSettings = {
      steps: 2,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2
    };

    let bg1 = new T.BoxGeometry(2,1,3);
    let ym = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7
    });
    let bm = new T.MeshStandardMaterial({
      color: "black",
      metalness: 0.5,
      roughness: 0.7
    });
    let am = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3
    });
    let b1 = new T.Mesh(bg1, ym);
    bulldozer.add(b1);
    let bg2 = new T.BoxGeometry(2, 1, 2);
    let b2 = new T.Mesh(bg2,bm);
    b1.add(b2);
    b2.position.y+=1;
    b2.position.z-=0.5;
    let bg3 = new T.BoxGeometry(2, 0.1, 2);
    let b3 = new T.Mesh(bg3,ym);
    b1.add(b3);
    b3.position.y+=1.6;
    b3.position.z-=0.5;
    let bg4 = new T.BoxGeometry(1, 1, 2.5);
    let b4 = new T.Mesh(bg4,bm);
    b1.add(b4);
    b4.position.y-=0.5;
    b4.position.z-=0.75;
    b4.position.x-=1;
    let bg5 = new T.BoxGeometry(1, 1, 2.5);
    let b5 = new T.Mesh(bg5,bm);
    b1.add(b5);
    b5.position.y-=0.5;
    b5.position.z-=0.75;
    b5.position.x+=1;

    let bg6 = new T.BoxGeometry(0.5,0.5,0.5);
    let b6 = new T.Mesh(bg6, am);
    b1.add(b6);
    b6.position.x+=1.25;
    b6.position.y+=0.5;
    b6.position.z+=0;

    let b7 = new T.Mesh(bg6, am);
    b6.add(b7);
    b7.position.x-=2.5;

    let bg8 = new T.BoxGeometry(0.2,0.4,2);
    let b8 = new T.Mesh(bg8, am);
    b6.add(b8);
    b8.position.z+=1;
    let b9 = new T.Mesh(bg8, am);
    b7.add(b9);
    b9.position.z+=1;

    let bg10 = new T.BoxGeometry(3,1,0.2);
    let b10 = new T.Mesh(bg10, am);
    b6.add(b10);
    b10.position.z+=2.1;
    b10.position.x-=1.25;
    b10.position.y-=0.15;
    b10.rotation.x-=0.5

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // The parameters for sliders are also defined here.
    super(`Bulldozer-${bulldozerObCtr++}`, bulldozer, [
      ["x", -10, 10, -5],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["arm_rotate", 0, 50, 0]
    ]);
    // As with the crane, we save the "excavator" group as the "whole object" of the GrExcavator class.
    // We also save the groups of each object that may be manipulated by the UI.
    this.whole_ob = bulldozer;
    this.arm = b6;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    bulldozer.scale.set(scale, scale, scale);
    bulldozer.position.y+=1;
    this.time=0;
  }

  // As with the crane, we wire up each saved group with the appropriate parameter defined in the "super" call.
  // Note, with the forearm, there is an extra bit of rotation added, which allows us to create a rotation offset,
  // while maintaining a nice 0-90 range for the slider itself.
  update(paramValues) {
    //this.whole_ob.position.x = paramValues[0];
    //this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[0]);
    this.arm.rotation.x = degreesToRadians(15-paramValues[1]);
  }

  stepWorld(delta, timeOfDay) {
    this.time+=delta/20;
    let u = ((this.time)%100)/100;
    let t = 0;
    if (u<=0.5) {
        t = u*2;
    }
    else {
        t = 1-2*(u-0.5);
    }
    this.update([45, 45*t]);
  }
}





let dumptruckObCtr = 0;
// A simple bulldozer
/**
 * @typedef DumptruckProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
 export class GrDumptruck extends GrObject {
  /**
   * @param {DumptruckProperties} params
   */
  constructor(params = {}) {
    let dumptruck = new T.Group();

    let bg1 = new T.BoxGeometry(2,1,5);
    let ym = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7
    });
    let bm = new T.MeshStandardMaterial({
      color: "black",
      metalness: 0.5,
      roughness: 0.7
    });
    let am = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3
    });
    let b1 = new T.Mesh(bg1, ym);
    dumptruck.add(b1);
    let bg2 = new T.BoxGeometry(2, 1, 2);
    let b2 = new T.Mesh(bg2,bm);
    b1.add(b2);
    b2.position.y+=1;
    b2.position.z-=0.5+1;
    let bg3 = new T.BoxGeometry(2, 0.1, 2);
    let b3 = new T.Mesh(bg3,ym);
    b1.add(b3);
    b3.position.y+=1.6;
    b3.position.z-=0.5+1;
    let bg4 = new T.BoxGeometry(1, 1, 1);
    let b4 = new T.Mesh(bg4,bm);
    b1.add(b4);
    b4.position.y-=0.5;
    b4.position.z-=0.75+1;
    b4.position.x-=1;
    let bg5 = new T.BoxGeometry(1, 1, 1);
    let b5 = new T.Mesh(bg5,bm);
    b1.add(b5);
    b5.position.y-=0.5;
    b5.position.z-=0.75+1;
    b5.position.x+=1;

    let bg6 = new T.BoxGeometry(1, 1, 1);
    let b6 = new T.Mesh(bg6,bm);
    b1.add(b6);
    b6.position.y-=0.5;
    b6.position.z+=0.75+1;
    b6.position.x-=1;
    let bg7 = new T.BoxGeometry(1, 1, 1);
    let b7 = new T.Mesh(bg7,bm);
    b1.add(b7);
    b7.position.y-=0.5;
    b7.position.z+=0.75+1;
    b7.position.x+=1;

    let bg8 = new T.BoxGeometry(2,0.1,0.1);
    let b8 = new T.Mesh(bg8, am);
    b1.add(b8);
    b8.position.z+=2.5;
    b8.position.y+=0.5;

    let bg9 = new T.BoxGeometry(2.5,0.1,4);
    let b9 = new T.Mesh(bg9, am);
    b8.add(b9);
    b9.position.z-=0.75;

    let bg10 = new T.BoxGeometry(2.5,0.8,0.1);
    let b10 = new T.Mesh(bg10, am);
    b8.add(b10);
    b10.position.z-=2.75;
    b10.position.y+=0.4;

    let bg11 = new T.BoxGeometry(0.1,0.7,3.5);
    let b11 = new T.Mesh(bg11, am);
    b8.add(b11);
    b11.position.z-=1;
    b11.position.y+=0.3;
    b11.position.x+=1.25;

    let b12 = new T.Mesh(bg11, am);
    b8.add(b12);
    b12.position.z-=1;
    b12.position.y+=0.3;
    b12.position.x-=1.25;

    /*
    let bg6 = new T.BoxGeometry(0.5,0.5,0.5);
    let b6 = new T.Mesh(bg6, am);
    b1.add(b6);
    b6.position.x+=1.25;
    b6.position.y+=0.5;
    b6.position.z+=0;

    let b7 = new T.Mesh(bg6, am);
    b6.add(b7);
    b7.position.x-=2.5;

    let bg8 = new T.BoxGeometry(0.2,0.4,2);
    let b8 = new T.Mesh(bg8, am);
    b6.add(b8);
    b8.position.z+=1;
    let b9 = new T.Mesh(bg8, am);
    b7.add(b9);
    b9.position.z+=1;

    let bg10 = new T.BoxGeometry(3,1,0.2);
    let b10 = new T.Mesh(bg10, am);
    b6.add(b10);
    b10.position.z+=2.1;
    b10.position.x-=1.25;
    b10.position.y-=0.15;
    b10.rotation.x-=0.5*/

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // The parameters for sliders are also defined here.
    super(`DumpTruck-${dumptruckObCtr++}`, dumptruck, [
      ["x", -10, 10, 5],
      ["z", -10, 10, -5],
      ["theta", 0, 360, 0],
      ["bed_rotate", 0, 50, 0]
    ]);
    // As with the crane, we save the "excavator" group as the "whole object" of the GrExcavator class.
    // We also save the groups of each object that may be manipulated by the UI.
    this.whole_ob = dumptruck;
    this.arm = b8;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    dumptruck.scale.set(scale, scale, scale);
    dumptruck.position.y+=1;
    b1.rotation.y += Math.PI;
    this.time = 0;
  }

  // As with the crane, we wire up each saved group with the appropriate parameter defined in the "super" call.
  // Note, with the forearm, there is an extra bit of rotation added, which allows us to create a rotation offset,
  // while maintaining a nice 0-90 range for the slider itself.
  update(paramValues) {
    //this.whole_ob.position.x = paramValues[0];
    //this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[0]);
    this.arm.rotation.x = degreesToRadians(paramValues[1]);
  }

  stepWorld(delta, timeOfDay) {
    this.time+=delta/20;
    let u = ((this.time)%100)/100;
    let t = 0;
    if (u<=0.5) {
        t = u*2;
    }
    else {
        t = 1-2*(u-0.5);
    }
    this.update([160, 30*t]);
  }
}



