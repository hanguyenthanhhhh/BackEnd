# Focus Tasks — TODO app quản lý công việc cá nhân

Focus Tasks là ứng dụng TODO app giúp quản lý công việc cá nhân trong ngày. Giao diện tiếng Việt, responsive cho desktop và mobile.

Link repository: https://github.com/hanguyenthanhhhh/BackEnd
Link Pages: https://hanguyenthanhhhh.github.io/BackEnd/

## Chức năng

- Hiển thị task hôm nay, tìm kiếm và lọc theo trạng thái.
- Thêm, sửa và đổi trạng thái công việc; dữ liệu lưu trong `localStorage`.
- Trang thống kê gồm tỷ lệ hoàn thành, biểu đồ 7 ngày, biểu đồ danh mục và gợi ý tiến độ.
- Có nút nạp dữ liệu mẫu để trình diễn giao diện thống kê.

## Phần GUI — tiêu chí Vibecode (1.5 điểm)

GUI được triển khai trong `index.html` và `styles.css`, gồm:

- Dashboard với lời chào, ngày hiện tại và các thẻ tổng quan.
- Sidebar điều hướng giữa trang Công việc và trang Thống kê.
- Danh sách task có checkbox, tên, mô tả, danh mục, trạng thái và menu chỉnh sửa.
- Thanh tìm kiếm, bộ lọc trạng thái và nút “Thêm công việc”.
- Modal thêm/chỉnh sửa với các trường tên, mô tả, danh mục và trạng thái.
- Trang Thống kê có biểu đồ cột tiến độ, biểu đồ donut theo danh mục và phần gợi ý.
- Responsive cho desktop, tablet và mobile; màu xanh tím chủ đạo, card bo góc và typography dễ đọc.

### Prompt Vibecode

```text
Hãy thiết kế một ứng dụng TODO app quản lý công việc cá nhân bằng HTML, CSS và JavaScript thuần.

Yêu cầu giao diện:
- Phong cách hiện đại, tối giản, thân thiện; màu chủ đạo xanh tím, nền sáng, card bo góc.
- Có sidebar với logo Focus Tasks, menu Công việc và Thống kê.
- Trang Công việc có lời chào, ngày hiện tại, thẻ tổng quan và danh sách task hôm nay.
- Có ô tìm kiếm, bộ lọc trạng thái và nút thêm công việc.
- Task hiển thị tên, mô tả, danh mục, trạng thái và checkbox hoàn thành.
- Có modal thêm/sửa với tên, mô tả, danh mục và trạng thái.
- Trang Thống kê có biểu đồ tiến độ 7 ngày, phân bổ theo danh mục và phần gợi ý.
- Có dữ liệu mẫu để demo biểu đồ và responsive tốt trên desktop/mobile.

Yêu cầu chức năng:
- Thêm, sửa, xóa hoặc đổi trạng thái task.
- Tìm kiếm theo tên, mô tả hoặc danh mục; lọc theo trạng thái.
- Lưu dữ liệu vào localStorage để không mất dữ liệu khi refresh.
- Tách riêng index.html, styles.css và app.js, code rõ ràng dễ bảo trì.
```

## Công nghệ

- HTML5, CSS3, JavaScript thuần.
- Node.js `http` module để chạy static server, không cần thư viện ngoài.
- Google Fonts (DM Sans và Playfair Display).

## Chạy dự án

Yêu cầu Node.js 18 trở lên.

```bash
npm start
```

## Demo GitHub Pages

Phiên bản online của ứng dụng:

[https://hanguyenthanhhhh.github.io/BackEnd/](https://hanguyenthanhhhh.github.io/BackEnd/)

GitHub Pages chỉ chạy phần giao diện tĩnh. Dữ liệu task được lưu bằng `localStorage` trên trình duyệt.

Mở trình duyệt tại [http://localhost:8090].

## Cấu trúc chính

- `index.html`: layout dashboard, modal thêm/sửa và trang thống kê.
- `styles.css`: giao diện responsive, màu sắc và biểu đồ.
- `app.js`: CRUD, tìm kiếm/lọc, lưu localStorage và render thống kê.
- `server.js`: static server Node.js.

## Gợi ý mở rộng database

Phiên bản hiện tại dùng `localStorage`. Khi triển khai thật, có thể thay bằng API Node.js/Express kết nối SQLite hoặc MongoDB với bảng `tasks` gồm `id`, `title`, `description`, `category`, `status`, `date`, `created_at`.
