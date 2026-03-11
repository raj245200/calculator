import { useState, useCallback } from "react";

const buttons = [
  ["C", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

const isOperator = (v) => ["÷", "×", "−", "+"].includes(v);

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [reset, setReset] = useState(false);
  const [expression, setExpression] = useState("");

  const compute = (a, b, operator) => {
    const x = parseFloat(a), y = parseFloat(b);
    if (operator === "+") return x + y;
    if (operator === "−") return x - y;
    if (operator === "×") return x * y;
    if (operator === "÷") return y !== 0 ? x / y : "Error";
    return b;
  };

  const format = (val) => {
    if (val === "Error") return val;
    const n = parseFloat(val);
    if (isNaN(n)) return "0";
    const str = n.toPrecision(10).replace(/\.?0+$/, "");
    return str.length > 10 ? n.toExponential(4) : str;
  };

  const handle = useCallback((val) => {
    if (val === "C") {
      setDisplay("0"); setPrev(null); setOp(null);
      setReset(false); setExpression("");
      return;
    }
    if (val === "±") { setDisplay((d) => String(-parseFloat(d))); return; }
    if (val === "%") { setDisplay((d) => String(parseFloat(d) / 100)); return; }

    if (isOperator(val)) {
      if (op && !reset) {
        const result = format(compute(prev, display, op));
        setDisplay(result);
        setPrev(result);
        setExpression(result + " " + val);
      } else {
        setPrev(display);
        setExpression(display + " " + val);
      }
      setOp(val); setReset(true);
      return;
    }

    if (val === "=") {
      if (!op || !prev) return;
      const result = format(compute(prev, display, op));
      setExpression(prev + " " + op + " " + display + " =");
      setDisplay(result); setPrev(null); setOp(null); setReset(false);
      return;
    }

    if (val === ".") {
      if (reset) { setDisplay("0."); setReset(false); return; }
      if (!display.includes(".")) setDisplay((d) => d + ".");
      return;
    }

    if (reset) { setDisplay(val); setReset(false); }
    else setDisplay((d) => d === "0" ? val : d.length < 12 ? d + val : d);
  }, [display, prev, op, reset]);

  const btnStyle = (val) => {
    const base = {
      fontFamily: "'Courier New', monospace",
      fontSize: val === "0" ? "1.1rem" : "1.2rem",
      fontWeight: "600",
      border: "none",
      cursor: "pointer",
      borderRadius: "4px",
      transition: "all 0.1s ease",
      letterSpacing: "0.05em",
    };
    if (val === "=") return { ...base, background: "#e8ff47", color: "#111", gridColumn: "span 1" };
    if (isOperator(val)) return { ...base, background: "#2a2a2a", color: "#e8ff47", border: "1px solid #e8ff47" };
    if (["C", "±", "%"].includes(val)) return { ...base, background: "#1e1e1e", color: "#888" };
    return { ...base, background: "#1a1a1a", color: "#e0e0e0" };
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#0a0a0a",
      fontFamily: "'Courier New', monospace",
    }}>
      {/* Scanline overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)",
        zIndex: 0,
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        background: "#111",
        border: "1px solid #2a2a2a",
        borderRadius: "8px",
        padding: "24px",
        width: "320px",
        boxShadow: "0 0 60px rgba(232,255,71,0.05), 0 20px 60px rgba(0,0,0,0.8)",
      }}>
        {/* Header */}
        <div style={{ marginBottom: "20px", borderBottom: "1px solid #1e1e1e", paddingBottom: "12px" }}>
          <div style={{ color: "#333", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "8px" }}>
            CALC — v2.0
          </div>

          {/* Expression */}
          <div style={{
            color: "#444", fontSize: "0.75rem", textAlign: "right",
            minHeight: "18px", letterSpacing: "0.05em", marginBottom: "6px",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {expression || " "}
          </div>

          {/* Main display */}
          <div style={{
            color: "#e8ff47",
            fontSize: display.length > 9 ? "1.8rem" : "2.8rem",
            textAlign: "right",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            transition: "font-size 0.1s",
            textShadow: "0 0 20px rgba(232,255,71,0.3)",
          }}>
            {display}
          </div>
        </div>

        {/* Button Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
          {buttons.map((row) =>
            row.map((val) => (
              <button
                key={val}
                onClick={() => handle(val)}
                style={{
                  ...btnStyle(val),
                  gridColumn: val === "0" ? "span 2" : "span 1",
                  padding: "18px 0",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.filter = "brightness(1.2)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.filter = "brightness(1)";
                }}
                onMouseDown={e => e.currentTarget.style.transform = "translateY(1px)"}
                onMouseUp={e => e.currentTarget.style.transform = "translateY(-1px)"}
              >
                {val}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}