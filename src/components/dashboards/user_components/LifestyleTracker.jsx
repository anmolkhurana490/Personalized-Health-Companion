import { useState } from "react";
import { FaFire, FaUtensils, FaMoon, FaSmile, FaEnvira, FaSmoking } from "react-icons/fa";
import { FaDroplet, FaMobileScreen } from "react-icons/fa6";
import { LuDumbbell } from "react-icons/lu";

const LifestyleTracker = () => {
  const [waterIntake, setWaterIntake] = useState(5); // litres of water
  const maxWater = 10;

  const [activeTab, setActiveTab] = useState("doctor-chat");
  const options = ["fitness", "exercise", "diet", "sleep", "stress", "hydration"]

  return (
    <div className="max-h-full overflow-auto custom-scrollbar p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">Lifestyle Tracker</h2>
      <p>Track your daily habits here.</p>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 p-4">
        {/* Fitness Overview */}

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <FaFire /><h3 className="text-xl font-semibold">Daily Activity</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <StatBox title="Steps" value="7,500" unit="steps" />
            <StatBox title="Calories Burned" value="450" unit="kcal" />
            <StatBox title="Active Minutes" value="45" unit="mins" />
          </div>
        </div>

        {/* Exercise Tracker */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <LuDumbbell /><h3 className="text-xl font-semibold">Workout Log</h3>
          </div>
          <div>
            <ul className="list-disc ml-4">
              <li>🏃 30 min Running</li>
              <li>💪 15 min Strength Training</li>
              <li>🧘 10 min Yoga</li>
            </ul>
          </div>
        </div>

        {/* Diet & Nutrition */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <FaUtensils /><h3 className="text-xl font-semibold">Daily Nutrition</h3>
          </div>
          <div>
            <ul className="list-disc ml-4">
              <li>🍎 Breakfast: Oatmeal & Fruits</li>
              <li>🥗 Lunch: Grilled Chicken Salad</li>
              <li>🍛 Dinner: Brown Rice & Vegetables</li>
            </ul>
          </div>
        </div>

        {/* Sleep Tracker */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <FaMoon /><h3 className="text-xl font-semibold">Sleep Patterns</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatBox title="Sleep Duration" value="7h 30m" />
            <StatBox title="Sleep Quality" value="85%" />
          </div>
        </div>

        {/* Mental Health Tracker (Mood & Stress) */}
        <div className="mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FaSmile /><h3 className="text-xl font-semibold">Mental Well-being & Stress</h3>
            </div>
            <div>
              <p>🧘 Mood: 😊 Relaxed</p>
              <p>📅 Meditation: 10 min</p>
              <p>📖 Journaling: 5 min</p>
            </div>
          </div>
        </div>

        {/* Hydration Tracker */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <FaDroplet /><h3 className="text-xl font-semibold">Water Intake</h3>
          </div>
          <div>
            <ProgressBar values={{ min: 0, curr: waterIntake, max: maxWater }} titles={{ curr: "Water Intake (in litres)", max: "Max Water (in litres)" }} />
          </div>
        </div>

        {/* Screen Time Tracker */}
        <div className="mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FaMobileScreen /><h3 className="text-xl font-semibold">Screen Time</h3>
            </div>
            <div>
              <StatBox title="Daily Usage" value="4h 15m" />
              <p>📲 Most Used App: Instagram (1h 20m)</p>
              <p>⏳ Productivity Apps: 45m</p>
            </div>
          </div>
        </div>

        {/* Environment Tracking (Air Quality, Noise) */}
        <div className="mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FaEnvira /><h3 className="text-xl font-semibold">Environmental Factors</h3>
            </div>
            <div>
              <StatBox title="Air Quality Index" value="85" unit="Good" />
              <p>🌍 Outdoor Temperature: 28°C</p>
              <p>🔊 Noise Level: 40dB (Moderate)</p>
            </div>
          </div>
        </div>


        {/* Intoxication Habits (Smoking, Alcohol, etc.) */}
        <div className="mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FaSmoking /><h3 className="text-xl font-semibold">Intoxication Habits</h3>
            </div>
            <div>
              <p>🚬 Smoking: ❌ No</p>
              <p>🍺 Alcohol: ✔ Occasionally</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Reusable component for stats
const StatBox = ({ title, value, unit }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    <p className="text-xl font-bold">{value} <span className="text-sm">{unit}</span></p>
  </div>
);

const ProgressBar = ({ values, titles }) => {
  return (
    <div className='relative'>
      <div className="w-full bg-gray-300 rounded-lg overflow-hidden">
        <div
          className="bg-blue-500 h-4 transition-all duration-500 peer"
          style={{ width: `${((values.curr - values.min) / (values.max - values.min)) * 100}%` }}
        ></div>

        <div className="absolute top-0 left-0 z-10 w-full h-full flex items-center justify-center opacity-0 transition-all duration-500 peer-hover:opacity-100 peer-hover:translate-y-10 pointer-events-none">
          <div className="bg-white p-4 rounded shadow-lg">
            <p><b>{titles.curr}:</b> {values.curr}</p>
            <p><b>{titles.max}:</b> {values.max}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between relative mt-1 text-sm">
        <span>{values.min}</span>
        <span>{values.max}</span>
      </div>
    </div>
  )
}

export default LifestyleTracker;
