import Astronaut from "./Astronaut";
import "./styles/styles.scss";

export default function AnimatedBg({ children }: { children: any }) {
  return (
    <div className='animated-bg'>
      <Astronaut />
      {children}
    </div>
  );
}
