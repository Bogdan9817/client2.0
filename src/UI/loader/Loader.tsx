import { useEffect, useState } from "react";
import "./styles.scss";
import data from "./config.json";
export default function Loader() {
  const [loaderLabel, setLoaderLabel] = useState<string>("гружу");

  useEffect(() => {
    const label = Math.round(Math.random() * data.loaderLabels.length);

    setLoaderLabel(data.loaderLabels[label]);
  }, []);
  return (
    <div aria-label='loading' className='loader fs-md fw-500'>
      {loaderLabel}
    </div>
  );
}
