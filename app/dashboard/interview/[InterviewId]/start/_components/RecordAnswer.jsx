'use client'
import Webcam from 'react-webcam'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic, StopCircle, Save, PlayCircle, PauseCircle } from 'lucide-react'
import { toast } from 'sonner'

function RecordAnswer({ questionId }) {
  const [webCamEnabled, setWebCamEnabled] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [audioURL, setAudioURL] = useState('')
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioChunks = useRef([])
  const audioRef = useRef(null)

  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  })

  useEffect(() => {
    if (results.length > 0) {
      setUserAnswer(results.map((result) => result?.transcript).join(' '))
    }
  }, [results])

  // 🎤 Start/Stop Recording
  const handleRecordingToggle = async () => {
    if (isRecording) {
      stopSpeechToText()
      if (mediaRecorder) mediaRecorder.stop()
    } else {
      setResults([])
      setUserAnswer('')

      startSpeechToText()

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      setMediaRecorder(recorder)

      audioChunks.current = []
      recorder.ondataavailable = (e) => audioChunks.current.push(e.data)

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' })
        const url = URL.createObjectURL(audioBlob)
        setAudioURL(url)
        audioRef.current = new Audio(url)
        audioRef.current.onended = () => setIsPlaying(false) // reset on end
      }

      recorder.start()
    }
  }

  const handleSaveText = () => {
    if (userAnswer.trim().length === 0) {
      toast.error('No answer to save')
      return
    }

    localStorage.setItem('userAnswer', userAnswer)

    // ✅ Save audio only when text is saved
    if (audioURL) {
      localStorage.setItem('recordedAudio', audioURL)
    }

    toast.success('Text answer and audio saved to localStorage!')
  }

  const handlePlayAudio = () => {
    if (!audioRef.current) {
      const storedURL = audioURL || localStorage.getItem('recordedAudio')
      if (!storedURL) return toast.error('No audio found')
      audioRef.current = new Audio(storedURL)
      audioRef.current.onended = () => setIsPlaying(false)
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className='flex items-center justify-center flex-col'>
        <div className='flex flex-col justify-center items-center bg-black p-5 rounded-lg relative my-10'>
            <Image
            width={200}
            height={200}
            src={'/webcam.svg'}
            alt='webcam'
            className='absolute'
            />
            <Webcam
            mirrored={true}
            onUserMedia={() => setWebCamEnabled(true)}
            onUserMediaError={() => setWebCamEnabled(false)}
            style={{ height: 300, width: '100%', zIndex: 10 }}
            />
        </div>

        {/* 🎤 Buttons aligned horizontally */}
        <div className='flex space-x-4 my-4'>
            {/* 🎤 Toggle Record */}
            <Button
            className='flex items-center gap-2'
            variant='outline'
            onClick={handleRecordingToggle}
            disabled={loading}
            >
            {isRecording ? (
                <span className='text-red-600 flex items-center gap-2'>
                <StopCircle size={20} /> Stop Recording
                </span>
            ) : (
                <span className='text-[#4845D2] flex items-center gap-2'>
                <Mic size={20} /> Record Answer
                </span>
            )}
            </Button>

            {/* 💾 Save Text */}
            <Button
            className='flex items-center gap-2'
            variant='outline'
            onClick={handleSaveText}
            >
            <Save size={20} /> Save Text Answer
            </Button>

            {/* 🔊 Play/Pause Audio */}
            <Button
            className='flex items-center gap-2'
            variant='outline'
            onClick={handlePlayAudio}
            disabled={!audioURL && !localStorage.getItem('recordedAudio')}
            >
            {isPlaying ? (
                <>
                <PauseCircle size={20} /> Pause Audio
                </>
            ) : (
                <>
                <PlayCircle size={20} /> Play Audio
                </>
            )}
            </Button>
        </div>
    </div>

  )
}

export default RecordAnswer
