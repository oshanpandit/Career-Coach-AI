"use client";
import { useFetch } from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import { generateQuiz } from "@/actions/interview";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showExplanation, setShowExplanation] = useState(false);
    const {
        loading: generatingQuiz,
        fn: generateQuizFn,
        data: quizData,
    } = useFetch(generateQuiz);

    useEffect(() => {
        if (quizData) {
            setAnswers(new Array(quizData.length).fill(null))
        }
    }, [quizData])
    if (generatingQuiz) {
        return <BarLoader className="mt-4" width={"100%"} color="gray"></BarLoader>
    }
    if (!quizData) {
        return (
            <Card className="mx-2">
                <CardHeader>
                    <CardTitle>Ready to test your knowledge</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        This quiz contains 10 questions specific to your industry
                        ans skills.Take your time and choose the best answer for each question.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button onClick={generateQuizFn}>Start Quiz</Button>
                </CardFooter>
            </Card>
        )
    }
    const question = quizData[currentQuestion];
    return (
        <Card className="mx-2">
            <CardHeader>
                <CardTitle>
                    Question {currentQuestion + 1} of {quizData.length}
                </CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-lg font-medium">
                    {question.question}
                </p>


                <RadioGroup className="space-y-2">
                    {question.options.map((option, index) => {
                        return (
                            <div className="flex items-center space-x-2" key={index}>
                            <RadioGroupItem value={option} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`}>{option}</Label>
                        </div>
                        )
                    })}
                </RadioGroup>


            </CardContent>
        </Card>
    )
}

export default Quiz