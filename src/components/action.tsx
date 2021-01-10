import React from 'react';
import { Money, Research, Year } from '../Resources';
import { Task, TaskQueue } from '../stuff/tasks';
import { StatRow } from './planet';
import { Block, border, backgroundColor, SectionHeader } from './section';

interface SimpleActionProps {
    name: string,
    description?: string,
    money?: number,
    research?: number,
    time?: number,
    onBuy?: () => void,
    blocked?: string,
    buyText?: string
}

export const SimpleAction: React.FC<SimpleActionProps> = props => {
    const hasEnoughMoney = !props.money || Money.current >= props.money;
    const hasEnoughResearch = !props.research || Research.current >= props.research;
    const canAfford = hasEnoughMoney && hasEnoughResearch;

    return <Block>
        <SectionHeader title={props.name} size={1.1} />
        <SectionHeader title={props.description} size={.9} />
        <StatRow name="Cost" stat={props.money} unit={Money.icon} color={hasEnoughMoney ? undefined : "red"} />
        <StatRow name="Research cost" stat={props.research} unit={Research.icon} color={hasEnoughResearch ? undefined : "red"} />
        <StatRow name="Build time" stat={props.time} unit={" year(s)" + Year.icon} />
        {props.children}
        {props.blocked ? props.blocked : <button
            style={{ cursor: "pointer" }}
            disabled={!canAfford || !!props.blocked}
            onClick={() => {
                if (Money.current >= (props.money || 0) && Research.current >= (props.research || 0)) {
                    Money.Subtract(props.money || 0);
                    Research.Subtract(props.research || 0);
                    props.onBuy?.();
                }
            }}
        >{props.buyText || "Buy"}</button>}
    </Block>
}

export const TaskProgressBar: React.FC<{ task: Task }> = props => {
    const progress = props.task.percent;
    return <div style={{ border, backgroundColor, margin: 5 }}>
        <div style={{ backgroundColor: "green", height: 20, width: props.task.percentWidth }}></div>
    </div>
}

interface QueuedBlockingActionProps<T> extends Omit<SimpleActionProps, 'onBuy'> {
    onStart?: () => T | undefined,
    onComplete: (data?: T) => void,
    time: number,
    queue: TaskQueue,
    limitPerId?: number,
    limitPerQueue?: number,
}

export function QueuedBlockingAction<T>(props: QueuedBlockingActionProps<T>) {

    // blocking can be some max # in the entire QUEUE
    // or blocking can be some max # per unique ID/action in the QUEUE.
    // for now lets do per QUEUE and per action
    let blocked: string | undefined = undefined;
    if (props.queue.limitPerQueue) {
        if (props.queue.length >= props.queue.limitPerQueue) {
            blocked = "Queue is full.";
        }
    }
    if (props.queue.limitPerId) {
        if (props.queue.count(props.name) >= props.queue.limitPerId) {
            blocked = "In progress...";
        }
    }

    return <SimpleAction
        {...props}
        blocked={blocked}
        onBuy={() => {
            const data = props.onStart?.();
            return props.queue.push(
                new Task(props.name, Year.current, Year.current + props.time, () => props.onComplete(data))
            );
        }}
    >
        {props.queue.get(props.name).map((t, i) => <TaskProgressBar task={t} key={i} />)}
    </SimpleAction>
}