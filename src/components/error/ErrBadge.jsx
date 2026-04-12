import { useContext } from "react";
import { ErrorBadgeContext } from "../../contexts/Contexts";
import errorIcon from "../../assets/icons/errorMark.png";
import warningIcon from "../../assets/icons/warningMark.png";
import { Severities } from "../../fetch/models/ErrorBadgeModel";

export function ErrBadge() {
  const { err, setError } = useContext(ErrorBadgeContext);

  return (
    <>
      <div style={{
          opacity: err !== null ? 1 : 0,
          top: err !== null ? "20px" : "-100px",
          transition: "opacity 200ms ease, top 200ms ease",
          backgroundColor: err !== null ? (err.severity === Severities.HIGH ? "#ffbaad" : "#ffffb5") : "white",
          pointerEvents: err !== null ? "auto" : "none",
        }}
        className="flex items-center fixed left-1/2 -translate-x-1/2 -translate-y-1/2 justify-between px-4.5 py-2 w-100 max-h-40 rounded-full"
      >
          <img src={err !== null ? (err.severity === Severities.HIGH ? errorIcon : warningIcon) : ""} className="aspect-square w-7"></img>
          {err !== null && (
            <div className="row-start-1 col-start-1">
              <h1 className="font-bold sora-font">{err.title}</h1>
              <h1 className="sora-font text-sm">{err.description}</h1>
            </div>
          )}
      </div>
    </>
  );
}