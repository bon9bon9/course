const conn = require("../mariadb");
const {resJson, resSuccessJson, decodeJwt} = require("../common");
const {StatusCodes} = require('http-status-codes');

const order = async (req,res) => {
    const orderInfo = [
        decodeJwt(req), // user_idx
        req.body.address,
        req.body.address_detail,
        req.body.name,
        req.body.contact,
        req.body.delivery_fee,
        req.body.payment
    ];
    const c_idxs = req.body.c_idxs;
    try {
        await conn.promise().beginTransaction();
        // 1. 총 수량과 가격 계산
        let selectTotalValue = `SELECT SUM(c_quantity) AS quantity, SUM(c_quantity*b_price) AS price, MIN(b.b_title) AS title, COUNT(b.b_idx) AS type
        FROM cart AS c
        LEFT JOIN book as b ON c.book_idx = b.b_idx
        WHERE c.c_idx IN (?)`;
        
        const [totalResults] = await conn.promise().query(selectTotalValue, [c_idxs]);
        let totalResult = totalResults[0];
        orderInfo.push(totalResult.quantity);
        orderInfo.push(totalResult.price);
        orderInfo.push(totalResult.title);
        orderInfo.push(totalResult.type);

        // 2. order 테이블에 주문 정보 삽입
        let insertOrder = `INSERT INTO orders (user_idx, o_address, o_address_detail, o_name, o_contact, o_delivery_fee, o_payment, o_quantity, o_price, o_book_title, o_book_type) VALUES (?)`;
        const [orderInsertResult] = await conn.promise().query(insertOrder, [orderInfo]);
        let newOIdx = orderInsertResult.insertId;

        // 3. cart 정보 가져오기
        let selectCart = `SELECT * FROM cart AS c WHERE c.c_idx IN (?)`;
        const [cartResults] = await conn.promise().query(selectCart, [c_idxs]);

        // 4. order_detail 테이블에 삽입할 데이터 준비
        let orderDetailValues = [];
        cartResults.forEach(result => {
            orderDetailValues.push([newOIdx, result.book_idx, result.c_quantity]);
        });

        // 5. order_detail 테이블에 주문 상세 정보 삽입
        let insertOrderDetail = `INSERT INTO orders_detail (orders_idx, book_idx, od_quantity) VALUE ?`;
        await conn.promise().query(insertOrderDetail, [orderDetailValues]);

        // 6. cart 테이블에서 해당 항목 삭제
        let deleteCart = `DELETE FROM cart WHERE c_idx IN (?)`;
        await conn.promise().query(deleteCart, [c_idxs]);

        await conn.promise().commit();
        // 응답 성공 처리
        res.status(StatusCodes.OK).json(resSuccessJson(newOIdx));
    } catch (err) {
        // 에러 처리
        await conn.promise().rollback();
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};


const orderList = async (req,res) => {
    const user_idx = decodeJwt(req);
    let sql = `SELECT * FROM orders AS o WHERE o.user_idx = ?`
    try{
        let [results] = await conn.promise().query(sql,[user_idx]);
        return res.json(resSuccessJson(results));
    }catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const orderDetailList = async (req,res) => {
    const user_idx = decodeJwt(req);
    const {o_idx} = req.params;
    let sql = `SELECT * FROM orders_detail AS od 
    INNER JOIN orders AS o ON od.orders_idx = o.o_idx
    INNER JOIN book AS b ON od.book_idx = b.b_idx
    WHERE od.orders_idx = ? AND o.user_idx = ?`
    try{
        let [results] = await conn.promise().query(sql,[o_idx, user_idx]);
        return res.json(resSuccessJson(results));
    }catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

module.exports = {
    order,
    orderList,
    orderDetailList
}