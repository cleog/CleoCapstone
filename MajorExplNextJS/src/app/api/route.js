
import clientPromise from "../../lib/mongodb";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request) {

    try {
        const client = await clientPromise;
        const db = client.db("Quiz");
        const questions = await db
            .collection("Questions and answers")
            .find({})
            .sort({ group: 1 })
            .limit(100)
            .toArray();
        return Response.json({questions })
    } catch (e) {
        console.error(e);
    }
}
