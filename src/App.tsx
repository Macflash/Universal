import React from 'react';
import './App.css';
import { EarthManufacturing, EarthStage, ManufacturingQueue, ProbeQueue, Probes, ResearchQueue, ResearchStore, TelescopeQueue } from './stages/EarthStage';
import { Tabs } from './components/tabs';
import { GalaxyContainer } from './simplified/galaxy';
import { ProbeContainer } from './simplified/probe';
import { SolarSystem, Sun } from './stages/SolarSystem';
import { ROUND } from './stuff/universe';
import { Budget, Money, Research, Year } from './Resources';

const TechTree = new ProbeContainer();
const MilkyWay = new GalaxyContainer(100000000000, 2000, TechTree);

function App() {
  const [year, setYear] = React.useState(Year.current);
  Year.Register(setYear);

  const [research, setResearch] = React.useState(Research.current);
  Research.Register(setResearch);

  const [money, setMoney] = React.useState(Money.current);
  Money.Register(setMoney);

  const [budget, setBudget] = React.useState(Budget.current);
  Budget.Register(setBudget);

  // register ALLL  the queues...😭

  const [queueChanger, setQueues] = React.useState({});
  const triggerQueues = () => { setQueues({}); };

  ResearchQueue.Register(triggerQueues);
  ManufacturingQueue.Register(triggerQueues);
  ProbeQueue.Register(triggerQueues);
  TelescopeQueue.Register(triggerQueues);

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
          { title: "Space center", content: <><Probes/><EarthManufacturing /></>},
          { title: "Research center", content: <ResearchStore /> },
          { title: "Solar System", content: <SolarSystem star={Sun} /> },
          { title: "Milky Way", content: galaxyStuff, locked: true },
        ]}
      />

    </div>
  );
}

export default App;
