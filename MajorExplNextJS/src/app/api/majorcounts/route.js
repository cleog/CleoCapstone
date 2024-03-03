
import clientPromise from "../../../lib/mongodb";

export const dynamic = 'force-dynamic' // defaults to auto


// This GETS all the 'quiz result data' from the database - an array of {shortcode: count} pairs
export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db("Quiz");
        const counts = await db
            .collection("quiz result data")
            .find({})
            .limit(20)
            .toArray();
        return Response.json({counts })
    } catch (e) {
        console.error(e);
    }
}

// This method will increment the count for the given major shortcode
export async function POST(request) {
    const body = await request.json();
    const results = []
    const { shortcodes } = body;
    const shortcodeArray = shortcodes.split(',');
    for (let shortcode of shortcodeArray) {
        try {
            const client = await clientPromise; // Connect to the database
            const db = client.db("Quiz");
            const oneResult = await db.collection("quiz result data").updateOne(
                { shortcode },
                { $inc: { count: 1 } },
                { upsert: true }
            );
            results.push(oneResult);
        } catch (e) {
            console.error(e);
        }
    }
    return Response.json({ results });
}

// To test this API, run the following command in the terminal:
// curl -X PUT http://localhost:3000/api/majorcounts -H "Content-Type: application/json" -d '{"shortcodes": "AE,CS"}'
