import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Chroma } from 'langchain/vectorstores/chroma';
import { makeChain } from '@/utils/makechain';
import { COLLECTION_NAME } from '@/config/chroma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { question, history } = req.body;

  console.log('question', question);
  console.log('history', history);

  //only accept post requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!question) {
    return res.status(400).json({ message: 'No question in the request' });
  }
  // OpenAI recommends replacing newlines with spaces for best results
  const sanitizedQuestion = question.trim().replaceAll('\n', ' ');

  try {

    /* create vectorstore*/
    console.log("111111111111111111111111111111111111111")
    const vectorStore = await Chroma.fromExistingCollection(
      new OpenAIEmbeddings({}),
      {
        collectionName: COLLECTION_NAME,
        url:'http://192.168.31.107:9000',
        
       },
    );

    console.log(vectorStore,"2222222222222222222222")

    //create chain
    
    const chain = makeChain(vectorStore);
    //Ask a question using chat history
    console.log(chain,"333333333333333333333333333333333333333333333")
    const response = await chain.call({
      question: sanitizedQuestion,
      chat_history: history || [],
      
    }
    ,{});

    console.log('response', response);
    res.status(200).json(response);
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}
