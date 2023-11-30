// 2023-11-28  오후 18:00 임휘훈 DB모듈화 완료
// 각 페이지 라우터
const express = require("express");
const router = express.Router();
const axios = require("axios");
const goodsModel = require("../models/goodsModel")

// 굿즈 페이지의 굿즈 정보 불러오는 라우터
router.post("/goods", async (req, res) => {
    const result = await goodsModel.goods()
    res.json({result : result.result[0], isLoading : true})
})

// 231122 오전 10:00 박지훈 작성
// 굿즈 상세페이지 데이터
router.post('/goodProduct', async (req,res)=>{
    let data = req.body.prodId
    const result = await goodsModel.goodProduct(data)
    console.log("함수 실행 후", result.prdInfo);
    res.json({
        prdInfo:result.prdInfo,
        prdColor:result.prdColor,
        prdImg:result.prdImg,
        prdSize:result.prdSize
    })
})




module.exports = router;