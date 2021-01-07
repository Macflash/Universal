import React from "react";
import { PlanetView, SpaceObjectView, StatRow } from "../components/planet";
import { System } from "../components/system";
import { Money, Year } from "../Resources";
import { BILLION, MILLION, Planet, Probe, ROUND, SpaceObject, Star } from "../stuff/universe";
import { ResearchOption } from "./EarthStage";
import mercuryimg from "../images/mercuryimg.png";
import earthimg from "../images/earthimg.png";
import moonimg from "../images/moonimg.png";
import { Tabs } from "../components/tabs";

export const Mercury: Planet = {
    name: "Mercury",
    img: mercuryimg,
    color: "grey",
    age: 4 * BILLION,
    distance: 61.157 * MILLION,
    type: "rocky",
    diameter: 4879,
    mass: 3.285e23,
    percentUtilization: 0,
    fullyUtilized: false,
    availableProbes: [],
    incomingProbes: []
};

export const Venus: Planet = {
    name: "Venus",
    color: "bisque",
    age: 4 * BILLION,
    distance: 108.44 * MILLION,
    type: "venuslike",
    diameter: 12104,
    mass: 4.867e24,
    percentUtilization: 0,
    fullyUtilized: false,
    availableProbes: [],
    incomingProbes: []
};

export const Moon: Planet = {
    name: "Moon",
    img: moonimg,
    color: "grey",
    age: 4 * BILLION,
    distance: 384400,
    type: "rocky",
    diameter: 3474,
    mass: 7.348e22,
    percentUtilization: 0,
    fullyUtilized: false,
    availableProbes: [],
    incomingProbes: []
};

export const Earth: Planet = {
    name: "Earth",
    img: earthimg,
    color: "#18F",
    age: 4 * BILLION,
    distance: 149.6 * MILLION,
    type: "rocky",
    diameter: 12742,
    mass: 5.972e24,
    percentUtilization: .5,
    fullyUtilized: false,
    availableProbes: [],
    incomingProbes: [],
    moons: [Moon],
    research: {
        discovered: true,
        studied: "human",
        picture: "none",
        temperature: "human",
        soil: "human",
        water: "human",
        atmosphere: "human",
    }
};

export const Mars: Planet = {
    name: "Mars",
    color: "red",
    age: 4 * BILLION,
    distance: 228.16 * MILLION,
    type: "rocky",
    diameter: 6779,
    mass: 6.39e23,
    percentUtilization: 0,
    fullyUtilized: false,
    availableProbes: [],
    incomingProbes: []
};


export const Jupiter: Planet = {
    name: "Jupiter",
    color: "orange",
    age: 4 * BILLION,
    distance: 762.51 * MILLION,
    type: "gasgiant",
    diameter: 139820,
    mass: 1.898e27,
    percentUtilization: 0,
    fullyUtilized: false,
    availableProbes: [],
    incomingProbes: []
};

export const Saturn: Planet = {
    name: "Saturn",
    color: "tan",
    age: 4 * BILLION,
    distance: 926.57 * MILLION,
    type: "gasgiant",
    diameter: 116360,
    mass: 5.683e26,
    percentUtilization: 0,
    fullyUtilized: false,
    availableProbes: [],
    incomingProbes: []
};

export const Uranus: Planet = {
    name: "Uranus",
    color: "lightblue",
    age: 4 * BILLION,
    distance: 2.9575 * BILLION,
    type: "gasgiant",
    diameter: 50724,
    mass: 8.681e25,
    percentUtilization: 0,
    fullyUtilized: false,
    availableProbes: [],
    incomingProbes: []
};

export const Neptune: Planet = {
    name: "Neptune",
    color: "blue",
    age: 4 * BILLION,
    distance: 4.4759 * BILLION,
    type: "gasgiant",
    diameter: 49244,
    mass: 1.024e26,
    percentUtilization: 0,
    fullyUtilized: false,
    availableProbes: [],
    incomingProbes: []
};

export const Sun = {
    name: "Sun",
    color: "yellow",
    age: 4.5 * BILLION,
    distance: 0,
    type: "sunlike",
    death: 7.5 * BILLION,
    mass: 1.989e30, // KG
    diameter: 1391000, // KM
    incomingProbes: [],
    planets: [
        Mercury,
        Venus,
        Earth,
        Mars,
        Jupiter,
        Saturn,
        Uranus,
        Neptune,
    ],
} as Star;

export function SolarSystem(props: { star: Star }) {
    const launchCost = .1;
    return <div>
        <div style={{ position: "relative" }}>
            <System star={props.star} />
        </div>

        <Tabs tabs={
            [
                {
                    title: "Sun",
                    content: <PlanetView planet={props.star as any} />
                } ,
                ...props.star.planets.map(p => ({
                    title: p.name && p.research?.discovered ? p.name :"?",
                    content: <div>
                        <PlanetView planet={p} />
                        
                    </div>
                }))
            ]
        } />

    </div>
}
/*
{p.incomingProbes.map(probe => <ProbeView probe={probe} />)}
{p !== Earth ?
    <button
        style={{ cursor: "pointer" }}
        disabled={Earth.availableProbes.length === 0 || Money.current < launchCost}
        onClick={() => {
            const probe = Earth.availableProbes.pop()!;
            probe.launchYear = Year.current;
            probe.arrivalYear = Year.current + Math.abs(p.distance - Earth.distance) / 8.76e7;
            p.incomingProbes.push(probe);
            Money.Subtract(launchCost);
        }}
    >Launch probe
    ({launchCost} billion {Money.icon})
    ({ROUND(Math.abs(p.distance - Earth.distance) / 8.76e7)} years)
    </button>
    : null}
    */

export function ProbeView({ probe }: { probe: Probe }) {
    return <div>
        <div>🛰️</div>
        <StatRow name="Launched" stat={probe.launchYear} round={1} />
        <StatRow name={probe.arrivalYear! < Year.current ? "Arrived" : "Arriving"} stat={probe.arrivalYear} round={1} />
        <ProbeProgressBar probe={probe} />
    </div>
}

export function ProbeProgressBar({ probe }: { probe: Probe }) {
    if (Year.current > probe.arrivalYear! + 5) { return null; }
    let color = "red";
    if (Year.current > probe.arrivalYear!) { color = "green"; }
    const progress = (probe.arrivalYear! - Year.current) / (probe.arrivalYear! - probe.launchYear!);
    return <div style={{ display: "flex", marginRight: 10, backgroundColor: "grey" }}>
        <div style={{ width: (100 - (progress * 100)) + "%", height: 10, backgroundColor: color }}></div>
    </div>
}

// this defines what we have actually DISCOVERED and sent there.
export type level = "none" | "telescope" | "probe" | "lander" | "returned sample" | "human";
export interface PlanetResearch {
    /** This starts false */
    discovered: boolean,

    /** after study, you can now send probes there, etc */
    studied: level,

    picture: level,
    temperature: level,
    atmosphere: level,
    soil: level,
    water: level,
}