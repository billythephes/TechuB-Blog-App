const postsData = [
  {
    id: 1,
    title:
      'Những công nghệ bị khai tử trong năm 2023',
    avatar: (source = require('../assets/Post/avt.png')),
    username: 'Trần',
    date: 'Jan 1, 2023',
    img: { uri: 'https://photo.znews.vn/w960/Uploaded/sfrsm/2023_12_24/Twitter.jpeg' },
    description:
      'Sự biến mất đột ngột của thương hiệu Twitter, hay cái chết được dự báo từ lâu của cổng Lightning là những ví dụ điển hình cho các công nghệ quan trọng bị khai tử trong năm nay.',
    content:
      'Trong năm nay, có một số thay đổi và khai tử của các thương hiệu và công nghệ nổi tiếng. Twitter: Mạng xã hội Twitter đã đổi tên thành X và chú chim xanh quen thuộc đã biến mất sau khi quyết định này được đưa ra bởi ông chủ Elon Musk. Google Glass AR: Google Glass, một dạng kính thông minh được kỳ vọng trở thành công cụ thu thập thông tin và truy cập Internet, đã chứng kiến nhiều vấn đề bao gồm thời lượng pin ngắn, lo ngại về quyền riêng tư và giá cao. Sau một lần tạm ngưng sản xuất và cải tiến, Google đã chính thức khai tử dự án này vào giữa tháng 3. Cổng Lightning: Cổng kết nối Lightning của Apple đã được thay thế bằng cổng USB-C trên dòng iPhone 15 ra mắt vào tháng 9. Điều này đánh dấu việc Apple chấm dứt việc sử dụng cổng Lightning trên các thiết bị mới. Trợ lý ảo Cortana: Cortana, trợ lý giọng nói của Microsoft, đã bị loại bỏ khỏi danh sách ứng dụng tích hợp trên Windows sau khi Microsoft ra mắt Bing Chat (Copilot) trong tháng 6.',
  },
  {
    id: 2,
    title: 'Mô hình ngôn ngữ lớn là tương lai của AI?',
    avatar: (source = require('../assets/Post/avt.png')),
    username: 'Nguyễn',
    date: 'Jan 2, 2023',
    img: { uri: 'https://photo.znews.vn/w1920/Uploaded/yqdlcqrwq/2023_12_17/09717122023.JPG' },
    description:
      'Chuyên gia nhận định các mô hình ngôn ngữ lớn (LLM) có thể thay đổi một số lĩnh vực trong cuộc sống, nhưng vẫn còn nhiều thách thức cần giải quyết.',
    content:
      'Đạt 100 triệu người dùng sau 2 tháng phát hành, ChatGPT là một trong những ứng dụng tăng trưởng nhanh nhất lịch sử. Các công dụng của ChatGPT như viết đoạn văn, giải toán, tóm tắt văn bản, dịch thuật… dựa trên yêu cầu từ người dùng. Bộ não của ChatGPT là mô hình ngôn ngữ lớn (LLM) GPT do OpenAI phát triển. Về cơ bản, đây là các mô hình học sâu phức tạp, có lượng dữ liệu và chi phí đào tạo lớn. Quá trình phát triển LLM diễn ra trong hàng chục năm. Không chỉ tiên đoán từ hay văn bản cụ thể, các mô hình ngôn ngữ dần phát triển để áp dụng vào nhiều tác vụ thông qua bộ dữ liệu tiền huấn luyện (pre-trained), sau đó đến bước tinh chỉnh (fine-tuning) cho mục đích sử dụng cụ thể. Từ năm 2020, một số LLM như GPT-3 hay GPT-4 không cần tinh chỉnh nhưng vẫn có khả năng tương tác một cách tự nhiên. Các chuyên gia nhận định nếu được doanh nghiệp, tổ chức đầu tư và lên kế hoạch kỹ càng, LLM sẽ có nhiều ứng dụng thực tiễn, thậm chí trở thành trọng tâm của trí tuệ nhân tạo (AI) trong tương lai.',
  },
  {
    id: 3,
    title: 'G-Dragon rời YG vì quá thất vọng',
    avatar: (source = require('../assets/Post/avt.png')),
    username: 'Lê',
    date: 'Jan 3, 2023',
    description:
      'Phản hồi của YG với truyền thông khi G-Dragon vướng nghi án sử dụng ma túy khiến trưởng nhóm Big Bang thất vọng và quyết định rời công ty sau hơn 20 năm gắn bó.',
    content:
      'Ngày 23/12, Sports Seoul đưa tin lý do G-Dragon rời YG Entertainment là thất vọng trước phản ứng của công ty về vụ điều tra nam rapper sử dụng ma túy. Theo truyền thông Hàn Quốc, trước khi vụ việc nổ ra, G-Dragon đã chuẩn bị tái ký hợp đồng với YG, đồng thời chuẩn bị album mới. Tuy nhiên, thời điểm đó, tin tức G-Dragon sử dụng ma túy dấy lên và cảnh sát cũng bắt đầu cuộc điều tra. Khi được truyền thông liên hệ, YG phản hồi: Thật khó để đưa ra phản hồi chính thức vì anh ấy hiện không trực thuộc công ty chúng tôi. Hành động trên được xem như cắt đứt quan hệ với G-Dragon. G-Dragon cũng nói thêm: Chúng tôi sẽ trở lại vào năm 2024 và hoàn thành cả trách nhiệm nghệ sĩ cũng như trách nhiệm xã hội. G-Dragon gia nhập YG Entertainment vào năm 2000 và ra mắt trong nhóm nhạc Big Bang 6 năm sau đó. Từ đó, họ nhanh chóng nổi tiếng với nhiều bản hit đình đám. G-Dragon cũng thành công trong sự nghiệp âm nhạc và được xem như biểu tượng thời trang Kpop.',
  },
  {
    id: 4,
    title: 'Messi vượt xa Ronaldo về độ phủ sóng',
    avatar: (source = require('../assets/Post/avt.png')),
    username: 'Nguyễn',
    date: 'Jan 4, 2023',
     img: { uri: 'https://photo.znews.vn/w660/Uploaded/sotnzt/2023_12_24/79281079_12896097_image_a_1_1703322008679.jpg' },
    description:
      'Lionel Messi là cầu thủ có độ phủ sóng nhiều nhất trên Internet ở nhiều quốc trong năm 2023.',
    content:
      'Trang Fbref thống kê cầu thủ được tìm kiếm và xem trực tuyến nhiều nhất trong 12 tháng qua. Không ngạc nhiên khi Messi đứng đầu. M10 là cầu thủ được theo dõi nhiều nhất ở Mỹ. Không chỉ vậy, anh đứng đầu ở tất cả 50 bang. Messi còn là VĐV phủ sóng nhiều nhất ở 13 quốc gia khác gồm: Thổ Nhĩ Kỳ, Canada, Italy, Bỉ, Thụy Điển, Hà Lan, Ai Cập, Trung Quốc, Ấn Độ, Đức, Nam Phi, Ghana và tất nhiên Argentina. Trong khi đó, độ phủ sóng của Cristiano Ronaldo không nhiều. Anh chỉ đứng đầu ở Bồ Đào Nha. Điều này tương đối bất ngờ khi Bolavip trước đó khẳng định Ronaldo là vận động viên được tìm kiếm nhiều nhất năm 2023 trên công cụ Google.',
  },
  {
    id: 5,
    title: 'Tương lai Hollywood năm 2024',
    avatar: (source = require('../assets/Post/avt.png')),
    username: 'Phan',
    date: 'Mar 1, 2023',
    img: {
      uri: 'https://photo.znews.vn/w860/Uploaded/neg_yslewlx/2023_12_25/231201082116_02_furiosa_a_mad_ma.jpg',
    },
    description:
      'Hollywood sẽ phải đi tìm lời giải cho 4 câu hỏi hóc búa. Trong nỗi trăn trở đó, việc thiếu vắng tác phẩm bom tấn khiến các chủ rạp phim như ngồi trên đống lửa.',
    content:
      'Ngành công nghiệp giải trí đang khép lại một trong những năm hỗn loạn và tốn kém nhất lịch sử. Từ sự kiện giới biên kịch đình công kéo dài cho tới giá cổ phiếu các hãng phim giảm mạnh, năm 2023 không thiếu sự kịch tính. Nhưng, ngay cả khi Hollywood muốn quay lại guồng kinh doanh như trước, tình hình vẫn rất căng thẳng. Phố Wall đang có mối lo ngại lớn về cách các công ty truyền thông xử lý việc chuyển đổi từ truyền hình cáp sang phát trực tuyến. Phòng vé vẫn chưa lấy lại được bước tiến như trước đại dịch... Tất cả biến động này sẽ dẫn đến một tương lai nhiều trăn trở của Hollywood trong năm 2024. Theo Variety, ông chủ các rạp phim khắp nước Mỹ có mối bận tâm chung về tương lai phòng vé của năm 2024. Họ lo sợ chuỗi ngày ảm đạm của năm 2023 sẽ tiếp tục kéo dài vì tác động dai dẳng của Covid-19 cùng với cuộc đình công của 11.500 biên kịch thuộc Hiệp hội Biên kịch Mỹ (WGA) đã làm gián đoạn quá trình sản xuất phim.',
  },
  {
    id: 6,
    title:
      'Tác giả Dragon Ball tiết lộ nhân vật yêu thích, không phải Goku hay Vegeta',
    avatar: (source = require('../assets/Post/avt.png')),
    username: 'Phú',
    date: 'Mar 2, 2023',
     img: {
      uri: 'https://gamek.mediacdn.vn/133514250583805952/2023/12/21/photo-1703149066998-17031490670962019606899.png',
    },
    description:
      'Piccolo là nhân vật được tác giả Akira yêu thích nhất, nhưng phản ứng của người hâm mộ dành cho nhân vật này lại không quá đặc biệt.',
    content:
      'Bạn có biết rằng Akira Toriyama có một nhân vật được yêu thích của riêng mình, và đó không phải là Goku - nhân vật chính của bộ truyện? Mặc dù Goku thường là nhân vật được yêu thích nhất trong lòng người hâm mộ Dragon Ball, nhưng tác giả của bộ truyện lại có sở thích khác. Trong một cuộc phỏng vấn tiết lộ về Dragon Ball Daizenshuu 2: Story Guide, Toriyama tiết lộ rằng Piccolo là nhân vật yêu thích của anh, không phải là những nhân vật nổi tiếng như Goku và Vegeta. Piccolo ban đầu được giới thiệu là một nhân vật phản diện trong vũ trụ Dragon Ball, sau đó đã quay xe trở thành đồng minh chủ chốt cùng phe với Goku. Thậm chí còn trở thành người thầy của Gohan. Quá trình chuyển đổi từ nhân vật phản diện sang nhân vật anh hùng của Piccolo là một trong những cung nhân vật quan trọng nhất của bộ truyện. Sự ưa thích của Toriyama dành cho Piccolo là đáng chú ý, đặc biệt khi xét đến mức độ nổi tiếng và nổi bật của Goku trong loạt phim.',
  },
  {
    id: 7,
    title: 'Muôn vàn quy định cho người sống ảo ở quán cà phê TP.HCM',
    avatar: (source = require('../assets/Post/avt.png')),
    username: 'Cil',
    date: 'Mar 3, 2023',
    description:
      'Nhiều quán cà phê ở TP.HCM cấm khách thay đồ trong nhà vệ sinh, mang theo thiết bị hỗ trợ chụp hình và ekip trang điểm chuyên nghiệp.',
    content:
      'Khi bước chân vào Tiệm Trà Tháng Tư (đường Nhất Chi Mai, quận Tân Bình), khách hàng có thể dễ dàng nhìn thấy những tấm biển ghi rõ các quy định sống ảo tại quán. Với lượng khách gia tăng trong mùa lễ hội cuối năm, quán còn dựng cả standee lớn để nhắc nhở khách hàng. Các quy định bao gồm không mang giày vào khu vực chụp ảnh, không di chuyển đồ trang trí, không sử dụng vật dụng hỗ trợ chụp ảnh chuyên nghiệp, không hỗ trợ chụp ảnh thương mại... Quản lý quán nói với Tri Thức - ZNews rằng bảng nội quy sống ảo được đưa ra sau khi có nhiều khách chụp ảnh lộn xộn ảnh hưởng đến khách hàng khác và làm hư hại đồ đạc trang trí. Hiện tại, nếu khách vi phạm lần một sẽ được nhân viên nhắc nhở, nhưng từ lần thứ hai trở đi, quán sẽ từ chối phục vụ tiếp, quản lý quán cho hay. Tiệm Trà Tháng Tư không phải nơi duy nhất có quy định chi tiết với nhóm khách thích chụp ảnh. Nhiều quán cà phê khác tại TP.HCM cũng có hướng dẫn tương tự, thậm chí có thể phụ thu tiền triệu đối với khách vi phạm. Một trong những quy định phổ biến nhất tại các quán cà phê sống ảo ở TP.HCM là cấm khách thay đồ trong nhà vệ sinh. Vì không hỗ trợ chụp ảnh thương mại, Tiệm Trà Tháng Tư cũng cấm luôn các ekip chụp hình, trang điểm quá chuyên nghiệp. Nhiều chủ quán cà phê nói rằng việc cấm trẻ em là một quyết định rất mạo hiểm vì các nhóm gia đình cũng là những khách hàng tiềm năng, chi tiêu mạnh tay. Nhưng với những trường hợp trẻ em quấy phá, quán có thể vừa bị hư hại đồ đạc, vừa bị các nhóm khách khác phàn nàn. Một số nơi đưa ra những biện pháp mềm mỏng hơn như treo biển hoặc để nhân viên nhắc nhở.',
  },
  {
    id: 8,
    title: 'Khoảnh khắc đẹp nhất 2023 của Victoria Beckham và David Beckham',
    avatar: (source = require('../assets/Post/avt.png')),
    username: 'Hà',
    date: 'Feb 4, 2023',
    description:
      'Trang Business Insider lựa chọn những khoảnh khắc đẹp nhất showbiz năm 2023, trong đó có hình ảnh của Dương Tử Quỳnh, Taylor Swift, Rihanna, vợ chồng David Beckham.',
    content:
      'Vợ chồng Victoria Beckham và David Beckham gây chú ý khi ngôi thuyền đến thưởng thức BST Le Chouchou của Jacquemus tại Chateau de Versailles ở Versailles, Pháp. People cho biết chuyến đi này ban đầu vì mục đích xem thời trang, nhưng lại trở thành cuộc hẹn hò lãng mạn của cặp sao. Không cần bàn luận quá nhiều về chuyến lưu diễn đẳng cấp The Eras Tour của Taylor Swift. Show diễn hứa hẹn bùng nổ hơn ở chặng châu Á vào năm 2024. Theo Billboard, The Eras Tour gây sốt toàn cầu khi được đầu tư hình ảnh, âm thanh, cũng như chiến lược PR thông minh. Và hơn hết, giọng hát đầy nội lực của Swift là yếu tố tiên quyết để chinh phục những khán giả khó tính nhất. Trung bình mỗi show, cô hát khoảng 44 bài và 2 bài không có trong list để tạo bất ngờ. Cũng tại Oscar, Everything Everywhere All at Once thắng lớn khi Dương Tử Quỳnh, Quan Kế Huy và Jamie Lee Curtis đều được xướng tên nhận giải. Trong đó, Quan Kế Huy thắng hạng mục Nam diễn viên phụ xuất sắc, Jamie Lee Curtis ra về với tượng vàng Nữ diễn viên phụ xuất sắc và Dương Tử Quỳnh - ngôi sao toả sáng nhất đêm với giải quan trọng Nữ diễn viên chính xuất sắc.',
  },
];

export default postsData;
