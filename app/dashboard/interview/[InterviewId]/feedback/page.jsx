'use client'
import React, {useState} from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronDown, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
  
function feedback() {
    const [feedbackList, setFeedbackList] = useState([
        {
            "question": "Can you explain the virtual DOM in React and how it improves performance compared to the traditional DOM?",
            "user_answer": "The virtual DOM is a lightweight copy of the real DOM that React uses to track changes before updating the actual DOM. React first updates the virtual DOM, calculates the difference using a process called reconciliation, and then updates only the changed parts of the real DOM. This improves performance by reducing direct manipulation of the actual DOM, which is slow.",
            "correct_answer": "The virtual DOM is a programming concept where a virtual representation of the UI is kept in memory and synced with the real DOM using a process called reconciliation. React updates the virtual DOM first, calculates the difference (diffing algorithm), and then updates only the necessary parts of the real DOM, improving efficiency and performance.",
            "rating": 4.5,
            "feedback": "Good explanation of the virtual DOM and its role in improving performance. More details on reconciliation and fiber architecture could enhance the answer."
        },
        {
            "question": "How does JavaScript handle asynchronous operations, and what are the differences between callbacks, promises, and async/await?",
            "user_answer": "JavaScript handles asynchronous operations using callbacks, promises, and async/await. Callbacks were used earlier but led to callback hell. Promises help avoid this by providing better chaining. Async/await makes it even easier by allowing us to write asynchronous code in a synchronous way.",
            "correct_answer": "JavaScript handles asynchronous operations using the event loop, which allows non-blocking execution. Callbacks were an early approach but led to 'callback hell' due to deep nesting. Promises improved this by providing `.then()` chaining and better error handling with `.catch()`. Async/await is a syntactic improvement over promises, making asynchronous code easier to read and manage by allowing `await` to pause execution until the promise resolves.",
            "rating": 3.8,
            "feedback": "Covered the basics well but lacked depth in explaining the drawbacks of callbacks and how async/await simplifies error handling."
        },
        {
            "question": "What are the key differences between microservices and monolithic architectures, and what are the challenges in migrating from a monolith to microservices?",
            "user_answer": "Microservices break an application into smaller services that can run independently, whereas monolithic architecture keeps everything in a single codebase. Migrating requires breaking dependencies, managing databases, and ensuring communication between services using APIs or message queues.",
            "correct_answer": "A monolithic architecture consists of a single codebase where all modules are tightly coupled, making it harder to scale and maintain. Microservices break an application into independent, loosely coupled services that communicate via APIs. Migration challenges include breaking dependencies, ensuring data consistency across services, implementing service discovery, handling network latency, and choosing the right communication mechanism (synchronous vs. asynchronous).",
            "rating": 4.2,
            "feedback": "Clearly differentiated microservices from monolithic architecture. Could improve by mentioning real-world migration challenges such as data consistency and inter-service communication."
        },
        {
            "question": "In what scenarios would you use indexing in a database, and what are the trade-offs between clustered and non-clustered indexes?",
            "user_answer": "Indexing is used to speed up data retrieval by creating a lookup table. Clustered indexes determine the physical order of data, making searches faster but inserts slower. Non-clustered indexes store pointers to data, allowing multiple indexes but requiring extra storage.",
            "correct_answer": "Indexing improves database performance by reducing the time required to fetch data. A clustered index sorts and stores the data rows in order, making range queries faster but slowing down insertions and updates. A non-clustered index maintains a separate structure pointing to data, allowing multiple indexes but increasing storage overhead. Indexing is useful for queries with frequent searches but should be balanced with the cost of maintaining indexes.",
            "rating": 4.0,
            "feedback": "Good understanding of indexing and trade-offs. Could have elaborated more on performance implications and storage overhead."
        },
        {
            "question": "How does the event loop work in Node.js, and why is it important for handling asynchronous operations efficiently?",
            "user_answer": "The event loop in Node.js continuously checks the call stack and handles asynchronous tasks by moving them between the call stack and the task queue. It allows non-blocking operations, ensuring efficiency in handling I/O operations and timers.",
            "correct_answer": "The event loop in Node.js is a mechanism that allows JavaScript to handle asynchronous operations non-blockingly. It consists of phases: timers (setTimeout, setInterval), pending callbacks, idle/prepare, I/O polling, setImmediate callbacks, and close callbacks. The event loop continuously checks the call stack and executes tasks from the callback queue when the stack is empty. This enables Node.js to handle I/O-bound operations efficiently.",
            "rating": 4.7,
            "feedback": "Excellent explanation of the event loop, including phases and asynchronous behavior. Minor improvements needed in describing how timers and I/O operations fit into the loop."
        }
    ]);
    const router = useRouter()
    return (
    <div className='p-10'>
         {feedbackList?.length==0?
         <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Record Found</h2>
         :
         <>
         <h2 className='text-3xl font-bold text-green-500'>Congratulation!</h2>
         <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
         <h2 className='text-[#4845D2] text-lg my-3'>Your overall interview rating: <strong>7/10</strong></h2>
        <h2 className='text-sm text-gray-500'>Find below interview questions with correct answer, Your answer and feedback for improvement:</h2>
        {feedbackList&&feedbackList.map((item,index)=>(
            <Collapsible key={index} className='mt-7'>
            <CollapsibleTrigger className='p-2 bg-secondary flex justify-between rounded-lg my-2 text-left gap-7 w-full'>{item.question}<ChevronsUpDown className='h-5 w-5'/></CollapsibleTrigger>
            <CollapsibleContent>
              <div className='flex flex-col gap-2'>
                <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
                <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer:</strong>{item.user_answer}</h2>
                <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer:</strong>{item.correct_answer}</h2>
                <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-[#4845D2]'><strong>Feedback:</strong>{item.feedback}</h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}       
        </>}
        <Button onClick={()=>{router.replace('/dashboard')}}>Go Home</Button>
    </div>
  )
}

export default feedback 