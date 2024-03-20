import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Chroma } from 'langchain/vectorstores/chroma';
import { CustomPDFLoader } from '@/utils/customPDFLoader';
import { COLLECTION_NAME } from '@/config/chroma';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { ChromaClient, Collection } from 'chromadb'

const client = new ChromaClient({path:"http://192.168.31.107:9000"});



/* Name of directory to retrieve your files from */
const filePath = 'docs';


export const run = async () => {
  try {
    /*load raw docs from the all files in the directory */
    const directoryLoader = new DirectoryLoader(filePath, {
      '.pdf': (path) => new CustomPDFLoader(path),
    });

    // const loader = new PDFLoader(filePath);
    const rawDocs = await directoryLoader.load();

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    

    console.log('creating vector store...');
    /*create and store the embeddings in the vectorStore*/
    const embeddings = new OpenAIEmbeddings();

     const res = await client.createCollection({name:COLLECTION_NAME})
     const resJson = await JSON.stringify(res)
     console.log(resJson+"resJson")

    let chroma = new Chroma(embeddings, {collectionName: COLLECTION_NAME})
    
    await chroma.index?.reset()
    console.log("here1")
    
    //embed the PDF documents

    // Ingest documents in batches of 100

    for (let i = 0; i < docs.length; i += 100) {
      console.log("here2")
      const batch = docs.slice(i, i + 100);
      console.log(batch,COLLECTION_NAME,"batch")
      await Chroma.fromDocuments(batch, embeddings, {
        collectionName: COLLECTION_NAME,
        url: "http://192.168.31.107:9000",
      });
      console.log("here3")
    }
  } catch (error) {
    console.log(error)
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('ingestion complete');
})();
