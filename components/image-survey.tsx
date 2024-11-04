"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Question = {
    imageUrl: string;
    optionA: string;
    optionB: string;
};

export function ImageSurvey({
    questions = [
        {
            imageUrl: "/placeholder.svg?height=600&width=800",
            optionA: "설명 A",
            optionB: "설명 B",
        },
        {
            imageUrl: "/placeholder.svg?height=600&width=800",
            optionA: "설명 C",
            optionB: "설명 D",
        },
        {
            imageUrl: "/placeholder.svg?height=600&width=800",
            optionA: "설명 E",
            optionB: "설명 F",
        },
    ],
}: {
    questions?: Question[];
}) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [results, setResults] = useState<string[]>([]);
    const [showResults, setShowResults] = useState(false);

    const handleSelect = (option: string) => {
        const newResults = [...results, option];
        setResults(newResults);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    const resetSurvey = () => {
        setCurrentQuestion(0);
        setResults([]);
        setShowResults(false);
    };

    if (showResults) {
        return (
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl">설문 결과</CardTitle>
                </CardHeader>
                <CardContent>
                    {questions.map((question, index) => (
                        <div key={index} className="mb-6">
                            <h3 className="text-xl font-bold mb-2">질문 {index + 1}</h3>
                            <p className="text-lg">선택: {results[index] === "A" ? question.optionA : question.optionB}</p>
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <Button onClick={resetSurvey} className="w-full text-xl py-6">
                        다시 시작
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    const question = questions[currentQuestion];

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-3xl">
                    이미지 설문조사 ({currentQuestion + 1}/{questions.length})
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <Progress value={(currentQuestion / questions.length) * 100} className="w-full h-2" />
                <div className="relative w-full aspect-video">
                    <Image src={question.imageUrl} alt={`설문 이미지 ${currentQuestion + 1}`} layout="fill" objectFit="cover" className="rounded-lg" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <Button onClick={() => handleSelect("A")} className="h-auto py-8 text-xl sm:text-2xl font-semibold" variant="outline">
                        {question.optionA}
                    </Button>
                    <Button onClick={() => handleSelect("B")} className="h-auto py-8 text-xl sm:text-2xl font-semibold" variant="outline">
                        {question.optionB}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
