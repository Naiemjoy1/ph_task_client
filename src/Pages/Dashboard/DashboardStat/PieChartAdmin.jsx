import PropTypes from "prop-types";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartAdmin = ({ transfers }) => {
  const data = [
    { name: "Cash In", value: transfers.cashIn },
    { name: "Cash Out", value: transfers.cashOut },
    { name: "Send Money", value: transfers.sendMoney },
  ];

  return (
    <div>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

// Prop validation using PropTypes
PieChartAdmin.propTypes = {
  transfers: PropTypes.shape({
    cashIn: PropTypes.number.isRequired,
    cashOut: PropTypes.number.isRequired,
    sendMoney: PropTypes.number.isRequired,
  }).isRequired,
};

export default PieChartAdmin;
