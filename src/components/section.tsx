import React from 'react';

export const backgroundColor = "grey";
export const border = `2px solid ${backgroundColor}`;
export const margin = 5;
export const padding = margin;
export const marginTop = margin;
export const marginBottom = margin;
export const paddingBottom = margin;
export const titleFontSize = '125%';

export const Section: React.FC<{ title: string, unlocked?: boolean }> = ({title, children, unlocked = true}) => {
    return <div style={{ borderBottom: border, marginBottom, marginTop, paddingBottom }}>
        <SectionHeader title={title} />
        {unlocked ? children : "Locked"}
    </div>;
}

export function SectionHeader(props: { title?: string, size?: number }) {
    return props.title && <div style={{ fontSize: props.size ? `${props.size * 100}%` : titleFontSize, marginBottom }}>
        {props.title}
    </div> || null;
}

export const Block: React.FC<{ }> = ({children}) => {
    return <div style={{padding, margin, border}}>
        {children}
    </div>;
}