<template>
<div class="plug">
    <div  class="shareBtn" @click="shareBtn">
            马上邀请赢奖励
    </div>
    <ul id="content" ref="content">
        <li class="scheme1" :class="{'current1':currentIndex===0,'current1S':clickDraw}"><span>2000元京东购物卡</span></li>
        <!-- <li class="scheme1" :class="{'current1':currentIndex===0}"><span>2000元京东购物卡</span></li> -->
        <li class="scheme2" :class="{'current2':currentIndex===1,'current2S':clickDraw}"><span>500元京东购物卡</span></li>
        <li class="scheme3" :class="{'current3':currentIndex===2,'current3S':clickDraw}"><span>爱奇艺月卡</span></li>
        <li class="scheme4" :class="{'current4':currentIndex===3,'current4S':clickDraw}"><span>谢谢惠顾</span></li>
	  </ul>
    <div v-if="onceDraw" @click="draw" class="btn" id="begin">
    立即抽奖
    </div>
    <div v-else  class="btn" id="begin">
    立即抽奖
    </div>
    <!-- <div @click="test" class="btn" id="begin">
    dbJson
    </div> -->
    <p class="note" >今日你还有<span style="color:#ff875a">{{remainData}}次</span>抽奖机会</p>
    <div class="list-mask" @click="hideList" v-show="listShow"></div>
    <div class="winning" v-show="winning">
      <div @click="hideList" class="close"></div>
       <img :src="prizeSrc">
       <!-- <img src="./p1.png"> -->
      <div @click="shareBtn" class="share"></div>
      <div @click="shareBtn" class="shareDese"></div>
    </div>
</div>
    
</template>
<script>
import {mapGetters} from 'vuex'
import { urlParse } from '../../common/js/util'
export default {
  
  data() {
    return {
      onceDraw:true,
      clickDraw:true,
      shareEntrance:null,
      shareWay:null,
      watchIt:null,
      phoneNo:"",
      remain: null,
      index: 0,
      prizeIndex:null,
      interval: null,
      len: 4,
      currentIndex: null,
      fold: true,
      winning: false,
      prizeSrc: null,
      // baseUrl:"http://192.168.10.210:8080/shlife_loan/",
      remainData: null,
      shareDegree: null, //当日分享次数
      lottoDegree: null, //当日已抽奖次数
      gotPrize:1
    };
  },
  methods: {
    getInfor() {
      fetch(
        `/shlife_loan/lotteryNum?phoneNo=${this.phoneNo}`
        // {
        //   mode: "CORS"
        // },
      )
        .then(function(response) {
          return response.json();
        })
        .then(json => {
          console.log(json);
          if (json.result == "0") {
            // this.lotteryNum = json.data.lotteryNum
            this.$emit("newNodeEvent", json.data.lotteryNum);
          } else {
            alert("请求失败");
          }
        })
        .catch(function(ex) {
          alert("parsing failed", ex);
        });
    },
     remainDraw() {
      fetch(
        `/shlife_loan/residueDegree?phoneNo=${this.phoneNo}`
        // {
        //   mode: "CORS"
        // },
      )
        .then(function(response) {
          return response.json();
        })
        .then(json => {
          console.log("remainDraw", json);
          if (json.result == "0") {
            this.remainData = json.data.residueDegree; //当日剩余次数
            // alert(`请求剩余抽奖次数${this.remainData}`);
            this.shareDegree = json.data.shareDegree; //当日分享次数
            this.lottoDegree = json.data.lottoDegree; //当日已抽奖次数
          } else {
            alert("请求失败");
          }
        })
        .catch(function(ex) {
          console.log("parsing failed", ex);
        });
    },
    // draw(){
    //   this.remainDraw()
    //       var list = this.$refs.content.children
    //               // console.log(list)
    //               this.running = true;
    //               this.remain = 300 + Math.random() * 5000;
    //               // this.remain = 300
    //                 // console.log(this.remain)
    //               var interval = setInterval(() => {
    //                   if( this.remain < 200 ){
    //                       if(this.index == 2){
    //                          this.draw()
    //                       }else{
    //                         this.running = false;
    //                         this.fold = false;
    //                         this.winning = true;
    //                         // alert(this.index)
    //                         this.prizeSrc = require(`./p${this.index}.png`)
    //                         // alert( '你抽中了: '+list[this.index-1].innerHTML );
    //                         clearInterval(interval);
    //                       }
    //                   }else{
    //                       this.currentIndex = null
    //                       // list[this.index].className = "";
    //                       this.currentIndex = (this.index) % this.len
    //                       // console.log(this.currentIndex)
    //                       // list[(this.index+1) % this.len].className = "current";
    //                       this.index = ++this.index % this.len;
    //                       this.remain -= 100;
    //                   }
    //               },100);
    // },
    draw() {
        this.onceDraw = false
        if (this.remainData == 0) {
          this.fold = false;
          this.winning = true;
          if (this.shareDegree == 0) {
            this.prizeSrc = require(`./10.png`); //未分享
          }else if(this.lottoDegree == 10){
            this.prizeSrc = require(`./11.png`); //分享10次
          }else{
            this.prizeSrc = require(`./12.png`); //用尽
          }
          return
        }else{
          this.clickDraw = false
          // fetch(`/api/luckyDraw?phoneNo=${this.phoneNo}`)
          fetch(`/shlife_loan/luckyDraw?phoneNo=${this.phoneNo}`)
          .then(function(response) {
            return response.json();
          })
          .then(json => {
            console.log(json);
            if (json.result == "0") {
              if(json.data == ''){
                this.prizeIndex = 3;  
              }else{
                  this.gotPrize = 2
                  if ((json.data.giftNum = 1)) {
                  this.prizeIndex = 0;
                } else if ((json.data.giftNum = 2)) {
                  this.prizeIndex = 1;
                }
              }
            }
          })
          .then(() => {
            console.log(this.prizeIndex);
            this.prizeSrc = require(`./p${this.prizeIndex}.png`);
          })
          .then(() => {
            this.remainDraw()
          })
          .catch(function(ex) {
            console.log("抽奖请求错误", ex);
            alert("抽奖请求错误", ex);
          });
          var list = this.$refs.content.children;
          this.remain = 3000;
          var interval = setInterval(() => {
            if (this.remain <= 200&&this.currentIndex == this.prizeIndex) {
              this.fold = false;
              this.winning = true;
              clearInterval(interval);
            } else {
              this.currentIndex = null;
              this.currentIndex = this.index % this.len;
              this.index = ++this.index % this.len;
              this.remain -= 100;
            }
          }, 100);
        }
        
    },
    shareBtn() {
      fetch(
        `/shlife_loan/getData?phoneNo=${this.phoneNo}&flag=${this.gotPrize}`
      )
        .then(function(response) {
          return response.json();
        })
        .then(json => {
          console.log(json);
          if (json.result == "0") {
            this.url = json.data.url
            this.imageUrl = json.data.imageUrl
            this.title = json.data.title
            this.descr = json.data.descr
            // let url = json.data.url ,
          } else {
            alert("请求失败");
          }
        })
        .then(() => {
          share(this.url,this.imageUrl, this.title, this.descr)
          
        })
        .catch(function(ex) {
          console.log("parsing failed", ex);
        })
    },
    saveShare(){
      // alert("进入saveShare方法")
      let saveShareAPI = `/shlife_loan/saveShare?phoneNo=${this.phoneNo}&shareWay=${this.shareWay}&shareEntrance=${this.shareEntrance}`
      // alert(saveShareAPI)
      fetch(
          saveShareAPI
      )
      // fetch(
      //     `/shlife_loan/saveShare?phoneNo=${this.phoneNo}&shareWay=null&shareEntrance=1`
      // )
          .then(function(response) {
            // alert("saveShareAPI",response);
            return response.json();
          })
          .then(json => {
            console.log(json);
            if (json.result == "0") {
              // alert("保存分享数据成功")
              console.log("保存分享数据成功")
            } else {
              alert("保存分享数据失败");
            }
          })
          .then(() =>{
            this.remainDraw()
          })
          .catch(function(ex) {
            console.log("parsing failed", ex);
          });
    },
    hideList() {
      this.fold = true
      this.winning = false
      this.onceDraw = true
     
    }
  },
  
  watch:{
    watchIt(newValue,oldValue){
      // alert("data.tag改变")
      this.shareWay = window.TYPE
      this.saveShare()
      this.hideList()
    }
  },
  computed: {
    listShow() {
      let show = !this.fold;
      return show;
    },
    ...mapGetters([
      'total',
      // ...
    ])
  },
  mounted() {
    setInterval(()=>{
      this.watchIt = window.WATCHIT
    },500)
    console.log("this.watchIt",this.watchIt)
    // if(DEVELEPMENT){
    //   this.phoneNo = "15010495133"
    // }else{
    //   let queryParam = urlParse();
    //     this.phoneNo = queryParam.phoneNo;
    // }
    this.phoneNo = urlParse().phoneNo
    this.shareEntrance = urlParse().shareEntrance
    this.getInfor()
    this.remainDraw()
  }
};
</script>
<style scoped>
/* *{margin: 0;padding: 0;border: 0;}
		li{list-style-type:none;} */
.plug {
  position: relative;
  padding-top: 32px;
  height: 428px;
}
.shareBtn{
        position:absolute;
        top:-25vw;
        margin-top:25px;
        width:750px;
        height:104px;
        color:white;
        line-height:104px;
        background-image:url('shareBtn.png');
        background-size: 550px 100px;
        background-position:center;
        background-repeat: no-repeat;
}
#content {
  position: relative;
  width: 750px;
  height: 174px;
}
#content li {
  display: inline-block;
  width: 150px;
  height: 174px;
  margin-right: 0;
  vertical-align: top;
}
#content li span {
  opacity: 0;
}
.scheme1 {
  background-image: url("0.png");
  background-size: 150px 168px;
  background-repeat: no-repeat;
}
.current1 {
  background-image: url("c0.png");
}
.current1S {
  background-image: url("c0.png");
}
.scheme2 {
  background-image: url("1.png");
  background-size: 150px 168px;
  background-repeat: no-repeat;
}
.current2 {
  background-image: url("c1.png");
}.current2S {
  background-image: url("c1.png");
}
.scheme3 {
  background-image: url("2.png");
  background-size: 150px 168px;
  background-repeat: no-repeat;
}
.current3 {
  background-image: url("c2.png");
}
.current3S {
  background-image: url("c2.png");
}
.scheme4 {
  background-image: url("3.png");
  background-size: 150px 168px;
  background-repeat: no-repeat;
}
.current4 {
  background-image: url("c3.png");
}
.current4S {
  background-image: url("c3.png");
}
#content li.current {
  background: #090;
}
.btn {
  font-size: 30px;
  margin-top: 46px;
  width: 750px;
  height: 92px;
  line-height: 92px;
  color: white;
  background-image: url("btn.png");
  background-position: center;
  background-size: 282px 88px;
  background-repeat: no-repeat;
}
.note {
  margin-top: 15px;
  color: #484848;
  font-size: 28px;
}
.list-mask {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  position: fixed;
  background: rgba(7, 17, 27, 0.6);
}
.winning {
  z-index: 11;
  width: 480px;
  height: 750px;
  position: fixed;
  top: 30vw;
  left: 50%;
  margin-left: -240px;
}
.winning img {
  width: 480px;
  height: 750px;
}
.winning .close {
  width: 90px;
  height: 90px;
  position: absolute;
  z-index: 12;
  right: 0;
}
.winning .share {
  width: 480px;
  height: 96px;
  position: absolute;
  z-index: 12;
  bottom: 120px;
  /* background:red; */
}
.winning .shareDese {
  width: 480px;
  height: 96px;
  position: absolute;
  z-index: 12;
  bottom: 5px;
  /* background:red; */
}
</style>