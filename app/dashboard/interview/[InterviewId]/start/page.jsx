'use client'
import Question from './_components/Question'
import React, { useEffect, useState } from 'react'
// import RecordAnswer from './_components/RecordAnswer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'

const RecordAnswer = dynamic(() => import('./_components/RecordAnswer'), {
  ssr: false,
  loading: () => <p>Loading...</p>, // optional: show while component loads
})


function StartInterview({ params }) {
    const { InterviewId } = useParams();  // Ensure key is correct
    const [interviewQuestions, setInterviewQuestions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(0);

    useEffect(() => {
        async function fetchQuestions() {
            try {
                console.log(InterviewId); // Debugging
                const res = await fetch(`http://localhost:5000/api/questions/${InterviewId}`);
                const data = await res.json();
                setInterviewQuestions(data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        }

        if (InterviewId) fetchQuestions();  // Ensure it's fetched only when available
    }, [InterviewId]);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                <Question activeQuestion={activeQuestion} interviewQuestions={interviewQuestions} />
                <div className="md:sticky md:top-20">
                <RecordAnswer questionId={interviewQuestions[activeQuestion]?._id}  />
                
                </div>

            </div>
            <div className='flex justify-end gap-6'>
                {activeQuestion > 0 && <Button onClick={() => setActiveQuestion(activeQuestion - 1)}>Previous Question</Button>}
                {activeQuestion < interviewQuestions.length - 1 && <Button onClick={() => setActiveQuestion(activeQuestion + 1)}>Next Question</Button>}
                {activeQuestion === interviewQuestions.length - 1 && (
                    <Link href={`/dashboard/interview/${InterviewId}/feedback`}>
                        <Button>End Interview</Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default StartInterview;
