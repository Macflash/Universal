import React from 'react';
import { Research, R_ICON } from '../Resources';
import { MONTH } from '../setter';
import { PlanetResearch } from '../stages/SolarSystem';
import { TelescopeQueue } from '../stuff/tasks';
import { Planet, ROUND, SpaceObject } from '../stuff/universe';
import { QueuedBlockingAction } from './action';
import { BallView } from './ball';
import { Block, SectionHeader } from './section';

function randomNumber() {
    return Math.round(Math.random() * 1000);
}

function randomLetter() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return chars.charAt(Math.floor(Math.random() * 26));
}

function createName() {
    return `Planet ${randomLetter()}${randomLetter()}_${randomNumber()}_${randomLetter}`;
}

export function StatRow(props: { color?: string, name: string, stat?: number | string, unit?: string, round?: number }) {
    let displayValue = props.stat;
    if (props.stat && !isNaN(props.stat as any)) {
        displayValue = ROUND(Number(props.stat), props.round || 100);
    }
    return props.stat && <div style={{ color: props.color }}>
        {props.name}: {displayValue}{props.unit}
    </div> || null;
}

export function SpaceObjectView({ planet }: { planet: SpaceObject | Planet }) {
    const [name] = React.useState(planet.name || createName());

    return (
        <div style={{ padding: 10 }}>
            <div style={{ fontSize: "calc(10px + 1vmin)" }}>{name}</div>
            <div style={{ display: "flex", flexDirection: "row" }}>

                <BallView obj={planet} />

                <div>
                    <StatRow name="Mass" unit="kg" stat={planet.mass} />
                    <StatRow name="Diameter" unit="km" stat={planet.diameter} />
                    <StatRow name="Distance from star" unit="km" stat={(planet as Planet).distance} />
                    <StatRow name="Type" stat={(planet as any).type} />
                </div>

            </div>
        </div>
    );
}

export function PlanetBallView({ planet }: { planet: Planet }) {
    let blur = 0;
    let obj = { ...planet };
    if (!planet.research || planet.research.picture == "none") {
        delete obj.img;
        blur = 5;
    }
    return <BallView obj={obj} blur={blur} />
}

export function ResearchStat({ name, unit, stat, studied = true }: { stat?: string | number, studied?: boolean, name: string, unit?: string }) {
    return <StatRow name={name} unit={unit} stat={studied ? stat : "?"} />;

}

export function PlanetView({ planet }: { planet: Planet }) {
    let name = planet.name;
    if (!planet.research || !planet.research.discovered) {
        name = "Undiscovered object";
    }

    return (
        <Block>
            <SectionHeader title={name} size={1.1} />
            <div style={{ display: "flex", flexDirection: "row" }}>

                <PlanetBallView planet={planet} />

                <div>
                    <ResearchStat name="Mass" unit="kg" stat={planet.mass} studied={!!planet.research?.studied && planet.research?.studied != 'none'} />
                    <ResearchStat name="Diameter" unit="km" stat={planet.diameter} studied={!!planet.research?.studied} />
                    <ResearchStat name="Type" stat={planet.type} studied={!!planet.research?.studied} />
                </div>

            </div>

            {planet.research?.discovered || planet.research?.studied === "none" ?
                "discovered"
                :
                <QueuedBlockingAction
                    name={`Study ${planet.name || name}`}
                    description={`Use your telescope to study the unkown object and learn more about it. Earns 1 ${R_ICON}`}
                    queue={TelescopeQueue}
                    time={3 * MONTH}
                    buyText="Study"
                    onComplete={() => {
                        planet.research = planet.research || {} as any;
                        planet.research!.discovered = true;
                        planet.research!.studied = "telescope";
                        Research.Add(1);
                    }}
                />
            }
        </Block>
    );
}


