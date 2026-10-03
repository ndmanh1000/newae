import { NextResponse } from "next/server";
import { generateSmartReply } from "@/lib/chatAiEngine";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If Gemini API Key is provided, use Generative LLM
    if (apiKey) {
      try {
        const systemPrompt = `Bạn là Thu Hà - Dược sĩ & Chuyên viên Dinh dưỡng cấp cao tại KEYAVO Việt Nam (Thương hiệu Dầu Bơ Ép Lạnh Nguyên Chất Điểm Khói 270°C từ 100% bơ Hass Đắk Lắk).
Phong cách của bạn:
- Xưng hô: "Dạ em chào anh/chị", "Dạ anh/chị yên tâm ạ".
- Giọng điệu: Thân thiện, tận tâm, chuẩn xác y khoa và dinh dưỡng, lịch sự, ân cần.
- Thông tin cốt lõi:
  + Dầu bơ Keyavo ép lạnh cơ học dưới 40°C, 100% nguyên chất, điểm khói 270°C cao nhất thế giới, không khét, không sinh khói độc Acrolein.
  + Chứa >72% Omega-9 (Axit Oleic), giàu Vitamin E, Lutein cho mắt & tim mạch, 0% cholesterol, 0% chất béo chuyển hóa.
  + Trẻ từ 6 tháng bắt đầu ăn dặm dùng được (3-5 giọt/bữa, nhỏ vào cháo ấm sau khi tắt bếp).
  + Chai 500ml Extra Virgin (499.000đ), Chai Baby 250ml (320.000đ), Chai Dropper 100ml (199.000đ), Giftset 3 chai (990.000đ).
  + Mã giảm giá 15% cho đơn đầu tiên: KEYAVO15. Freeship toàn quốc từ 500.000đ. Đổi trả 14 ngày.
  + Hotline: 1900 8888, Zalo Official Account.
Hãy trả lời ngắn gọn, súc tích (tối đa 3-4 câu), tự nhiên, dễ hiểu và sẵn sàng hỗ trợ tiếp.`;

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const geminiRes = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  { text: `${systemPrompt}\n\nKhách hàng hỏi: "${message}"\nHãy trả lời bằng tiếng Việt:` },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 300,
            },
          }),
        });

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const candidateText =
            data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            return NextResponse.json({
              reply: candidateText.trim(),
              source: "gemini-llm",
            });
          }
        }
      } catch (llmError) {
        console.warn("LLM API call failed, falling back to Knowledge Engine:", llmError);
      }
    }

    // Fallback to built-in Smart Knowledge Engine
    const result = generateSmartReply(message);
    return NextResponse.json({
      ...result,
      source: "knowledge-engine",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "Dạ hệ thống đang ghi nhận câu hỏi của anh/chị. Anh/chị có thể để lại số điện thoại hoặc gọi hotline 1900 8888 để bên em tư vấn trực tiếp ngay ạ!",
        actionType: "contact",
      },
      { status: 200 }
    );
  }
}
