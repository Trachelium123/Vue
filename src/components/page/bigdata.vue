<template xmlns="http://www.w3.org/1999/html">
  <div class="bigdata">
      <h3 style="font-size: medium;text-align: center;background-color: #cccccc; border-radius: 1px;padding: 1%;margin: 0">
        阳极电流数据曲线
      </h3>
      <h4 align="left" style="margin-left: 3%;font-size: medium">{{this.anodeDate}}电流数据</h4>
      <div style="width: auto">
        <Chart style="margin-top: -50px;padding: 0"></Chart>
      </div>
      <table cellspacing="0" cellpadding="0" style="margin-top: 0;font-size: medium;font-weight: bold">
          <caption>故障诊断</caption>
          <tr bgcolor="white">
            <td><img src="../../assets/chulv.png" width="80%" alt="this is a picture"/></td>
            <td><img src="../../assets/huanji.png" width="80%" alt="this is a picture"/></td>
            <td><img src="../../assets/yangjihualuo.png" width="80%" alt="this is a picture"/></td>
          </tr>
          <tr bgcolor="white">
            <td id="chulv">出铝</td>
            <td id="huanji">换极</td>
            <td id="yangjihualuo">阳极滑落</td>
          </tr>
        <tr bgcolor="white">
          <td><img src="../../assets/yangjixiaoying.png" width="80%" alt="this is a picture"/></td>
          <td><img src="../../assets/yangjixiaoying.png" width="80%" alt="this is a picture"/></td>
          <td>此时电解槽C2202处于<p style="color: red">{{this.predict_result}}</p>情况</td>
        </tr>
        <tr bgcolor="white">
          <td id="yangjixiaoying">阳极效应</td>
          <td id="zhengchang">正常</td>
        </tr>
        </table>
  </div>
</template>

<script>
    import {globalBus} from "../globalBus";
    import schart from 'vue-schart'
    import Chart from "../Chart";
    export default {
        name: "bigdata",
      components: {
        schart,Chart
      },
      data() {
        return {
          anodeDate:20160601,
          result:0,
          predict_result:"正常",
        }
      },
      created() {
          this.clickck();
      },
      methods:{
          changeState(item){
            document.getElementById("zhengchang").style.color = "black";
            document.getElementById("yangjixiaoying").style.color = "black";
            document.getElementById("huanji").style.color = "black";
            document.getElementById("yangjihualuo").style.color = "black";
            document.getElementById("chulv").style.color = "black";
            document.getElementById(item).style.color = "red";
            switch (item) {
              case "chulv":this.predict_result="出铝";break;
              case "yangjixiaoying":this.predict_result="阳极效应";break;
              case "zhengchang":this.predict_result="正常";break;
              case "yangjihualuo":this.predict_result="阳极滑落";break;
              case "huanji":this.predict_result="换极";break;
              default:break;
            }
          },
          clickck:function () {
            globalBus.$on('setTime',(setTimes)=>{
              this.anodeDate = setTimes;
            })
            globalBus.$on('getResult',(result)=>{
              this.result = result;
              if (this.result === 0){
                this.changeState("chulv")
              }
              else if(this.result === 1){
                this.changeState("huanji")
              }
              else if(this.result === 2){
                this.changeState("yangjihualuo")
              }
              else if(this.result === 3){
                this.changeState("yangjixiaoying")
              }
              else if(this.result === 4){
                this.changeState("zhengchang")
              }
            })
          },


      },
    }
</script>

<style scoped type="text/css">
  .bigdata{
    text-align: center;
    margin-left: 1%;
    margin-top: 1%;
    background-color: white;
    border-radius: 3px;/*让按钮变得圆滑一点*/
    border-width: 1px;/*消去按钮丑的边框*/
  }
  td{
    padding: 1%;
  }
  caption{
    color: #000000;
    font-size: 100%;
    text-align: center;
    background-color: #cccccc;
    border-radius: 1px;
    font-weight: bold;
    margin-top: 1%;
    padding: 1%
  }
  img{
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);
  }
</style>
