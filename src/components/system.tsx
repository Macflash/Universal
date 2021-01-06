import React from 'react';
import { Planet, Star } from '../stuff/universe';
import { BallView } from './ball';

export function System(props: { star: Star }) {
    let maxDistance = 0;
    let maxDiameter = 0;
    for (const planet of props.star.planets) {
        maxDistance = Math.max(maxDistance, planet.distance);
        maxDiameter = Math.max(maxDiameter, planet.diameter || 1);
    }
    console.log("max diamater", maxDiameter);
    return <div style={{ borderBottom: "2px solid grey", padding: 10, display: "flex", flexDirection: "row" }}>
        <BallView obj={props.star as any} size={80} />
        <div style={{ position: "relative", flex:"auto", marginRight: 10 }}>
            {props.star.planets.map((p,i) => <PositionBallView
                index={i+1}
                maxIndex={props.star.planets.length}
                size={50}
                planet={p}
                maxDistance={maxDistance}
                maxDiameter={maxDiameter}
            />)}
        </div>
    </div>;
}

export function PositionBallView({ planet, index, maxIndex, maxDistance, maxDiameter, size = 50 }: { planet: Planet, index:number, maxIndex: number, maxDistance: number, maxDiameter?: number, size?: number }) {
    const diameter = (maxDiameter ? size * (planet.diameter || 1) / maxDiameter : size) + 10;
    const scale = 1;
    const distance = 100 * Math.pow(planet.distance, scale) / Math.pow(maxDistance, scale);
    const proportion = 100* index / maxIndex;
    const testDist = (distance + proportion) / 2;
    return (
        <div style={{
            position: "absolute",
            top: `calc(50% - ${.5 * diameter}px)`,
            left: `calc(${testDist}% - ${diameter}px)`,
            backgroundColor: planet.color,
            borderRadius: "50%",
            height: diameter,
            width: diameter
        }}></div>
    );
}