const Product = require("../../models/Hopdong");

exports.getProducts = (req, res, next) => {
  Product.getAll(function (products) {
    res.status(200).json({
      messages: "Product list",
      data: products,
    });
  });
};

exports.deleteProduct = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(404).json({
      messages: "Invalid id",
      data: [],
    });
  }
  Product.delete(id, function (data) {
    res.status(200).json({
      messages: "Delete Product",
      data: products,
    });
  });
};

// exports.postProducts = (req, res, next) => {
//   let TThopDong = {
//     ten_nguoi_mua: req.body.ten_nguoi_mua,
//     ten_nguoi_ban: req.body.ten_nguoi_ban,
//     gia_tien: req.body.gia_tien,
//     ngay_ky: req.body.ngay_ky,
//     trang_thai: req.body.trang_thai
//   }
//   Product.create( TThopDong, function (result) {
//     res.status(201).json({
//       data: result,
//     });
//   });
// };

exports.postProducts = (req, res, next) => {
  let TThopDong = {
    ten_nguoi_mua: req.body.ten_nguoi_mua,
    ten_nguoi_ban: req.body.ten_nguoi_ban,
    gia_tien: req.body.gia_tien,
    ngay_ky: req.body.ngay_ky,
    trang_thai: req.body.trang_thai
  }

  // Kiểm tra nếu bất kỳ trường nào bị thiếu
  if (!TThopDong.ten_nguoi_mua || !TThopDong.ten_nguoi_ban || !TThopDong.gia_tien || !TThopDong.ngay_ky || !TThopDong.trang_thai) {
    return res.status(400).json({ messages: "Cần điền đầy đủ thông tin cho tất cả các trường" });
  }

  // Thực hiện tạo hợp đồng
  Product.create( TThopDong, function (result) {
    res.status(201).json({
      data: result,
    });
  });
};

exports.getOneProduct = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(404).json({
      messages: "Invalid id",
      data: [],
    });
  }
  Product.getOne(id, function (result) {
    res.status(201).json({
      messages: "Invalid id",
      data: result,
    });
  });
};

// exports.updateProduct = (req, res, next) => {
//   const id = parseInt(req.params.id);
//   if (isNaN(id)) {
//     return res.status(404).json({
//       messages: "Invalid id",
//       data: [],
//     });
//   }

//   let TThopDong = {
//     ten_nguoi_mua: req.body.ten_nguoi_mua,
//     ten_nguoi_ban: req.body.ten_nguoi_ban,
//     gia_tien: req.body.gia_tien,
//     ngay_ky: req.body.ngay_ky,
//     trang_thai: req.body.trang_thai
//   }

//   Product.update(id, TThopDong, function (result) {
//     res.status(200).json({
//       messages: "Product updated successfully",
//       data: result,
//     });
//   });
// };


exports.updateProduct = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(404).json({
      messages: "Invalid id",
      data: [],
    });
  }

  let TThopDong = {
    ten_nguoi_mua: req.body.ten_nguoi_mua,
    ten_nguoi_ban: req.body.ten_nguoi_ban,
    gia_tien: req.body.gia_tien,
    ngay_ky: req.body.ngay_ky,
    trang_thai: req.body.trang_thai
  }

  // Kiểm tra trạng thái hợp đồng và ngày ký
  if (TThopDong.trang_thai === 2 && TThopDong.ngay_ky) {
    return res.status(400).json({
      messages: "Không được phép sửa ngày đối với trạng thái hợp đồng đang triển khai",
      data: [],
    });
  }

  // Kiểm tra trạng thái hợp đồng đã huỷ
  if (TThopDong.trang_thai === 3) {
    return res.status(400).json({
      messages: "Không thể chỉnh sửa hợp đồng đã huỷ",
      data: [],
    });
  }

  // Nếu không có lỗi, thực hiện cập nhật hợp đồng
  Product.update(id, TThopDong, function (result) {
    res.status(200).json({
      messages: "Product updated successfully",
      data: result,
    });
  });
};
