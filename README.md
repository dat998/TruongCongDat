# Portfolio – Trương Công Đạt

Trang giới thiệu cá nhân (personal branding) dạng tĩnh: HTML + CSS + JavaScript thuần, không cần build.

## Cấu trúc

```
portfolio/
├── index.html      # Nội dung trang (sửa chữ ở đây)
├── style.css       # Giao diện, màu sắc, sáng/tối, responsive
├── script.js       # Đổi theme, menu mobile, hiệu ứng cuộn, sao chép email
└── assets/
    └── avatar.png  # Ảnh đại diện (480x480)
```

## Xem trên máy

Mở trực tiếp `index.html` bằng trình duyệt, hoặc chạy server tĩnh:

```bash
python3 -m http.server 8000
```

Rồi vào http://localhost:8000

## Đưa lên GitHub Pages

Repo: `github.com/dat998/TruongCongDat`

1. Đẩy code lên nhánh `master`:

   ```bash
   git add -A
   git commit -m "Portfolio mới"
   git push origin master
   ```

2. Trên GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: `master` / `(root)` → Save**.
3. Sau 1–2 phút trang chạy tại: https://dat998.github.io/TruongCongDat/

## Sửa nội dung thường gặp

- **Thông tin, kinh nghiệm, dự án:** sửa trực tiếp trong `index.html`, mỗi phần có comment `<!-- ABOUT -->`, `<!-- EXPERIENCE -->`...
- **Màu chủ đạo:** đổi `--accent` trong `style.css` (có 2 chỗ: theme sáng và theme tối).
- **Ảnh:** thay file `assets/avatar.png` (ảnh vuông).

## Lưu ý bảo mật

Trang này công khai trên internet, nên:
- Không đưa số điện thoại, địa chỉ nhà, ngày sinh lên trang.
- Không ghi tên dự án, khách hàng, tên miền nội bộ của công ty đang làm (THK) – phần này đã được viết ở dạng mô tả chung.
