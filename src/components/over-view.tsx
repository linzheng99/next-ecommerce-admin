import React from 'react'
import { Bar, BarChart,ResponsiveContainer, XAxis, YAxis } from 'recharts'

import { type GraphRevenue } from "@/actions/get-graph-revenue"

 
export default function Overview({ data }: { data: GraphRevenue[] }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis 
          dataKey="name"
          stroke="#8884d8"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          dataKey="total"
          stroke="#8884d8"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) => `$${value}`}
        />
        <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
