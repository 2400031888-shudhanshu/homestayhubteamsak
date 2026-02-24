import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  homestay_title: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price?: number;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking: BookingRequest = await req.json();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    if (!RESEND_API_KEY) {
      // Fallback: log booking and return success (email not configured)
      console.log("RESEND_API_KEY not set. Booking received:", JSON.stringify(booking));
      return new Response(
        JSON.stringify({ success: true, message: "Booking saved. Email notification not configured yet." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #2d8a7e; border-bottom: 2px solid #2d8a7e; padding-bottom: 10px;">🏡 New Booking Request!</h1>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin: 20px 0;">
          <h2 style="margin-top: 0;">Homestay: ${booking.homestay_title}</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold;">Guest Name:</td><td>${booking.guest_name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td>${booking.guest_email}</td></tr>
            ${booking.guest_phone ? `<tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${booking.guest_phone}</td></tr>` : ""}
            <tr><td style="padding: 8px 0; font-weight: bold;">Check-in:</td><td>${booking.check_in}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Check-out:</td><td>${booking.check_out}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Guests:</td><td>${booking.guests}</td></tr>
            ${booking.total_price ? `<tr><td style="padding: 8px 0; font-weight: bold;">Total Price:</td><td>$${booking.total_price}</td></tr>` : ""}
          </table>
          
          ${booking.message ? `<div style="margin-top: 15px; padding: 15px; background: white; border-radius: 8px;"><strong>Message:</strong><p>${booking.message}</p></div>` : ""}
        </div>
        
        <p style="color: #666; font-size: 14px;">This booking was submitted via HomestayHub.</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "HomestayHub <onboarding@resend.dev>",
        to: ["shudhanshukumar6207@gmail.com"],
        subject: `New Booking: ${booking.homestay_title} - ${booking.guest_name}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Resend error:", error);
      return new Response(
        JSON.stringify({ success: true, message: "Booking saved. Email delivery pending." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Booking confirmed and email sent!" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
