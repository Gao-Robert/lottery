<template>
  <div class="hello">
    <div class="bg">
      <div class="content">
        <div class="shareLine">
          <li><img  src="./share1.png"></li>
          <li><img src="./share2.png"></li>
          <div class="shareBtn">
            马上邀请赢奖励
          </div>
        </div>
        <div class="draw">
          <div class="participants">
            <img src="./horn.png">已有{{lotteryNum}}名用户参与抽奖
            <lottery @newNodeEvent="parentLisen" myprop="myprop"></lottery>
          </div>
        </div>
        
      </div>
      <div class="btm">
        <img src="./rule.png">
        <p>
          1. 活动期间，用户分享成功即可获得1次抽奖机会，限分享当日使用，每日抽奖次数上限10次；</br></br>

          2. 奖励说明：分享用户每成功邀请2名借款用户，可获得200元奖励（如邀请1名借款用户，没有奖励；邀请3名借款用户，得200元奖励；邀请4名可获得400元奖励，以此类推），奖励以京东购物电子卡形式发放；成功邀请即被邀请人必须通过邀请人分享的链接地址成功注册信富优贷并通过极速普惠成功借款，如被邀请用户通过大额通道借款则不参与本次活动，无法获得邀请奖励。</br></br>

          3. 抽奖和邀请奖励在活动结束后15日内公布中奖名单，中奖名单会在“信富优贷官微”微信服务号和APP内进行公布，公布名单后1周内发放奖励。</br></br>

          4. 所有奖励发放至您注册信富优贷时的手机号码，如因手机号码问题导致无法接收到奖励，后果由用户承担。</br></br>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import lottery from "./lottery/lottery";
export default {
  
  name: 'HelloWorld',
  data () {
    return {
      lotteryNum: ''
    }
  },
  methods:{
    parentLisen(evtValue) { 
      //evtValue 是子组件传过来的值
      this.lotteryNum = evtValue
    },
    
  },
  components:{
    lottery,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.bg {
    position: relative;
    list-style-type: none;
    padding: 0;
    padding-top:750px;
    box-sizing: border-box;
    width:750px;
    height:100%;
    background-image:url('bg.png');
    background-size: 750px 100%;
    background-repeat: no-repeat;
  .content{
    position: relative;
    width:750px;
    height:1112px;
    background-image:url('content.png');
    background-size: 760px 1110px;
    background-position:center;
    background-repeat: no-repeat;
    .shareLine{
      position:relative;
      padding-top:74px;
      width:750px;
      height:538px;
      li{
        display:inline-block;
        width:300px;
        height:374px;
        img{
          width:300px;
          height:374px;
        }
      }
      .shareBtn{
        margin-top:25px;
        width:750px;
        height:104px;
        color:white;
        line-height:104px;
        // background-image:url('shareBtn.png');
        // background-size: 550px 100px;
        // background-position:center;
        // background-repeat: no-repeat;
      }
    }
    .draw{
      position: relative;
        width:750px;
        height:452px;
        .participants{
            img{
              width:40px;
              height:34px;
            }
        }
      }
  }
  .btm{
    height:880px;
    width:750px;
    position:relative;
    padding:0 76px;
    box-sizing: border-box;
    img{
      width:285px;
      height:34px;
    }
    p{
      margin-top:54px;
      text-align:left;
      color:white;
    }
  }
}
</style>
