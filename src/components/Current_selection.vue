<template>
  <div class="selection" style="float: left;width: 15%;  margin-left: 1%;" >
    <table id="table1">
      <caption>阳极选择</caption>
      <tr v-for="i in 12" :value="i">
        <td><button @click="click(i)">A{{i}}</button></td><td><button @click="click(i+12)">B{{i}}</button></td>
      </tr>
    </table>
    <table id="table2">
      <caption>阳极电流特征识别</caption>
    </table>
    <table id="table3">
      <caption>日期选择</caption>
      <tr class="sel">
        <input type="date" value="2016-06-01" min="2016-06-01" max="2016-06-14" id="datetime" @change="selectTime"/>
      </tr>
    </table>
    <table id="table4">
      <caption>特征提取取方案</caption>
      <tr class="sel">
        <select id="suanfa">
          <option value="DWT">DWT</option>
          <option value="FFT">FFT</option>
        </select>
      </tr>
    </table>
    <table id="table5">
      <caption>算法方案选择</caption>
      <tr class="sel">
        <select>
          <option>CNN</option>
        </select>
      </tr>
    </table>
    <table id="table6">
      <tr>
        <input type="submit" id="submit" value="提交" @click="choose"></input>
      </tr>

    </table>

  </div>
</template>

<script>
    import {globalBus} from "./globalBus";

    export default {
      name: "Current_selection",
      data() {
        return {
          selectTimes: [],
          tableName:'c2202_',
          anode:[],
          datas:[],
          pre:'0',
          nums:1,
          fileName:'D:/jar/demo.pmml',
          predicts:'http://127.0.0.1:5000/dwt',
        }
      },
      created() {
        // this.datas = new Array(24).fill(new Array(100).fill(0))
        this.selectTime()
        this.choose()
      },
      methods:{
        selectTime:function(){
          try {
            this.selectTimes = document.getElementById('datetime').value
              .toString().replace(/-/g,'');
          }catch (e) {
            this.selectTimes = "20160601";
          }
          globalBus.$emit('setTime',this.selectTimes);
          // this.choose();
        },
        choose:function () {
          let times = this.selectTimes;
          let tableName = this.tableName+this.selectTimes;
          let temptime = '/api/date?date=' + times + '&name=' + tableName;
            this.$post(temptime)
            .then((response) => {
              this.anode = [];
              for (let m=0;m<100;m++){
                let tem = 'f'+this.nums.toString();
                this.anode.push(response.params[m][tem]);
              }
              globalBus.$emit('clickEvent',this.anode);
              this.datas = new Array(100).fill(new Array(24).fill(0))
              for (let k=0;k<100;k++){
                for(let i=1;i<25;i++) {
                  let temp = 'f';
                  temp = temp.concat(i.toString());
                  this.datas[k][i-1]=response.params[k][temp];
                }
              }
              this.predict();
            })
            .catch(error =>{
              console.log(error);
            });
        },
        predict:function () {
          let anode_list = {"name":this.datas};
          let xuanze = document.getElementById("suanfa").value;
          if (xuanze == "FFT"){
            this.predicts = 'http://127.0.0.1:5000/dwt';
          }else if (xuanze == "DWT"){
            this.predicts = 'http://127.0.0.1:5000/fft';
          }
          // for (let i = 1; i <= this.datas.length; i++){
          //   let temp = 'x';
          //   temp = temp.concat(i.toString());
          //   anode_list[temp] = this.datas[i-1];
          // }
          // let temp = {x1: 1922, x2: 1704, x3: 1492, x4: 1344, x5: 1777, x6: 1392,
          //   x7: 1815, x8: 1694, x9: 2088, x10: 1750, x11: 1995, x12: 1442, x13: 3006, x14: 1811,
          //   x15: 1842, x16: 1016, x17: 1607, x18: 1570, x19: 1562, x20: 1395,
          //   x21: 1463, x22: 1794, x23: 1751, x24: 1119};

          // let predictFIle = '/api/predict?fileName='+this.fileName;
          this.$post(this.predicts,anode_list)
            .then((response) => {
              this.pre = parseInt(response);
              globalBus.$emit('getResult',this.pre);
            })
            .catch(error =>{
              console.log(error);
            });
        },
        click:function (j) {
          this.nums = j;
          this.choose()
        },
        changeSolution:function () {
          let name = document.getElementById("suanfa").value;
          if (name == "FFT"){
            this.fileName = 'D:/jar/demo.pmml';
          }else if (name == "DWT"){
            this.fileName = 'D:/jar/demo1.pmml';
          }
          // this.choose()

        }
      }
    }
</script>

<style scoped type="text/css">
  table{
    text-align: center;/*字体居中*/
    width: 100%;
    background-color: #f5f5f5;
    position: center;
    text-align-all: center;
    margin-top: 10px;
  }
  caption{
    color: #000000;
    font-size: large;
    text-align: center;
    background-color: #cccccc;
    border-radius: 1px;
    font-weight: bold;
    padding: 3%;
  }
  td{
    color: #000000;
    width: 48%;/*设置按钮宽度*/
    position: center;
    padding: 1%;
    outline: none;/*取消轮廓*/
  }
  button{
    width: 80%;/*设置按钮宽度*/
    height: 100%;/*设置按钮高度*/
    color: #000000;/*字体颜色*/
    background-color: #e9e5ed;/*按钮背景颜色*/
    border-radius: 3px;/*让按钮变得圆滑一点*/
    border-width: 1px;/*消去按钮丑的边框*/
    outline: none;/*取消轮廓*/
    font-family: KaiTi,serif;/*字体设置为楷体*/
    font-size: 100%;/*设置字体大小*/
    margin: 1%;
    text-align: center;/*字体居中*/
    cursor: pointer;/*设置鼠标箭头手势*/
    box-shadow:0px 1px 1px #000000

 }

  button:hover{
    /*鼠标移动时的颜色变化*/
    background-color: #47e5fa;
  }

  .sel{
    width: 100%;
    height: 100%;
    border-radius: 1px;
    box-shadow: 0 0 5px #000000;
    text-align: center;
    position: center;
  }
  select{
    border: none;
    outline: none;
    width: 98%;
    height: 100%;
    padding: 1%;
  }

  #submit{
    text-align: center;
    background-color: #c4a8ed;
    font-weight: bold;
    font-size: larger;
    color: white;
    margin-top: 1%;
    border-radius: 1px;
    box-shadow: 0 0 5px #000000;
    padding: 2%;
    width: 50%;
  }

  #submit:hover{
    /*鼠标移动时的颜色变化*/
    background-color: #fa3821;
  }
  #datetime{
    border: none;
    outline: none;
    width: 96%;
    height: 100%;
    padding: 3%;
    margin: 1%;
    text-align: left;
    font-size: medium;
    position: center;
  }

</style>

