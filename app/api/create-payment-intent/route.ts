import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, metadata, merchantData } = body;

    if (!process.env.AMPLIFY_API_KEY) {
      return NextResponse.json({ error: "API key is not configured" }, { status: 500 });
    }

    if (!process.env.AMPLIFY_CLIENT_ID) {
      return NextResponse.json({ error: "Client ID is not configured" }, { status: 500 });
    }

    if (!process.env.AMPLIFY_API_URL) {
      return NextResponse.json({ error: "Amplify API URL is not configured" }, { status: 500 });
    }

    const requestBody: {
      amount?: number;
      metadata: Record<string, string | number | boolean>;
      merchantData: {
        name: string;
        description?: string;
        logo?: string;
      };
    } = {
      metadata,
      merchantData: {
        name: merchantData.name,
        description: merchantData.description,
        logo: merchantData.logo
      }
    };

    if (amount) {
      requestBody.amount = amount;
    }

    const paymentIntentResponse = await fetch(`${process.env.AMPLIFY_API_URL}/payment_intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: process.env.AMPLIFY_API_KEY,
        clientId: process.env.AMPLIFY_CLIENT_ID
      },
      body: JSON.stringify(requestBody)
    });

    if (!paymentIntentResponse.ok) {
      const errorText = await paymentIntentResponse.text();

      return NextResponse.json(
        { error: `API returned ${paymentIntentResponse.status}: ${errorText}` },
        { status: paymentIntentResponse.status }
      );
    }

    const paymentIntentData = await paymentIntentResponse.json();

    let url = paymentIntentData.url;

    if (process.env.SUCCESS_URL) {
      url = `${url}?redirect_url=${encodeURIComponent(`${process.env.SUCCESS_URL}`)}`;
    }

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
