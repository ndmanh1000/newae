/**
 * Keyavo AI Customer Care Knowledge Engine
 * Persona: Thu Hà - Dược sĩ & Chuyên viên Dinh dưỡng cấp cao tại KEYAVO Việt Nam
 */

export interface AiResponseResult {
  reply: string;
  actionType?: "voucher" | "product" | "contact";
  productId?: string;
}

export function generateSmartReply(userQuery: string): AiResponseResult {
  const q = userQuery.trim().toLowerCase();

  // 1. Phone number detector (Regex for VN phone numbers: 03, 05, 07, 08, 09 or +84...)
  const phoneRegex = /(0|\+84)(3[2-9]|5[25689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}/g;
  const matchedPhones = userQuery.match(phoneRegex);
  if (matchedPhones && matchedPhones.length > 0) {
    const phone = matchedPhones[0];
    return {
      reply: `Dạ em đã ghi nhận số điện thoại **${phone}** của anh/chị rồi ạ! 📝✨\n\nEm đã chuyển thông tin tới đội ngũ dược sĩ tư vấn. Bên em sẽ liên hệ lại với anh/chị ngay trong vòng 5 - 10 phút tới để giải đáp chi tiết nhất. Anh/chị chú ý điện thoại giúp em nhé ạ! ❤️`,
      actionType: "contact",
    };
  }

  // 2. Email detector
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matchedEmails = userQuery.match(emailRegex);
  if (matchedEmails && matchedEmails.length > 0) {
    const email = matchedEmails[0];
    return {
      reply: `Dạ em đã lưu email **${email}** của anh/chị ạ! Em đã gửi tặng cẩm nang E-Book 50 công thức ẩm thực chuẩn 5 sao và mã giảm giá 15% vào hòm thư cho anh/chị rồi nhé ạ. 🎁`,
      actionType: "voucher",
    };
  }

  // 3. Uống trực tiếp / Buổi sáng / Uống sống
  if (
    q.includes("uống trực tiếp") ||
    q.includes("uống sống") ||
    q.includes("uống buổi sáng") ||
    q.includes("uống được không") ||
    q.includes("uống có sao không")
  ) {
    return {
      reply:
        "Dạ dầu bơ Keyavo là dầu ép lạnh 100% nguyên chất dưới 40°C, đạt chuẩn Extra Virgin nên UỐNG TRỰC TIẾP RẤT TỐT ạ!\n\nRất nhiều khách hàng uống 1 thìa cà phê (5ml) vào mỗi buổi sáng trước bữa ăn 15 phút. Thói quen này giúp bôi trơn đường tiêu hóa, chống táo bón, kích thích tái tạo niêm mạc dạ dày và cung cấp năng lượng sạch từ Omega-9 cho cả ngày dài ạ!",
      actionType: "product",
      productId: "keyavo-500ml",
    };
  }

  // 4. Bảo quản, hạn sử dụng, để tủ lạnh
  if (
    q.includes("bảo quản") ||
    q.includes("hạn sử dụng") ||
    q.includes("để tủ lạnh") ||
    q.includes("hsd") ||
    q.includes("mở nắp") ||
    q.includes("đông đặc") ||
    q.includes("hết hạn")
  ) {
    return {
      reply:
        "Dạ về hạn sử dụng và cách bảo quản dầu bơ Keyavo:\n• **Hạn sử dụng:** 24 tháng kể từ ngày sản xuất (in rõ dưới đáy chai).\n• **Sau khi mở nắp:** Khuyên dùng trong 6 - 9 tháng để hương vị tươi mới nhất.\n• **Bảo quản:** Chỉ cần để nơi thoáng mát, tránh ánh nắng trực tiếp. KHÔNG CẦN để tủ lạnh ạ. (Nếu để tủ lạnh dầu có thể đông nhẹ do chứa hàm lượng axit béo đơn không bão hòa rất cao, để ra nhiệt độ phòng sẽ tự tan lại bình thường mà không ảnh hưởng chất lượng ạ).",
    };
  }

  // 5. Làm đẹp, bôi mặt, dưỡng da, trị mụn, mọc tóc
  if (
    q.includes("bôi mặt") ||
    q.includes("dưỡng da") ||
    q.includes("skincare") ||
    q.includes("mụn") ||
    q.includes("bít tắc") ||
    q.includes("da khô") ||
    q.includes("dưỡng tóc") ||
    q.includes("rạn da") ||
    q.includes("môi")
  ) {
    return {
      reply:
        "Dạ dầu bơ Keyavo đạt cấp độ tinh khiết thực phẩm (Food-Grade) nên dùng cho da và tóc cực kỳ an toàn ạ!\n• **Dưỡng ẩm da:** Vitamin E & Axit Oleic thẩm thấu sâu, phục hồi màng lipid cho da khô và da sau treatment. Chỉ số gây bít tắc thấp (2/5) nên không gây mụn nếu thoa 2-3 giọt mỏng.\n• **Dưỡng môi & tóc:** Chống nứt nẻ môi và phục hồi đuôi tóc khô xơ rất hiệu quả.\n• Dòng **Chai Mini Dropper 100ml** bên em có ống hút nhỏ giọt chuyên biệt cho skincare rất tiện lợi ạ!",
      actionType: "product",
      productId: "keyavo-dropper-100ml",
    };
  }

  // 6. Làm bánh, nướng bánh, chiên rán ngập dầu
  if (
    q.includes("làm bánh") ||
    q.includes("nướng") ||
    q.includes("chiên ngập dầu") ||
    q.includes("thay bơ") ||
    q.includes("pancake") ||
    q.includes("muffin")
  ) {
    return {
      reply:
        "Dạ dầu bơ Keyavo là bí quyết tuyệt vời cho thợ làm bánh và món nướng ạ!\n• **Thay thế bơ động vật:** Tỷ lệ thay thế 1:1, giúp bánh mềm ẩm xốp, thơm bùi thanh mà giảm đến 40% chất béo bão hòa xấu.\n• **Chiên ngập dầu / Nướng lò:** Nhờ điểm khói 270°C, anh/chị nướng bánh ở 200°C - 240°C hay chiên khoai tây, chiên gà ngập dầu đều giòn rụm, vàng ươm và hoàn toàn không bị ám mùi khét dầu ạ!",
      actionType: "product",
      productId: "keyavo-500ml",
    };
  }

  // 7. Bệnh lý: Tiểu đường, mỡ máu, huyết áp, tim mạch, giảm cân, keto
  if (
    q.includes("tiểu đường") ||
    q.includes("mỡ máu") ||
    q.includes("huyết áp") ||
    q.includes("tim mạch") ||
    q.includes("giảm cân") ||
    q.includes("keto") ||
    q.includes("béo") ||
    q.includes("cholesterol") ||
    q.includes("gan nhiễm mỡ")
  ) {
    return {
      reply:
        "Dạ người bị tiểu đường, mỡ máu cao, huyết áp hay đang ăn kiêng giảm cân / Keto CỰC KỲ NÊN DÙNG dầu bơ Keyavo ạ!\n• Dầu bơ chứa hơn **72% Axit Oleic (Omega-9)** – chất béo vàng giúp hạ cholesterol xấu LDL, tăng cholesterol tốt HDL và điều hòa đường huyết.\n• Hoàn toàn **0% Cholesterol, 0% Natri và 0% Đường**.\n• Giúp cơ thể no lâu, giảm cảm giác thèm tinh bột xấu, hỗ trợ kiểm soát cân nặng rất hiệu quả ạ!",
      actionType: "product",
      productId: "keyavo-500ml",
    };
  }

  // 8. Ăn chay, thuần chay, tôn giáo
  if (
    q.includes("ăn chay") ||
    q.includes("thuần chay") ||
    q.includes("vegan") ||
    q.includes("chay trường") ||
    q.includes("phật giáo")
  ) {
    return {
      reply:
        "Dạ dầu bơ Keyavo là sản phẩm **100% thuần thực vật (Vegan)** ép trực tiếp từ thịt quả bơ Hass tươi hữu cơ Đắk Lắk. Sản phẩm không chứa phụ gia, không chất bảo quản và không liên quan đến bất kỳ thành phần động vật nào, người ăn chay trường hoàn toàn yên tâm sử dụng hàng ngày ạ!",
      actionType: "product",
      productId: "keyavo-500ml",
    };
  }

  // 9. So sánh với Dầu Oliu (Olive oil)
  if (
    q.includes("oliu") ||
    q.includes("olive") ||
    q.includes("so sánh") ||
    q.includes("khác gì") ||
    q.includes("hơn gì")
  ) {
    return {
      reply:
        "Dạ so sánh với dầu Oliu Extra Virgin thì dầu bơ Keyavo có 2 điểm vượt trội khác biệt hoàn toàn ạ:\n1. **Khả năng chịu nhiệt (Điểm khói):** Dầu Oliu chỉ chịu được 190°C (rất dễ khét và sinh độc tố khi chiên xào). Trong khi dầu bơ Keyavo chịu nhiệt tới **270°C**, chiên xào áp chảo an toàn tuyệt đối.\n2. **Hương vị:** Dầu oliu thường có vị đắng nồng gắt, kén người ăn. Dầu bơ có vị **béo ngậy thanh nhẹ**, thơm bùi tự nhiên, trẻ nhỏ hay người lớn đều rất thích ạ!",
    };
  }

  // 10. Điểm khói 270°C, chiên xào, không khét
  if (
    q.includes("khói") ||
    q.includes("270") ||
    q.includes("chiên") ||
    q.includes("xào") ||
    q.includes("áp chảo") ||
    q.includes("steak") ||
    q.includes("khét") ||
    q.includes("cháy")
  ) {
    return {
      reply:
        "Dạ điểm khói 270°C là điểm khói cao nhất thế giới hiện nay cho dầu ăn gia đình ạ! Khi nấu ở nhiệt độ cao, cấu trúc chất béo của dầu bơ Keyavo không bị bẻ gãy, giúp món bít tết hoặc cá hồi xém vàng giòn bên ngoài mà bên trong vẫn ngọt mọng nước, gian bếp không hề có mùi khói cay mắt ạ!",
      actionType: "product",
      productId: "keyavo-500ml",
    };
  }

  // 11. Trẻ em, ăn dặm, mấy tháng, DHA
  if (
    q.includes("bé") ||
    q.includes("dặm") ||
    q.includes("tháng") ||
    q.includes("con") ||
    q.includes("trẻ") ||
    q.includes("baby") ||
    q.includes("nhỏ giọt")
  ) {
    return {
      reply:
        "Dạ bé từ đủ 6 tháng tuổi bắt đầu ăn dặm là dùng dầu bơ được rồi ạ! Dầu bơ cung cấp năng lượng và vi chất thiết yếu để phát triển não bộ, thị lực và tăng khả năng hấp thu vitamin A, D3, K2 trong thức ăn.\n• **Liều lượng:** 3-5 giọt/bữa, nhỏ vào cháo ấm sau khi tắt bếp.\n• Dòng **Keyavo Kids & Baby 250ml** bên em được tinh chọn từ những quả bơ có hàm lượng dinh dưỡng cao nhất dành riêng cho hệ tiêu hóa của bé ạ!",
      actionType: "product",
      productId: "keyavo-baby-250ml",
    };
  }

  // 12. Nguồn gốc, Đắk Lắk, quy trình, ép lạnh, nhà máy, chất lượng
  if (
    q.includes("nguồn gốc") ||
    q.includes("xuất xứ") ||
    q.includes("ở đâu") ||
    q.includes("đắk lắk") ||
    q.includes("trồng") ||
    q.includes("sản xuất") ||
    q.includes("ép lạnh") ||
    q.includes("pha") ||
    q.includes("nguyên chất")
  ) {
    return {
      reply:
        "Dạ dầu bơ Keyavo được sản xuất từ 100% giống bơ Hass hữu cơ trồng tại vùng đất đỏ bazan Đắk Lắk trù phú. Từng quả bơ chín cây được tách vỏ thủ công và đưa vào dây chuyền ép ly tâm không gia nhiệt (luôn dưới 40°C), lọc màng vi sinh và niêm phong trong chai thủy tinh tối màu.\n\nBên em cam kết hoàn tiền 200% nếu phát hiện pha trộn bất kỳ loại dầu nào khác ạ!",
    };
  }

  // 13. Chứng nhận, kiểm nghiệm, an toàn, Eurofins, ISO
  if (
    q.includes("chứng nhận") ||
    q.includes("kiểm nghiệm") ||
    q.includes("eurofins") ||
    q.includes("iso") ||
    q.includes("haccp") ||
    q.includes("giấy phép") ||
    q.includes("an toàn")
  ) {
    return {
      reply:
        "Dạ Keyavo đạt đầy đủ các chứng nhận kiểm định chất lượng khắt khe nhất:\n• Chứng nhận kiểm nghiệm hóa sinh quốc tế **Eurofins** (không tồn dư thuốc BVTV, không kim loại nặng).\n• Đạt chuẩn quản lý an toàn thực phẩm **ISO 22000** và **HACCP**.\n• Đăng ký công bố chất lượng hợp quy định của Bộ Y tế Việt Nam ạ!",
    };
  }

  // 14. Thời gian dùng được bao lâu cho gia đình / bé / cá nhân
  if (
    q.includes("dùng được bao lâu") ||
    q.includes("xài được bao lâu") ||
    q.includes("ăn được bao lâu") ||
    q.includes("uống được bao lâu") ||
    q.includes("1 chai dùng") ||
    q.includes("dùng trong bao lâu")
  ) {
    return {
      reply:
        "Dạ thời gian sử dụng ước tính cho từng dòng sản phẩm của Keyavo như sau ạ:\n• **Chai 500ml Extra Virgin:** Gia đình 3 - 4 người chiên xào và trộn salad hàng ngày dùng được khoảng **1 – 1.5 tháng**.\n• **Chai Baby 250ml:** Nhỏ vào cháo ăn dặm cho bé (3-5 giọt/bữa) thì 1 chai dùng được **3 – 4 tháng**.\n• **Chai Dropper 100ml:** Dùng dưỡng da, massage mặt mỗi tối 2-3 giọt dùng được **4 – 5 tháng** rất tiết kiệm ạ!",
      actionType: "product",
      productId: "keyavo-500ml",
    };
  }

  // 15. Vận chuyển, giao hàng, bao lâu nhận được, ship, phí vận chuyển
  if (
    q.includes("ship") ||
    q.includes("giao hàng") ||
    q.includes("vận chuyển") ||
    q.includes("bao lâu nhận") ||
    q.includes("mấy ngày nhận") ||
    q.includes("bao lâu tới") ||
    q.includes("bao lâu đến") ||
    q.includes("phí ship") ||
    q.includes("hà nội") ||
    q.includes("sài gòn") ||
    q.includes("tphcm") ||
    q.includes("tỉnh")
  ) {
    return {
      reply:
        "Dạ chính sách giao hàng của Keyavo như sau ạ:\n• **Miễn phí vận chuyển (Freeship)** toàn quốc cho đơn từ 500.000đ (hoặc khi áp dụng mã KEYAVO15).\n• **Thời gian giao:**\n  - Hà Nội & TP.HCM: 1 - 2 ngày (có hỏa tốc nhận trong 2h).\n  - Các tỉnh thành khác: 2 - 3 ngày làm việc.\n• Anh/chị luôn được **mở hộp kiểm tra chai nguyên vẹn** trước khi thanh toán cho shipper ạ!",
    };
  }

  // 15. Giá cả, khuyến mãi, voucher, giảm giá
  if (
    q.includes("giá") ||
    q.includes("bao nhiêu") ||
    q.includes("khuyến mãi") ||
    q.includes("voucher") ||
    q.includes("mã") ||
    q.includes("giảm") ||
    q.includes("tiền") ||
    q.includes("ưu đãi")
  ) {
    return {
      reply:
        "Dạ em gửi anh/chị bảng giá niêm yết và ưu đãi tháng này ạ:\n• **Chai 500ml Extra Virgin:** 499.000đ (Giá gốc 580.000đ) - Bán chạy nhất\n• **Chai Baby 250ml (Cho bé):** 320.000đ (Giá gốc 380.000đ)\n• **Chai Dropper 100ml:** 199.000đ (Giá gốc 250.000đ)\n• **Bộ quà tặng Giftset 3 chai:** 990.000đ (Hộp gỗ sơn mài)\nĐặc biệt, nhập mã **KEYAVO15** sẽ được GIẢM THÊM 15% và FREESHIP toàn quốc ạ!",
      actionType: "voucher",
    };
  }

  // 16. Mua sỉ, đại lý, nhà hàng, horeca, can lớn
  if (
    q.includes("sỉ") ||
    q.includes("đại lý") ||
    q.includes("nhà hàng") ||
    q.includes("phân phối") ||
    q.includes("chiết khấu") ||
    q.includes("can") ||
    q.includes("hợp tác")
  ) {
    return {
      reply:
        "Dạ Keyavo hiện đang cung ứng trực tiếp cho hơn 35+ nhà hàng fine-dining và đối tác phân phối trên toàn quốc với chính sách chiết khấu rất ưu đãi (từ 20% - 35%), có cung cấp can 5L và 20L cho bếp nhà hàng.\n\nAnh/chị vui lòng để lại số điện thoại hoặc liên hệ phòng kinh doanh B2B: **090 123 4567** để nhận bảng báo giá sỉ tốt nhất ạ!",
      actionType: "contact",
    };
  }

  // 17. Đổi trả, bảo hành, vỡ hỏng, khiếu nại
  if (
    q.includes("đổi trả") ||
    q.includes("vỡ") ||
    q.includes("hỏng") ||
    q.includes("rỉ") ||
    q.includes("lỗi") ||
    q.includes("bảo hành") ||
    q.includes("khiếu nại") ||
    q.includes("trả hàng")
  ) {
    return {
      reply:
        "Dạ anh/chị hoàn toàn yên tâm với chính sách bảo hành của Keyavo ạ:\n• **Đổi mới 100% miễn phí trong 14 ngày** nếu chai bị nứt vỡ trong lúc giao, rò rỉ nắp hoặc phát hiện bất kỳ lỗi nào từ nhà sản xuất.\n• Đội ngũ giao vận sẽ đến tận nhà thu hồi và đổi chai mới cho anh/chị mà anh/chị không mất thêm bất kỳ chi phí nào ạ!",
      actionType: "contact",
    };
  }

  // 18. Lời chào, cảm ơn, khen ngợi
  if (
    q.includes("chào") ||
    q.includes("hi") ||
    q.includes("hello") ||
    q.includes("alo") ||
    q.includes("hey")
  ) {
    return {
      reply:
        "Dạ em chào anh/chị ạ! Chúc anh/chị một ngày nhiều niềm vui và sức khỏe! Em có thể hỗ trợ anh/chị tìm hiểu sản phẩm dầu bơ nào của Keyavo hôm nay ạ? 🥑✨",
    };
  }

  if (
    q.includes("cảm ơn") ||
    q.includes("thank") ||
    q.includes("tuyệt") ||
    q.includes("tốt") ||
    q.includes("ok")
  ) {
    return {
      reply:
        "Dạ không có chi ạ! Được phục vụ và đồng hành cùng bữa ăn dinh dưỡng của gia đình anh/chị là niềm vinh hạnh của đội ngũ Keyavo. Cần hỗ trợ thêm bất cứ điều gì, anh/chị cứ nhắn em nhé! Chúc anh/chị và gia đình luôn dồi dào sức khỏe ạ! ❤️",
    };
  }

  // 19. Fallback thông minh: Phân tích ngữ cảnh câu hỏi mở bất kỳ
  return {
    reply: `Dạ về câu hỏi của anh/chị: "${userQuery}"\n\nDầu bơ ép lạnh nguyên chất Keyavo được chiết xuất 100% từ bơ Hass tươi tuyển chọn, giàu axit béo lành mạnh Omega-9, vitamin E tự nhiên và điểm khói kỷ lục 270°C. Sản phẩm rất lành tính và thích hợp cho cả nấu ăn nhiệt cao lẫn bổ sung dinh dưỡng hàng ngày.\n\nĐể được tư vấn riêng phù hợp nhất với thể trạng và nhu cầu của gia đình, anh/chị có thể để lại **số điện thoại** hoặc kết nối nhanh qua Hotline / Zalo bên dưới để em giải đáp trực tiếp ngay ạ! 👇`,
    actionType: "contact",
  };
}
