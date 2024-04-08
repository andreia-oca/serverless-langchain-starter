import { GenezioDeploy } from "@genezio/types";
import { LanceDB } from "@langchain/community/vectorstores/lancedb";
import { loadQARefineChain, RetrievalQAChain } from "langchain/chains";
import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import * as lancedb from "vectordb";
// import { createVector } from "./CreateVectorDatabase";

@GenezioDeploy()
export class BackendService {
  constructor() {}

  async ask(question: string): Promise<string> {
    console.log("Attempting to answer:", question)
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
			throw new Error("You need to provide an OpenAI API key. Go to https://platform.openai.com/account/api-keys to get one.");
		}

    const database = "./server/lancedb";

    const model = new OpenAI({
			modelName: "gpt-4",
			openAIApiKey: OPENAI_API_KEY,
      temperature: 0.5,
			verbose: true
		});

    const db = await lancedb.connect(database);

    const table = await db.openTable('vectors')

    const vectorStore = new LanceDB(new OpenAIEmbeddings, { table })

		const chain = new RetrievalQAChain({
      combineDocumentsChain: loadQARefineChain(model),
      retriever: vectorStore.asRetriever(),
    })

    const response = await chain.invoke({
			query: question,
		});

    console.log("Answer:", response)
    return response.text;
  }
}
