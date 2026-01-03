export const commentsMock = [
  {
    id: 1,
    user_id: 101,
    name: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/100?img=1",
    content: "Sản phẩm rất đẹp, đúng như mô tả 👍",
    time: "2 giờ trước",
    isAuthor: false,
    replies: [
      {
        id: 11,
        user_id: 201,
        name: "Chủ shop",
        avatar: "https://i.pravatar.cc/100?img=12",
        content: "Cảm ơn bạn đã ủng hộ shop ❤️",
        time: "1 giờ trước",
        isAuthor: true
      }
    ]
  },
  {
    id: 2,
    user_id: 102,
    name: "Trần Thị B",
    avatar: "https://i.pravatar.cc/100?img=2",
    content: "Giao hàng nhanh, đóng gói cẩn thận.",
    time: "5 giờ trước",
    isAuthor: false,
    replies: []
  },
  {
    id: 3,
    user_id: 103,
    name: "Lê Văn C",
    avatar: "https://i.pravatar.cc/100?img=3",
    content: "Sản phẩm dùng ổn trong tầm giá.",
    time: "1 ngày trước",
    isAuthor: false,
    replies: [
      {
        id: 31,
        user_id: 201,
        name: "Chủ shop",
        avatar: "https://i.pravatar.cc/100?img=12",
        content: "Shop luôn kiểm tra kỹ trước khi gửi 👍",
        time: "20 giờ trước",
        isAuthor: true
      }
    ]
  },
  {
    id: 4,
    user_id: 104,
    name: "Phạm Thị D",
    avatar: "https://i.pravatar.cc/100?img=4",
    content: "Chất lượng tốt, sẽ ủng hộ thêm.",
    time: "2 ngày trước",
    isAuthor: false,
    replies: []
  },
  {
    id: 5,
    user_id: 105,
    name: "Hoàng Văn E",
    avatar: "https://i.pravatar.cc/100?img=5",
    content: "Mua lần thứ 2 vẫn rất hài lòng.",
    time: "3 ngày trước",
    isAuthor: false,
    replies: []
  }
];
