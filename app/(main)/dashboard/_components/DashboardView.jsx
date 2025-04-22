'use client';
import React from 'react'
import { TrendingUp, LineChart, TrendingDown, BriefcaseIcon, Brain } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from '@/components/ui/progress';


const DashboardView = ({ insights }) => {
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000
  }));
  const getDemandLevelColor = (level) => {
    level = level.toLowerCase();
    if (level == "high") return "bg-green-500";
    else if (level == 'medium') return "bg-yellow-500";
    else if (level == 'low') return "bg-red-500";
    else return "bg-gray-500";
  }
  const getMarketOutlookInfo = (outlook) => {
    outlook = outlook.toLowerCase();
    if (outlook == "positive") return { icon: TrendingUp, color: "text-green-500" };
    else if (outlook == 'neutral') return { icon: LineChart, color: "text-yellow-500" };
    else if (outlook == 'negative') return { icon: TrendingDown, color: "text-red-500" };
    else return { icon: LineChart, color: "bg-gray-500" };
  }

  const { icon: OutLookIcon, color: outLookColor } = getMarketOutlookInfo(insights.marketOutlook);

  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdatedDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  )

  // console.log(insights);
  return (
    <div className='space-y-6'>
      <div>
        <Badge variant="outline">Last updated: {lastUpdatedDate}</Badge>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        <Card>
          <CardHeader className="flex items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Market Outlook</CardTitle>
            <OutLookIcon className={`h-4 w-4 ${outLookColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{insights.marketOutlook}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Next Update {nextUpdatedDistance}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Industry Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {" "}
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress value={insights.growthRate} className="mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Demand Level</CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{insights.demandLevel}</div>
            <div className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
              insights.demandLevel
            )}`}>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Top Skills</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {insights.topSkills.map((skill) => {
                return (
                  <Badge key={skill} variant="secondary" className="text-[14px]">{skill}</Badge>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-medium mb-2">Salary Ranges by Role</CardTitle>
          <CardDescription>
            Displaying minimum,median and maximum salaried (in thousands)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='h-[400px] mt-4'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className='bg-background border rounded-lg p-2 shadow-md'>
                        <p className='font-medium'>{label}</p>
                        {payload.map((item) => (
                          <p key={item.name} className='text-sm'>
                            {item.name}: ${item.value}K
                          </p>
                        ))}
                      </div>
                    )
                  }
                  return null;
                }} />
                <Legend />
                <Bar dataKey="min" fill="#94a3b8" name="Min Salary (K)" />
                <Bar dataKey="median" fill="#64748b" name="Median Salary (K)" />
                <Bar dataKey="max" fill="#475569" name="Max Salary (K)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-medium">Top Skills</CardTitle>
            <CardDescription>
               Current trends shaping the industry
            </CardDescription>
          </CardHeader>
          <CardContent>
             <ul className='space-y-4'>
                {insights.keyTrends.map((trend,index)=>(
                  <li key={index} className='flex items-start space-x-2'>
                    <div className='h-2 w-2 mt-2 rounded-full bg-primary'></div>
                    <span>{trend}</span>
                  </li>
                ))}
             </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-medium">Recommended Skills</CardTitle>
            <CardDescription>
               Skills to   consider while developing
            </CardDescription>
          </CardHeader>
          <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {insights.recommendedSkills.map((skill)=>(
                    <Badge key={skill} variant="outline" className='text-[14px]'>
                       {skill}
                    </Badge>
                  ))}
                </div>
          </CardContent>
        </Card>

      </div>

    </div>
  )
}

export default DashboardView