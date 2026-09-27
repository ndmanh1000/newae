import { Product } from "@/context/CartContext";

export const PRODUCTS: Product[] = [
  {
    id: "keyowa-500ml",
    name: "Keyowa Avocado Extra Virgin 500ml",
    tagline: "Chuyên dụng cho áp chảo, chiên xào nhiệt độ cao & làm sốt salad chuẩn nhà hàng.",
    badge: "BÁN CHẠY NHẤT",
    badgeColor: "bg-coral text-white",
    price: 499000,
    originalPrice: 580000,
    volume: "500ml",
    smokePoint: "270°C",
    image: "/images/product-500ml.webp",
    description:
      "Dòng dầu bơ nguyên chất ép lạnh thượng hạng từ 100% bơ Hass Đắk Lắk. Điểm khói 270°C vượt trội giúp món ăn chín vàng giòn rụm bên ngoài mà bên trong vẫn mọng nước, không sinh khói độc acrolein. Giàu Omega-9 và vitamin E tự nhiên.",
    category: "cooking",
    features: [
      "Điểm khói 270°C cao nhất trong các loại dầu ăn",
      "Ép lạnh cơ học hoàn toàn dưới 40°C",
      "Giàu axit Oleic (Omega-9) tốt cho tim mạch",
      "Hương thơm ngậy thanh, không lấn át vị tự nhiên của món ăn",
    ],
  },
  {
    id: "keyowa-dropper-100ml",
    name: "Chai Mini Dropper 100ml (Ăn dặm & Skincare)",
    tagline: "Giàu Omega-9 và Vitamin E tự nhiên nuôi dưỡng làn da, thích hợp cho trẻ ăn dặm.",
    badge: "ORGANIC 100%",
    badgeColor: "bg-sage-100 text-forest-800",
    price: 199000,
    originalPrice: 250000,
    volume: "100ml",
    smokePoint: "Cold Pressed",
    image: "/images/product-100ml.webp",
    description:
      "Thiết kế ống hút nhỏ giọt cao cấp giúp kiểm soát liều lượng chính xác từng giọt. Hoàn hảo để nhỏ vào cháo dinh dưỡng cho bé từ 6 tháng hoặc sử dụng trực tiếp dưỡng ẩm da mặt, chống lão hóa và phục hồi hàng rào bảo vệ da.",
    category: "skincare",
    features: [
      "Ống hút pipette định lượng từng giọt chính xác",
      "100% tự nhiên không hương liệu, không cồn",
      "Thẩm thấu nhanh, không gây bít tắc lỗ chân lông (Non-comedogenic)",
      "Bổ sung chất béo lành mạnh cho não bộ bé yêu",
    ],
  },
  {
    id: "keyowa-baby-250ml",
    name: "Keyowa Kids & Baby Virgin 250ml",
    tagline: "Dinh dưỡng phát triển trí não và chiều cao cho bé từ 6 tháng tuổi. Hương vị thanh dịu dễ ăn.",
    badge: "CHUYÊN CHO BÉ",
    badgeColor: "bg-[#FFF4E5] text-[#B76E00]",
    price: 320000,
    originalPrice: 380000,
    volume: "250ml",
    smokePoint: "Tăng cường DHA",
    image: "/images/product-250ml.webp",
    description:
      "Được tinh chọn từ những quả bơ Hass có hàm lượng dinh dưỡng cao nhất, bổ sung nguồn vi chất thiết yếu giúp trẻ hấp thu tối đa vitamin A, D, E trong thức ăn dặm. Hương vị dịu nhẹ tự nhiên kích thích vị giác bé ăn ngon miệng.",
    category: "baby",
    features: [
      "Tối ưu cho hệ tiêu hóa non nớt của trẻ nhỏ",
      "Giúp hấp thu vitamin tan trong dầu (A, D3, K2)",
      "Vị béo ngậy thơm ngon tự nhiên từ quả bơ chín cây",
      "Chai thủy tinh trung tính đạt chuẩn an toàn thực phẩm quốc tế",
    ],
  },
  {
    id: "keyowa-giftset",
    name: "Bộ Hộp Quà Gourmet Chef Gift Set",
    tagline: "Bộ sưu tập 3 dòng dầu hảo hạng trong hộp gỗ sang trọng, tặng kèm ebook 50 công thức bếp sao.",
    badge: "QUÀ TẶNG CAO CẤP",
    badgeColor: "bg-forest-900 text-amber-200",
    price: 990000,
    originalPrice: 1200000,
    volume: "Set 3 Chai",
    smokePoint: "Hộp gỗ sơn mài",
    image: "/images/product-giftset.webp",
    description:
      "Món quà tinh tế thể hiện sự quan tâm sâu sắc tới sức khỏe của người thân, đối tác và đồng nghiệp. Hộp quà bao gồm 1 chai Extra Virgin 500ml, 1 chai Mini Dropper 100ml, 1 chai Baby Virgin 250ml cùng thìa đong gỗ óc chó cao cấp.",
    category: "gift",
    features: [
      "Hộp gỗ sang trọng lót lụa vàng ánh kim",
      "Bao gồm đủ 3 dòng sản phẩm biểu tượng của Keyowa",
      "Tặng kèm thìa gỗ đo liều lượng & sách công thức Michelin",
      "Thiệp chúc mừng khắc laser cá nhân hóa theo yêu cầu",
    ],
  },
];

export const PROCESS_STEPS = [
  {
    stepNumber: "01",
    tag: "TUYỂN CHỌN NGUYÊN LIỆU",
    title: "Thu hái chuẩn độ chín vàng",
    subtitle: "100% Bơ Hass Đắk Lắk • Độ chín chuẩn >26% dầu",
    description:
      "Từng quả bơ được kiểm tra tỷ lệ dầu đạt chuẩn trước khi tách vỏ và hạt thủ công, loại bỏ 100% quả dập hoặc kém chất lượng nhằm đảm bảo độ tinh khiết tuyệt đối.",
    image: "/images/process-harvest.webp",
    specs: "Độ chua Acid < 0.2% • Không tồn dư thuốc bảo vệ thực vật",
  },
  {
    stepNumber: "02",
    tag: "ÉP LẠNH CƠ HỌC",
    title: "Ép ly tâm không gia nhiệt",
    subtitle: "Nhiệt độ luôn dưới 40°C • Không dung môi hóa học",
    description:
      "Công nghệ ép ly tâm siêu tốc 3 pha trong môi trường trơ khí, ngăn chặn hoàn toàn quá trình oxy hóa và bảo toàn nguyên vẹn hàm lượng lutein, chlorophyll và polyphenol.",
    image: "/images/process-press.webp",
    specs: "Chiết xuất 100% tự nhiên • Giữ nguyên màu xanh ngọc lục bảo",
  },
  {
    stepNumber: "03",
    tag: "ĐÓNG CHAI VÔ TRÙNG",
    title: "Lọc siêu mịn & niêm phong",
    subtitle: "Chai thủy tinh tối màu • Chống tia UV quang học",
    description:
      "Dầu bơ sau khi lọc màng vi sinh được chiết rót vào chai thủy tinh sẫm màu phủ nano chống tia tử ngoại, niêm phong màng nhôm bảo quản dưỡng chất tới 24 tháng.",
    image: "/images/process-amber.webp",
    specs: "Đạt chuẩn ISO 22000 & HACCP • Chứng nhận kiểm nghiệm Eurofins",
  },
];

export const SMOKE_POINT_COMPARISON = [
  {
    name: "Dầu bơ ép lạnh KEYOWA",
    point: 270,
    pointText: "270°C",
    width: "100%",
    color: "bg-emerald-600",
    badge: "AN TOÀN NHẤT",
    badgeClass: "bg-emerald-100 text-emerald-800 font-bold",
    safe: true,
  },
  {
    name: "Dầu dừa tinh luyện",
    point: 232,
    pointText: "232°C",
    width: "84%",
    color: "bg-amber-600",
    badge: "Mức khá",
    badgeClass: "bg-amber-100 text-amber-800",
    safe: true,
  },
  {
    name: "Dầu hạt cải / Hướng dương",
    point: 204,
    pointText: "204°C",
    width: "74%",
    color: "bg-yellow-600",
    badge: "Mức trung bình",
    badgeClass: "bg-yellow-100 text-yellow-800",
    safe: false,
  },
  {
    name: "Dầu Oliu Extra Virgin",
    point: 190,
    pointText: "190°C",
    width: "68%",
    color: "bg-orange-500",
    badge: "Dễ khét khi xào rán",
    badgeClass: "bg-orange-100 text-orange-800",
    safe: false,
  },
  {
    name: "Bơ thực vật / Mỡ động vật",
    point: 150,
    pointText: "150°C",
    width: "55%",
    color: "bg-rose-500",
    badge: "Nguy cơ sinh độc tố cao",
    badgeClass: "bg-rose-100 text-rose-800",
    safe: false,
  },
];

export const TESTIMONIALS = [
  {
    id: "story-1",
    name: "Lan Chi",
    title: "Food Blogger & Huấn luyện viên Eat-Clean",
    quote:
      "Từ ngày chuyển sang dùng dầu bơ Keyowa, món xào và áp chảo không còn mùi khét dầu, vị bơ thơm bùi thanh nhẹ. Cả gia đình mình đều yêu thích!",
    image: "/images/story-eatclean.webp",
    tag: "ẨM THỰC EAT-CLEAN",
  },
  {
    id: "story-2",
    name: "BS. Mai Anh",
    title: "Bác sĩ Da liễu & Chăm sóc Sắc đẹp Tự nhiên",
    quote:
      "Vitamin E và axit béo omega trong dầu bơ tự nhiên thẩm thấu sâu, khóa ẩm cực tốt mà không gây bít tắc lỗ chân lông. Mình dùng cả dưỡng ẩm và nấu nướng.",
    image: "/images/story-skincare.webp",
    tag: "SKINCARE & LÀN DA",
  },
  {
    id: "story-3",
    name: "Chef Hoàng Tùng",
    title: "Bếp trưởng & Giám khảo Ẩm thực",
    quote:
      "Để có lớp vỏ steak giòn caramel hoàn hảo mà bên trong vẫn mềm mọng nước, điểm khói 270°C của Keyowa là vũ khí bí mật số một của gian bếp chúng tôi.",
    image: "/images/story-chef.webp",
    tag: "BẾP NHÀ HÀNG 5 SAO",
  },
  {
    id: "story-4",
    name: "Thu Hương",
    title: "Mẹ bé Bon (18 tháng tuổi)",
    quote:
      "Chai nhỏ dạng dropper tiện lợi vô cùng. Mỗi bữa chỉ cần nhỏ vài giọt vào cháo của con, bé ăn ngon miệng, tiêu hóa tốt và tăng cân đều đặn.",
    image: "/images/story-mom.webp",
    tag: "DINH DƯỠNG ĂN DẶM",
  },
];
