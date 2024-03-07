
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic' // defaults to auto

// Example of use:
// curl -X GET http://localhost:3000/api/questions
// curl -X GET http://localhost:3000/api/questions?id=65d82d964a0d5147032ed356

export async function GET(request) {

    const finderQuery = {}
    // Get the qsp fields for the request
    const qsp = new URL(request.url).searchParams;
    const id = qsp.get('id')
    if (id) {
        console.log("GET question with id:", id)
        finderQuery._id = new ObjectId(id)
    }

    try {
        const client = await clientPromise;
        const db = client.db("Quiz");
        const questions = await db
            .collection("Questions and answers")
            .find(finderQuery)
            .sort({ group: 1 })
            .limit(100)
            .toArray();
        return Response.json({ questions })
    } catch (e) {
        console.error(e);
    }
}


export async function PUT(request) {
    // TODO: authenticate the user
    const client = await clientPromise;
    const db = client.db("Quiz");
    const questions = db.collection("Questions and answers");
    let question = await request.json();

    console.log("question:")
    console.dir(question.answerOptions, 4)

    // TODO: validate the question object using zod or yup or something like that

    // Handy for when we mangle the data :)
    // question= {
    //     _id: '65d82f034a0d5147032ed35d',
    //     question: 'Do you want to pursue a career in the medical field?',
    //     group: 8,
    //     answerOptions: [
    //       { answer: 'Yes!!', matches: ["RHP", "BE"] },
    //       { answer: 'Not really', matches: ["AE", "CE", "CS", "ECE", "ES", "MeE", "NE", "OP", "RHP", "BE", "EcolE", "EnvE", "CivE", "CEM"] },
    //       { answer: 'Not sure', matches: [] }
    //     ]
    //   }

    // Remove _id from the question object - use this as a filter instead
    const id = question._id;
    delete question._id;

    try {
        const result = await questions.replaceOne(
            { _id: new ObjectId(id) },
            question
        );
        console.log("PUT question result:", result)
        return Response.json(result)
    } catch (e) {
        console.error(e);
        return Response.json({ error: e })
    }
}





// Example of a body for a PUT request:

// question: {
//     _id: '65d82f034a0d5147032ed35d',
//     question: 'Do you want to pursue a career in the medical field?',
//     group: 8,
//     answerOptions: [
//       { answer: 'Yes!!', matches: ["RHP", "BE"] },
//       { answer: 'Not really', matches: ["AE", "CE", "CS", "ECE", "ES", "MeE", "NE", "OP", "RHP", "BE", "EcolE", "EnvE", "CivE", "CEM"] },
//       { answer: 'Not sure', matches: [] }
//     ]
//   }



export async function POST(request) {
    // TODO: authenticate the user
    const client = await clientPromise;
    const db = client.db("Quiz");
    const questions = db.collection("Questions and answers");
    let question = await request.json();

    console.log("question:")
    console.dir(question.answerOptions, 4)

    // TODO: validate the question object using zod or yup or something like that
    // TODO: validate there is no _id field in the question object

    try {
        const result = await questions.insertOne(question);
        console.log("POST question result:", result)
        return Response.json(result)
    } catch (e) {
        console.error(e);
        return Response.json({ error: e })
    }
}

export async function DELETE(request) {
    const client = await clientPromise;
    const db = client.db("Quiz");
    const questions = db.collection("Questions and answers");
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    console.log("DELETE question with id:", id)
      
    try {
        const result = await questions.deleteOne({ _id: new ObjectId(id) });
        console.log("DELETE question result:", result)
        return Response.json(result)
    } catch (e) {
        console.error(e);
        return Response.json({ error: e })
    }

}