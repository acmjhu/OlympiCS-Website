import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "data/past_events.json")

//GET
export async function GET() {
  try {
    const file = fs.readFileSync(filePath, "utf8")
    const data = JSON.parse(file)
    return NextResponse.json(data)

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch past events" },
      { status: 500 }
    )
  }
}

//POST
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { year, eventName, date, winners } = body

    const file = fs.readFileSync(filePath, "utf8")
    const data = JSON.parse(file)

    //adding new events
    data["Past events"][year] = {
      "event name": eventName,
      "date": date,
      "top 3 winners": winners
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    return NextResponse.json({ success: true })

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add event" },
      { status: 500 }
    )
  }
}