import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const GraficoResumen = ({ reservations }) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={reservations}>
          <XAxis dataKey="dateStart" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="places"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoResumen;
