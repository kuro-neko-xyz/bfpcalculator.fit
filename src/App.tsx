import { useState } from "react";
import styles from "./App.module.css";
import Toggle from "./components/Toggle";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [neck, setNeck] = useState("");
  const [height, setHeight] = useLocalStorage("height", "");
  const [bfp, setBFP] = useState(0);
  const [isImperial, setIsImperial] = useLocalStorage("isImperial", false);
  const [isFemale, setIsFemale] = useLocalStorage("isFemale", false);

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
    hip,
    neck,
    height,
  }: {
    waist: number;
    hip: number;
    neck: number;
    height: number;
  }) => {
    if (isFemale) {
      if (isImperial) {
        return (
          163.205 * Math.log10(waist + hip - neck) -
          97.684 * Math.log10(height) -
          78.387
        );
      }
      return (
        163.205 * Math.log10(waist + hip - neck) -
        97.684 * Math.log10(height) -
        104.91
      );
    } else {
      if (isImperial) {
        return (
          86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76
        );
      } else {
        return (
          86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 30.3
        );
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
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
      <div className={styles.data}>
        <Toggle
          label1="Centimeters"
          label2="Inches"
          onChange={(value) => {
            setIsImperial(value);
          }}
          value={isImperial}
        />
        <Toggle
          label1="Male"
          label2="Female"
          onChange={(value) => {
            setIsFemale(value);
          }}
          value={isFemale}
        />
      </div>
      <div className={styles.data}>
        <div className={styles.field}>
          <label>Waist</label>
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
        {isFemale && (
          <div className={styles.field}>
            <label>Hip</label>
            <input
              value={hip}
              onChange={(e) => {
                const value = filterInput(e.target.value);
                if (value !== null) {
                  setHip(value);
                }
              }}
            />
          </div>
        )}
        <div className={styles.field}>
          <label>Neck</label>
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
        <div className={styles.field}>
          <label>Height</label>
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
        className={styles.button}
        disabled={
          waist === "" ||
          (isFemale && hip === "") ||
          neck === "" ||
          height === "" ||
          Number(neck) >= Number(waist)
        }
        onClick={() => {
          setBFP(
            calculateBFP({
              waist: Number(waist),
              hip: Number(hip),
              neck: Number(neck),
              height: Number(height),
            }),
          );
        }}
      >
        Calculate
      </button>
      {bfp > 0 && (
        <p className={styles.result}>BFP: {Math.round(bfp * 10) / 10}</p>
      )}
    </div>
  );
}

export default App;
