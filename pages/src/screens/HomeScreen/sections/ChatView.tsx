/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useState, useEffect } from 'react';
import {
  Button,
  Divider,
  Chip,
  Card,
  CardBody,
  Textarea,
} from '@nextui-org/react';
import { Message } from '@/types/chat';

import { AiOutlineDownload } from 'react-icons/ai';
import { GrClearOption } from 'react-icons/gr';
import { IoMdSend } from 'react-icons/io';
import UserMessageCard from './components/userMessageCard';
import LoadingDots from '@/components/ui/LoadingDots';
import { Document } from 'langchain/document';

function ChatView() {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalMessages, setTotalMessages] = useState<number>(0);
  const [messageState, setMessageState] = useState<{
    messages: Message[];
    pending?: string;
    history: [string, string][];
    pendingSourceDocs?: Document[];
  }>({
    messages: [
      {
        message: 'Hi, what would you like to learn about this document?',
        type: 'apiMessage',
      },
    ],
    history: [],
  });

  const { messages, history } = messageState;

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    textAreaRef.current?.focus();
    setTotalMessages(messages.length);
  }, [messages]);

  useEffect(() => {
    messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
  }, [messages]);

  function cleanChats() {
    setQuery('')
    setLoading(false)
    setError(null)
    setTotalMessages(0)
    setMessageState({
      messages: [
        {
          message: 'Hi, what would you like to learn about this document?',
          type: 'apiMessage',
        },
      ],
      history: [],
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError(null);

    if (!query) {
      alert('Please input a question');
      return;
    }

    const question = query.trim();

    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: 'userMessage',
          message: question,
        },
      ],
    }));

    setLoading(true);
    setQuery('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          history,
          
        }),
      });
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: 'apiMessage',
              message: data.text,
              sourceDocs: data.sourceDocuments,
            },
          ],
          history: [...state.history, [question, data.text]],
        }));
        setTotalMessages((prevTotalMessages) => prevTotalMessages + 1);
      }

      setLoading(false);

      messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
    } catch (error) {
      setLoading(false);
      setError('An error occurred while fetching the data. Please try again.');
      console.log('error', error);
    }
  }

  const handleEnter = (e: any) => {
    if (e.key === 'Enter' && query) {
      handleSubmit(e);
    } else if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleDownload = () => {
    const messagesText = messages.map(
      (message) => `${message.type === 'userMessage' ? 'User: ' : 'Bot: '}${message.message}`
    );

    const blob = new Blob([messagesText.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat_messages.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-[90vh] ">
      <div className="flex flex-row">
        <Button className="mt-2 mb-2 ml-4" isIconOnly variant="ghost" onClick={handleDownload}>
          <AiOutlineDownload />
        </Button>
        <Button className="mt-2 mb-2 ml-2" isIconOnly variant="ghost" onClick={cleanChats}>
          <GrClearOption />
        </Button>
        <Chip className="self-center ml-auto mr-4">{`${totalMessages}/30`}</Chip>
      </div>
      <Divider />
      <div className="flex flex-col overflow-y-auto min-h-[65vh]" ref={messageListRef}>
        {messages.map((message, index) => (
          <UserMessageCard
            key={`userMessage-${index}`}
            user={message.type === 'userMessage'}
            message={message.message}
          // sourceDocs={message.sourceDocs}
          />
        ))}
        {loading && (
          <div >
            <Card className={`m-2 max-w-20 h-10`}>
              <CardBody className='flex justify-center align-center items-center'>
                <LoadingDots color="#000" />
              </CardBody>
            </Card>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-end p-4 pb-0">
          <Textarea
            ref={textAreaRef}
            className="mr-1"
            label="Description"
            placeholder="Enter your message"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleEnter}
          />
          <Button type="submit" className="ml-1 mb-2" isIconOnly color="primary" isDisabled={loading}>
            <IoMdSend className="w-full" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChatView;
