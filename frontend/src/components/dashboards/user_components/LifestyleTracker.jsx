import { useContext, useState } from "react";
import { FaFire, FaUtensils, FaMoon, FaSmile, FaEnvira, FaSmoking } from "react-icons/fa";
import { FaDroplet, FaMobileScreen } from "react-icons/fa6";
import { LuDumbbell } from "react-icons/lu";
import { AppContext } from "../../../AppProvider";

const LifestyleTracker = () => {
  const { darkTheme } = useContext(AppContext);
  const [waterIntake, setWaterIntake] = useState(5); // litres of water
  const maxWater = 10;

  return (
    <div
      className={`max-h-full overflow-auto custom-scrollbar p-4 rounded shadow ${darkTheme ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
    >
      <h2 className="text-2xl font-semibold mb-2">Lifestyle Tracker</h2>
      <p>Track your daily habits here.</p>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 p-4">
        {/* Fitness Overview */}
        <Section title="Daily Activity" icon={<FaFire />} darkTheme={darkTheme}>
          <div className="grid grid-cols-3 gap-4">
            <StatBox title="Steps" value="7,500" unit="steps" darkTheme={darkTheme} />
            <StatBox title="Calories Burned" value="450" unit="kcal" darkTheme={darkTheme} />
            <StatBox title="Active Minutes" value="45" unit="mins" darkTheme={darkTheme} />
          </div>
        </Section>

        {/* Exercise Tracker */}
        <Section title="Workout Log" icon={<LuDumbbell />} darkTheme={darkTheme}>
          <ul className="list-disc ml-4">
            <li>🏃 30 min Running</li>
            <li>💪 15 min Strength Training</li>
            <li>🧘 10 min Yoga</li>
          </ul>
        </Section>

        {/* Diet & Nutrition */}
        <Section title="Daily Nutrition" icon={<FaUtensils />} darkTheme={darkTheme}>
          <ul className="list-disc ml-4">
            <li>🍎 Breakfast: Oatmeal & Fruits</li>
            <li>🥗 Lunch: Grilled Chicken Salad</li>
            <li>🍛 Dinner: Brown Rice & Vegetables</li>
          </ul>
        </Section>

        {/* Sleep Tracker */}
        <Section title="Sleep Patterns" icon={<FaMoon />} darkTheme={darkTheme}>
          <div className="grid grid-cols-2 gap-4">
            <StatBox title="Sleep Duration" value="7h 30m" darkTheme={darkTheme} />
            <StatBox title="Sleep Quality" value="85%" darkTheme={darkTheme} />
          </div>
        </Section>

        {/* Mental Health Tracker */}
        <Section title="Mental Well-being & Stress" icon={<FaSmile />} darkTheme={darkTheme}>
          <p>🧘 Mood: 😊 Relaxed</p>
          <p>📅 Meditation: 10 min</p>
          <p>📖 Journaling: 5 min</p>
        </Section>

        {/* Hydration Tracker */}
        <Section title="Water Intake" icon={<FaDroplet />} darkTheme={darkTheme}>
          <ProgressBar
            values={{ min: 0, curr: waterIntake, max: maxWater }}
            titles={{ curr: "Water Intake (in litres)", max: "Max Water (in litres)" }}
            darkTheme={darkTheme}
          />
        </Section>

        {/* Screen Time Tracker */}
        <Section title="Screen Time" icon={<FaMobileScreen />} darkTheme={darkTheme}>
          <StatBox title="Daily Usage" value="4h 15m" darkTheme={darkTheme} />
          <p>📲 Most Used App: Instagram (1h 20m)</p>
          <p>⏳ Productivity Apps: 45m</p>
        </Section>

        {/* Environment Tracking */}
        <Section title="Environmental Factors" icon={<FaEnvira />} darkTheme={darkTheme}>
          <StatBox title="Air Quality Index" value="85" unit="Good" darkTheme={darkTheme} />
          <p>🌍 Outdoor Temperature: 28°C</p>
          <p>🔊 Noise Level: 40dB (Moderate)</p>
        </Section>

        {/* Intoxication Habits */}
        <Section title="Intoxication Habits" icon={<FaSmoking />} darkTheme={darkTheme}>
          <p>🚬 Smoking: ❌ No</p>
          <p>🍺 Alcohol: ✔ Occasionally</p>
        </Section>
      </div >
    </div>
  );
};

const Section = ({ title, icon, children, darkTheme }) => (
  <div className="mb-6">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <div
      className={`p-4 rounded ${darkTheme ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"
        }`}
    >
      {children}
    </div>
  </div>
);

const StatBox = ({ title, value, unit, darkTheme }) => (
  <div
    className={`p-4 rounded-lg shadow-sm text-center ${darkTheme ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
      }`}
  >
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    <p className="text-xl font-bold">
      {value} <span className="text-sm">{unit}</span>
    </p>
  </div>
);

const ProgressBar = ({ values, titles, darkTheme }) => {
  return (
    <div className="relative">
      <div
        className={`w-full rounded-lg overflow-hidden ${darkTheme ? "bg-gray-600" : "bg-gray-300"
          }`}
      >
        <div
          className={`h-4 transition-all duration-500 ${darkTheme ? "bg-blue-700" : "bg-blue-500"
            }`}
          style={{ width: `${((values.curr - values.min) / (values.max - values.min)) * 100}%` }}
        ></div>
      </div>
      <div className="w-full flex justify-between relative mt-1 text-sm">
        <span>{values.min}</span>
        <span>{values.max}</span>
      </div>
    </div>
  );
};

export default LifestyleTracker;
