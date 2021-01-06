import React from 'react';
import { Earth } from './SolarSystem';
import { Budget, Money, Research, Year } from '../Resources';
import { PlanetView, StatRow } from '../components/planet';
import { Task, TaskQueue } from '../stuff/tasks';
import { Section } from '../components/section';
import { QueuedBlockingAction } from '../components/action';

// manufacturing can only do 1 thing at a time globally
export const ManufacturingQueue = new TaskQueue(1,1);

// research queue can do one of each at a time
export const ResearchQueue = new TaskQueue(1);

// probe queue can do all of the things
export const ProbeQueue = new TaskQueue();

// telescope can only do 1 thing at a time!
export const TelescopeQueue = new TaskQueue(1,1);

export function EarthStage(props: {}) {
    return <Section title="Earth">
        <PlanetView planet={Earth} />

        <div style={{ borderBottom: "2px solid grey" }}></div>
        <Probes />
        <EarthManufacturing />
        <ResearchStore />
    </Section>
}

// so we should have like a STORE

export function Probes(props: {}) {
    return <Section title="Inventory">
        Probes available: {Earth.availableProbes.length} 🛰️
    </Section>
}

export function EarthManufacturing(props: {}) {
    // manufacturing has say... some fixed number of slots that can be used
    return <Section title="Manufacture">
        <QueuedBlockingAction
            name="Space probe"
            description="Build a probe that you can launch to other planets to perform research."
            money={1}
            time={1}
            queue={ManufacturingQueue}
            onComplete={() => {
                Earth.availableProbes.push({ manufactureDate: Year.current });
            }}
        />
    </Section>
}


// so we should have like a STORE

export function ResearchStore(props: {}) {
    return <Section title="Research">
        <QueuedBlockingAction
            name="Raise funds"
            description={`Raise ${1} billion 💲`}
            research={1}
            time={.5}
            queue={ResearchQueue}
            onComplete={() => { Money.Add(1) }}
            buyText="Start"
        />
        <QueuedBlockingAction
            name="Increase budget"
            description={`Increases the monthly budget by ${.1} billion 💲`}
            money={1}
            research={1}
            time={.5}
            queue={ResearchQueue}
            onComplete={() => { Budget.Add(.1); }}
        />
    </Section>
}

export function ResearchOption(props: { name: string, money?: number, research?: number, onBuy?: () => void }) {
    const hasEnoughMoney = !props.money || Money.current >= props.money;
    const hasEnoughResearch = !props.research || Research.current >= props.research;
    const canAfford = hasEnoughMoney && hasEnoughResearch;

    return <div style={{ margin: 10, padding: 10, border: "2px solid grey" }}>
        <div>{props.name}</div>
        <StatRow name="Money" stat={props.money} unit={Money.icon} color={hasEnoughMoney ? undefined : "red"} />
        <StatRow name="Research" stat={props.research} unit={Research.icon} color={hasEnoughResearch ? undefined : "red"} />
        <button
            style={{ cursor: "pointer" }}
            disabled={!canAfford}
            onClick={() => {
                if (Money.current >= (props.money || 0) && Research.current >= (props.research || 0)) {
                    Money.Subtract(props.money || 0);
                    Research.Subtract(props.research || 0);
                    props.onBuy?.();
                }
            }}
        >
            Buy
        </button>
    </div>
}