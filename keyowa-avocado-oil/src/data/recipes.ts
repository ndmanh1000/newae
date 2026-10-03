export interface RecipeIngredient {
  name: string;
  amount: string;
  note?: string;
}

export interface RecipeStep {
  step: number;
  title: string;
  instruction: string;
  chefTip?: string;
}

export interface RecipeNutrition {
  calories: string;
  protein: string;
  goodFats: string; // Omega-9 & oleic acid
  carbs: string;
  vitaminE: string;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  category: "all" | "eat-clean" | "high-heat" | "pasta-seafood" | "baby-food" | "sauce-dressing" | "dessert";
  categoryLabel: string;
  diet: string;
  difficulty: "Dễ" | "Trung bình" | "Chuẩn Chef 5 Sao";
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: string;
  caloriesCount: number;
  image: string;
  badge: string;
  badgeColor?: string;
  description: string;
  nutrition: RecipeNutrition;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  keyavoTip: string;
  recommendedProductId: string;
  recommendedProductName: string;
  recommendedProductVolume: string;
  recommendedProductPrice: number;
  recommendedProductImage: string;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
}

export const RECIPE_CATEGORIES = [
  { id: "all", label: "Tất Cả 50+ Công Thức", count: 50 },
  { id: "eat-clean", label: "Eat-Clean & Salad", count: 14 },
  { id: "high-heat", label: "Áp Chảo Nhiệt Cao 270°C", count: 12 },
  { id: "pasta-seafood", label: "Mì Ý & Hải Sản Chuẩn Sao", count: 8 },
  { id: "baby-food", label: "Dinh Dưỡng Ăn Dặm Bé Yêu", count: 7 },
  { id: "sauce-dressing", label: "Sốt & Dressing Bếp Pháp", count: 5 },
  { id: "dessert", label: "Bánh & Tráng Miệng Healthy", count: 4 },
];

export const RECIPES: Recipe[] = [
  {
    id: "salad-uc-ga-chanh-leo",
    title: "Salad Ức Gà Áp Chảo & Sốt Vinaigrette Dầu Bơ Chanh Leo",
    subtitle: "Thịt ức gà mềm mọng nước khi áp chảo ở 220°C cùng sốt chanh leo sánh mịn óng ánh",
    category: "eat-clean",
    categoryLabel: "Eat-Clean & Salad",
    diet: "Eat-Clean / High-Protein",
    difficulty: "Dễ",
    prepTime: "10 phút",
    cookTime: "10 phút",
    totalTime: "20 phút",
    servings: "2 phần ăn",
    caloriesCount: 380,
    image: "/images/recipe-salad.webp",
    badge: "MÓN MỚI TUẦN NÀY",
    badgeColor: "bg-[#142A1E] text-[#D4F666]",
    description: "Sự kết hợp hoàn hảo giữa ức gà tươi ướp dầu bơ thơm nức, xém vàng giòn bên ngoài nhưng ngọt mềm mọng nước bên trong, hòa quyện với sốt dầu bơ chanh leo chua thanh tự nhiên.",
    nutrition: {
      calories: "380 kcal",
      protein: "38g",
      goodFats: "16g (Omega-9 tự nhiên)",
      carbs: "12g",
      vitaminE: "45% DV",
    },
    ingredients: [
      { name: "Ức gà phi lê hữu cơ", amount: "300g", note: "Chọn ức gà tươi còn đàn hồi" },
      { name: "Dầu bơ ép lạnh Keyavo Extra Virgin", amount: "3 thìa canh (45ml)", note: "Dùng để ướp và áp chảo" },
      { name: "Quả bơ tươi Hass Đắk Lắk", amount: "1 quả", note: "Thái lát mỏng" },
      { name: "Cà chua bi & xà lách Rocket / Romaine", amount: "150g", note: "Rửa sạch, để ráo" },
      { name: "Nước cốt chanh leo tươi", amount: "2 quả", note: "Lọc bỏ hạt" },
      { name: "Mật ong hoa rừng nguyên chất", amount: "1 thìa canh", note: "Tạo vị ngọt hậu" },
      { name: "Mù tạt vàng Dijon", amount: "1 thìa cà phê", note: "Chất xúc tác nhũ hóa" },
      { name: "Muối hồng Himalaya & tiêu đen đập dập", amount: "Vừa khẩu vị" },
    ],
    steps: [
      {
        step: 1,
        title: "Ướp thịt & thẩm thấu dưỡng chất",
        instruction: "Dùng khăn giấy thấm khô bề mặt ức gà. Khía nhẹ vài đường chéo, xoa đều 1 thìa canh dầu bơ Keyavo, muối hồng và tiêu đen. Để ngấm 10 phút.",
        chefTip: "Chất béo đơn trong dầu bơ đóng vai trò như chất dẫn hương vị, giúp gia vị thấm sâu vào tận tế bào thịt và giữ nước tuyệt hảo khi chiên rán.",
      },
      {
        step: 2,
        title: "Áp chảo nhiệt cao 220°C",
        instruction: "Làm nóng chảo gang với 1 thìa dầu bơ Keyavo ở nhiệt độ cao. Đặt ức gà vào áp chảo mỗi mặt 4-5 phút đến khi có lớp vỏ màu caramel vàng ruộm đẹp mắt. Nhấc ra để thịt nghỉ 3 phút trước khi thái.",
        chefTip: "Điểm khói 270°C giúp dầu bơ không sinh khói hay cháy đen như dầu oliu (190°C), tạo lớp vỏ giòn rụm hoàn hảo mà thịt bên trong vẫn ngọt mọng.",
      },
      {
        step: 3,
        title: "Đánh sốt nhũ hóa Vinaigrette",
        instruction: "Cho nước cốt chanh leo, mật ong, mù tạt Dijon và một nhúm muối vào bát. Vừa rót từ từ 2 thìa canh dầu bơ Keyavo vừa dùng phới lồng đánh đều theo một chiều cho đến khi sốt sánh mịn, ánh lên màu xanh ngọc bích.",
        chefTip: "Dầu bơ ép lạnh có độ nhớt tự nhiên cao hơn dầu thực vật thông thường, giúp nhũ hóa sốt cực nhanh mà không bị tách nước.",
      },
      {
        step: 4,
        title: "Trình bày chuẩn nhà hàng",
        instruction: "Bày rau Rocket, cà chua bi cắt đôi và bơ Hass thái lát lên đĩa. Đặt ức gà thái lát lên trên, rưới sốt chanh leo óng ánh và rắc thêm chút hạt bí rang giòn.",
      },
    ],
    keyavoTip: "Dầu bơ Keyavo có vị béo ngậy thanh nhẹ đặc trưng của bơ chín, giúp nâng tầm hương vị chanh leo mà không để lại cảm giác nhờn ngấy sau khi ăn.",
    recommendedProductId: "keyavo-500ml",
    recommendedProductName: "Keyavo Avocado Extra Virgin 500ml",
    recommendedProductVolume: "500ml",
    recommendedProductPrice: 499000,
    recommendedProductImage: "/images/product-500ml.webp",
    rating: 4.9,
    reviewsCount: 184,
    isFeatured: true,
  },
  {
    id: "ca-hoi-ap-chao-mang-tay",
    title: "Cá Hồi Na-uy Áp Chảo Da Giòn Rụm & Sốt Bơ Thì Là",
    subtitle: "Bí quyết áp chảo da giòn tan như snack mà thịt cá hồi vẫn giữ độ mềm béo tan chảy",
    category: "high-heat",
    categoryLabel: "Áp Chảo Nhiệt Cao 270°C",
    diet: "Keto / Low-Carb / High-Protein",
    difficulty: "Trung bình",
    prepTime: "10 phút",
    cookTime: "8 phút",
    totalTime: "18 phút",
    servings: "2 phần ăn",
    caloriesCount: 460,
    image: "/images/recipe-salmon.webp",
    badge: "270°C HIGH-HEAT",
    badgeColor: "bg-[#E55B38] text-white",
    description: "Tuyệt phẩm cá hồi áp chảo ở nhiệt độ cao 240°C với lớp da giòn tan hoàn hảo, phủ dầu bơ nguyên chất ép lạnh và măng tây xào bơ tỏi thơm lừng.",
    nutrition: {
      calories: "460 kcal",
      protein: "42g",
      goodFats: "28g (Giàu Omega-3 & Omega-9)",
      carbs: "5g",
      vitaminE: "52% DV",
    },
    ingredients: [
      { name: "Phi lê cá hồi Na-uy còn da", amount: "350g", note: "Cắt miếng dày 3-4cm" },
      { name: "Dầu bơ ép lạnh Keyavo Extra Virgin", amount: "2 thìa canh (30ml)", note: "Chịu nhiệt áp chảo giòn da" },
      { name: "Măng tây xanh loại 1", amount: "150g", note: "Bỏ gốc già, chần sơ" },
      { name: "Chanh vàng hữu cơ", amount: "1 quả", note: "1/2 vắt nước, 1/2 thái lát áp chảo" },
      { name: "Thì là tươi & tỏi băm", amount: "2 tép tỏi, vài nhánh thì là" },
      { name: "Bơ lạt động vật (tùy chọn basted)", amount: "15g" },
      { name: "Muối biển dạng hạt Flaky & tiêu xay", amount: "Vừa đủ" },
    ],
    steps: [
      {
        step: 1,
        title: "Sơ chế da cá hồi đạt độ giòn tối đa",
        instruction: "Dùng dao rạch nhẹ 3 đường nông trên mặt da cá hồi. Dùng khăn giấy thấm thật khô cả hai mặt. Rắc muối biển hạt lên mặt da và để nghỉ 5 phút trong tủ mát để hút hết hơi ẩm.",
        chefTip: "Da càng khô ráo thì khi tiếp xúc với dầu bơ nóng ở 240°C sẽ phồng rộp và giòn tan tuyệt đối mà không hề bị dính chảo.",
      },
      {
        step: 2,
        title: "Áp chảo da giòn với dầu bơ Keyavo",
        instruction: "Cho 1 thìa canh dầu bơ Keyavo vào chảo đáy dày, đun nóng ở mức lửa vừa-cao (khoảng 230-240°C). Đặt mặt da cá hồi xuống, dùng xẻng ấn nhẹ trong 30 giây đầu để da không bị cong. Áp chảo 5 phút cho đến khi da chuyển sang màu vàng hổ phách giòn rụm.",
        chefTip: "Dầu bơ chịu nhiệt tới 270°C, giữ cho mỡ cá không bị oxy hóa thành chất béo chuyển hóa gây hại, bảo toàn trọn vẹn axit béo Omega-3 quý giá.",
      },
      {
        step: 3,
        title: "Lật mặt & rưới dầu bơ thảo mộc",
        instruction: "Lật nhẹ miếng cá hồi, hạ lửa nhỏ. Cho măng tây, tỏi băm, vài nhánh thì là và thêm 1 thìa dầu bơ Keyavo vào chảo. Dùng thìa múc dầu bơ thơm rưới đều lên mặt thịt trong 2 phút rồi nhấc ra ngay.",
      },
      {
        step: 4,
        title: "Trang trí & thưởng thức",
        instruction: "Đặt măng tây xanh xào bơ tỏi bên dưới, xếp miếng cá hồi da vàng óng lên trên, vắt nhẹ vài giọt chanh vàng và rắc thì là thái nhỏ. Ăn kèm muối biển dạng vảy.",
      },
    ],
    keyavoTip: "Khi kết hợp Omega-3 trong cá hồi cùng Omega-9 trong dầu bơ Keyavo, bạn tạo ra tỷ lệ chất béo vàng tối ưu nhất cho sức khỏe tim mạch và trí não.",
    recommendedProductId: "keyavo-500ml",
    recommendedProductName: "Keyavo Avocado Extra Virgin 500ml",
    recommendedProductVolume: "500ml",
    recommendedProductPrice: 499000,
    recommendedProductImage: "/images/product-500ml.webp",
    rating: 5.0,
    reviewsCount: 230,
    isFeatured: true,
  },
  {
    id: "bo-ribeye-ap-chao-270",
    title: "Bít Tết Ribeye Bò Wagyu Áp Chảo Thảo Mộc 270°C",
    subtitle: "Lớp vỏ Maillard nâu vàng caramel giòn nhẹ, giữ trọn nước thịt ngọt ngào bên trong",
    category: "high-heat",
    categoryLabel: "Áp Chảo Nhiệt Cao 270°C",
    diet: "Keto / Carnivore / High-Protein",
    difficulty: "Chuẩn Chef 5 Sao",
    prepTime: "15 phút",
    cookTime: "6 phút",
    totalTime: "21 phút",
    servings: "2 phần ăn",
    caloriesCount: 580,
    image: "/images/recipe-steak.webp",
    badge: "MICHELIN CHOICE",
    badgeColor: "bg-amber-600 text-white",
    description: "Công thức chuẩn sao Michelin: Tận dụng tối đa điểm khói kỷ lục 270°C của dầu bơ Keyavo để tạo lớp vỏ xém cạnh Maillard nức mũi mà không hề có mùi khét cháy hay khói độc trong gian bếp.",
    nutrition: {
      calories: "580 kcal",
      protein: "52g",
      goodFats: "36g (Axit Oleic & Axit béo tốt)",
      carbs: "1g",
      vitaminE: "38% DV",
    },
    ingredients: [
      { name: "Thăn ngoại bò Ribeye Wagyu A4/Black Angus", amount: "400g", note: "Dày khoảng 3.5cm" },
      { name: "Dầu bơ ép lạnh Keyavo Extra Virgin", amount: "2 thìa canh (30ml)", note: "Chịu nhiệt tới 270°C" },
      { name: "Hương thảo tươi (Rosemary) & Cỏ xạ hương (Thyme)", amount: "3-4 nhánh" },
      { name: "Tỏi củ nguyên tép đập dập", amount: "1 củ nhỏ" },
      { name: "Muối Kosher hoặc muối hồng Himalaya", amount: "1 thìa cà phê" },
      { name: "Tiêu đen xay tươi nguyên hạt", amount: "1/2 thìa cà phê" },
    ],
    steps: [
      {
        step: 1,
        title: "Đưa thịt về nhiệt độ phòng",
        instruction: "Lấy miếng thịt bò ra khỏi tủ lạnh trước 30 phút để nhiệt độ thịt cân bằng với phòng. Thấm thật khô bề mặt thịt bằng khăn chuyên dụng. Rắc đều muối hồng và tiêu đen lên cả hai mặt.",
        chefTip: "Nếu thịt còn lạnh bên trong khi cho vào chảo, nhiệt độ chảo sẽ bị hạ đột ngột khiến thịt bị luộc chứ không tạo được lớp vỏ caramel.",
      },
      {
        step: 2,
        title: "Làm nóng chảo gang tới 250-260°C",
        instruction: "Làm nóng chảo gang dày trên lửa lớn trong 4-5 phút cho đến khi chảo nóng rực. Rót 1.5 thìa canh dầu bơ Keyavo vào chảo. Dầu bơ sẽ lập tức láng đều mặt chảo mà không hề bốc khói cay mắt.",
        chefTip: "Dầu oliu hoặc bơ động vật ở nhiệt độ này sẽ cháy đen và sinh chất độc hại Acrolein. Dầu bơ Keyavo với điểm khói 270°C cho phép bạn làm cháy cạnh thịt một cách an toàn tuyệt đối.",
      },
      {
        step: 3,
        title: "Áp chảo tạo phản ứng Maillard",
        instruction: "Nhẹ nhàng đặt miếng bò vào chảo. Áp chảo mỗi mặt 2 phút không di chuyển để lớp vỏ vàng sẫm hình thành. Cho tỏi đập dập, hương thảo và thêm chút dầu bơ Keyavo vào chảo, nghiêng chảo múc dầu bơ thơm rưới liên tục lên bề mặt thịt thêm 1 phút.",
      },
      {
        step: 4,
        title: "Nghỉ thịt (Resting) & thưởng thức",
        instruction: "Chuyển miếng steak ra đĩa ấm, để thịt nghỉ 5-7 phút cho nước ngọt thẩm thấu ngược lại tâm miếng thịt. Thái miếng dày 1cm, rắc vài hạt muối flaky và thưởng thức ở độ chín Medium-Rare hoàn mỹ.",
      },
    ],
    keyavoTip: "Hương vị thanh dịu tự nhiên của dầu bơ tôn trọn vị ngọt béo đậm đà của thịt bò cao cấp mà không bị mùi nồng nhân tạo lấn át.",
    recommendedProductId: "keyavo-500ml",
    recommendedProductName: "Keyavo Avocado Extra Virgin 500ml",
    recommendedProductVolume: "500ml",
    recommendedProductPrice: 499000,
    recommendedProductImage: "/images/product-500ml.webp",
    rating: 5.0,
    reviewsCount: 312,
    isFeatured: true,
  },
  {
    id: "mi-y-tom-sot-dau-bo-toi",
    title: "Mì Ý Tôm Sú Nướng & Sốt Nhũ Hóa Dầu Bơ Tỏi Aglio e Olio",
    subtitle: "Phiên bản biến tấu thượng hạng của Aglio e Olio cổ điển với hương vị bơ thơm bùi",
    category: "pasta-seafood",
    categoryLabel: "Món Pasta & Hải Sản",
    diet: "Mediterranean / Pescatarian",
    difficulty: "Dễ",
    prepTime: "10 phút",
    cookTime: "12 phút",
    totalTime: "22 phút",
    servings: "2 phần ăn",
    caloriesCount: 420,
    image: "/images/recipe-pasta.webp",
    badge: "TOP 1 YÊU THÍCH",
    badgeColor: "bg-emerald-800 text-white",
    description: "Sợi mì Ý dai ngon Al Dente được áo đều lớp sốt dầu bơ nhũ hóa cùng tỏi phi vàng rực, ớt khô cay nồng, tôm sú nướng ngọt lịm và cà chua bi mọng nước.",
    nutrition: {
      calories: "420 kcal",
      protein: "26g",
      goodFats: "18g (Omega-9 thuần khiết)",
      carbs: "46g",
      vitaminE: "40% DV",
    },
    ingredients: [
      { name: "Mì Ý Spaghetti Bronze-Cut", amount: "180g", note: "Loại sợi thô bám sốt tốt" },
      { name: "Tôm sú biển tươi bóc vỏ chừa đuôi", amount: "250g", note: "Lấy sạch chỉ lưng" },
      { name: "Dầu bơ ép lạnh Keyavo Extra Virgin", amount: "4 thìa canh (60ml)", note: "Linh hồn của món sốt" },
      { name: "Tỏi tép thái lát mỏng", amount: "6 tép", note: "Phi vàng nhẹ" },
      { name: "Cà chua bi hữu cơ", amount: "100g", note: "Cắt đôi" },
      { name: "Ớt khô bột Flakes & ngò tây Parsley", amount: "Vừa khẩu vị" },
      { name: "Phô mai Parmesan hoặc Pecorino bào sợi", amount: "20g" },
    ],
    steps: [
      {
        step: 1,
        title: "Luộc mì đạt chuẩn Al Dente",
        instruction: "Đun sôi 2 lít nước với 1 thìa canh muối biển. Cho mì Ý vào luộc trong 8-9 phút (ít hơn hướng dẫn gói 1 phút). Giữ lại 1/2 bát nước luộc mì trước khi vớt ra.",
      },
      {
        step: 2,
        title: "Xào tôm sú với dầu bơ Keyavo",
        instruction: "Làm nóng chảo với 1 thìa canh dầu bơ Keyavo. Cho tôm sú ướp chút muối tiêu vào áp chảo mỗi mặt 1.5 phút cho đến khi tôm chuyển sang màu hồng cam óng ánh. Nhấc tôm ra đĩa riêng.",
      },
      {
        step: 3,
        title: "Tạo sốt nhũ hóa bơ tỏi (Mantecatura)",
        instruction: "Trong cùng chiếc chảo đó, hạ lửa vừa và cho 3 thìa dầu bơ Keyavo cùng tỏi lát vào phi thơm dịu. Cho cà chua bi và ớt khô vào đảo trong 1 phút. Đổ 60ml nước luộc mì có chứa tinh bột vào, vung chảo mạnh để dầu bơ và nước hòa quyện thành lớp sốt nhũ sánh mịn óng ả.",
        chefTip: "Dầu bơ tạo độ béo ngậy mượt mà tựa như phô mai mà lại hoàn toàn không chứa cholesterol xấu hay chất béo bão hòa.",
      },
      {
        step: 4,
        title: "Trộn mì & phủ tôm",
        instruction: "Cho mì Ý và tôm vào chảo sốt, đảo đều tay trong 1 phút trên lửa lớn để từng sợi mì ngấm đẫm tinh dầu bơ. Rắc ngò tây thái nhỏ, phô mai Parmesan bào sợi và thưởng thức ngay khi còn nóng hổi.",
      },
    ],
    keyavoTip: "Khi dùng dầu bơ thay cho dầu oliu truyền thống, đĩa mì Ý không còn vị đắng hậu của oliu mà trở nên thơm béo, êm dịu và kích thích vị giác tuyệt vời.",
    recommendedProductId: "keyavo-500ml",
    recommendedProductName: "Keyavo Avocado Extra Virgin 500ml",
    recommendedProductVolume: "500ml",
    recommendedProductPrice: 499000,
    recommendedProductImage: "/images/product-500ml.webp",
    rating: 4.9,
    reviewsCount: 167,
    isFeatured: true,
  },
  {
    id: "chao-ca-hoi-bo-hass-an-dam",
    title: "Cháo Yến Mạch Cá Hồi & Dầu Bơ Dropper Bổ Sung DHA Cho Bé",
    subtitle: "Bữa ăn dặm giàu Omega-9, Omega-3 và Lutein hỗ trợ não bộ và thị lực bé từ 6 tháng",
    category: "baby-food",
    categoryLabel: "Dinh Dưỡng Ăn Dặm Bé Yêu",
    diet: "Mẹ & Bé / Ăn Dặm Tự Nhiên",
    difficulty: "Dễ",
    prepTime: "8 phút",
    cookTime: "12 phút",
    totalTime: "20 phút",
    servings: "1-2 chén cho bé",
    caloriesCount: 220,
    image: "/images/recipe-baby.webp",
    badge: "GIÀU OMEGA-9 & DHA",
    badgeColor: "bg-amber-100 text-amber-900 border border-amber-300",
    description: "Thực đơn dinh dưỡng vàng cho trẻ ăn dặm từ 6 tháng tuổi: Cháo yến mạch sánh mịn nấu cùng thịt cá hồi tươi, nhỏ thêm vài giọt dầu bơ nguyên chất Keyavo Baby bổ sung vi chất phát triển trí não.",
    nutrition: {
      calories: "220 kcal",
      protein: "14g",
      goodFats: "12g (DHA, EPA, Omega-9)",
      carbs: "18g",
      vitaminE: "70% nhu cầu bé hàng ngày",
    },
    ingredients: [
      { name: "Cá hồi tươi phi lê bỏ da, rút xương", amount: "50g", note: "Rửa sạch với sữa tươi không đường để khử tanh" },
      { name: "Dầu bơ nguyên chất Keyavo Baby 250ml hoặc Chai Mini Dropper", amount: "1 thìa cà phê (5ml / 5 giọt)", note: "Nhỏ trực tiếp vào cháo ấm" },
      { name: "Yến mạch cán dẹt hữu cơ hoặc gạo lứt", amount: "30g" },
      { name: "Thịt quả bơ Hass Đắk Lắk nghiền mịn", amount: "1/4 quả", note: "Chọn bơ chín mềm" },
      { name: "Nước dashi rau củ tự nấu", amount: "150ml" },
    ],
    steps: [
      {
        step: 1,
        title: "Sơ chế cá hồi & rau củ",
        instruction: "Cá hồi hấp chín cùng một lát gừng mỏng, dùng dĩa tán nhuyễn tơi xốp. Bơ Hass dùng muỗng dầm mịn như kem.",
      },
      {
        step: 2,
        title: "Nấu cháo yến mạch sánh mịn",
        instruction: "Cho yến mạch và nước dashi rau củ vào nồi nhỏ, đun lửa vừa trong 7-8 phút, khuấy đều tay cho đến khi yến mạch nở bung mềm sánh.",
      },
      {
        step: 3,
        title: "Kết hợp bơ tươi & cá hồi",
        instruction: "Cho cá hồi đã tán mịn vào cháo, đun sôi nhẹ thêm 1 phút rồi tắt bếp. Cho bơ Hass nghiền vào khuấy đều.",
      },
      {
        step: 4,
        title: "Khóa dưỡng chất với dầu bơ Keyavo Baby",
        instruction: "Múc cháo ra bát ăn dặm pastel. Chờ cháo nguội bớt xuống nhiệt độ ấm vừa ăn (khoảng 40-45°C), dùng ống nhỏ giọt hút 5 giọt dầu bơ Keyavo Baby nhỏ lên bề mặt cháo, khuấy đều và cho bé thưởng thức.",
        chefTip: "Không cho dầu bơ vào khi cháo còn đang sôi trên bếp để bảo toàn 100% vitamin A, D, E và các chất chống oxy hóa tự nhiên.",
      },
    ],
    keyavoTip: "Dầu bơ Keyavo ép lạnh cơ học không phụ gia, đạt độ tinh khiết cao nhất, vị thơm bùi tự nhiên giúp bé ăn ngon miệng mà không gây đầy hơi.",
    recommendedProductId: "keyavo-baby-250ml",
    recommendedProductName: "Keyavo Kids & Baby Virgin 250ml",
    recommendedProductVolume: "250ml",
    recommendedProductPrice: 320000,
    recommendedProductImage: "/images/product-250ml.webp",
    rating: 5.0,
    reviewsCount: 195,
    isFeatured: true,
  },
  {
    id: "sot-mayonnaise-dau-bo-5-sao",
    title: "Sốt Mayonnaise Dầu Bơ Thủ Công Siêu Mịn Không Chất Bảo Quản",
    subtitle: "Chỉ 3 phút tự làm tại nhà với máy xay cầm tay, sốt sánh mịn óng ánh màu xanh bơ",
    category: "sauce-dressing",
    categoryLabel: "Sốt & Dressing Bếp Pháp",
    diet: "Keto / Paleo / Clean Eating",
    difficulty: "Dễ",
    prepTime: "5 phút",
    cookTime: "0 phút",
    totalTime: "5 phút",
    servings: "Lọ 250ml (Dùng trong 2 tuần)",
    caloriesCount: 110,
    image: "/images/story-eatclean.webp",
    badge: "CHUẨN BẾP PHÁP",
    badgeColor: "bg-emerald-900 text-[#D4F666]",
    description: "Khác biệt hoàn toàn với sốt mayonnaise công nghiệp chứa đầy dầu đậu nành biến tính và đường tinh luyện, sốt mayonnaise dầu bơ Keyavo chứa 100% chất béo lành mạnh, thơm béo tự nhiên.",
    nutrition: {
      calories: "110 kcal / thìa canh",
      protein: "1g",
      goodFats: "12g Axit Oleic",
      carbs: "0.2g",
      vitaminE: "25% DV",
    },
    ingredients: [
      { name: "Lòng đỏ trứng gà ta hữu cơ", amount: "1 quả", note: "Để ở nhiệt độ phòng" },
      { name: "Dầu bơ ép lạnh Keyavo Extra Virgin", amount: "180ml", note: "Rót từ từ khi đánh" },
      { name: "Nước cốt chanh vàng tươi", amount: "1 thìa canh (15ml)" },
      { name: "Mù tạt vàng Dijon", amount: "1 thìa cà phê" },
      { name: "Muối biển hạt mịn", amount: "1/3 thìa cà phê" },
    ],
    steps: [
      {
        step: 1,
        title: "Chuẩn bị cối xay dạng trụ",
        instruction: "Cho lòng đỏ trứng, mù tạt Dijon, nước cốt chanh và muối vào đáy cốc xay sâu lòng.",
      },
      {
        step: 2,
        title: "Đổ dầu bơ và nhũ hóa",
        instruction: "Rót toàn bộ 180ml dầu bơ Keyavo lên trên bề mặt trứng. Đặt đầu máy xay cầm tay chạm sát đáy cốc, giữ nguyên ở tốc độ cao nhất trong 15 giây đầu. Khi thấy lớp sốt trắng ngà bắt đầu hình thành ở đáy, từ từ nhấc nhẹ máy xay lên trên để nhũ hóa toàn bộ dầu.",
      },
      {
        step: 3,
        title: "Bảo quản trong lọ thủy tinh",
        instruction: "Cho sốt vào lọ thủy tinh tiệt trùng, đậy kín nắp và để ngăn mát tủ lạnh. Sốt sẽ đặc lại như kem tươi và bảo quản tốt trong 10-14 ngày.",
      },
    ],
    keyavoTip: "Dầu bơ có hương thơm dịu nhẹ trung tính, là loại dầu lý tưởng nhất thế giới để làm mayonnaise vì không bị nồng gắt như dầu oliu nguyên chất.",
    recommendedProductId: "keyavo-500ml",
    recommendedProductName: "Keyavo Avocado Extra Virgin 500ml",
    recommendedProductVolume: "500ml",
    recommendedProductPrice: 499000,
    recommendedProductImage: "/images/product-500ml.webp",
    rating: 4.8,
    reviewsCount: 88,
  },
  {
    id: "banh-mousse-chocolate-dau-bo",
    title: "Bánh Mousse Chocolate Đen & Dầu Bơ Thuần Chay (Vegan)",
    subtitle: "Món tráng miệng mượt mà như nhung, không đường tinh luyện, không bơ sữa động vật",
    category: "dessert",
    categoryLabel: "Bánh & Tráng Miệng Healthy",
    diet: "Vegan / Thuần Chay / Dairy-Free",
    difficulty: "Dễ",
    prepTime: "15 phút",
    cookTime: "0 phút",
    totalTime: "15 phút (+ làm lạnh)",
    servings: "4 ly nhỏ",
    caloriesCount: 260,
    image: "/images/modal-steak.webp",
    badge: "HEALTHY DESSERT",
    badgeColor: "bg-[#2D1B14] text-amber-200",
    description: "Một sự kết hợp bất ngờ nhưng cực kỳ tinh tế giữa bột cacao nguyên chất 70%, thịt bơ Hass tươi và vài giọt dầu bơ Keyavo tạo nên kết cấu mousse mềm mượt tan chảy trên đầu lưỡi.",
    nutrition: {
      calories: "260 kcal / ly",
      protein: "5g",
      goodFats: "16g chất béo thực vật lành mạnh",
      carbs: "22g (chủ yếu từ quả chà là & mật cây phong)",
      vitaminE: "35% DV",
    },
    ingredients: [
      { name: "Bơ Hass Đắk Lắk chín mềm", amount: "2 quả lớn", note: "Bỏ vỏ và hạt" },
      { name: "Dầu bơ ép lạnh Keyavo Extra Virgin", amount: "2 thìa canh (30ml)", note: "Tạo độ bóng và kết cấu mềm mịn" },
      { name: "Bột cacao nguyên chất 100% không đường", amount: "50g" },
      { name: "Siro cây phong (Maple syrup) hoặc mật ong rừng", amount: "60ml" },
      { name: "Sữa hạnh nhân không đường", amount: "50ml" },
      { name: "Chiết xuất vani tự nhiên & muối biển", amount: "1 thìa cà phê vani, 1 nhúm muối nhỏ" },
      { name: "Quả mâm xôi hoặc dâu tây tươi trang trí", amount: "Tùy thích" },
    ],
    steps: [
      {
        step: 1,
        title: "Xay nhuyễn hỗn hợp mousse",
        instruction: "Cho thịt quả bơ, dầu bơ Keyavo, bột cacao, siro phong, sữa hạnh nhân, vani và muối vào máy xay sinh tố tốc độ cao. Xay liên tục trong 2 phút cho đến khi hỗn hợp thật mịn mượt và không còn lợn cợn.",
      },
      {
        step: 2,
        title: "Làm lạnh định hình kết cấu",
        instruction: "Múc mousse ra 4 ly thủy tinh nhỏ. Đậy màng bọc thực phẩm và để trong ngăn mát tủ lạnh ít nhất 2 giờ để mousse đông dẻo lại.",
      },
      {
        step: 3,
        title: "Trang trí & phục vụ",
        instruction: "Trước khi thưởng thức, trang trí với quả mọng tươi, rắc chút socola đen bào vụn và vài lá bạc hà thơm mát.",
      },
    ],
    keyavoTip: "Dầu bơ cung cấp độ bóng mướt mịn tự nhiên mà các đầu bếp bánh ngọt Pháp hay dùng bơ cacao đắt đỏ để tạo ra.",
    recommendedProductId: "keyavo-500ml",
    recommendedProductName: "Keyavo Avocado Extra Virgin 500ml",
    recommendedProductVolume: "500ml",
    recommendedProductPrice: 499000,
    recommendedProductImage: "/images/product-500ml.webp",
    rating: 4.9,
    reviewsCount: 114,
  },
  {
    id: "salad-kale-dau-bo-hat-dieu",
    title: "Salad Cải Kale Dầu Bơ Massage, Hạt Điều Rang Muối & Việt Quất",
    subtitle: "Bí quyết làm mềm lá cải xoăn Kale với dầu bơ nguyên chất để món salad thơm ngon dễ ăn",
    category: "eat-clean",
    categoryLabel: "Eat-Clean & Salad",
    diet: "Eat-Clean / Vegan / Superfood",
    difficulty: "Dễ",
    prepTime: "12 phút",
    cookTime: "0 phút",
    totalTime: "12 phút",
    servings: "2-3 người",
    caloriesCount: 290,
    image: "/images/story-eatclean.webp",
    badge: "DETOX & TRẺ HÓA",
    badgeColor: "bg-emerald-700 text-white",
    description: "Cải xoăn kale thường dai và có vị hơi đắng, nhưng khi được massage cùng dầu bơ Keyavo và chanh trong 2 phút, lá cải trở nên mềm mịn, mướt mát và ngọt thanh tự nhiên.",
    nutrition: {
      calories: "290 kcal",
      protein: "8g",
      goodFats: "18g (Giàu Axit béo đơn & Lutein)",
      carbs: "24g",
      vitaminE: "60% DV",
    },
    ingredients: [
      { name: "Cải xoăn Kale hữu cơ", amount: "200g", note: "Tước bỏ cọng cứng, xé nhỏ lá" },
      { name: "Dầu bơ ép lạnh Keyavo Extra Virgin", amount: "3 thìa canh (45ml)", note: "Dùng để massage lá và trộn sốt" },
      { name: "Nước cốt chanh tươi", amount: "1.5 thìa canh" },
      { name: "Hạt điều Bình Phước rang muối béo ngậy", amount: "40g", note: "Đập dập nhẹ" },
      { name: "Việt quất tươi hoặc quả nam việt quất khô", amount: "30g" },
      { name: "Phô mai Feta hoặc phô mai dê (tùy chọn)", amount: "30g" },
      { name: "Mật ong rừng & muối hồng", amount: "Vừa đủ" },
    ],
    steps: [
      {
        step: 1,
        title: "Bí quyết massage cải Kale với dầu bơ",
        instruction: "Cho lá kale đã rửa sạch vào âu lớn. Rưới 2 thìa canh dầu bơ Keyavo, nước cốt chanh và một nhúm muối. Dùng hai bàn tay bóp nhẹ và massage đều lá kale trong 2 phút cho đến khi lá xẹp lại còn một nửa và chuyển sang màu xanh ngọc bích sẫm óng ả.",
        chefTip: "Chất béo trong dầu bơ bẻ gãy cấu trúc xơ cellulose cứng của kale, làm mềm lá tự nhiên mà không cần luộc, giữ nguyên 100% vitamin C và K.",
      },
      {
        step: 2,
        title: "Trộn gia vị & quả mọng",
        instruction: "Rưới thêm 1 thìa dầu bơ cùng 1 thìa mật ong. Cho việt quất và hạt điều rang giòn vào đảo nhẹ tay.",
      },
      {
        step: 3,
        title: "Trang trí với phô mai",
        instruction: "Bày ra đĩa sâu lòng, rắc phô mai Feta bóp vụn lên trên và thưởng thức ngay.",
      },
    ],
    keyavoTip: "Vitamin A, E, K trong cải Kale là các vitamin tan trong chất béo. Dầu bơ Keyavo giúp cơ thể bạn hấp thu gấp 4-6 lần các chất chống oxy hóa từ rau xanh.",
    recommendedProductId: "keyavo-500ml",
    recommendedProductName: "Keyavo Avocado Extra Virgin 500ml",
    recommendedProductVolume: "500ml",
    recommendedProductPrice: 499000,
    recommendedProductImage: "/images/product-500ml.webp",
    rating: 4.8,
    reviewsCount: 142,
  },
];
