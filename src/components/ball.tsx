import React from 'react';
import { Planet, SpaceObject } from '../stuff/universe';

export function BallView({ obj, size = 100, blur = 0 }: { obj: SpaceObject, blur?: number, size?: number }) {
    return (
        <div style={{ position: "relative" }}>
            <div style={{
                margin: 10,
                backgroundColor: obj.img ? undefined : obj.color,
                borderRadius: "100%",
                height: size,
                width: size,
                filter: blur ? `blur(${blur}px)` : undefined,
            }}>
                {obj.img ? <img src={obj.img} height={size} width={size} /> : null}
            </div>
            {blur ? <div style={{  position: "absolute", top: 'calc(50% - 20px)', left: 'calc(50% - 15px)', fontSize: 30 }}>❔</div> : null}
        </div>
    );
}