
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
        console.log("id:", id)
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
        return Response.json({questions })
    } catch (e) {
        console.error(e);
    }
}
