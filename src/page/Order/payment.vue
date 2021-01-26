<template>
  <div class="w" style="padding-bottom: 100px;">
    <y-shelf title="支付订单">
      <div slot="content">
        <div class="pay-type">
          <div class="p-title">订单状态</div>
          <div class="pay-item">
            <div @click="paySucess">支付成功</div>
            <div @click="payLater">以后支付</div>
            <div @click="orderSucess">完成订单</div>
            <div @click="orderCancel">取消订单</div>
          </div>
        </div>

        <div>
          <div class="box-inner">
            <div>
              <span>
                订单金额：
              </span>
              <em><span>¥</span>{{parseFloat(Number(orderTotal).toFixed(2))}}</em>
              <span>
                实际应付金额：
              </span>
              <em><span>¥</span>{{parseFloat(Number(orderTotal).toFixed(2))}}</em>
            </div>
          </div>
        </div>

      </div>
    </y-shelf>
    <!--地址信息-->
    <div class="p-msg w">
      <div class="confirm-detail">
        <div class="info-title">收货信息</div>
        <p class="info-detail">姓名：{{userName}}</p>
        <p class="info-detail">联系电话：{{tel}}</p>
        <p class="info-detail">详细地址：{{streetName}}</p></div>
    </div>
    <div class="confirm-table-title">
      <span class="name">商品信息</span>
      <div>
        <span class="price">单价</span>
        <span class="num">数量</span>
        <span class="subtotal">小计</span>
      </div>
    </div>
    <!--商品-->
    <div class="confirm-goods-table">
      <div class="cart-items" v-for="(item,i) in cartList" :key="i">
        <div class="name">
          <div class="name-cell ellipsis">
            <a @click="goodsDetails(item.goods.id)" title="" target="_blank">{{item.goods.name}}</a>
          </div>
        </div>
        <div class="n-b">
          <div class="price">¥ {{item.goods.price}}</div>
          <div class="goods-num">{{item.nums}}</div>
          <div class="subtotal">
            <div class="subtotal-cell"> ¥ {{item.goods.price * item.nums}}<br></div>
          </div>
        </div>
      </div>
    </div>
    <!--合计-->
    <div class="order-discount-line">
      <p style="font-size: 14px;font-weight: bolder;"> <span style="padding-right:47px">商品总计：</span>
        <span style="font-size: 16px;font-weight: 500;line-height: 32px;">¥ {{orderTotal}}</span>
      </p>
    </div>
  </div>
</template>
<script>
  import YShelf from '/components/shelf'
  import YButton from '/components/YButton'
  import { getOrderDet, updateOrder } from '/api/goods'
  export default {
    data () {
      return {
        payType: 1,
        addList: {},
        cartList: [],
        addressId: 0,
        productId: '',
        num: '',
        userId: '',
        orderTotal: 0,
        userName: '',
        tel: '',
        streetName: '',
        payNow: '立刻支付',
        submit: false,
        nickName: '',
        money: '1.00',
        info: '',
        email: '',
        orderId: '',
        type: '',
        moneySelect: '1.00',
        isCustom: false,
        maxLength: 30
      }
    },
    computed: {
      // 选中的总价格
      checkPrice () {
        let totalPrice = 0
        this.cartList && this.cartList.forEach(item => {
          if (item.checked) {
            totalPrice += (item.nums * item.salePrice)
          }
        })
        return totalPrice
      }
    },
    methods: {
      messageFail (m) {
        this.$message.error({
          message: m
        })
      },
      _editOrder (payStatus) {
        updateOrder(this.orderSn, {pay_status: payStatus}).then(res => {
          this.$router.push({
            name: 'orderDetail',
            params: {orderSn: this.orderSn}
          })
        }).catch(_ => {
          this.message('更改失败')
        })
      },
      paySucess () {
        this._editOrder(2)
      },
      orderSucess () {
        this._editOrder(3)
      },
      orderCancel () {
        this._editOrder(4)
      },
      payLater () {
        this.$router.push({path: '/'})
      },
      goodsDetails (id) {
        this.$router.push({
          name: 'goodsDetails',
          params: {
            id: id
          }
        })
      },
      _getOrderDet (orderSn) {
        getOrderDet(orderSn).then(res => {
          this.cartList = res.order_goods
          this.userName = res.address.signer
          this.tel = res.address.phone
          this.streetName = res.address.address
          this.orderTotal = res.order_amount
        })
      }
    },
    created () {
      this.orderSn = this.$route.params.orderSn
      if (this.orderSn) {
        this._getOrderDet(this.orderSn)
      } else {
        this.$router.push({path: '/'})
      }
    },
    components: {
      YShelf,
      YButton
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  .w {
    padding-top: 39px;
  }

  .order-info {
    padding: 60px 0 55px;
    color: #333;
    background: #fff !important;
    h3 {
      padding-bottom: 14px;
      line-height: 36px;
      text-align: center;
      font-size: 36px;
      color: #212121;
    }
    .payment-detail {
      text-align: center;
      line-height: 24px;
      font-size: 14px;
      color: #999;
    }
  }

  /*支付类型*/
  .pay-type {
    margin: 0 auto;
    width: 90%;
    padding-bottom: 30px;
    .p-title {
      font-size: 18px;
      line-height: 40px;
      padding: 0 10px;
      position: relative;
      &:before {
        content: ' ';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border-bottom: 1px solid #ccc;
      }
    }

  }

  .pay-type {
    .pay-item {
      display: flex;
      align-items: center;
      div {
        margin-top: 20px;
        width: 175px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #E5E5E5;
        cursor: pointer;
        border-radius: 6px;
        margin-right: 10px;
        background: #FAFAFA;
        &.active {
          border-color: #6A8FE5;
          background: #fff;
        }
        img {
          display: block;
          height: 34px;
          margin: 8px auto;
        }
      }
    }
  }

  .box-inner {
    line-height: 60px;
    background: #f9f9f9;
    border-top: 1px solid #e5e5e5;
    box-sizing: border-box;
    > div {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 20px;
    }
    em {
      margin-left: 5px;
      font-size: 24px;
      color: #d44d44;
      font-weight: 700;
      margin-right: 20px;
      span {
        margin-right: 4px;
        font-size: 16px;

      }
    }
  }

  .confirm-detail {
    padding: 0 30px 25px;
    border-top: 1px solid #d5d5d5;
    .info-title {
      height: 14px;
      margin: 30px 0 17px;
      line-height: 14px;
      font-weight: bolder;
      color: #333;
    }
    .info-detail {
      line-height: 24px;
      color: #666;
    }
  }

  .confirm-table-title {
    padding: 3px 0 0 33px;
    border-top: 1px solid #D5D5D5;
    line-height: 54px;
    font-weight: bolder;
    color: #000;
    display: flex;
    justify-content: space-between;
    span {
      display: inline-block;
      width: 175px;
      text-align: left;
    }
    .price {
      padding-left: 80px;
    }
    .num {
      padding-left: 75px;
    }
    .subtotal {
      padding-left: 72px;
    }
  }

  .confirm-goods-table {
    border-top: 1px solid #D5D5D5;
    .cart-items {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      a {
        color: #333;
      }
    }
    .n-b {
      display: flex;
      align-items: center;
      justify-content: center;
      > div {
        color: #626262;
        font-weight: 700;
        width: 175px;
        text-align: center;
      }
    }
  }

  .order-discount-line {
    padding: 22px 30px 53px;
    border-top: 1px solid #D5D5D5;
    line-height: 24px;
    text-align: right;
    font-size: 12px;
    &:first-child {
      line-height: 32px;
      text-align: right;
      font-size: 14px;
      font-weight: bolder;
    }
  }

  .name {
    width: 40%;
  }

  .name-cell {
    padding-left: 33px;
  }

  .input {
    width:30%;
    margin:0 0 1vw 38px;
  }

  .pay-info {
    margin-top: -2vw;
    text-align: center;
  }

  .money-select {
    width: 31%;
    padding-left: 10px;
    margin-bottom: 1vw;
  }
</style>
