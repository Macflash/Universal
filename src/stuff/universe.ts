import { PlanetResearch } from "../stages/SolarSystem";

export const MILLION = 1000 * 1000;
export const BILLION = 1000 * MILLION;

export function ROUND(n: number, scale = 10){
    return Math.round(n * scale) / scale;
}

export interface Probe {
    //speed: number;
    //startingDistance: number;
    //remainingDistance: number;

    manufactureDate: number,
    launchYear?: number,
    arrivalYear?: number,

    // TODO: what stuff is like.. on it? etc.. OH well skip it for now...
    // add like camera quality and STUFF.    
}

export interface Telescope {
    manufactureDate: number,
    launchYear?: number,
    quality?: "blurry" | "ok" | "good" | "excellent",
    type: "ground" | "space",
    condition: number,
}

export interface SpaceObject {
    name?: string;
    mass?: number;
    diameter?: number;
    color?: string;
    img?: string;
}

export interface Planet extends SpaceObject {
    // TODO: add stuff here
    // mostly need energy SOOO what affects that?
    
    /** Distance from the star(s) in the system. This is the main driver of solar energy. */
    distance: number;

    /** Affects how you can extract resources and energy. */
    type: "rocky" | "venuslike" | "earthlike" | "superearth" | "gasgiant";

    age?: number;

    /** how utilized the planet is. */
    percentUtilization: number;

    fullyUtilized: boolean;

    incomingProbes: Probe[];
    availableProbes: Probe[];

    availableTelescopes?: Telescope[];

    moons?: Planet[];

    research?: PlanetResearch;
}

export interface Star extends SpaceObject  {
    /** Distance from initial system in light years */
    distance: number;

    /** Mass is the main driver for the output of the star. */
    mass: number;

    /** This is redundant based on mass and age but of well */
    type: "brown dwarf" | "smallred" | "sunlike" | "massivestar" | "supermassivestar" | "redgiant" | "binary" | "tertiary";

    /** how old the star is. */
    age: number;

    /** Expected time of death */
    death: number;

    /** Everything that orbits the star */
    planets: Planet[];

    incomingProbes: Probe[];
}

export interface Galaxy {
    /** distance from the initial galaxy in light years */
    distance: number;

    totalStars: number;

    discoveredStars: Star[];
    exploredStars: Star[];

    incomingProbes: Probe[];
}

export interface Universe {
    totalGalaxies: number;
    
    discoveredGalaxies: Galaxy[];
    exploredGalaxies: Galaxy[];
}