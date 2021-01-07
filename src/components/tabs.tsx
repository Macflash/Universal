import React from 'react';
import { Tech } from '../stuff/tech';

export interface Tab {
    content: React.ReactNode,
    title: string,
    requires?: Tech,
}

const backgroundColor = "grey";
const border = `2px solid ${backgroundColor}`;

export function Tabs(props: {
    tabs: Tab[],
    startTab?: number,
}) {
    const [selected, setSelected] = React.useState(props.startTab || 0);

    const tablist = <div style={{ display: "flex", flexDirection: "row" }}>
        {props.tabs.filter(tab => !tab.requires || tab.requires.canBuy || tab.requires.unlocked).map((tab, i) => <div
            key={i}
            onClick={() => (tab.requires == null || tab.requires?.unlocked) && setSelected(i)}
            style={{
                border,
                backgroundColor: i === selected ? backgroundColor : undefined,
                marginRight: 10,
                padding: 5,
                marginBottom: -2,
                cursor: "pointer",
            }}
        >
            {(tab.requires && !tab.requires.unlocked) ? '🔒 ' : null}{tab.title}
        </div>)}
    </div>;

    return <div>
        {tablist}
        <div style={{ borderTop: border }}>
            {props.tabs[selected].content}
        </div>
    </div>;
}