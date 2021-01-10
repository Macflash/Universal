import React from 'react';
import './App.css';
import { Tabs } from './components/tabs';
import { GalaxyContainer } from './simplified/galaxy';
import { ProbeContainer } from './simplified/probe';
import { SolarSystem, Sun } from './stages/SolarSystem';
import { ROUND } from './stuff/universe';
import { Budget, Money, Research, RunDay, UpdateBasedOnTime, Year } from './Resources';
import { EarthManufacturing, ResearchStore, Probes } from './stages/EarthStage';
import { TaskQueue } from './stuff/tasks';
import { GroundTelescope, InterstellarTravel } from './stuff/tech';
import { MONTH } from './setter';

const TechTree = new ProbeContainer();
const MilkyWay = new GalaxyContainer(100000000000, 2000, TechTree);


function App() {
  React.useEffect(()=>{
    let running = true;
    const run = () =>{
      if(running){
        // 1 month every 2 seconds
        UpdateBasedOnTime(MONTH ,2000);
        requestAnimationFrame(run);
      }
    }
    
    run();

    //const interval = setInterval(RunDay, 200);
    return () => {
      running = false;
      //clearInterval(interval);
    }
  },[]);

  const [, setYear] = React.useState(Year.current);
  Year.Register(setYear);

  const [research, setResearch] = React.useState(Research.current);
  Research.Register(setResearch);

  const [money, setMoney] = React.useState(Money.current);
  Money.Register(setMoney);

  const [budget, setBudget] = React.useState(Budget.current);
  Budget.Register(setBudget);

  const [, setQueues] = React.useState({});
  const triggerQueues = () => { setQueues({}); };
  TaskQueue.RegisterAll(triggerQueues);

  const run100Years = () => {
    MilkyWay.run100Years();
    setYear(MilkyWay.currentYear);
  };

  const run1000Years = () => {
    MilkyWay.run100Years();
    MilkyWay.run100Years();
    MilkyWay.run100Years();
    MilkyWay.run100Years();
    MilkyWay.run100Years();
    MilkyWay.run100Years();
    MilkyWay.run100Years();
    MilkyWay.run100Years();
    MilkyWay.run100Years();
    MilkyWay.run100Years();
    setYear(MilkyWay.currentYear);
  };

  const run10000Years = () => {
    run1000Years();
    run1000Years();
    run1000Years();
    run1000Years();
    run1000Years();
    run1000Years();
    run1000Years();
    run1000Years();
    run1000Years();
    run1000Years();
    setYear(MilkyWay.currentYear);
  };

  const galaxyStuff = <><div>Year {MilkyWay.currentYear}</div>
    <div>Milky Way</div>
    <div>Total Stars: {MilkyWay.totalStars}</div>
    <div>Untouched Stars: {MilkyWay.unexploredPlanets}</div>
    <div>Probe producing Stars: {MilkyWay.probeProducingStars}</div>
    <div>% of MilkyWay producing: {Math.floor(MilkyWay.probeProducingStars * 100000 / MilkyWay.totalStars) / 1000}%</div>
    <div>Probes launched: {MilkyWay.launchedProbes}</div>
    <div>Active probes: {MilkyWay.activeProbes}</div>
    <div></div>
    <div></div>
    <div>
      <button onClick={run100Years}>Run 100 years</button>
      <button onClick={run1000Years}>Run 1000 years</button>
      <button onClick={run10000Years}>Run 10000 years</button>
    </div></>;

  return (
    <div style={{ backgroundColor: "#333", minHeight: "100vh", color: "white", padding: 10, fontFamily: 'Courier New, monospace' }}>
      <div style={{ fontSize: "calc(10px + 2vmin)", marginBottom: 10 }}>Universal</div>
      <div style={{ marginBottom: 5 }}>Year: {Year.date}</div>
      <div style={{ marginBottom: 5 }}>Research: {research}🧪</div>
      <div style={{ marginBottom: 5 }}>Money: {ROUND(money)} billion 💲</div>
      <div style={{ marginBottom: 5 }}>Budget: {ROUND(budget)} billion 📈</div>
      <Tabs
        tabs={[
          { title: "Research", content: <ResearchStore /> },
          { title: "Build", content: <><Probes /><EarthManufacturing /></>, requires: GroundTelescope },
          { title: "Solar System", content: <SolarSystem star={Sun} />, requires: GroundTelescope },
          { title: "Milky Way", content: galaxyStuff, requires: InterstellarTravel },
        ]}
      />

    </div>
  );
}

export default App;
