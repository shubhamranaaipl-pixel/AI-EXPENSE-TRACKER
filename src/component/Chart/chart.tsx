"use client";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface IChartProps {
  type: "bar" | "line";
  data: any[];
  dataKey: string;
  xAxisKey: string;
}

export default function Chart({type, data, dataKey, xAxisKey}: IChartProps ){
  console.log("")
  return (
    <ResponsiveContainer width="100%" height={300}>
      {type == "bar" ? (
        <BarChart data={data}>
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey}  fill="#3b82f6"/>
        </BarChart>
      ) : (
        <LineChart data={data}>
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Line  type="monotone" dataKey={dataKey} stroke="#ef4444" strokeWidth={2}/>
        </LineChart>
      )}
    </ResponsiveContainer>
  );
}
