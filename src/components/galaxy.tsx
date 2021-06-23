import React from 'react';

export const Galaxy: React.FC = props => {
    const [drawn, setDrawn] = React.useState(false);
    let d = false;
    const height = 300;
    const width = 500;
    const centerH = height / 2;
    const centerW = width / 2;
    
    return <canvas height={height} width={width} ref={c => {
        if(c && (!drawn || d)){
            d = true;
            setDrawn(true);
            console.log("Drawing!");
            const context = c.getContext("2d")!;

            // Aprx 100,000 - 200,000 LY across
            const galaxyWidth = 150000;
            
            // Aprx 100-400 billion stars and at least that many planets
            const planets = 250000000000;

            const actualDots = 10000;
            const planetScale = planets / actualDots;
            console.log(`each dot is ${planetScale} stars`);

            const circleRadius = 1;
            const circumference = 2 * Math.PI;
            const dist = 8;
            context.fillStyle = "white";
            for(let i = 0; i < actualDots; i++){
                context.beginPath();
                context.arc(Gauss(width, dist), Gauss(height, dist), circleRadius, 0, circumference);
                context.fill();
            }
        }
    }}></canvas>;
}

function Gauss(spread: number, steps = 3){
    let seed = 0;
    for(let i = 0; i < steps; i++){
        seed += Math.random();
    }

    seed /= steps;
    seed *= spread;
    //seed -= .5 * spread;
    return seed;
}