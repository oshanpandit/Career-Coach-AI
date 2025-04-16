import { CheckCircle2, Trophy, XCircle } from 'lucide-react';
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const QuizResult = ({ result, hideStartNew = false, onStartNew }) => {
    if (!result) {
        return null;
    }
    return (
        <div className='mx-auto'>
            <h1 className='flex items-center gap-2 text-3xl gradient-title'>
                <Trophy className='h-6 w-6 text-yellow-500'>
                    Quiz Results
                </Trophy>
            </h1>
            <Card>
                <CardContent>
                    {/* {score and overview} */}
                    <div className='text-center space-y-2'>
                        <h3 className='text-2xl font-bold'>
                            {result.quizScore.toFixed(1)}%
                        </h3>
                        <Progress value={result.quizScore} className="w-full"></Progress>
                    </div>
                    {result.improvementTip && (
                        <div className='bg-muted p-4 rounded-lg mt-6'>
                            <p className='font-medium'>Improvement Tip:</p>
                            <p className='text-muted-foreground'>{result.improvementTip}</p>
                        </div>
                    )}
                    <div className='space-y-4'>
                        <h3 className='font-medium mt-4'>Question Review:</h3>
                        {result.questions.map((q,index) => (
                            <div key={index} className='border rounded-lg p-4 space-y-2'>
                                <div className='flex items-start justify-between gap-2'>
                                    <p className='font-medium'>{q.questions}</p>
                                    {q.isCorrect ? (
                                        <CheckCircle2 className='h-5 w-5 text-green-500 flex-shrink-0' />
                                    ) : (
                                        <XCircle className='h-5 w-5 text-red-500 flex-shrink-0' />
                                    )}
                                </div>
                                <div className='text-sm text-muted-foreground'>
                                    <p>Your Answer: {q.userAnswer}</p>
                                    {!q.isCorrect && <p>Correct answer:{q.answer}</p>}
                                </div>
                                <div className='text-sm bg-muted p-2 rounded'>
                                    <p className='font-medium'>Explanation:</p>
                                    <p>{q.explanation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
                {!hideStartNew && (
                    <CardFooter>
                        <Button onClick={onStartNew} className="w-full">
                            Start New Quiz
                        </Button>
                    </CardFooter>
                )}
            </Card>

        </div>
    )
}

export default QuizResult;