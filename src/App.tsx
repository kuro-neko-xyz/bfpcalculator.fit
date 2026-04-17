import { useState } from "react";
import "./App.css";

function App() {
  const [waist, setWaist] = useState("");
  const [neck, setNeck] = useState("");
  const [height, setHeight] = useState("");
  const [bfp, setBFP] = useState(0);

  const filterInput = (value: string) => {
    if (value === "") {
      return "";
    }

    const regex = /^(?<whole>[1-9][0-9]*)(?<point>\.?)(?<decimal>[0-9]*)$/;
    const groups = value.match(regex)?.groups;
    if (groups) {
      return groups.whole + groups.point + groups.decimal;
    } else {
      return null;
    }
  };

  const calculateBFP = ({
    waist,
    neck,
    height,
  }: {
    waist: number;
    neck: number;
    height: number;
  }) => {
    return (
      495 /
        (1.0324 -
          0.19077 * Math.log10(waist - neck) +
          0.15456 * Math.log10(height)) -
      450
    );
  };

  return (
    <div className="container">
      <div className="hero">
        <h1>Body Fat Percentage Calculator</h1>
        <p>
          The U.S. Navy Body Fat Percentage (BFP) method is a widely accepted
          and highly accessible way to estimate body composition. Developed in
          1984 by Drs. Hodgdon and Beckett at the Naval Health Research Center,
          this method bypasses the need for expensive clinical equipment like
          DEXA scans or hydrostatic weighing. Instead, it relies on basic body
          circumference measurements and a logarithmic equation to provide a
          reliable estimate of a person's fat mass versus lean mass.
        </p>
      </div>
      <div className="data">
        <div className="field">
          <label>Waist (in cm)</label>
          <input
            value={waist}
            onChange={(e) => {
              const value = filterInput(e.target.value);
              if (value !== null) {
                setWaist(value);
              }
            }}
          />
        </div>
        <div className="field">
          <label>Neck (in cm)</label>
          <input
            value={neck}
            onChange={(e) => {
              const value = filterInput(e.target.value);
              if (value !== null) {
                setNeck(value);
              }
            }}
          />
        </div>
        <div className="field">
          <label>Height (in cm)</label>
          <input
            value={height}
            onChange={(e) => {
              const value = filterInput(e.target.value);
              if (value !== null) {
                setHeight(value);
              }
            }}
          />
        </div>
      </div>
      <button
        className="button"
        disabled={waist === "" || neck === "" || height === "" || neck >= waist}
        onClick={() => {
          setBFP(
            calculateBFP({
              waist: Number(waist),
              neck: Number(neck),
              height: Number(height),
            }),
          );
        }}
      >
        Calculate
      </button>
      {bfp > 0 && <p>BFP: {Math.round(bfp * 10) / 10}</p>}
    </div>
  );
}

export default App;
