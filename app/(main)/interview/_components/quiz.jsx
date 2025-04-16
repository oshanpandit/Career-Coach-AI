"use client";
import { useFetch } from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import { generateQuiz } from "@/actions/interview";
import { saveQuizResult } from "@/actions/interview";
import QuizResult from "./quiz-result";
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
import { toast } from "sonner";
import { Loader2 } from "lucide-react";


const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showExplanation, setShowExplanation] = useState(false);

    const {
        loading: generatingQuiz,
        fn: generateQuizFn,
        data: quizData,
    } = useFetch(generateQuiz);

    const {
        loading: savingResult,
        fn: saveQuizResultFn,
        data: resultData,
        setData: setResultData,
    } = useFetch(saveQuizResult);

    console.log(resultData);

    useEffect(() => {
        if (quizData) {
            setAnswers(new Array(quizData.length).fill(null))
        }
    }, [quizData]);
    const handleAnswer = (answer) => {
        console.log(answer)
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers);
    }
    const handleNext = () => {
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
            setShowExplanation(false);
        } else {
            finishQuiz();
        }
    }
    const calculateScore = () => {
        let correct = 0;
        answers.forEach((answer, index) => {
            if (answer === quizData[index].correctAnswer) {
                correct++;
            }
        });
        return (correct / quizData.length) * 100;
    }
    const finishQuiz = async () => {
        const score = calculateScore();
        try {
            await saveQuizResultFn(quizData, answers, score);
            toast.success("Quiz Completed!")
        } catch (error) {
            toast.error(error.message || "Failed to save quiz results");
        }
    }

    const startNewQuiz = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowExplanation(false);
        setResultData(null);
    }

    if (generatingQuiz) {
        return <BarLoader className="mt-4" width={"100%"} color="gray"></BarLoader>
    }

    // show results if quiz is completed
    if (resultData) {
        return (
            <div className="mx-2">
                <QuizResult result={resultData} onStartNew={startNewQuiz} />
            </div>
        );
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
            <CardContent className="space-y-4">
                <p className="text-lg font-medium">
                    {question.question}
                </p>

                <RadioGroup className="space-y-2"
                    onValueChange={handleAnswer}
                    value={answers[currentQuestion]}>
                    {question.options.map((option, index) => {
                        return (
                            <div className="flex items-center space-x-2" key={index}>
                                <RadioGroupItem value={option} id={`option-${index}`} />
                                <Label htmlFor={`option-${index}`}>{option}</Label>
                            </div>
                        )
                    })}
                </RadioGroup>

                {showExplanation &&
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                        <p className="font-medium">Explanation:</p>
                        <p className="text-muted-foreground">{question.explanation}</p>
                    </div>}

            </CardContent>
            <CardFooter>
                {!showExplanation && (
                    <Button
                        onClick={() => setShowExplanation(true)}
                        variant="outline"
                        disabled={!answers[currentQuestion]}
                    >
                        Show Explanation
                    </Button>
                )}

                <Button
                    onClick={handleNext}
                    className="ml-auto"
                    disabled={!answers[currentQuestion] || savingResult}
                >
                    {savingResult && (
                        <Loader2 className="mt-4" width={"100%"} color="gray" />
                    )}
                    {currentQuestion < quizData.length - 1 ? "Next Question" : "Finish Quiz"}
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Quiz;