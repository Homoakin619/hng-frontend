import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
    try {
        const url = 'https://api.themoviedb.org/3/movie/top_rated';
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        }
        };
        
        const data = await fetch(url, options);
        const result: fetchProps = await data.json()
        const payload = result.results.slice(0,10)
        return new NextResponse(JSON.stringify({"data":payload}),{status: 200})    
        
    } catch (error) {
        
        return new NextResponse(JSON.stringify({"message":""+error}),{status: 400})
    }
}