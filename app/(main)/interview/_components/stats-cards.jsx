"use"
import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Brain, Trophy } from 'lucide-react';
  
const StatsCards = ({assessments}) => {

  const getAverageScore=()=>{
    if(!assessments?.length) return 0;

      const total=assessments.reduce((sum,assessment)=>{
             return sum+assessment.quizScore
      },0);

      return (total/assessments.length).toFixed(1);
  }
  const getLatestAssessment=()=>{
    if(!assessments?.length) return null;
    return assessments[0];
  }
  const getTotalQuestions=()=>{
    if(!assessments?.length) return 0;
    return assessments.reduce((sum,assessment)=>{
        return sum+assessment.questions.length
    },0)
  }
  return (
    <div className='grid gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Average Score</CardTitle>
            <Trophy className={`h-4 w-4 text-muted-foreground`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getAverageScore()}%</div>
            <p className="text-xs text-muted-foreground mt-2">
              Across All Assessments 
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Questions Practiced</CardTitle>
            <Brain className={`h-4 w-4 text-muted-foreground`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalQuestions()}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Total Questions 
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Latest Score</CardTitle>
            <Trophy className={`h-4 w-4 text-muted-foreground`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getLatestAssessment()?.quizScore.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-2">
              Recent Quiz Result  
            </p>
          </CardContent>
        </Card>

    </div>
  )
}

export default StatsCards;