"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

const QuizList = ({ assessments }) => {
    const router = useRouter();
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    return (
        <div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="gradient-title text-3xl md:text-4xl">Recent Quizzes</CardTitle>
                        <CardDescription>Review your past quiz performance</CardDescription>
                    </div>
                    <Button onClick={() => router.push("/interview/mock")} className="cursor-pointer">
                        Start New Quiz
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className='space-y-4'>
                        {assessments.map((assessment, i) => {
                            return (
                                <Card key={assessment.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                                    <CardHeader>
                                        <CardTitle>Quiz {i + 1}</CardTitle>
                                        <CardDescription className="flex justify-between w-full">
                                            <div>
                                                Score: {assessment.quizScore.toFixed(1)}%
                                            </div>
                                            <div>
                                                {format(
                                                    new Date(assessment.createdAt),
                                                    "MMMM dd, yyyy HH:mm"
                                                )}
                                            </div>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className='text-sm text-muted-foreground'>
                                        {assessment.improvementTip}
                                        </p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default QuizList