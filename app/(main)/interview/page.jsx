import { getAssessments } from '@/actions/interview'
import React from 'react'
import StatsCards from './_components/stats-cards';
import PerformanceChart from './_components/performance-chart';
import QuizList from './_components/quix-list';

const interviewPage = async() => {
  const assessments=await getAssessments();
  return (
    <div>
      <div>
         <h1 className='text-6xl font-bold gradient-title mb-5'>
          Interview Preparation
         </h1>
         <div className='space-y-8'>
           <StatsCards assessments={assessments} />
           <PerformanceChart assessments={assessments} />
           <QuizList assessments={assessments} />
         </div>
      </div>
    </div>
  )
}

export default interviewPage