import { theme } from "@/lib/data";

function PriorityChart({ toggle }: { toggle: Boolean }) {
  return (
    <div
      className={`text-xs lg:text-md border-2 relative top-2 ${
        toggle == false ? `border-black ${theme.textLight}` : "border-white"
      } p-2 rounded-lg flex flex-col gap-2 font-mono`}
    >
      PRIORITY
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 flex items-center justify-start rounded-full ${
              i === 0 ? "bg-yellow-300" : i === 1 ? "bg-teal-400" : "bg-red-600"
            }`}
          >
            <span className="ml-3">
              {i === 0 ? "Low" : i === 1 ? "Medium" : "High"}
            </span>
          </div>
        ))}
    </div>
  );
}

export default PriorityChart;
