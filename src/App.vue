<template>
  <el-row :gutter="10">
    <div style="width: 700px; height: 300px">
      <el-table
        :cell-style="cellStyle"
        :header-cell-style="{ color: 'black', borderColor: 'black' }"
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column prop="id" label="id" width="180"> </el-table-column>
        <el-table-column prop="coordinate" label="coordinate">
        </el-table-column>
        <el-table-column prop="v" label="v"> </el-table-column>
        <el-table-column prop="station_id" label="station_id">
        </el-table-column>
        <el-table-column prop="f" label="f"> </el-table-column>
        <el-table-column prop="P" label="P"> </el-table-column>
        <el-table-column prop="Q" label="Q"> </el-table-column>
        <el-table-column prop="singleFlag" label="singleFlag">
        </el-table-column>
      </el-table>
    </div>

    <!--  选择场景模块  -->
    <select-scene></select-scene>

    <!--  仿真@@模块  -->
    <div class="fzcs">
      <el-card :bordered="false">
        <p align="center">
          <font color="#1e90ff" size="4">仿真@@</font>
        </p>
        <font color="#1e90ff" size="3.5">干扰频1</font>
        <el-select
          @change="choiceFrequency(frequencyOne.value)"
          v-model="frequencyOne.value"
          placeholder="请选择干扰频1"
          style="width: 150px; margin-left: 10px"
        >
          <el-option
            v-for="item in frequencyOne"
            :key="item.value"
            :lable="item.value"
            :value="item.lable"
          >
          </el-option>
        </el-select>
        <font color="#1e90ff" size="3.5">干扰模式</font>
        <el-select
          @change="choicePattern(patternOne.value)"
          v-model="patternOne.value"
          placeholder="请选择干扰模式"
          style="width: 150px; margin-left: 10px"
        >
          <el-option
            v-for="item in patternOne"
            :key="item.value"
            :lable="item.value"
            :value="item.lable"
          >
          </el-option>
        </el-select>
        <font color="#1e90ff" size="3.5">干扰个数</font>
        <el-select
          @change="choiceNum"
          v-model="num.value"
          style="width: 90px; margin-left: 10px"
          placeholder="请选择"
        >
          <el-option
            v-for="item in num"
            :key="item.value"
            :lable="item.value"
            :value="item.lable"
          >
          </el-option> </el-select
        ><br /><br />
        <font color="#1e90ff" size="3.5">请选择驱动形式</font>
        <el-select
          @click="ChoiceDriveForms"
          v-model="DriveForms.value"
          style="margin-left: 10px"
        >
          <el-option
            v-for="item in DriveForms"
            :key="item.value"
            :lable="item.value"
            :value="item.lable"
          >
          </el-option>
        </el-select>
        <font color="#1e90ff" size="3">请输入干信比门限 </font>
        <el-input
          type="text"
          size="6"
          v-model="ganxinbi"
          style="width: 150px"
          placeholder="请输入干信比门限"
        ></el-input>
      </el-card>
    </div>

    <!--  各站@@设置模块  -->
    <el-card class="box-content" :bordered="false">
      <div class="main">
        <div class="my-tab">
          <div
            class="my-tab-item"
            v-for="(item, index) in tabItemData"
            :key="index"
          >
            <span
              @click="onTab(index)"
              :class="{ 'tab-item-active': index == tabItemIndex }"
              >{{ item.name }}</span
            >
          </div>
        </div>
        <el-form
          v-for="(item, index) in tabItemData"
          :key="index"
          v-show="index == tabItemIndex"
          class="my-form"
          :inline="true"
          ref="form"
          :model="item.form"
          label-width="80px"
        >
          <div
            style="display: flex; flex-wrap: wrap"
            v-if="DriveForms.value === '时间'"
          >
            <p style="width: 50%" align="center">
              <font color="#1e90ff" size="3.5">请输入干扰时间:</font>
              <el-input
                type="text"
                placeholder="输入格式:xxxs"
                size="18"
                v-model="item.InterfereTime"
                style="width: 150px"
              >
              </el-input>
            </p>
            <p style="width: 50%" align="center">
              <font color="#1e90ff" size="3.5">请输入干扰类型:</font>
              <el-select
                v-model="item.grType"
                @change="single1()"
                placeholder="请选择干扰模式"
                style="width: 150px; margin-left: 10px"
              >
                <el-option lable="0" value="压制干扰"></el-option>
                <el-option lable="1" value="欺骗干扰"></el-option>
              </el-select>
            </p>
            <p style="width: 50%" align="center">
              <font color="#1e90ff" size="3.5">请输入干扰模式:</font>
              <el-select
                v-model="item.grPattern"
                @change="single1()"
                placeholder="请选择干扰模式"
                style="width: 150px; margin-left: 10px"
              >
                <el-option
                  v-for="item in pattern"
                  :key="item.value"
                  :lable="item.value"
                  :value="item.lable"
                >
                </el-option>
              </el-select>
            </p>
            <p style="width: 50%" align="center">
              <font color="#1e90ff" size="3.5">请输入主站功率值:</font>
              <el-input
                type="text"
                placeholder="输入主站功率值"
                size="18"
                v-model="item.homePower"
                style="width: 150px"
              >
              </el-input>
            </p>
          </div>
          <div
            style="display: flex; flex-wrap: wrap"
            v-if="DriveForms.value === '位置'"
          >
            <p align="center" style="width: 50%">
              <font color="#1e90ff" size="3.5">请输入干扰位置:</font>
              <el-input
                type="text"
                placeholder="输入格式(以减号为分隔符):x-y-z"
                size="25"
                v-model="item.InterfereTime"
                style="width: 230px"
              ></el-input>
            </p>
            <p style="width: 50%" align="center">
              <font color="#1e90ff" size="3.5">请输入干扰类型:</font>
              <el-select
                v-model="item.grType"
                @change="single1()"
                placeholder="请选择干扰模式"
                style="width: 150px; margin-left: 10px"
              >
                <el-option lable="0" value="欺骗干扰"></el-option>
                <el-option lable="1" value="压制干扰"></el-option>
              </el-select>
            </p>
            <p style="width: 50%" align="center">
              <font color="#1e90ff" size="3.5">请输入干扰模式:</font>
              <el-select
                v-model="item.grPattern"
                @change="single1()"
                placeholder="请选择干扰模式"
                style="width: 150px; margin-left: 10px"
              >
                <el-option
                  v-for="item in pattern"
                  :key="item.value"
                  :lable="item.value"
                  :value="item.lable"
                >
                </el-option>
              </el-select>
            </p>
            <p style="width: 50%" align="center">
              <font color="#1e90ff" size="3.5">请输入主站功率值:</font>
              <el-input
                type="text"
                placeholder="输入主站功率值"
                size="18"
                v-model="item.homePower"
                style="width: 150px"
              >
              </el-input>
            </p>
          </div>
          <!-- <font color="#1e90ff" size="3.5">F1频段</font> -->
          <font color="#1e90ff" size="3.5">F1频段</font>
          <div v-if="item.grType == '压制干扰'" class="xzgrzs">
            <el-select
              v-model="item.form.pattern1"
              @change="single1()"
              placeholder="请选择干扰模式"
              style="width: 150px; margin-left: 10px"
            >
              <el-option
                v-for="item in pattern"
                :key="item.value"
                :lable="item.value"
                :value="item.lable"
              >
              </el-option>
            </el-select>
            <el-input
              type="text"
              placeholder="请输入主1功1值"
              size="18"
              v-model="item.form.power1"
              style="width: 150px; margin-left: 10px"
            ></el-input>
            <el-select
              @change="choiceForms()"
              v-model="item.form.standard1"
              placeholder="请选择干扰制式"
              style="width: 150px; margin-left: 15px"
            >
              <el-option
                v-for="item in standard"
                :key="item.value"
                :lable="item.value"
                :value="item.lable"
              >
              </el-option>
            </el-select>

            <p v-if="item.form.standard1 === '点频干扰'">
              <br />
              <font color="#1e90ff" size="3.5"
                >设置{{ item.form.standard1 }}@@</font
              >
              <el-select
                v-model="item.form.frequency1"
                @change="selectState1($event, item)"
                placeholder="请选择干扰频1"
                style="width: 150px; margin-left: 10px"
              >
                <el-option
                  v-for="item in frequency"
                  :key="item.value"
                  :lable="item.value"
                  :value="item.lable"
                >
                </el-option>
              </el-select>
              <el-input
                type="text"
                placeholder="载波频1"
                :disabled="item.form.state1"
                size="9"
                v-model="item.form.dpgrZbpl1"
                style="width: 150px; margin-left: 15px"
              ></el-input>
            </p>
            <p v-if="item.form.standard1 === '调频干扰'">
              <br />
              <font color="#1e90ff" size="3.5"
                >设置{{ item.form.standard1 }}@@</font
              >
              <el-input
                type="text"
                placeholder="载波频1"
                size="9"
                v-model="item.form.tpgrZbpl1"
                style="width: 150px; margin-left: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="调制频1"
                size="9"
                v-model="item.form.tpgrTzpl1"
                style="width: 150px; margin-left: 15px"
              ></el-input>
              <el-input
                type="text"
                placeholder="调制频偏"
                size="9"
                v-model="item.form.tpgrZbpp1"
                style="width: 150px; margin-left: 15px"
              ></el-input>
            </p>
            <p v-if="item.form.standard1 === '扫频干扰'">
              <br />
              <font color="#1e90ff" size="3.5"
                >设置{{ item.form.standard1 }}@@</font
              >
              <el-input
                type="text"
                placeholder="起始频1"
                size="9"
                v-model="item.form.spgrQspl1"
                style="width: 90px; margin-left: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="终止频1"
                size="9"
                v-model="item.form.spgrZzpl1"
                style="width: 90px; margin-left: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="扫频点数"
                size="9"
                v-model="item.form.spgrSpds1"
                style="width: 90px; margin-left: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="频点驻留时间"
                size="9"
                v-model="item.form.spgrPdzlsj1"
                style="width: 120px; margin-left: 10px"
              ></el-input>
            </p>
            <p v-if="item.form.standard1 === '白噪声干扰'">
              <br />
              <font color="#1e90ff" size="3.5"
                >设置{{ item.form.standard1 }}@@</font
              >
              <el-input
                type="text"
                placeholder="中心频1"
                size="9"
                v-model="item.form.bzsgrZxpl1"
                style="width: 100px"
              >
              </el-input>
              <el-input
                type="text"
                placeholder="带宽"
                size="9"
                v-model="item.form.bzsgrDk1"
                style="width: 100px"
              >
              </el-input>
              <el-select
                v-model="item.form.bzsgrLbqxs1"
                style="width: 160px"
                placeholder="请选择滤波器形式"
              >
                <el-option
                  v-for="item in bzsgrLbqxs"
                  :key="item.value"
                  :lable="item.value"
                  :value="item.lable"
                >
                </el-option>
              </el-select>

              <el-input
                type="text"
                placeholder="滤波器a值"
                size="9"
                v-model="item.form.bzsgrLbqaz1"
                style="width: 150px"
              >
              </el-input>
            </p>
            <p v-if="item.form.standard1 === '调相干扰'">
              <br />
              <font color="#1e90ff" size="3.5">{{ item.form.standard1 }} </font>
              <el-input
                type="text"
                placeholder="载波频1"
                size="7"
                v-model="item.form.txgrZbpl1"
                style="width: 90px"
              >
              </el-input>
              <el-select v-model="item.form.txgrTxxs1" style="width: 120px">
                <el-option
                  v-for="item in txgrTxxs"
                  :key="item.value"
                  :lable="item.value"
                  :value="item.lable"
                >
                </el-option>
              </el-select>
              <el-input
                type="text"
                placeholder="符号速率"
                size="7"
                v-model="item.form.txgrFhsl1"
                style="width: 120px"
              >
              </el-input>
              <el-select v-model="item.form.txgrPNm1" style="width: 120px">
                <el-option
                  v-for="item in txgrPNm"
                  :key="item.value"
                  :lable="item.value"
                  :value="item.lable"
                >
                </el-option>
              </el-select>
              <el-select v-model="item.form.txgrLbqxs1" style="width: 120px">
                <el-option
                  v-for="item in txgrLbqxs"
                  :key="item.value"
                  :lable="item.value"
                  :value="item.lable"
                >
                </el-option>
              </el-select>
              <el-input
                type="text"
                placeholder="滤波器a值"
                size="7"
                v-model="item.form.txgrLbqaz1"
                style="width: 120px; margin-left: 70px; margin-top: 10px"
              ></el-input>
            </p>
            <p v-if="item.form.standard1 === '脉冲干扰'">
              <br />
              <font color="#1e90ff" size="3.5"
                >设置{{ item.form.standard1 }}@@</font
              >
              <el-input
                type="text"
                placeholder="脉冲宽度"
                size="9"
                v-model="item.form.mcgrMckd1"
                style="width: 150px"
              >
              </el-input>
              <el-input
                type="text"
                placeholder="周期"
                size="9"
                v-model="item.form.mcgrZq1"
                style="width: 150px; margin-left: 10px"
              ></el-input>
            </p>
          </div>
          <div v-else class="xzgrzs">
            <el-select
              v-model="item.form1.f1Bit0"
              placeholder="请选择bit0值"
              style="width: 150px; margin-left: 10px"
            >
              <el-option
                v-for="item in bit"
                :key="item.value"
                :lable="item.value"
                :value="item.lable"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="item.form1.f1Bit1"
              placeholder="请选择bit1值"
              style="width: 150px; margin-left: 10px"
            >
              <el-option
                v-for="item in bit"
                :key="item.value"
                :lable="item.value"
                :value="item.lable"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="item.form1.f1Bit2"
              placeholder="请选择bit2值"
              style="width: 150px; margin-left: 10px"
            >
              <el-option
                v-for="item in bit"
                :key="item.value"
                :lable="item.value"
                :value="item.lable"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="item.form1.f1Bit3"
              placeholder="请选择bit3值"
              style="width: 150px; margin-left: 10px"
            >
              <el-option
                v-for="item in bit"
                :key="item.value"
                :lable="item.value"
                :value="item.lable"
              >
              </el-option>
            </el-select>
          </div>
          <br />

          <font color="#1e90ff" size="3.5">F2频段</font>
          <div v-if="item.grType == '压制干扰'" class="xzgrzs">
            <el-select
              v-model="item.form.pattern2"
              @change="single2()"
              style="width: 150px; margin-left: 10px"
              placeholder="请选择干扰模式"
            >
              <el-option
                v-for="item in pattern"
                :key="item.value"
                :lable="item.value"
                :value="item.lable"
              >
              </el-option>
            </el-select>
            <el-input
              type="text"
              placeholder="请输入主1功1值"
              size="18"
              v-model="item.form.power2"
              style="width: 150px; margin-left: 10px"
            ></el-input>
            <el-select
              @click="choiceForms"
              v-model="item.form.standard2"
              style="width: 150px; margin-left: 10px"
              placeholder="请选择干扰制式"
            >
              <el-option
                v-for="item in standard"
                :key="item.value"
                :lable="item.value"
                :value="item.lable"
              >
              </el-option>
            </el-select>
            <p v-if="item.form.standard2 === '点频干扰'">
              <br />
              <font color="#1e90ff" size="3.5"
                >设置{{ item.form.standard2 }}@@</font
              >
              <el-select
                v-model="item.form.frequency2"
                @change="selectState2($event, item)"
                style="width: 150px; margin-left: 10px"
                placeholder="请选择干扰频1"
              >
                <el-option
                  v-for="item in frequency"
                  :key="item.value"
                  :lable="item.value"
                  :value="item.lable"
                >
                </el-option>
              </el-select>
              <el-input
                :disabled="item.form.state2"
                type="text"
                placeholder="载波频1"
                size="9"
                v-model="item.form.dpgrZbpl2"
                style="width: 150px; margin-left: 10px"
              ></el-input>
            </p>
            <p v-if="item.form.standard2 === '调频干扰'">
              <br />
              <font color="#1e90ff" size="3.5"
                >设置{{ item.form.standard2 }}@@</font
              >
              <el-input
                type="text"
                placeholder="载波频1"
                size="9"
                v-model="item.form.tpgrZbpl2"
                style="width: 150px; margin-left: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="调制频1"
                size="9"
                v-model="item.form.tpgrTzpl2"
                style="width: 150px; margin-left: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="调制频偏"
                size="9"
                v-model="item.form.tpgrZbpp2"
                style="width: 150px; margin-left: 10px"
              ></el-input>
            </p>
            <p v-if="item.form.standard2 === '扫频干扰'">
              <br />
              <font color="#1e90ff" size="3.5"
                >设置{{ item.form.standard2 }}@@</font
              >
              <el-input
                type="text"
                placeholder="起始频1"
                size="9"
                v-model="item.form.spgrQspl2"
                style="width: 90px; margin-left: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="终止频1"
                size="9"
                v-model="item.form.spgrZzpl2"
                style="width: 90px; margin-left: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="扫频点数"
                size="9"
                v-model="item.form.spgrSpds2"
                style="width: 90px; margin-left: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="频点驻留时间"
                size="9"
                v-model="item.form.spgrPdzlsj2"
                style="width: 120px; margin-left: 10px"
              ></el-input>
            </p>
            <p v-if="item.form.standard2 === '白噪声干扰'">
              <br />
              <font color="#1e90ff" size="3.5"
                >设置{{ item.form.standard2 }}@@</font
              >
              <el-input
                type="text"
                placeholder="中心频1"
                size="9"
                v-model="item.form.bzsgrZxpl2"
                style="width: 90px; margin-left: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="带宽"
                size="9"
                v-model="item.form.bzsgrDk2"
                style="width: 90px; margin-left: 10px"
              ></el-input>
              <el-select
                v-model="item.form.bzsgrLbqxs2"
                style="width: 100px; margin-left: 10px"
              >
                <el-option
                  v-for="item in bzsgrLbqxs"
                  :key="item.value"
                  :lable="item.value"
                  :value="item.lable"
                >
                </el-option>
              </el-select>
              <el-input
                type="text"
                placeholder="滤波器a值"
                size="9"
                v-model="item.form.bzsgrLbqaz2"
                style="width: 100px; margin-left: 10px"
              ></el-input>
            </p>
            <p v-if="item.form.standard2 === '调相干扰'">
              <br />
              <font color="#1e90ff" size="3.5">{{ item.form.standard2 }}</font>
              <el-input
                type="text"
                placeholder="载波频1"
                size="7"
                v-model="item.form.txgrZbpl2"
                style="width: 90px; margin-left: 10px"
              ></el-input>
              <el-select
                v-model="item.form.txgrTxxs2"
                style="width: 110px; margin-left: 10px"
                placeholder="调相形式"
              >
                <el-option
                  v-for="item in txgrTxxs"
                  :key="item.value"
                  :lable="item.value"
                  :value="item.lable"
                >
                </el-option>
              </el-select>
              <el-input
                type="text"
                placeholder="符号速率"
                size="7"
                v-model="item.form.txgrFhsl2"
                style="width: 90px; margin-left: 10px"
              ></el-input>
              <el-select
                v-model="item.form.txgrPNm2"
                style="width: 100px; margin-left: 10px"
              >
                <el-option
                  v-for="item in txgrPNm"
                  :key="item.value"
                  :lable="item.value"
                  :value="item.lable"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="item.form.txgrLbqxs2"
                style="width: 100px; margin-left: 10px"
              >
                <el-option
                  v-for="item in txgrLbqxs"
                  :key="item.value"
                  :lable="item.value"
                  :value="item.lable"
                >
                </el-option>
              </el-select>
              <el-input
                type="text"
                placeholder="滤波器a值"
                size="7"
                v-model="item.form.txgrLbqaz2"
                style="width: 100px; margin-left: 74px; margin-top: 10px"
              ></el-input>
            </p>
            <p v-if="item.form.standard2 === '脉冲干扰'">
              <br />
              <font color="#1e90ff" size="3.5"
                >设置{{ item.form.standard2 }}@@</font
              >
              <el-input
                type="text"
                placeholder="脉冲宽度"
                size="9"
                v-model="item.form.mcgrMckd2"
                style="width: 100px; margin-left: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="周期"
                size="9"
                v-model="item.form.mcgrZq2"
                style="width: 100px; margin-left: 10px"
              ></el-input>
            </p>
          </div>
          <div v-else class="xzgrzs">
            <el-select
              v-model="item.form1.f2Bit0"
              placeholder="请选择bit0值"
              style="width: 150px; margin-left: 10px"
            >
              <el-option
                v-for="item in bit"
                :key="item.value"
                :lable="item.value"
                :value="item.lable"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="item.form1.f2Bit1"
              placeholder="请选择bit1值"
              style="width: 150px; margin-left: 10px"
            >
              <el-option
                v-for="item in bit"
                :key="item.value"
                :lable="item.value"
                :value="item.lable"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="item.form1.f2Bit2"
              placeholder="请选择bit2值"
              style="width: 150px; margin-left: 10px"
            >
              <el-option
                v-for="item in bit"
                :key="item.value"
                :lable="item.value"
                :value="item.lable"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="item.form1.f2Bit3"
              placeholder="请选择bit3值"
              style="width: 150px; margin-left: 10px"
            >
              <el-option
                v-for="item in bit"
                :key="item.value"
                :lable="item.value"
                :value="item.lable"
              >
              </el-option>
            </el-select>
          </div>
          <br />

          <font color="#1e90ff" size="3.5">F3频段</font>
          <div v-if="item.grType == '压制干扰'" class="xzgrzs">
            <el-select
              v-model="item.form.pattern3"
              @change="single3()"
              style="width: 150px; margin-left: 10px"
              placeholder="请选择干扰模式"
            >
              <el-option
                v-for="item in pattern"
                :key="item.value"
                :lable="item.value"
                :value="item.lable"
              >
              </el-option>
            </el-select>
            <el-input
              type="text"
              placeholder="请输入主1功1值"
              size="18"
              v-model="item.form.power3"
              style="width: 150px; margin-left: 10px"
            ></el-input>
            <el-select
              @click="choiceForms"
              v-model="item.form.standard3"
              style="width: 150px; margin-left: 10px"
              placeholder="请选择干扰制式"
            >
              <el-option
                v-for="item in standard"
                :key="item.value"
                :lable="item.value"
                :value="item.lable"
              >
              </el-option>
            </el-select>
            <p v-if="item.form.standard3 === '点频干扰'">
              <br />
              <font color="#1e90ff" size="3.5"
                >设置{{ item.form.standard3 }}@@</font
              >
              <el-select
                v-model="item.form.frequency3"
                @change="selectState3($event, item)"
                style="width: 150px; margin-left: 10px"
                placeholder="请选择干扰频1"
              >
                <el-option
                  v-for="item in frequency"
                  :key="item.value"
                  :lable="item.value"
                  :value="item.lable"
                >
                </el-option>
              </el-select>
              <el-input
                :disabled="item.form.state3"
                type="text"
                placeholder="载波频1"
                size="9"
                v-model="item.form.dpgrZbpl3"
                style="width: 150px; margin-left: 10px"
              ></el-input>
            </p>
            <p v-if="item.form.standard3 === '调频干扰'">
              <br />
              <font color="#1e90ff" size="3.5"
                >设置{{ item.form.standard3 }}@@</font
              >
              <el-input
                type="text"
                placeholder="载波频1"
                size="9"
                v-model="item.form.tpgrZbpl3"
                style="width: 150px; margin-left: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="调制频1"
                size="9"
                v-model="item.form.tpgrTzpl3"
                style="width: 150px; margin-left: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="调制频偏"
                size="9"
                v-model="item.form.tpgrZbpp3"
                style="width: 150px; margin-left: 10px"
              ></el-input>
            </p>
            <p v-if="item.form.standard3 === '扫频干扰'">
              <br />
              <font color="#1e90ff" size="3.5"
                >设置{{ item.form.standard3 }}@@</font
              >
              <el-input
                type="text"
                placeholder="起始频1"
                size="9"
                v-model="item.form.spgrQspl3"
                style="width: 100px; margin-left: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="终止频1"
                size="9"
                v-model="item.form.spgrZzpl3"
                style="width: 100px; margin-left: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="扫频点数"
                size="9"
                v-model="item.form.spgrSpds3"
                style="width: 100px; margin-left: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="频点驻留时间"
                size="9"
                v-model="item.form.spgrPdzlsj3"
                style="width: 120px; margin-left: 10px"
              ></el-input>
            </p>
            <p v-if="item.form.standard3 === '白噪声干扰'">
              <br />
              <font color="#1e90ff" size="3.5"
                >设置{{ item.form.standard3 }}@@</font
              >
              <el-input
                type="text"
                placeholder="中心频1"
                size="9"
                v-model="item.form.bzsgrZxpl3"
                style="width: 100px; margin-left: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="带宽"
                size="9"
                v-model="item.form.bzsgrDk3"
                style="width: 100px; margin-left: 10px"
              ></el-input>
              <el-select
                v-model="item.form.bzsgrLbqxs3"
                style="width: 120px; margin-left: 10px"
              >
                <el-option
                  v-for="item in bzsgrLbqxs"
                  :key="item.value"
                  :lable="item.value"
                  :value="item.lable"
                >
                </el-option>
              </el-select>
              <el-input
                type="text"
                placeholder="滤波器a值"
                size="9"
                v-model="item.form.bzsgrLbqaz3"
                style="width: 100px; margin-left: 10px"
              ></el-input>
            </p>
            <p v-if="item.form.standard3 === '调相干扰'">
              <br />
              <font color="#1e90ff" size="3.5">{{ item.form.standard3 }}</font>
              <el-input
                type="text"
                placeholder="载波频1"
                size="7"
                v-model="item.form.txgrZbpl3"
                style="width: 100px; margin-left: 10px"
              ></el-input>
              <el-select v-model="item.form.txgrTxxs3" style="width: 100px">
                <el-option
                  v-for="item in txgrTxxs"
                  :key="item.value"
                  :lable="item.value"
                  :value="item.lable"
                >
                </el-option>
              </el-select>
              <el-input
                type="text"
                placeholder="符号速率"
                size="7"
                v-model="item.form.txgrFhsl3"
                style="width: 100px"
              >
              </el-input>
              <el-select v-model="item.form.txgrPNm3" style="width: 130px">
                <el-option
                  v-for="item in txgrPNm"
                  :key="item.value"
                  :lable="item.value"
                  :value="item.lable"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="item.form.txgrLbqxs3"
                style="width: 130px"
                placeholder="请选择PN码"
              >
                <el-option
                  v-for="item in txgrLbqxs"
                  :key="item.value"
                  :lable="item.value"
                  :value="item.lable"
                >
                </el-option>
              </el-select>
              <el-input
                type="text"
                placeholder="滤波器a值"
                size="7"
                v-model="item.form.txgrLbqaz3"
                style="width: 130px; margin-left: 74px; margin-top: 10px"
              ></el-input>
            </p>
            <p v-if="item.form.standard3 === '脉冲干扰'">
              <br />
              <font color="#1e90ff" size="3.5"
                >设置{{ item.form.standard3 }}@@</font
              >
              <el-input
                type="text"
                placeholder="脉冲宽度"
                size="9"
                v-model="item.form.mcgrMckd3"
                style="width: 150px; margin-left: 10px"
              ></el-input>
              <el-input
                type="text"
                placeholder="周期"
                size="9"
                v-model="item.form.mcgrZq3"
                style="width: 150px; margin-left: 10px"
              ></el-input>
            </p>
          </div>
          <div v-else class="xzgrzs">
            <el-select
              v-model="item.form1.f3Bit0"
              placeholder="请选择bit0值"
              style="width: 150px; margin-left: 10px"
            >
              <el-option
                v-for="item in bit"
                :key="item.value"
                :lable="item.value"
                :value="item.lable"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="item.form1.f3Bit1"
              placeholder="请选择bit1值"
              style="width: 150px; margin-left: 10px"
            >
              <el-option
                v-for="item in bit"
                :key="item.value"
                :lable="item.value"
                :value="item.lable"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="item.form1.f3Bit2"
              placeholder="请选择bit2值"
              style="width: 150px; margin-left: 10px"
            >
              <el-option
                v-for="item in bit"
                :key="item.value"
                :lable="item.value"
                :value="item.lable"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="item.form1.f3Bit3"
              placeholder="请选择bit3值"
              style="width: 150px; margin-left: 10px"
            >
              <el-option
                v-for="item in bit"
                :key="item.value"
                :lable="item.value"
                :value="item.lable"
              >
              </el-option>
            </el-select>
          </div>
          <br />
          <el-button class="buttonOne" size="medium" type="primary">
            更新
          </el-button>
          <el-button
            class="buttonTwo"
            size="medium"
            type="primary"
            @click="sendCommand"
          >
            发送
          </el-button>
          <el-button
            class="buttonThree"
            size="medium"
            type="primary"
            @click="add()"
          >
            添加
          </el-button>
          <el-button
            v-show="current != null"
            class="buttonThree"
            size="medium"
            type="primary"
            @click="changeData()"
          >
            修改
          </el-button>
        </el-form>
      </div>
    </el-card>

    <div class="instructionsSet">
      <div class="right">
        <iframe
          id="ifrm"
          name="mapFrame"
          src="http://192.168.11.127:82/data/gis/run/index.html#/"
          frameborder="0"
          style="height: 400px; width: 1200px"
        ></iframe>
        <button @click="flyToXiBei()">缩放到西北区域</button>
        <!--          <div @click='addPopup()'>addPopup</div>-->
        <!--          <br />-->
        <!--          <div @click='addCustomStyleLine()'>添加自定义样式线(3秒后消失)</div>-->
        <!--          <div @click='addCustomStyleLineWithIcon()'>添加自定义样式线（图标填充_5秒后消失）</div>-->
        <!--          <div @click='clearCustomStyleLine()'>删除自定义样式线</div>-->
        <!--          <br />-->
        <!--          <div @click='addTarget()'>addTarget</div>-->
        <!--          <div @click='addTargetHistory()'>addTargetHistory</div>-->
        <button @click="setStations()">设置干饭站位置</button>
        <button @click="addCustomStyleLine()">
          添加自定义样式线(3秒后消失)
        </button>
        <button @click="addTargetHistory()">addTargetHistory</button>
        <!--          <br />-->
        <!--          <div @click='clearTarget()'>clearTarget</div>-->
        <!--          <div @click='clearStations()'>clearStations</div>-->
        <!--          <div @click='clearTargetHistory()'>clearTargetHistory</div>-->
        <button @click="clearMap()">删除所有要素</button>
        <!--          <br />-->
        <button @click="enableDrawTool()">enableDrawTool</button>
        <!--          <div @click='disableDrawTool()'>disableDrawTool</div>-->
        <!--          <br />-->

        <!--          <div @click='animateReceiveData()'>animateReceiveData</div>-->
        <!--          <div @click='stopAnimate()'>stopAnimate</div>-->

        <!--          <br />-->
      </div>
      <button @click="bujupanjue()">布局判决</button>
      <button @click="fangzhenyanzheng()">仿真验证</button>
      <button @click="messageshow()">信息展示</button>
      <button @click="animateReceiveData()">animateReceiveData</button>
      <button @click="start()">开始执行</button>
      <button @click="over()">结束执行</button>
      <el-card :bordered="false">
        <div style="min-height: 230px; text-align: center">
          <font color="#1e90ff" size="5">指令集</font><br />
          <ol>
            <li
              :class="{ active: index == current }"
              style="text-align: left"
              @click="getTdate(item, index)"
              v-for="(item, index) in masterStation"
              :key="item.id"
            >
              <div v-if="item.grType == '压制干扰'">
                {{ item.tabs }}{{ item.zai }}{{ item.f1 }}

                {{ item.InterfereTime }} {{ item.frequency1 }}{{ item.pattern1
                }}{{ item.power1 }}{{ item.standard1 }}{{ item.dpgrZbpl1
                }}{{ item.tpgrZbpl1 }}{{ item.tpgrTzpl1 }}{{ item.tpgrZbpp1 }}
                {{ item.spgrQspl1 }}{{ item.spgrZzpl1 }}{{ item.spgrSpds1
                }}{{ item.spgrPdzlsj1 }}{{ item.bzsgrZxpl1 }}{{ item.bzsgrDk1
                }}{{ item.bzsgrLbqxs1 }} {{ item.bzsgrLbqaz1
                }}{{ item.txgrZbpl1 }}{{ item.txgrTxxs }}{{ item.txgrFhsl1
                }}{{ item.txgrPNm1 }}{{ item.txgrLbqxs1 }}{{ item.txgrLbqaz1 }}
                {{ item.mcgrMckd1 }}{{ item.mcgrZq1 }}

                {{ item.tabs1 }}{{ item.zai1 }}{{ item.f2 }}{{ item.frequency2
                }}{{ item.pattern2 }}{{ item.standard2 }}{{ item.power2
                }}{{ item.dpgrZbpl2 }}{{ item.tpgrZbpl2 }}{{ item.tpgrTzpl2 }}
                {{ item.tpgrZbpp2 }}{{ item.spgrQspl2 }}{{ item.spgrZzpl2
                }}{{ item.spgrSpds2 }}{{ item.spgrPdzlsj2 }}{{ item.bzsgrZxpl2
                }}{{ item.bzsgrDk2 }} {{ item.bzsgrLbqxs2 }}{{ item.bzsgrLbqaz2
                }}{{ item.txgrZbpl2 }}{{ item.txgrTxxs2 }}{{ item.txgrFhsl2
                }}{{ item.txgrPNm2 }}{{ item.txgrLbqxs2 }} {{ item.txgrLbqaz2
                }}{{ item.mcgrMckd2 }}{{ item.mcgrZq2 }}

                {{ item.tabs2 }}{{ item.zai2 }}{{ item.f3 }}{{ item.frequency3
                }}{{ item.pattern3 }}{{ item.standard3 }}{{ item.power3
                }}{{ item.dpgrZbpl3 }}{{ item.tpgrZbpl3 }}{{ item.tpgrTzpl3 }}
                {{ item.tpgrZbpp3 }}{{ item.spgrQspl3 }}{{ item.spgrZzpl3
                }}{{ item.spgrSpds3 }}{{ item.spgrPdzlsj3 }}{{ item.bzsgrZxpl3
                }}{{ item.bzsgrDk3 }} {{ item.bzsgrLbqxs3 }}{{ item.bzsgrLbqaz3
                }}{{ item.txgrZbpl3 }}{{ item.txgrTxxs3 }}{{ item.txgrFhsl3
                }}{{ item.txgrPNm3 }}{{ item.txgrLbqxs3 }} {{ item.txgrLbqaz3
                }}{{ item.mcgrMckd3 }}{{ item.mcgrZq3 }}
              </div>
              <div v-else>
                {{ item.tab }}{{ item.zai }}{{ item.f1 }} {{ item.f1Bit0
                }}{{ item.f1Bit1 }}{{ item.f1Bit2 }}{{ item.f1Bit3 }}
                {{ item.tab }}{{ item.zai }}{{ item.f2 }} {{ item.f2Bit0
                }}{{ item.f2Bit1 }}{{ item.f2Bit2 }}{{ item.f2Bit3 }}
                {{ item.tab }}{{ item.zai }}{{ item.f3 }} {{ item.f3Bit0
                }}{{ item.f3Bit1 }}{{ item.f3Bit2 }}{{ item.f3Bit3 }}
              </div>
              <el-button
                v-show="masterStation.length != 0"
                class="btnDelete"
                type="primary"
                size="small"
                @click="deleteData()"
              >
                删除
              </el-button>
            </li>
          </ol>
        </div>
      </el-card>
    </div>
  </el-row>
</template>

<script>
import axios from "axios";
import SelectScene from './components/select-scene.vue';
import { formData } from './common/data/formData.js'

export default {
  name: "deviceMng",
  components: {SelectScene},
  data() {
    return {
      trackSplitList: [],
      ok: "ok",
      track: "",
      testData: [],
      tableData: [],
      id: "",
      stationcolor1: "", //干扰站颜色
      stationcolor2: "", //干扰站颜色
      stationcolor3: "", //干扰站颜色
      stationcolor4: "", //干扰站颜色
      trackcolor1: "", //轨迹点颜色
      trackcolor2: "", //轨迹点颜色
      trackcolor3: "", //轨迹点颜色
      trackcolor4: "", //轨迹点颜色
      dialogVisible: false,
      dialog: false,
      visible: false,
      coordinatesList: [],
      coordinatesOne: [],
      coordinatesTwo: [],
      coordinatesThree: [],
      coordinatesFour: [],
      coordinates: [],
      md5list: "",
      hexcase: "0",
      b64pad: "",
      setmd5: "",
      md5app: "",
      timestamp: "", //时间戳
      tabItemIndex: null,
      tabItemData: [
        {
          name: "主站1",
          id: 0,
          ...formData
        },
        {
          name: "从站1",
          id: 1,
          ...formData
        },
        {
          name: "从站2",
          id: 2,
          ...formData
        },
        {
          name: "从站3",
          id: 3,
          ...formData
        },
      ],
      bit: [
        {
          value: "0",
          lable: "0",
        },
        {
          value: "1",
          lable: "1",
        },
      ],
      current: null,
      coordinates1: [85.03, 39.21],
      coordinates2: [85.53, 39.41],
      coordinates3: [86.35, 39.31],
      coordinates4: [87.35, 39.31],
      showSessionId: "",
      src: "",
      f1: "F1频段", //
      zai: "在",
      valueScene: "", //新建场景@@
      options: [],
      frequency: [
        { value: "1", lable: "GPS-L1" },
        { value: "2", lable: "GPS-L2" },
        { value: "3", lable: "GLONASS-G1" },
        { value: "4", lable: "BD/BD3-B1I" },
        { value: "5", lable: "BD/BD3-B2I" },
        { value: "6", lable: "BD/BD3-B3I" },
        { value: "7", lable: "BD/BD3-B1C" },
        { value: "8", lable: "BD/BD3-B2a" },
        { value: "9", lable: "BD/BD3-B2b" },
        { value: "10", lable: "其他" },
      ],
      frequencyOne: [
        { value: "1", lable: "GPS-L1" },
        { value: "2", lable: "GPS-L2" },
        { value: "3", lable: "GLONASS-G1" },
        { value: "4", lable: "BD/BD3-B1I" },
        { value: "5", lable: "BD/BD3-B2I" },
        { value: "6", lable: "BD/BD3-B3I" },
        { value: "7", lable: "BD/BD3-B1C" },
        { value: "8", lable: "BD/BD3-B2a" },
        { value: "9", lable: "BD/BD3-B2b" },
      ],
      patternOne: [
        {
          value: "1",
          lable: "固定源端功1",
        },
        {
          value: "2",
          lable: "固定目标处功1",
        },
        {
          value: "3",
          lable: "固定指向和源端功1",
        },
      ],
      pattern: [
        {
          value: "1",
          lable: "固定源端功1",
        },
        {
          value: "2",
          lable: "固定目标处功1",
        },
        {
          value: "3",
          lable: "固定指向和源端功1",
        },
      ],
      num: [
        { value: "1", lable: "1" },
        { value: "2", lable: "2" },
        { value: "3", lable: "3" },
        { value: "4", lable: "4" },
      ],
      txgrTxxs: [
        { value: "1", lable: "0:BPSK" },
        { value: "2", lable: "1:QPSK" },
      ],
      DriveForms: [
        {
          value: "1",
          lable: "时间",
        },
        {
          value: "2",
          lable: "位置",
        },
      ],
      standard: [
        { value: "1", lable: "点频干扰" },
        { value: "2", lable: "调频干扰" },
        { value: "3", lable: "扫频干扰" },
        { value: "4", lable: "白噪声干扰" },
        { value: "5", lable: "调相干扰" },
        { value: "6", lable: "脉冲干扰" },
      ],
      bzsgrLbqxs: [
        { value: "1", lable: "0:升余弦" },
        { value: "2", lable: "1:矩形" },
        { value: "3", lable: "2:高斯" },
      ],
      txgrPNm: [
        { value: "1", lable: "0:PN9" },
        { value: "2", lable: "1:PN11" },
        { value: "3", lable: "2:PN15" },
        { value: "4", lable: "3:PN20" },
        { value: "5", lable: "4:PN23" },
      ],
      txgrLbqxs: [
        { value: "1", lable: "0:升余弦" },
        { value: "2", lable: "1:矩形" },
        { value: "3", lable: "2:高斯" },
      ],
      newscene: {}, //新建场景对象
      list: {}, //指令集
      masterStation: [], //主1
      ganxinbi: "",
      num1: "1",
      num2: "1",
      num3: "1",
      num4: "1",
    };
  },
  watch: {},
  methods: {
    cellStyle() {
      return "height:35px!important; border-color:black!important; color:#000000!important; padding:0px!important; height:40px!important";
    },
    getData() {
      let params = {
        name: "simulationValidate",
        app_key: "sixteen",
        data: "",
        version: "",
        timestamp: this.timestamp,
        format: "json",
      };
      params.sign = this.buildSign(params);
      //    axios
      //   .post("http://streamwind.picp.vip:14028/api", {

      //     name: "simulationValidate",
      //     app_key: "sixteen",
      //     data: "",
      //     version: "",
      //     timestamp: this.timestamp,
      //     sign: params.sign,
      //     format: "json",
      //   }).then((res => {
      //     console.log(res);
      //   }))
      axios
        .post("http://streamwind.picp.vip:14028/api", {
          name: "simulationValidate",
          app_key: "sixteen",
          data: "",
          version: "",
          timestamp: this.timestamp,
          sign: params.sign,
          format: "json",
        })
        .then((res) => {
          console.log(res);
          let data = res.data.data.track;
          for (let i = 0; i < data.length; i++) {
            const e = data[i];
            e.result.map((item) => {
              item.res.map((item2) => {
                // console.log(item2);
                this.tableData.push({
                  id: JSON.stringify(e.id),
                  coordinate: e.coordinate.toString(),
                  v: JSON.stringify(e.v),
                  station_id: JSON.stringify(item.station_id),
                  P: JSON.stringify(item2.P),
                  Q: JSON.stringify(item2.Q),
                  f: JSON.stringify(item2.f),
                  singleFlag: JSON.stringify(item2.singleFlag),
                });
              });
            });
          }
        });
    },
    ticketFlitterData(arr) {
      // console.log(arr,"ar");
      let spanOneArr = [];
      let spanTwoArr = [];
      let spanThreeArr = [];
      let spanFourArr = [];
      let concatOne = 0;
      let concatTwo = 0;
      let concatThree = 0;
      let concatFour = 0;
      arr.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1);
          spanTwoArr.push(1);
          spanThreeArr.push(1);
          spanFourArr.push(1);
        } else {
          //id
          if (item.id === arr[index - 1].id) {
            //第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1;
            spanOneArr.push(0);
          } else {
            spanOneArr.push(1);
            concatOne = index;
          }

          if (item.coordinate === arr[index - 1].coordinate) {
            //第二列需合并相同内容的判断条件
            spanTwoArr[concatTwo] += 1;
            spanTwoArr.push(0);
          } else {
            spanTwoArr.push(1);
            concatTwo = index;
          }

          if (item.v === arr[index - 1].v && item.id === arr[index - 1].id) {
            //第三列需合并相同内容的判断条件
            spanThreeArr[concatThree] += 1;
            spanThreeArr.push(0);
          } else {
            spanThreeArr.push(1);
            concatThree = index;
          }

          if (item.station_id === arr[index - 1].station_id) {
            //第四列需合并相同内容的判断条件
            spanFourArr[concatFour] += 1;
            spanFourArr.push(0);
          } else {
            spanFourArr.push(1);
            concatFour = index;
          }
        }
      });

      return {
        one: spanOneArr,
        two: spanTwoArr,
        three: spanThreeArr,
        four: spanFourArr,
      };
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      // console.log(rowIndex, columnIndex ,"rowIndex, columnIndex ");

      if (columnIndex === 0) {
        // this.tableData  修改
        const _row = this.ticketFlitterData(this.tableData).one[rowIndex];

        const _col = _row > 0 ? 1 : 0;

        return {
          rowspan: _row,
          colspan: _col,
        };
      }
      if (columnIndex === 1) {
        // this.tableData  修改
        const _row = this.ticketFlitterData(this.tableData).two[rowIndex];

        const _col = _row > 0 ? 1 : 0;

        return {
          rowspan: _row,
          colspan: _col,
        };
      }
      if (columnIndex === 2) {
        // this.tableData  修改
        const _row = this.ticketFlitterData(this.tableData).three[rowIndex];

        const _col = _row > 0 ? 1 : 0;

        return {
          rowspan: _row,
          colspan: _col,
        };
      }
      if (columnIndex === 3) {
        // this.tableData  修改
        const _row = this.ticketFlitterData(this.tableData).four[rowIndex];

        const _col = _row > 0 ? 1 : 0;

        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },

    onTab(index) {
      this.tabItemIndex = index;
    },
    
    //添加
    add() {
      this.list = {
        frequency: this.frequency.value,
        pattern: this.pattern.value,
        num: this.num.value,
        DriveForms: this.DriveForms.value,
        ganxinbi: this.ganxinbi,
      };
      //新增元素
      this.masterStation = this.getMastetData();
    },
    //
    choiceFrequency(val) {
      this.tabItemData[0].form.frequency1 = val;
      this.tabItemData[0].form.frequency2 = val;
      this.tabItemData[0].form.frequency3 = val;
      this.tabItemData[1].form.frequency1 = val;
      this.tabItemData[1].form.frequency2 = val;
      this.tabItemData[1].form.frequency3 = val;
      this.tabItemData[2].form.frequency1 = val;
      this.tabItemData[2].form.frequency2 = val;
      this.tabItemData[2].form.frequency3 = val;
      this.tabItemData[3].form.frequency1 = val;
      this.tabItemData[3].form.frequency2 = val;
      this.tabItemData[3].form.frequency3 = val;
      for (let i = 0; i < 4; i++) {
        this.selectState1(val, this.tabItemData[i]);
        this.selectState2(val, this.tabItemData[i]);
        this.selectState3(val, this.tabItemData[i]);
      }
    },

    stateFilter1(val, index) {
      if (val == "GPS-L1") {
        this.tabItemData[index].form.dpgrZbpl1 = "1";
        this.tabItemData[index].form.state1 = true;
      }
      if (val == "GPS-L2") {
        this.tabItemData[index].form.dpgrZbpl1 = "2";
        this.tabItemData[index].form.state1 = true;
      }
      if (val == "GLONASS-G1") {
        this.tabItemData[index].form.dpgrZbpl1 = "3";
        this.tabItemData[index].form.state1 = true;
      }
      if (val == "BD/BD3-B1I") {
        this.tabItemData[index].form.dpgrZbpl1 = "4";
        this.tabItemData[index].form.state1 = true;
      }
      if (val == "BD/BD3-B2I") {
        this.tabItemData[index].form.dpgrZbpl1 = "5";
        this.tabItemData[index].form.state1 = true;
      }
      if (val == "BD/BD3-B3I") {
        this.tabItemData[index].form.dpgrZbpl1 = "6";
        this.tabItemData[index].form.state1 = true;
      }
      if (val == "BD/BD3-B1C") {
        this.tabItemData[index].form.dpgrZbpl1 = "7";
        this.tabItemData[index].form.state1 = true;
      }
      if (val == "BD/BD3-B2a") {
        this.tabItemData[index].form.dpgrZbpl1 = "8";
        this.tabItemData[index].form.state1 = true;
      }
      if (val == "BD/BD3-B2b") {
        this.tabItemData[index].form.dpgrZbpl1 = "9";
        this.tabItemData[index].form.state1 = true;
      }
      if (val == "其他") {
        this.tabItemData[index].form.dpgrZbpl1 = "";
        this.tabItemData[index].form.state1 = false;
      }
    },
    stateFilter2(val, index) {
      if (val == "GPS-L1") {
        this.tabItemData[index].form.dpgrZbpl2 = "1";
        this.tabItemData[index].form.state2 = true;
      }
      if (val == "GPS-L2") {
        this.tabItemData[index].form.dpgrZbpl2 = "2";
        this.tabItemData[index].form.state2 = true;
      }
      if (val == "GLONASS-G1") {
        this.tabItemData[index].form.dpgrZbpl2 = "3";
        this.tabItemData[index].form.state2 = true;
      }
      if (val == "BD/BD3-B1I") {
        this.tabItemData[index].form.dpgrZbpl2 = "4";
        this.tabItemData[index].form.state2 = true;
      }
      if (val == "BD/BD3-B2I") {
        this.tabItemData[index].form.dpgrZbpl2 = "5";
        this.tabItemData[index].form.state2 = true;
      }
      if (val == "BD/BD3-B3I") {
        this.tabItemData[index].form.dpgrZbpl2 = "6";
        this.tabItemData[index].form.state2 = true;
      }
      if (val == "BD/BD3-B1C") {
        this.tabItemData[index].form.dpgrZbpl2 = "7";
        this.tabItemData[index].form.state2 = true;
      }
      if (val == "BD/BD3-B2a") {
        this.tabItemData[index].form.dpgrZbpl2 = "8";
        this.tabItemData[index].form.state2 = true;
      }
      if (val == "BD/BD3-B2b") {
        this.tabItemData[index].form.dpgrZbpl2 = "9";
        this.tabItemData[index].form.state2 = true;
      }
      if (val == "其他") {
        this.tabItemData[index].form.dpgrZbpl2 = "";
        this.tabItemData[index].form.state2 = false;
      }
    },
    stateFilter3(val, index) {
      if (val == "GPS-L1") {
        this.tabItemData[index].form.dpgrZbpl3 = "1";
        this.tabItemData[index].form.state3 = true;
      }
      if (val == "GPS-L2") {
        this.tabItemData[index].form.dpgrZbpl3 = "2";
        this.tabItemData[index].form.state3 = true;
      }
      if (val == "GLONASS-G1") {
        this.tabItemData[index].form.dpgrZbpl3 = "3";
        this.tabItemData[index].form.state3 = true;
      }
      if (val == "BD/BD3-B1I") {
        this.tabItemData[index].form.dpgrZbpl3 = "4";
        this.tabItemData[index].form.state3 = true;
      }
      if (val == "BD/BD3-B2I") {
        this.tabItemData[index].form.dpgrZbpl3 = "5";
        this.tabItemData[index].form.state3 = true;
      }
      if (val == "BD/BD3-B3I") {
        this.tabItemData[index].form.dpgrZbpl3 = "6";
        this.tabItemData[index].form.state3 = true;
      }
      if (val == "BD/BD3-B1C") {
        this.tabItemData[index].form.dpgrZbpl3 = "7";
        this.tabItemData[index].form.state3 = true;
      }
      if (val == "BD/BD3-B2a") {
        this.tabItemData[index].form.dpgrZbpl3 = "8";
        this.tabItemData[index].form.state3 = true;
      }
      if (val == "BD/BD3-B2b") {
        this.tabItemData[index].form.dpgrZbpl3 = "9";
        this.tabItemData[index].form.state3 = true;
      }
      if (val == "其他") {
        this.tabItemData[index].form.dpgrZbpl3 = "";
        this.tabItemData[index].form.state3 = false;
      }
    },

    // state1:false,//f1禁用
    // state2:false,//f2禁用
    // state3:false,//f3禁用
    selectState1(val, item) {
      // console.log(val, item, "val, item");
      this.$forceUpdate();
      switch (item.name) {
        case "主站1":
          this.stateFilter1(val, item.id);
          break;
        case "从站1":
          this.stateFilter1(val, item.id);
          break;
        case "从站2":
          this.stateFilter1(val, item.id);
          break;
        case "从站3":
          this.stateFilter1(val, item.id);
          break;
      }
    },
    selectState2(val, item) {
      this.$forceUpdate();
      switch (item.name) {
        case "主站1":
          this.stateFilter2(val, item.id);
          break;
        case "从站1":
          this.stateFilter2(val, item.id);
          break;
        case "从站2":
          this.stateFilter2(val, item.id);
          break;
        case "从站3":
          this.stateFilter2(val, item.id);
          break;
      }
    },
    selectState3(val, item) {
      this.$forceUpdate();
      switch (item.name) {
        case "主站1":
          this.stateFilter3(val, item.id);
          break;
        case "从站1":
          this.stateFilter3(val, item.id);
          break;
        case "从站2":
          this.stateFilter3(val, item.id);
          break;
        case "从站3":
          this.stateFilter3(val, item.id);
          break;
      }

      //从站1
      if (this.tabItemData[1].name == "从站1") {
        if (val == "GPS-L1") {
          this.tabItemData[1].form.dpgrZbpl1 = "1";
          this.aaaaaaa = true;
        } else if (val == "GPS-L2") {
          this.tabItemData[1].form.dpgrZbpl1 = "2";
          this.aaaaaaa = true;
        } else if (val == "GLONASS-G1") {
          this.tabItemData[1].form.dpgrZbpl1 = "3";
          this.aaaaaaa = true;
        } else if (val == "BD/BD3-B1I") {
          this.tabItemData[1].form.dpgrZbpl1 = "4";
          this.aaaaaaa = true;
        } else if (val == "BD/BD3-B2I") {
          this.tabItemData[1].form.dpgrZbpl1 = "5";
          this.aaaaaaa = true;
        } else if (val == "BD/BD3-B3I") {
          this.tabItemData[1].form.dpgrZbpl1 = "6";
          this.aaaaaaa = true;
        } else if (val == "BD/BD3-B1C") {
          this.tabItemData[1].form.dpgrZbpl1 = "7";
          this.aaaaaaa = true;
        } else if (val == "BD/BD3-B2a") {
          this.tabItemData[1].form.dpgrZbpl1 = "8";
          this.aaaaaaa = true;
        } else if (val == "BD/BD3-B2b") {
          this.tabItemData[1].form.dpgrZbpl1 = "9";
          this.aaaaaaa = true;
        } else if (val == "其他") {
          this.tabItemData[1].form.dpgrZbpl1 = "";
          this.aaaaaaa = false;
        }
      }
      //从站2
      if (this.tabItemData[2].name == "从站2") {
        if (val == "GPS-L1") {
          this.tabItemData[2].form.dpgrZbpl1 = "1";
          this.aaaaaaa = true;
        } else if (val == "GPS-L2") {
          this.tabItemData[2].form.dpgrZbpl1 = "2";
          this.aaaaaaa = true;
        } else if (val == "GLONASS-G1") {
          this.tabItemData[2].form.dpgrZbpl1 = "3";
          this.aaaaaaa = true;
        } else if (val == "BD/BD3-B1I") {
          this.tabItemData[2].form.dpgrZbpl1 = "4";
          this.aaaaaaa = true;
        } else if (val == "BD/BD3-B2I") {
          this.tabItemData[2].form.dpgrZbpl1 = "5";
          this.aaaaaaa = true;
        } else if (val == "BD/BD3-B3I") {
          this.tabItemData[2].form.dpgrZbpl1 = "6";
          this.aaaaaaa = true;
        } else if (val == "BD/BD3-B1C") {
          this.tabItemData[2].form.dpgrZbpl1 = "7";
          this.aaaaaaa = true;
        } else if (val == "BD/BD3-B2a") {
          this.tabItemData[2].form.dpgrZbpl1 = "8";
          this.aaaaaaa = true;
        } else if (val == "BD/BD3-B2b") {
          this.tabItemData[2].form.dpgrZbpl1 = "9";
          this.aaaaaaa = true;
        } else if (val == "其他") {
          this.tabItemData[2].form.dpgrZbpl1 = "";
          this.aaaaaaa = false;
        }
      }
      //从站3
      if (this.tabItemData[3].name == "从站3") {
        if (val == "GPS-L1") {
          this.tabItemData[3].form.dpgrZbpl1 = "1";
          this.aaaaaaa = true;
        } else if (val == "GPS-L2") {
          this.tabItemData[3].form.dpgrZbpl1 = "2";
          this.aaaaaaa = true;
        } else if (val == "GLONASS-G1") {
          this.tabItemData[3].form.dpgrZbpl1 = "3";
          this.aaaaaaa = true;
        } else if (val == "BD/BD3-B1I") {
          this.tabItemData[3].form.dpgrZbpl1 = "4";
          this.aaaaaaa = true;
        } else if (val == "BD/BD3-B2I") {
          this.tabItemData[3].form.dpgrZbpl1 = "5";
          this.aaaaaaa = true;
        } else if (val == "BD/BD3-B3I") {
          this.tabItemData[3].form.dpgrZbpl1 = "6";
          this.aaaaaaa = true;
        } else if (val == "BD/BD3-B1C") {
          this.tabItemData[3].form.dpgrZbpl1 = "7";
          this.aaaaaaa = true;
        } else if (val == "BD/BD3-B2a") {
          this.tabItemData[3].form.dpgrZbpl1 = "8";
          this.aaaaaaa = true;
        } else if (val == "BD/BD3-B2b") {
          this.tabItemData[3].form.dpgrZbpl1 = "9";
          this.aaaaaaa = true;
        } else if (val == "其他") {
          this.tabItemData[3].form.dpgrZbpl1 = "";
          this.aaaaaaa = false;
        }
      }
    },

    choicePattern(val) {
      this.tabItemData[0].form.pattern1 = val;
      this.tabItemData[0].form.pattern2 = val;
      this.tabItemData[0].form.pattern3 = val;
      this.tabItemData[1].form.pattern1 = val;
      this.tabItemData[1].form.pattern2 = val;
      this.tabItemData[1].form.pattern3 = val;
      this.tabItemData[2].form.pattern1 = val;
      this.tabItemData[2].form.pattern2 = val;
      this.tabItemData[2].form.pattern3 = val;
      this.tabItemData[3].form.pattern1 = val;
      this.tabItemData[3].form.pattern2 = val;
      this.tabItemData[3].form.pattern3 = val;
    },
    single1() {
      this.$forceUpdate();
    },
    single2() {
      this.$forceUpdate();
    },
    single3() {
      this.$forceUpdate();
    },
    choiceNum() {
      this.num11 = this.num;
      this.num12 = this.num;
      this.num13 = this.num;
      this.num2 = this.num;
      this.num3 = this.num;
      this.num4 = this.num;
    },
    choiceForms() {},
    ChoiceDriveForms() {
      // console.log(this.DriveForms);
    },

    // 选中
    getTdate(val, index) {
      // console.log(val, index, "val, index");
      this.current = index;
      switch (val.id) {
        case 0:
          this.tabItemIndex = 0;
          if (val.grType == "压制干扰") {
            this.tabItemData[0].grType = "压制干扰";
            this.tabItemData[0].form = val;
          } else {
            this.tabItemData[0].grType = "欺骗干扰";
            this.tabItemData[0].form1 = val;
          }
          break;
        case 1:
          this.tabItemIndex = 1;
          if (val.grType == "压制干扰") {
            this.tabItemData[1].grType = "压制干扰";
            this.tabItemData[1].form = val;
          } else {
            this.tabItemData[1].grType = "欺骗干扰";
            this.tabItemData[1].form1 = val;
          }
          break;
        case 2:
          this.tabItemIndex = 2;
          if (val.grType == "压制干扰") {
            this.tabItemData[2].grType = "压制干扰";
            this.tabItemData[2].form = val;
          } else {
            this.tabItemData[2].grType = "欺骗干扰";
            this.tabItemData[2].form1 = val;
          }
          break;
        case 3:
          this.tabItemIndex = 3;
          if (val.grType == "压制干扰") {
            this.tabItemData[3].grType = "压制干扰";
            this.tabItemData[3].form = val;
          } else {
            this.tabItemData[3].grType = "欺骗干扰";
            this.tabItemData[3].form1 = val;
          }
          break;
      }
    },
    // 过滤 获取 mastetData 数据
    getMastetData() {
      //拷贝一份数据
      const mastetData = [...this.masterStation];
      switch (this.tabItemIndex) {
        case 0:
          if (this.tabItemData[0].grType == "压制干扰") {
            mastetData.push({
              grType: this.tabItemData[0].grType,
              id: 0,
              f1: "F1频段",
              tabs: this.tabItemData[0].name,
              zai: this.zai,
              frequency1: this.tabItemData[0].form.frequency1,
              pattern1: this.tabItemData[0].form.pattern1,
              power1: this.tabItemData[0].form.power1,
              InterfereTime: this.tabItemData[0].form.InterfereTime, //时间或者位置
              standard1: this.tabItemData[0].form.standard1, //点频干扰
              dpgrZbpl1: this.tabItemData[0].form.dpgrZbpl1, //点频干扰(载波频1)
              tpgrZbpl1: this.tabItemData[0].form.tpgrZbpl1, //调频干扰(载波频1)
              tpgrTzpl1: this.tabItemData[0].form.tpgrTzpl1, //调频干扰(调制频1)
              tpgrZbpp1: this.tabItemData[0].form.tpgrZbpp1, //调频干扰(调制频偏)
              spgrQspl1: this.tabItemData[0].form.spgrQspl1, //扫频干扰(起始频1)
              spgrZzpl1: this.tabItemData[0].form.spgrZzpl1, //扫频干扰(终止频1)
              spgrSpds1: this.tabItemData[0].form.spgrSpds1, //扫频干扰(扫频点数)
              spgrPdzlsj1: this.tabItemData[0].form.spgrPdzlsj1, //扫频干扰(频点驻留时间)
              bzsgrZxpl1: this.tabItemData[0].form.bzsgrZxpl1, //白噪声干扰(中心频1)
              bzsgrDk1: this.tabItemData[0].form.bzsgrDk1, //白噪声干扰(带宽)
              bzsgrLbqxs1: this.tabItemData[0].form.bzsgrLbqxs1, //白噪声干扰(滤波器)
              bzsgrLbqaz1: this.tabItemData[0].form.bzsgrLbqaz1, //白噪声干扰(滤波器a值)
              txgrZbpl1: this.tabItemData[0].form.txgrZbpl1, //调相干扰(载波频1)
              txgrTxxs: this.tabItemData[0].form.txgrTxxs, //调相干扰
              txgrFhsl1: this.tabItemData[0].form.txgrFhsl1, //调相干扰(符号速率)
              txgrPNm1: this.tabItemData[0].form.txgrPNm1, //调相干扰
              txgrLbqxs1: this.tabItemData[0].form.txgrLbqxs1, //调相干扰
              txgrLbqaz1: this.tabItemData[0].form.txgrLbqaz1, //调相干扰(滤波器a值)
              mcgrMckd1: this.tabItemData[0].form.mcgrMckd1, //脉冲干扰(脉冲宽度)
              mcgrZq1: this.tabItemData[0].form.mcgrZq1, //脉冲干扰(周期)
              //F2频段
              tabs1: this.tabItemData[0].name,
              f2: "F2频段",
              zai1: "在",
              frequency2: this.tabItemData[0].form.frequency2, //
              pattern2: this.tabItemData[0].form.pattern2,
              power2: this.tabItemData[0].form.power2,
              dpgrZbpl2: this.tabItemData[0].form.dpgrZbpl2, //点频干扰
              tpgrZbpl2: this.tabItemData[0].form.tpgrZbpl2, //调频干扰
              tpgrTzpl2: this.tabItemData[0].form.tpgrTzpl2, //调频干扰
              tpgrZbpp2: this.tabItemData[0].form.tpgrZbpp2, //调频干扰
              spgrQspl2: this.tabItemData[0].form.spgrQspl2, //扫频干扰
              spgrZzpl2: this.tabItemData[0].form.spgrZzpl2, //扫频干扰
              spgrSpds2: this.tabItemData[0].form.spgrSpds2, //扫频干扰
              spgrPdzlsj2: this.tabItemData[0].form.spgrPdzlsj2, //扫频干扰
              bzsgrZxpl2: this.tabItemData[0].form.bzsgrZxpl2, //白噪声干扰
              bzsgrDk2: this.tabItemData[0].form.bzsgrDk2, //白噪声干扰
              bzsgrLbqxs2: this.tabItemData[0].form.bzsgrLbqxs2, //白噪声干扰
              bzsgrLbqaz2: this.tabItemData[0].form.bzsgrLbqaz2, //白噪声干扰
              txgrZbpl2: this.tabItemData[0].form.txgrZbpl2, //调相干扰
              txgrTxxs2: this.tabItemData[0].form.txgrTxxs2, //调相干扰
              txgrFhsl2: this.tabItemData[0].form.txgrFhsl2, //调相干扰
              txgrPNm2: this.tabItemData[0].form.txgrPNm2, //调相干扰
              txgrLbqxs2: this.tabItemData[0].form.txgrLbqxs2, //调相干扰
              txgrLbqaz2: this.tabItemData[0].form.txgrLbqaz2, //调相干扰
              mcgrMckd2: this.tabItemData[0].form.mcgrMckd2, //脉冲干扰
              mcgrZq2: this.tabItemData[0].form.mcgrZq2, //脉冲干扰
              //F3频段
              tabs2: this.tabItemData[0].name,
              f3: "F3频段",
              zai2: "在",
              frequency3: this.tabItemData[0].form.frequency3, //
              pattern3: this.tabItemData[0].form.pattern3,
              power3: this.tabItemData[0].form.power3,
              dpgrZbpl3: this.tabItemData[0].form.dpgrZbpl3, //点频干扰
              tpgrZbpl3: this.tabItemData[0].form.tpgrZbpl3, //调频干扰
              tpgrTzpl3: this.tabItemData[0].form.tpgrTzpl3, //调频干扰
              tpgrZbpp3: this.tabItemData[0].form.tpgrZbpp3, //调频干扰
              spgrQspl3: this.tabItemData[0].form.spgrQspl3, //扫频干扰
              spgrZzpl3: this.tabItemData[0].form.spgrZzpl3, //扫频干扰
              spgrSpds3: this.tabItemData[0].form.spgrSpds3, //扫频干扰
              spgrPdzlsj3: this.tabItemData[0].form.spgrPdzlsj3, //扫频干扰
              bzsgrZxpl3: this.tabItemData[0].form.bzsgrZxpl3, //白噪声干扰
              bzsgrDk3: this.tabItemData[0].form.bzsgrDk3, //白噪声干扰
              bzsgrLbqxs3: this.tabItemData[0].form.bzsgrLbqxs3, //白噪声干扰
              bzsgrLbqaz3: this.tabItemData[0].form.bzsgrLbqaz3, //白噪声干扰
              txgrZbpl3: this.tabItemData[0].form.txgrZbpl3, //调相干扰
              txgrTxxs3: this.tabItemData[0].form.txgrTxxs3, //调相干扰
              txgrFhsl3: this.tabItemData[0].form.txgrFhsl3, //调相干扰
              txgrPNm3: this.tabItemData[0].form.txgrPNm3, //调相干扰
              txgrLbqxs3: this.tabItemData[0].form.txgrLbqxs3, //调相干扰
              txgrLbqaz3: this.tabItemData[0].form.txgrLbqaz3, //调相干扰
              mcgrMckd3: this.tabItemData[0].form.mcgrMckd3, //脉冲干扰
              mcgrZq3: this.tabItemData[0].form.mcgrZq3, //脉冲干扰
            });
          } else {
            mastetData.push({
              grType: this.tabItemData[0].grType,
              id: 0,
              f1: "F1频段",
              tab: this.tabItemData[0].name,
              zai: "在",
              f1Bit0: this.tabItemData[0].form1.f1Bit0,
              f1Bit1: this.tabItemData[0].form1.f1Bit1,
              f1Bit2: this.tabItemData[0].form1.f1Bit2,
              f1Bit3: this.tabItemData[0].form1.f1Bit3,
              f2: "F2频段",
              f2Bit0: this.tabItemData[0].form1.f2Bit0,
              f2Bit1: this.tabItemData[0].form1.f2Bit1,
              f2Bit2: this.tabItemData[0].form1.f2Bit2,
              f2Bit3: this.tabItemData[0].form1.f2Bit3,
              f3: "F3频段",
              f3Bit0: this.tabItemData[0].form1.f3Bit0,
              f3Bit1: this.tabItemData[0].form1.f3Bit1,
              f3Bit2: this.tabItemData[0].form1.f3Bit2,
              f3Bit3: this.tabItemData[0].form1.f3Bit3,
            });
          }
          break;
        case 1:
          if (this.tabItemData[1].grType == "压制干扰") {
            mastetData.push({
              grType: this.tabItemData[1].grType,
              id: 1,
              f1: "F1频段",
              tabs: this.tabItemData[1].name,
              zai: this.zai,
              frequency1: this.tabItemData[1].form.frequency1,
              pattern1: this.tabItemData[1].form.pattern1,
              power1: this.tabItemData[1].form.power1,
              InterfereTime: this.tabItemData[1].form.InterfereTime, //时间或者位置
              standard1: this.tabItemData[1].form.standard1, //点频干扰
              dpgrZbpl1: this.tabItemData[1].form.dpgrZbpl1, //点频干扰(载波频1)
              tpgrZbpl1: this.tabItemData[1].form.tpgrZbpl1, //调频干扰(载波频1)
              tpgrTzpl1: this.tabItemData[1].form.tpgrTzpl1, //调频干扰(调制频1)
              tpgrZbpp1: this.tabItemData[1].form.tpgrZbpp1, //调频干扰(调制频偏)
              spgrQspl1: this.tabItemData[1].form.spgrQspl1, //扫频干扰(起始频1)
              spgrZzpl1: this.tabItemData[1].form.spgrZzpl1, //扫频干扰(终止频1)
              spgrSpds1: this.tabItemData[1].form.spgrSpds1, //扫频干扰(扫频点数)
              spgrPdzlsj1: this.tabItemData[1].form.spgrPdzlsj1, //扫频干扰(频点驻留时间)
              bzsgrZxpl1: this.tabItemData[1].form.bzsgrZxpl1, //白噪声干扰(中心频1)
              bzsgrDk1: this.tabItemData[1].form.bzsgrDk1, //白噪声干扰(带宽)
              bzsgrLbqxs1: this.tabItemData[1].form.bzsgrLbqxs1, //白噪声干扰(滤波器)
              bzsgrLbqaz1: this.tabItemData[1].form.bzsgrLbqaz1, //白噪声干扰(滤波器a值)
              txgrZbpl1: this.tabItemData[1].form.txgrZbpl1, //调相干扰(载波频1)
              txgrTxxs: this.tabItemData[1].form.txgrTxxs, //调相干扰
              txgrFhsl1: this.tabItemData[1].form.txgrFhsl1, //调相干扰(符号速率)
              txgrPNm1: this.tabItemData[1].form.txgrPNm1, //调相干扰
              txgrLbqxs1: this.tabItemData[1].form.txgrLbqxs1, //调相干扰
              txgrLbqaz1: this.tabItemData[1].form.txgrLbqaz1, //调相干扰(滤波器a值)
              mcgrMckd1: this.tabItemData[1].form.mcgrMckd1, //脉冲干扰(脉冲宽度)
              mcgrZq1: this.tabItemData[1].form.mcgrZq1, //脉冲干扰(周期)
              //F2频段
              tabs1: this.tabItemData[1].name,
              f2: "F2频段",
              zai1: "在",
              frequency2: this.tabItemData[1].form.frequency2, //
              pattern2: this.tabItemData[1].form.pattern2,
              power2: this.tabItemData[1].form.power2,
              dpgrZbpl2: this.tabItemData[1].form.dpgrZbpl2, //点频干扰
              tpgrZbpl2: this.tabItemData[1].form.tpgrZbpl2, //调频干扰
              tpgrTzpl2: this.tabItemData[1].form.tpgrTzpl2, //调频干扰
              tpgrZbpp2: this.tabItemData[1].form.tpgrZbpp2, //调频干扰
              spgrQspl2: this.tabItemData[1].form.spgrQspl2, //扫频干扰
              spgrZzpl2: this.tabItemData[1].form.spgrZzpl2, //扫频干扰
              spgrSpds2: this.tabItemData[1].form.spgrSpds2, //扫频干扰
              spgrPdzlsj2: this.tabItemData[1].form.spgrPdzlsj2, //扫频干扰
              bzsgrZxpl2: this.tabItemData[1].form.bzsgrZxpl2, //白噪声干扰
              bzsgrDk2: this.tabItemData[1].form.bzsgrDk2, //白噪声干扰
              bzsgrLbqxs2: this.tabItemData[1].form.bzsgrLbqxs2, //白噪声干扰
              bzsgrLbqaz2: this.tabItemData[1].form.bzsgrLbqaz2, //白噪声干扰
              txgrZbpl2: this.tabItemData[1].form.txgrZbpl2, //调相干扰
              txgrTxxs2: this.tabItemData[1].form.txgrTxxs2, //调相干扰
              txgrFhsl2: this.tabItemData[1].form.txgrFhsl2, //调相干扰
              txgrPNm2: this.tabItemData[1].form.txgrPNm2, //调相干扰
              txgrLbqxs2: this.tabItemData[1].form.txgrLbqxs2, //调相干扰
              txgrLbqaz2: this.tabItemData[1].form.txgrLbqaz2, //调相干扰
              mcgrMckd2: this.tabItemData[1].form.mcgrMckd2, //脉冲干扰
              mcgrZq2: this.tabItemData[1].form.mcgrZq2, //脉冲干扰
              //F3频段
              tabs2: this.tabItemData[1].name,
              f3: "F3频段",
              zai2: "在",
              frequency3: this.tabItemData[1].form.frequency3, //
              pattern3: this.tabItemData[1].form.pattern3,
              power3: this.tabItemData[1].form.power3,
              dpgrZbpl3: this.tabItemData[1].form.dpgrZbpl3, //点频干扰
              tpgrZbpl3: this.tabItemData[1].form.tpgrZbpl3, //调频干扰
              tpgrTzpl3: this.tabItemData[1].form.tpgrTzpl3, //调频干扰
              tpgrZbpp3: this.tabItemData[1].form.tpgrZbpp3, //调频干扰
              spgrQspl3: this.tabItemData[1].form.spgrQspl3, //扫频干扰
              spgrZzpl3: this.tabItemData[1].form.spgrZzpl3, //扫频干扰
              spgrSpds3: this.tabItemData[1].form.spgrSpds3, //扫频干扰
              spgrPdzlsj3: this.tabItemData[1].form.spgrPdzlsj3, //扫频干扰
              bzsgrZxpl3: this.tabItemData[1].form.bzsgrZxpl3, //白噪声干扰
              bzsgrDk3: this.tabItemData[1].form.bzsgrDk3, //白噪声干扰
              bzsgrLbqxs3: this.tabItemData[1].form.bzsgrLbqxs3, //白噪声干扰
              bzsgrLbqaz3: this.tabItemData[1].form.bzsgrLbqaz3, //白噪声干扰
              txgrZbpl3: this.tabItemData[1].form.txgrZbpl3, //调相干扰
              txgrTxxs3: this.tabItemData[1].form.txgrTxxs3, //调相干扰
              txgrFhsl3: this.tabItemData[1].form.txgrFhsl3, //调相干扰
              txgrPNm3: this.tabItemData[1].form.txgrPNm3, //调相干扰
              txgrLbqxs3: this.tabItemData[1].form.txgrLbqxs3, //调相干扰
              txgrLbqaz3: this.tabItemData[1].form.txgrLbqaz3, //调相干扰
              mcgrMckd3: this.tabItemData[1].form.mcgrMckd3, //脉冲干扰
              mcgrZq3: this.tabItemData[1].form.mcgrZq3, //脉冲干扰
            });
          } else {
            mastetData.push({
              grType: this.tabItemData[1].grType,
              id: 0,
              f1: "F1频段",
              tab: this.tabItemData[1].name,
              zai: "在",
              f1Bit0: this.tabItemData[1].form1.f1Bit0,
              f1Bit1: this.tabItemData[1].form1.f1Bit1,
              f1Bit2: this.tabItemData[1].form1.f1Bit2,
              f1Bit3: this.tabItemData[1].form1.f1Bit3,
              f2: "F2频段",
              f2Bit0: this.tabItemData[1].form1.f2Bit0,
              f2Bit1: this.tabItemData[1].form1.f2Bit1,
              f2Bit2: this.tabItemData[1].form1.f2Bit2,
              f2Bit3: this.tabItemData[1].form1.f2Bit3,
              f3: "F3频段",
              f3Bit0: this.tabItemData[1].form1.f3Bit0,
              f3Bit1: this.tabItemData[1].form1.f3Bit1,
              f3Bit2: this.tabItemData[1].form1.f3Bit2,
              f3Bit3: this.tabItemData[1].form1.f3Bit3,
            });
          }

          break;
        case 2:
          if (this.tabItemData[2].grType == "压制干扰") {
            mastetData.push({
              grType: this.tabItemData[2].grType,
              id: 0,
              f1: "F1频段",
              tabs: this.tabItemData[2].name,
              zai: this.zai,
              frequency1: this.tabItemData[2].form.frequency1,
              pattern1: this.tabItemData[2].form.pattern1,
              power1: this.tabItemData[2].form.power1,
              InterfereTime: this.tabItemData[2].form.InterfereTime, //时间或者位置
              standard1: this.tabItemData[2].form.standard1, //点频干扰
              dpgrZbpl1: this.tabItemData[2].form.dpgrZbpl1, //点频干扰(载波频1)
              tpgrZbpl1: this.tabItemData[2].form.tpgrZbpl1, //调频干扰(载波频1)
              tpgrTzpl1: this.tabItemData[2].form.tpgrTzpl1, //调频干扰(调制频1)
              tpgrZbpp1: this.tabItemData[2].form.tpgrZbpp1, //调频干扰(调制频偏)
              spgrQspl1: this.tabItemData[2].form.spgrQspl1, //扫频干扰(起始频1)
              spgrZzpl1: this.tabItemData[2].form.spgrZzpl1, //扫频干扰(终止频1)
              spgrSpds1: this.tabItemData[2].form.spgrSpds1, //扫频干扰(扫频点数)
              spgrPdzlsj1: this.tabItemData[2].form.spgrPdzlsj1, //扫频干扰(频点驻留时间)
              bzsgrZxpl1: this.tabItemData[2].form.bzsgrZxpl1, //白噪声干扰(中心频1)
              bzsgrDk1: this.tabItemData[2].form.bzsgrDk1, //白噪声干扰(带宽)
              bzsgrLbqxs1: this.tabItemData[2].form.bzsgrLbqxs1, //白噪声干扰(滤波器)
              bzsgrLbqaz1: this.tabItemData[2].form.bzsgrLbqaz1, //白噪声干扰(滤波器a值)
              txgrZbpl1: this.tabItemData[2].form.txgrZbpl1, //调相干扰(载波频1)
              txgrTxxs: this.tabItemData[2].form.txgrTxxs, //调相干扰
              txgrFhsl1: this.tabItemData[2].form.txgrFhsl1, //调相干扰(符号速率)
              txgrPNm1: this.tabItemData[2].form.txgrPNm1, //调相干扰
              txgrLbqxs1: this.tabItemData[2].form.txgrLbqxs1, //调相干扰
              txgrLbqaz1: this.tabItemData[2].form.txgrLbqaz1, //调相干扰(滤波器a值)
              mcgrMckd1: this.tabItemData[2].form.mcgrMckd1, //脉冲干扰(脉冲宽度)
              mcgrZq1: this.tabItemData[2].form.mcgrZq1, //脉冲干扰(周期)
              //F2频段
              tabs1: this.tabItemData[2].name,
              f2: "F2频段",
              zai1: "在",
              frequency2: this.tabItemData[2].form.frequency2, //
              pattern2: this.tabItemData[2].form.pattern2,
              power2: this.tabItemData[2].form.power2,
              dpgrZbpl2: this.tabItemData[2].form.dpgrZbpl2, //点频干扰
              tpgrZbpl2: this.tabItemData[2].form.tpgrZbpl2, //调频干扰
              tpgrTzpl2: this.tabItemData[2].form.tpgrTzpl2, //调频干扰
              tpgrZbpp2: this.tabItemData[2].form.tpgrZbpp2, //调频干扰
              spgrQspl2: this.tabItemData[2].form.spgrQspl2, //扫频干扰
              spgrZzpl2: this.tabItemData[2].form.spgrZzpl2, //扫频干扰
              spgrSpds2: this.tabItemData[2].form.spgrSpds2, //扫频干扰
              spgrPdzlsj2: this.tabItemData[2].form.spgrPdzlsj2, //扫频干扰
              bzsgrZxpl2: this.tabItemData[2].form.bzsgrZxpl2, //白噪声干扰
              bzsgrDk2: this.tabItemData[2].form.bzsgrDk2, //白噪声干扰
              bzsgrLbqxs2: this.tabItemData[2].form.bzsgrLbqxs2, //白噪声干扰
              bzsgrLbqaz2: this.tabItemData[2].form.bzsgrLbqaz2, //白噪声干扰
              txgrZbpl2: this.tabItemData[2].form.txgrZbpl2, //调相干扰
              txgrTxxs2: this.tabItemData[2].form.txgrTxxs2, //调相干扰
              txgrFhsl2: this.tabItemData[2].form.txgrFhsl2, //调相干扰
              txgrPNm2: this.tabItemData[2].form.txgrPNm2, //调相干扰
              txgrLbqxs2: this.tabItemData[2].form.txgrLbqxs2, //调相干扰
              txgrLbqaz2: this.tabItemData[2].form.txgrLbqaz2, //调相干扰
              mcgrMckd2: this.tabItemData[2].form.mcgrMckd2, //脉冲干扰
              mcgrZq2: this.tabItemData[2].form.mcgrZq2, //脉冲干扰
              //F3频段
              tabs2: this.tabItemData[2].name,
              f3: "F3频段",
              zai2: "在",
              frequency3: this.tabItemData[2].form.frequency3, //
              pattern3: this.tabItemData[2].form.pattern3,
              power3: this.tabItemData[2].form.power3,
              dpgrZbpl3: this.tabItemData[2].form.dpgrZbpl3, //点频干扰
              tpgrZbpl3: this.tabItemData[2].form.tpgrZbpl3, //调频干扰
              tpgrTzpl3: this.tabItemData[2].form.tpgrTzpl3, //调频干扰
              tpgrZbpp3: this.tabItemData[2].form.tpgrZbpp3, //调频干扰
              spgrQspl3: this.tabItemData[2].form.spgrQspl3, //扫频干扰
              spgrZzpl3: this.tabItemData[2].form.spgrZzpl3, //扫频干扰
              spgrSpds3: this.tabItemData[2].form.spgrSpds3, //扫频干扰
              spgrPdzlsj3: this.tabItemData[2].form.spgrPdzlsj3, //扫频干扰
              bzsgrZxpl3: this.tabItemData[2].form.bzsgrZxpl3, //白噪声干扰
              bzsgrDk3: this.tabItemData[2].form.bzsgrDk3, //白噪声干扰
              bzsgrLbqxs3: this.tabItemData[2].form.bzsgrLbqxs3, //白噪声干扰
              bzsgrLbqaz3: this.tabItemData[2].form.bzsgrLbqaz3, //白噪声干扰
              txgrZbpl3: this.tabItemData[2].form.txgrZbpl3, //调相干扰
              txgrTxxs3: this.tabItemData[2].form.txgrTxxs3, //调相干扰
              txgrFhsl3: this.tabItemData[2].form.txgrFhsl3, //调相干扰
              txgrPNm3: this.tabItemData[2].form.txgrPNm3, //调相干扰
              txgrLbqxs3: this.tabItemData[2].form.txgrLbqxs3, //调相干扰
              txgrLbqaz3: this.tabItemData[2].form.txgrLbqaz3, //调相干扰
              mcgrMckd3: this.tabItemData[2].form.mcgrMckd3, //脉冲干扰
              mcgrZq3: this.tabItemData[2].form.mcgrZq3, //脉冲干扰
            });
          } else {
            mastetData.push({
              grType: this.tabItemData[2].grType,
              id: 0,
              f1: "F1频段",
              tab: this.tabItemData[2].name,
              zai: "在",
              f1Bit0: this.tabItemData[2].form1.f1Bit0,
              f1Bit1: this.tabItemData[2].form1.f1Bit1,
              f1Bit2: this.tabItemData[2].form1.f1Bit2,
              f1Bit3: this.tabItemData[2].form1.f1Bit3,
              f2: "F2频段",
              f2Bit0: this.tabItemData[2].form1.f2Bit0,
              f2Bit1: this.tabItemData[2].form1.f2Bit1,
              f2Bit2: this.tabItemData[2].form1.f2Bit2,
              f2Bit3: this.tabItemData[2].form1.f2Bit3,
              f3: "F3频段",
              f3Bit0: this.tabItemData[2].form1.f3Bit0,
              f3Bit1: this.tabItemData[2].form1.f3Bit1,
              f3Bit2: this.tabItemData[2].form1.f3Bit2,
              f3Bit3: this.tabItemData[2].form1.f3Bit3,
            });
          }
          break;
        case 3:
          if (this.tabItemData[3].grType == "压制干扰") {
            mastetData.push({
              grType: this.tabItemData[3].grType,
              id: 0,
              f1: "F1频段",
              tabs: this.tabItemData[3].name,
              zai: this.zai,
              frequency1: this.tabItemData[3].form.frequency1,
              pattern1: this.tabItemData[3].form.pattern1,
              power1: this.tabItemData[3].form.power1,
              InterfereTime: this.tabItemData[3].form.InterfereTime, //时间或者位置
              standard1: this.tabItemData[3].form.standard1, //点频干扰
              dpgrZbpl1: this.tabItemData[3].form.dpgrZbpl1, //点频干扰(载波频1)
              tpgrZbpl1: this.tabItemData[3].form.tpgrZbpl1, //调频干扰(载波频1)
              tpgrTzpl1: this.tabItemData[3].form.tpgrTzpl1, //调频干扰(调制频1)
              tpgrZbpp1: this.tabItemData[3].form.tpgrZbpp1, //调频干扰(调制频偏)
              spgrQspl1: this.tabItemData[3].form.spgrQspl1, //扫频干扰(起始频1)
              spgrZzpl1: this.tabItemData[3].form.spgrZzpl1, //扫频干扰(终止频1)
              spgrSpds1: this.tabItemData[3].form.spgrSpds1, //扫频干扰(扫频点数)
              spgrPdzlsj1: this.tabItemData[3].form.spgrPdzlsj1, //扫频干扰(频点驻留时间)
              bzsgrZxpl1: this.tabItemData[3].form.bzsgrZxpl1, //白噪声干扰(中心频1)
              bzsgrDk1: this.tabItemData[3].form.bzsgrDk1, //白噪声干扰(带宽)
              bzsgrLbqxs1: this.tabItemData[3].form.bzsgrLbqxs1, //白噪声干扰(滤波器)
              bzsgrLbqaz1: this.tabItemData[3].form.bzsgrLbqaz1, //白噪声干扰(滤波器a值)
              txgrZbpl1: this.tabItemData[3].form.txgrZbpl1, //调相干扰(载波频1)
              txgrTxxs: this.tabItemData[3].form.txgrTxxs, //调相干扰
              txgrFhsl1: this.tabItemData[3].form.txgrFhsl1, //调相干扰(符号速率)
              txgrPNm1: this.tabItemData[3].form.txgrPNm1, //调相干扰
              txgrLbqxs1: this.tabItemData[3].form.txgrLbqxs1, //调相干扰
              txgrLbqaz1: this.tabItemData[3].form.txgrLbqaz1, //调相干扰(滤波器a值)
              mcgrMckd1: this.tabItemData[3].form.mcgrMckd1, //脉冲干扰(脉冲宽度)
              mcgrZq1: this.tabItemData[3].form.mcgrZq1, //脉冲干扰(周期)
              //F2频段
              tabs1: this.tabItemData[3].name,
              f2: "F2频段",
              zai1: "在",
              frequency2: this.tabItemData[3].form.frequency2, //
              pattern2: this.tabItemData[3].form.pattern2,
              power2: this.tabItemData[3].form.power2,
              dpgrZbpl2: this.tabItemData[3].form.dpgrZbpl2, //点频干扰
              tpgrZbpl2: this.tabItemData[3].form.tpgrZbpl2, //调频干扰
              tpgrTzpl2: this.tabItemData[3].form.tpgrTzpl2, //调频干扰
              tpgrZbpp2: this.tabItemData[3].form.tpgrZbpp2, //调频干扰
              spgrQspl2: this.tabItemData[3].form.spgrQspl2, //扫频干扰
              spgrZzpl2: this.tabItemData[3].form.spgrZzpl2, //扫频干扰
              spgrSpds2: this.tabItemData[3].form.spgrSpds2, //扫频干扰
              spgrPdzlsj2: this.tabItemData[3].form.spgrPdzlsj2, //扫频干扰
              bzsgrZxpl2: this.tabItemData[3].form.bzsgrZxpl2, //白噪声干扰
              bzsgrDk2: this.tabItemData[3].form.bzsgrDk2, //白噪声干扰
              bzsgrLbqxs2: this.tabItemData[3].form.bzsgrLbqxs2, //白噪声干扰
              bzsgrLbqaz2: this.tabItemData[3].form.bzsgrLbqaz2, //白噪声干扰
              txgrZbpl2: this.tabItemData[3].form.txgrZbpl2, //调相干扰
              txgrTxxs2: this.tabItemData[3].form.txgrTxxs2, //调相干扰
              txgrFhsl2: this.tabItemData[3].form.txgrFhsl2, //调相干扰
              txgrPNm2: this.tabItemData[3].form.txgrPNm2, //调相干扰
              txgrLbqxs2: this.tabItemData[3].form.txgrLbqxs2, //调相干扰
              txgrLbqaz2: this.tabItemData[3].form.txgrLbqaz2, //调相干扰
              mcgrMckd2: this.tabItemData[3].form.mcgrMckd2, //脉冲干扰
              mcgrZq2: this.tabItemData[3].form.mcgrZq2, //脉冲干扰
              //F3频段
              tabs2: this.tabItemData[3].name,
              f3: "F3频段",
              zai2: "在",
              frequency3: this.tabItemData[3].form.frequency3, //
              pattern3: this.tabItemData[3].form.pattern3,
              power3: this.tabItemData[3].form.power3,
              dpgrZbpl3: this.tabItemData[3].form.dpgrZbpl3, //点频干扰
              tpgrZbpl3: this.tabItemData[3].form.tpgrZbpl3, //调频干扰
              tpgrTzpl3: this.tabItemData[3].form.tpgrTzpl3, //调频干扰
              tpgrZbpp3: this.tabItemData[3].form.tpgrZbpp3, //调频干扰
              spgrQspl3: this.tabItemData[3].form.spgrQspl3, //扫频干扰
              spgrZzpl3: this.tabItemData[3].form.spgrZzpl3, //扫频干扰
              spgrSpds3: this.tabItemData[3].form.spgrSpds3, //扫频干扰
              spgrPdzlsj3: this.tabItemData[3].form.spgrPdzlsj3, //扫频干扰
              bzsgrZxpl3: this.tabItemData[3].form.bzsgrZxpl3, //白噪声干扰
              bzsgrDk3: this.tabItemData[3].form.bzsgrDk3, //白噪声干扰
              bzsgrLbqxs3: this.tabItemData[3].form.bzsgrLbqxs3, //白噪声干扰
              bzsgrLbqaz3: this.tabItemData[3].form.bzsgrLbqaz3, //白噪声干扰
              txgrZbpl3: this.tabItemData[3].form.txgrZbpl3, //调相干扰
              txgrTxxs3: this.tabItemData[3].form.txgrTxxs3, //调相干扰
              txgrFhsl3: this.tabItemData[3].form.txgrFhsl3, //调相干扰
              txgrPNm3: this.tabItemData[3].form.txgrPNm3, //调相干扰
              txgrLbqxs3: this.tabItemData[3].form.txgrLbqxs3, //调相干扰
              txgrLbqaz3: this.tabItemData[3].form.txgrLbqaz3, //调相干扰
              mcgrMckd3: this.tabItemData[3].form.mcgrMckd3, //脉冲干扰
              mcgrZq3: this.tabItemData[3].form.mcgrZq3, //脉冲干扰
            });
          } else {
            mastetData.push({
              grType: this.tabItemData[3].grType,
              id: 0,
              f1: "F1频段",
              tab: this.tabItemData[3].name,
              zai: "在",
              f1Bit0: this.tabItemData[3].form1.f1Bit0,
              f1Bit1: this.tabItemData[3].form1.f1Bit1,
              f1Bit2: this.tabItemData[3].form1.f1Bit2,
              f1Bit3: this.tabItemData[3].form1.f1Bit3,
              f2: "F2频段",
              f2Bit0: this.tabItemData[3].form1.f2Bit0,
              f2Bit1: this.tabItemData[3].form1.f2Bit1,
              f2Bit2: this.tabItemData[3].form1.f2Bit2,
              f2Bit3: this.tabItemData[3].form1.f2Bit3,
              f3: "F3频段",
              f3Bit0: this.tabItemData[3].form1.f3Bit0,
              f3Bit1: this.tabItemData[3].form1.f3Bit1,
              f3Bit2: this.tabItemData[3].form1.f3Bit2,
              f3Bit3: this.tabItemData[3].form1.f3Bit3,
            });
          }
          break;
      }
      // const mastetData = [...this.masterStation];
      // console.log(this.form1,"form");
      return mastetData;
    },
    // 修改
    changeData() {
      const i = this.current;
      switch (this.tabItemIndex) {
        case 0:
          if (this.tabItemData[0].grType == "压制干扰") {
            (this.masterStation[i].grType = "压制干扰"),
              (this.masterStation[i].id = 0),
              (this.masterStation[i].f1 = "F1频段"),
              (this.masterStation[i].tabs = this.tabItemData[0].name),
              (this.masterStation[i].zai = this.zai),
              (this.masterStation[i].frequency1 =
                this.tabItemData[0].form.frequency1),
              (this.masterStation[i].pattern1 =
                this.tabItemData[0].form.pattern1),
              (this.masterStation[i].power1 = this.tabItemData[0].form.power1),
              (this.masterStation[i].InterfereTime =
                this.tabItemData[0].InterfereTime), //时间或者位置
              (this.masterStation[i].standard1 =
                this.tabItemData[0].form.standard1), //点频干扰
              (this.masterStation[i].dpgrZbpl1 =
                this.tabItemData[0].form.dpgrZbpl1), //点频干扰(载波频1)
              (this.masterStation[i].tpgrZbpl1 =
                this.tabItemData[0].form.tpgrZbpl1), //调频干扰(载波频1)
              (this.masterStation[i].tpgrTzpl1 =
                this.tabItemData[0].form.tpgrTzpl1), //调频干扰(调制频1)
              (this.masterStation[i].tpgrZbpp1 =
                this.tabItemData[0].form.tpgrZbpp1), //调频干扰(调制频偏)
              (this.masterStation[i].spgrQspl1 =
                this.tabItemData[0].form.spgrQspl1), //扫频干扰(起始频1)
              (this.masterStation[i].spgrZzpl1 =
                this.tabItemData[0].form.spgrZzpl1), //扫频干扰(终止频1)
              (this.masterStation[i].spgrSpds1 =
                this.tabItemData[0].form.spgrSpds1), //扫频干扰(扫频点数)
              (this.masterStation[i].spgrPdzlsj1 =
                this.tabItemData[0].form.spgrPdzlsj1), //扫频干扰(频点驻留时间)
              (this.masterStation[i].bzsgrZxpl1 =
                this.tabItemData[0].form.bzsgrZxpl1), //白噪声干扰(中心频1)
              (this.masterStation[i].bzsgrDk1 =
                this.tabItemData[0].form.bzsgrDk1), //白噪声干扰(带宽)
              (this.masterStation[i].bzsgrLbqxs1 =
                this.tabItemData[0].form.bzsgrLbqxs1), //白噪声干扰(滤波器)
              (this.masterStation[i].bzsgrLbqaz1 =
                this.tabItemData[0].form.bzsgrLbqaz1), //白噪声干扰(滤波器a值)
              (this.masterStation[i].txgrZbpl1 =
                this.tabItemData[0].form.txgrZbpl1), //调相干扰(载波频1)
              (this.masterStation[i].txgrTxxs =
                this.tabItemData[0].form.txgrTxxs), //调相干扰
              (this.masterStation[i].txgrFhsl1 =
                this.tabItemData[0].form.txgrFhsl1), //调相干扰(符号速率)
              (this.masterStation[i].txgrPNm1 =
                this.tabItemData[0].form.txgrPNm1), //调相干扰
              (this.masterStation[i].txgrLbqxs1 =
                this.tabItemData[0].form.txgrLbqxs1), //调相干扰
              (this.masterStation[i].txgrLbqaz1 =
                this.tabItemData[0].form.txgrLbqaz1), //调相干扰(滤波器a值)
              (this.masterStation[i].mcgrMckd1 =
                this.tabItemData[0].form.mcgrMckd1), //脉冲干扰(脉冲宽度)
              (this.masterStation[i].mcgrZq1 =
                this.tabItemData[0].form.mcgrZq1), //脉冲干扰(周期)
              //F2频段
              (this.masterStation[i].tabs1 = this.tabItemData[0].name),
              (this.masterStation[i].f2 = "F2频段"),
              (this.masterStation[i].zai1 = "在"),
              (this.masterStation[i].frequency2 =
                this.tabItemData[0].form.frequency2), //
              (this.masterStation[i].pattern2 =
                this.tabItemData[0].form.pattern2),
              (this.masterStation[i].power2 = this.tabItemData[0].form.power2),
              (this.masterStation[i].dpgrZbpl2 =
                this.tabItemData[0].form.dpgrZbpl2), //点频干扰
              (this.masterStation[i].tpgrZbpl2 =
                this.tabItemData[0].form.tpgrZbpl2), //调频干扰
              (this.masterStation[i].tpgrTzpl2 =
                this.tabItemData[0].form.tpgrTzpl2), //调频干扰
              (this.masterStation[i].tpgrZbpp2 =
                this.tabItemData[0].form.tpgrZbpp2), //调频干扰
              (this.masterStation[i].spgrQspl2 =
                this.tabItemData[0].form.spgrQspl2), //扫频干扰
              (this.masterStation[i].spgrZzpl2 =
                this.tabItemData[0].form.spgrZzpl2), //扫频干扰
              (this.masterStation[i].spgrSpds2 =
                this.tabItemData[0].form.spgrSpds2), //扫频干扰
              (this.masterStation[i].spgrPdzlsj2 =
                this.tabItemData[0].form.spgrPdzlsj2), //扫频干扰
              (this.masterStation[i].bzsgrZxpl2 =
                this.tabItemData[0].form.bzsgrZxpl2), //白噪声干扰
              (this.masterStation[i].bzsgrDk2 =
                this.tabItemData[0].form.bzsgrDk2), //白噪声干扰
              (this.masterStation[i].bzsgrLbqxs2 =
                this.tabItemData[0].form.bzsgrLbqxs2), //白噪声干扰
              (this.masterStation[i].bzsgrLbqaz2 =
                this.tabItemData[0].form.bzsgrLbqaz2), //白噪声干扰
              (this.masterStation[i].txgrZbpl2 =
                this.tabItemData[0].form.txgrZbpl2), //调相干扰
              (this.masterStation[i].txgrTxxs2 =
                this.tabItemData[0].form.txgrTxxs2), //调相干扰
              (this.masterStation[i].txgrFhsl2 =
                this.tabItemData[0].form.txgrFhsl2), //调相干扰
              (this.masterStation[i].txgrPNm2 =
                this.tabItemData[0].form.txgrPNm2), //调相干扰
              (this.masterStation[i].txgrLbqxs2 =
                this.tabItemData[0].form.txgrLbqxs2), //调相干扰
              (this.masterStation[i].txgrLbqaz2 =
                this.tabItemData[0].form.txgrLbqaz2), //调相干扰
              (this.masterStation[i].mcgrMckd2 =
                this.tabItemData[0].form.mcgrMckd2), //脉冲干扰
              (this.masterStation[i].mcgrZq2 =
                this.tabItemData[0].form.mcgrZq2), //脉冲干扰
              //F3频段
              (this.masterStation[i].tabs2 = this.tabItemData[0].name),
              (this.masterStation[i].f3 = "F3频段"),
              (this.masterStation[i].zai2 = "在"),
              (this.masterStation[i].frequency3 =
                this.tabItemData[0].form.frequency3), //
              (this.masterStation[i].pattern3 =
                this.tabItemData[0].form.pattern3),
              (this.masterStation[i].power3 = this.tabItemData[0].form.power3),
              (this.masterStation[i].dpgrZbpl3 =
                this.tabItemData[0].form.dpgrZbpl3), //点频干扰
              (this.masterStation[i].tpgrZbpl3 =
                this.tabItemData[0].form.tpgrZbpl3), //调频干扰
              (this.masterStation[i].tpgrTzpl3 =
                this.tabItemData[0].form.tpgrTzpl3), //调频干扰
              (this.masterStation[i].tpgrZbpp3 =
                this.tabItemData[0].form.tpgrZbpp3), //调频干扰
              (this.masterStation[i].spgrQspl3 =
                this.tabItemData[0].form.spgrQspl3), //扫频干扰
              (this.masterStation[i].spgrZzpl3 =
                this.tabItemData[0].form.spgrZzpl3), //扫频干扰
              (this.masterStation[i].spgrSpds3 =
                this.tabItemData[0].form.spgrSpds3), //扫频干扰
              (this.masterStation[i].spgrPdzlsj3 =
                this.tabItemData[0].form.spgrPdzlsj3), //扫频干扰
              (this.masterStation[i].bzsgrZxpl3 =
                this.tabItemData[0].form.bzsgrZxpl3), //白噪声干扰
              (this.masterStation[i].bzsgrDk3 =
                this.tabItemData[0].form.bzsgrDk3), //白噪声干扰
              (this.masterStation[i].bzsgrLbqxs3 =
                this.tabItemData[0].form.bzsgrLbqxs3), //白噪声干扰
              (this.masterStation[i].bzsgrLbqaz3 =
                this.tabItemData[0].form.bzsgrLbqaz3), //白噪声干扰
              (this.masterStation[i].txgrZbpl3 =
                this.tabItemData[0].form.txgrZbpl3), //调相干扰
              (this.masterStation[i].txgrTxxs3 =
                this.tabItemData[0].form.txgrTxxs3), //调相干扰
              (this.masterStation[i].txgrFhsl3 =
                this.tabItemData[0].form.txgrFhsl3), //调相干扰
              (this.masterStation[i].txgrPNm3 =
                this.tabItemData[0].form.txgrPNm3), //调相干扰
              (this.masterStation[i].txgrLbqxs3 =
                this.tabItemData[0].form.txgrLbqxs3), //调相干扰
              (this.masterStation[i].txgrLbqaz3 =
                this.tabItemData[0].form.txgrLbqaz3), //调相干扰
              (this.masterStation[i].mcgrMckd3 =
                this.tabItemData[0].form.mcgrMckd3), //脉冲干扰
              (this.masterStation[i].mcgrZq3 =
                this.tabItemData[0].form.mcgrZq3); //脉冲干扰
          } else {
            (this.masterStation[i].grType = "欺骗干扰"),
              (this.masterStation[i].id = 0),
              (this.masterStation[i].f1 = "F1频段"),
              (this.masterStation[i].tab = this.tabItemData[0].name),
              (this.masterStation[i].zai = "在"),
              (this.masterStation[i].f1Bit0 = this.tabItemData[0].form1.f1Bit0),
              (this.masterStation[i].f1Bit1 = this.tabItemData[0].form1.f1Bit1),
              (this.masterStation[i].f1Bit2 = this.tabItemData[0].form1.f1Bit2),
              (this.masterStation[i].f1Bit3 = this.tabItemData[0].form1.f1Bit3),
              (this.masterStation[i].f2 = "F2频段"),
              (this.masterStation[i].f2Bit0 = this.tabItemData[0].form1.f2Bit0),
              (this.masterStation[i].f2Bit1 = this.tabItemData[0].form1.f2Bit1),
              (this.masterStation[i].f2Bit2 = this.tabItemData[0].form1.f2Bit2),
              (this.masterStation[i].f2Bit3 = this.tabItemData[0].form1.f2Bit3),
              (this.masterStation[i].f3 = "F3频段"),
              (this.masterStation[i].f3Bit0 = this.tabItemData[0].form1.f3Bit0),
              (this.masterStation[i].f3Bit1 = this.tabItemData[0].form1.f3Bit1),
              (this.masterStation[i].f3Bit2 = this.tabItemData[0].form1.f3Bit2),
              (this.masterStation[i].f3Bit3 = this.tabItemData[0].form1.f3Bit3);
          }

          break;
        case 1:
          if (this.tabItemData[1].grType == "压制干扰") {
            (this.masterStation[i].grType = "压制干扰"),
              (this.masterStation[i].id = 1),
              (this.masterStation[i].f1 = "F1频段"),
              (this.masterStation[i].tabs = this.tabItemData[1].name),
              (this.masterStation[i].zai = this.zai),
              (this.masterStation[i].frequency1 =
                this.tabItemData[1].form.frequency1),
              (this.masterStation[i].pattern1 =
                this.tabItemData[1].form.pattern1),
              (this.masterStation[i].power1 = this.tabItemData[1].form.power1),
              (this.masterStation[i].InterfereTime =
                this.tabItemData[1].InterfereTime), //时间或者位置
              (this.masterStation[i].standard1 =
                this.tabItemData[1].form.standard1), //点频干扰
              (this.masterStation[i].dpgrZbpl1 =
                this.tabItemData[1].form.dpgrZbpl1), //点频干扰(载波频1)
              (this.masterStation[i].tpgrZbpl1 =
                this.tabItemData[1].form.tpgrZbpl1), //调频干扰(载波频1)
              (this.masterStation[i].tpgrTzpl1 =
                this.tabItemData[1].form.tpgrTzpl1), //调频干扰(调制频1)
              (this.masterStation[i].tpgrZbpp1 =
                this.tabItemData[1].form.tpgrZbpp1), //调频干扰(调制频偏)
              (this.masterStation[i].spgrQspl1 =
                this.tabItemData[1].form.spgrQspl1), //扫频干扰(起始频1)
              (this.masterStation[i].spgrZzpl1 =
                this.tabItemData[1].form.spgrZzpl1), //扫频干扰(终止频1)
              (this.masterStation[i].spgrSpds1 =
                this.tabItemData[1].form.spgrSpds1), //扫频干扰(扫频点数)
              (this.masterStation[i].spgrPdzlsj1 =
                this.tabItemData[1].form.spgrPdzlsj1), //扫频干扰(频点驻留时间)
              (this.masterStation[i].bzsgrZxpl1 =
                this.tabItemData[1].form.bzsgrZxpl1), //白噪声干扰(中心频1)
              (this.masterStation[i].bzsgrDk1 =
                this.tabItemData[1].form.bzsgrDk1), //白噪声干扰(带宽)
              (this.masterStation[i].bzsgrLbqxs1 =
                this.tabItemData[1].form.bzsgrLbqxs1), //白噪声干扰(滤波器)
              (this.masterStation[i].bzsgrLbqaz1 =
                this.tabItemData[1].form.bzsgrLbqaz1), //白噪声干扰(滤波器a值)
              (this.masterStation[i].txgrZbpl1 =
                this.tabItemData[1].form.txgrZbpl1), //调相干扰(载波频1)
              (this.masterStation[i].txgrTxxs =
                this.tabItemData[1].form.txgrTxxs), //调相干扰
              (this.masterStation[i].txgrFhsl1 =
                this.tabItemData[1].form.txgrFhsl1), //调相干扰(符号速率)
              (this.masterStation[i].txgrPNm1 =
                this.tabItemData[1].form.txgrPNm1), //调相干扰
              (this.masterStation[i].txgrLbqxs1 =
                this.tabItemData[1].form.txgrLbqxs1), //调相干扰
              (this.masterStation[i].txgrLbqaz1 =
                this.tabItemData[1].form.txgrLbqaz1), //调相干扰(滤波器a值)
              (this.masterStation[i].mcgrMckd1 =
                this.tabItemData[1].form.mcgrMckd1), //脉冲干扰(脉冲宽度)
              (this.masterStation[i].mcgrZq1 =
                this.tabItemData[1].form.mcgrZq1), //脉冲干扰(周期)
              //F2频段
              (this.masterStation[i].tabs1 = this.tabItemData[1].name),
              (this.masterStation[i].f2 = "F2频段"),
              (this.masterStation[i].zai1 = "在"),
              (this.masterStation[i].frequency2 =
                this.tabItemData[1].form.frequency2), //
              (this.masterStation[i].pattern2 =
                this.tabItemData[1].form.pattern2),
              (this.masterStation[i].power2 = this.tabItemData[1].form.power2),
              (this.masterStation[i].dpgrZbpl2 =
                this.tabItemData[1].form.dpgrZbpl2), //点频干扰
              (this.masterStation[i].tpgrZbpl2 =
                this.tabItemData[1].form.tpgrZbpl2), //调频干扰
              (this.masterStation[i].tpgrTzpl2 =
                this.tabItemData[1].form.tpgrTzpl2), //调频干扰
              (this.masterStation[i].tpgrZbpp2 =
                this.tabItemData[1].form.tpgrZbpp2), //调频干扰
              (this.masterStation[i].spgrQspl2 =
                this.tabItemData[1].form.spgrQspl2), //扫频干扰
              (this.masterStation[i].spgrZzpl2 =
                this.tabItemData[1].form.spgrZzpl2), //扫频干扰
              (this.masterStation[i].spgrSpds2 =
                this.tabItemData[1].form.spgrSpds2), //扫频干扰
              (this.masterStation[i].spgrPdzlsj2 =
                this.tabItemData[1].form.spgrPdzlsj2), //扫频干扰
              (this.masterStation[i].bzsgrZxpl2 =
                this.tabItemData[1].form.bzsgrZxpl2), //白噪声干扰
              (this.masterStation[i].bzsgrDk2 =
                this.tabItemData[1].form.bzsgrDk2), //白噪声干扰
              (this.masterStation[i].bzsgrLbqxs2 =
                this.tabItemData[1].form.bzsgrLbqxs2), //白噪声干扰
              (this.masterStation[i].bzsgrLbqaz2 =
                this.tabItemData[1].form.bzsgrLbqaz2), //白噪声干扰
              (this.masterStation[i].txgrZbpl2 =
                this.tabItemData[1].form.txgrZbpl2), //调相干扰
              (this.masterStation[i].txgrTxxs2 =
                this.tabItemData[1].form.txgrTxxs2), //调相干扰
              (this.masterStation[i].txgrFhsl2 =
                this.tabItemData[1].form.txgrFhsl2), //调相干扰
              (this.masterStation[i].txgrPNm2 =
                this.tabItemData[1].form.txgrPNm2), //调相干扰
              (this.masterStation[i].txgrLbqxs2 =
                this.tabItemData[1].form.txgrLbqxs2), //调相干扰
              (this.masterStation[i].txgrLbqaz2 =
                this.tabItemData[1].form.txgrLbqaz2), //调相干扰
              (this.masterStation[i].mcgrMckd2 =
                this.tabItemData[1].form.mcgrMckd2), //脉冲干扰
              (this.masterStation[i].mcgrZq2 =
                this.tabItemData[1].form.mcgrZq2), //脉冲干扰
              //F3频段
              (this.masterStation[i].tabs2 = this.tabItemData[1].name),
              (this.masterStation[i].f3 = "F3频段"),
              (this.masterStation[i].zai2 = "在"),
              (this.masterStation[i].frequency3 =
                this.tabItemData[1].form.frequency3), //
              (this.masterStation[i].pattern3 =
                this.tabItemData[1].form.pattern3),
              (this.masterStation[i].power3 = this.tabItemData[1].form.power3),
              (this.masterStation[i].dpgrZbpl3 =
                this.tabItemData[1].form.dpgrZbpl3), //点频干扰
              (this.masterStation[i].tpgrZbpl3 =
                this.tabItemData[1].form.tpgrZbpl3), //调频干扰
              (this.masterStation[i].tpgrTzpl3 =
                this.tabItemData[1].form.tpgrTzpl3), //调频干扰
              (this.masterStation[i].tpgrZbpp3 =
                this.tabItemData[1].form.tpgrZbpp3), //调频干扰
              (this.masterStation[i].spgrQspl3 =
                this.tabItemData[1].form.spgrQspl3), //扫频干扰
              (this.masterStation[i].spgrZzpl3 =
                this.tabItemData[1].form.spgrZzpl3), //扫频干扰
              (this.masterStation[i].spgrSpds3 =
                this.tabItemData[1].form.spgrSpds3), //扫频干扰
              (this.masterStation[i].spgrPdzlsj3 =
                this.tabItemData[1].form.spgrPdzlsj3), //扫频干扰
              (this.masterStation[i].bzsgrZxpl3 =
                this.tabItemData[1].form.bzsgrZxpl3), //白噪声干扰
              (this.masterStation[i].bzsgrDk3 =
                this.tabItemData[1].form.bzsgrDk3), //白噪声干扰
              (this.masterStation[i].bzsgrLbqxs3 =
                this.tabItemData[1].form.bzsgrLbqxs3), //白噪声干扰
              (this.masterStation[i].bzsgrLbqaz3 =
                this.tabItemData[1].form.bzsgrLbqaz3), //白噪声干扰
              (this.masterStation[i].txgrZbpl3 =
                this.tabItemData[1].form.txgrZbpl3), //调相干扰
              (this.masterStation[i].txgrTxxs3 =
                this.tabItemData[1].form.txgrTxxs3), //调相干扰
              (this.masterStation[i].txgrFhsl3 =
                this.tabItemData[1].form.txgrFhsl3), //调相干扰
              (this.masterStation[i].txgrPNm3 =
                this.tabItemData[1].form.txgrPNm3), //调相干扰
              (this.masterStation[i].txgrLbqxs3 =
                this.tabItemData[1].form.txgrLbqxs3), //调相干扰
              (this.masterStation[i].txgrLbqaz3 =
                this.tabItemData[1].form.txgrLbqaz3), //调相干扰
              (this.masterStation[i].mcgrMckd3 =
                this.tabItemData[1].form.mcgrMckd3), //脉冲干扰
              (this.masterStation[i].mcgrZq3 =
                this.tabItemData[1].form.mcgrZq3); //脉冲干扰
          } else {
            (this.masterStation[i].grType = "欺骗干扰"),
              (this.masterStation[i].id = 0),
              (this.masterStation[i].f1 = "F1频段"),
              (this.masterStation[i].tab = this.tabItemData[1].name),
              (this.masterStation[i].zai = "在"),
              (this.masterStation[i].f1Bit0 = this.tabItemData[1].form1.f1Bit0),
              (this.masterStation[i].f1Bit1 = this.tabItemData[1].form1.f1Bit1),
              (this.masterStation[i].f1Bit2 = this.tabItemData[1].form1.f1Bit2),
              (this.masterStation[i].f1Bit3 = this.tabItemData[1].form1.f1Bit3),
              (this.masterStation[i].f2 = "F2频段"),
              (this.masterStation[i].f2Bit0 = this.tabItemData[1].form1.f2Bit0),
              (this.masterStation[i].f2Bit1 = this.tabItemData[1].form1.f2Bit1),
              (this.masterStation[i].f2Bit2 = this.tabItemData[1].form1.f2Bit2),
              (this.masterStation[i].f2Bit3 = this.tabItemData[1].form1.f2Bit3),
              (this.masterStation[i].f3 = "F3频段"),
              (this.masterStation[i].f3Bit0 = this.tabItemData[1].form1.f3Bit0),
              (this.masterStation[i].f3Bit1 = this.tabItemData[1].form1.f3Bit1),
              (this.masterStation[i].f3Bit2 = this.tabItemData[1].form1.f3Bit2),
              (this.masterStation[i].f3Bit3 = this.tabItemData[1].form1.f3Bit3);
          }

          break;
        case 2:
          if (this.tabItemData[2].grType == "压制干扰") {
            (this.masterStation[i].grType = "压制干扰"),
              (this.masterStation[i].id = 2),
              (this.masterStation[i].f1 = "F1频段"),
              (this.masterStation[i].tabs = this.tabItemData[2].name),
              (this.masterStation[i].zai = this.zai),
              (this.masterStation[i].frequency1 =
                this.tabItemData[2].form.frequency1),
              (this.masterStation[i].pattern1 =
                this.tabItemData[2].form.pattern1),
              (this.masterStation[i].power1 = this.tabItemData[2].form.power1),
              (this.masterStation[i].InterfereTime =
                this.tabItemData[2].InterfereTime), //时间或者位置
              (this.masterStation[i].standard1 =
                this.tabItemData[2].form.standard1), //点频干扰
              (this.masterStation[i].dpgrZbpl1 =
                this.tabItemData[2].form.dpgrZbpl1), //点频干扰(载波频1)
              (this.masterStation[i].tpgrZbpl1 =
                this.tabItemData[2].form.tpgrZbpl1), //调频干扰(载波频1)
              (this.masterStation[i].tpgrTzpl1 =
                this.tabItemData[2].form.tpgrTzpl1), //调频干扰(调制频1)
              (this.masterStation[i].tpgrZbpp1 =
                this.tabItemData[2].form.tpgrZbpp1), //调频干扰(调制频偏)
              (this.masterStation[i].spgrQspl1 =
                this.tabItemData[2].form.spgrQspl1), //扫频干扰(起始频1)
              (this.masterStation[i].spgrZzpl1 =
                this.tabItemData[2].form.spgrZzpl1), //扫频干扰(终止频1)
              (this.masterStation[i].spgrSpds1 =
                this.tabItemData[2].form.spgrSpds1), //扫频干扰(扫频点数)
              (this.masterStation[i].spgrPdzlsj1 =
                this.tabItemData[2].form.spgrPdzlsj1), //扫频干扰(频点驻留时间)
              (this.masterStation[i].bzsgrZxpl1 =
                this.tabItemData[2].form.bzsgrZxpl1), //白噪声干扰(中心频1)
              (this.masterStation[i].bzsgrDk1 =
                this.tabItemData[2].form.bzsgrDk1), //白噪声干扰(带宽)
              (this.masterStation[i].bzsgrLbqxs1 =
                this.tabItemData[2].form.bzsgrLbqxs1), //白噪声干扰(滤波器)
              (this.masterStation[i].bzsgrLbqaz1 =
                this.tabItemData[2].form.bzsgrLbqaz1), //白噪声干扰(滤波器a值)
              (this.masterStation[i].txgrZbpl1 =
                this.tabItemData[2].form.txgrZbpl1), //调相干扰(载波频1)
              (this.masterStation[i].txgrTxxs =
                this.tabItemData[2].form.txgrTxxs), //调相干扰
              (this.masterStation[i].txgrFhsl1 =
                this.tabItemData[2].form.txgrFhsl1), //调相干扰(符号速率)
              (this.masterStation[i].txgrPNm1 =
                this.tabItemData[2].form.txgrPNm1), //调相干扰
              (this.masterStation[i].txgrLbqxs1 =
                this.tabItemData[2].form.txgrLbqxs1), //调相干扰
              (this.masterStation[i].txgrLbqaz1 =
                this.tabItemData[2].form.txgrLbqaz1), //调相干扰(滤波器a值)
              (this.masterStation[i].mcgrMckd1 =
                this.tabItemData[2].form.mcgrMckd1), //脉冲干扰(脉冲宽度)
              (this.masterStation[i].mcgrZq1 =
                this.tabItemData[2].form.mcgrZq1), //脉冲干扰(周期)
              //F2频段
              (this.masterStation[i].tabs1 = this.tabItemData[2].name),
              (this.masterStation[i].f2 = "F2频段"),
              (this.masterStation[i].zai1 = "在"),
              (this.masterStation[i].frequency2 =
                this.tabItemData[2].form.frequency2), //
              (this.masterStation[i].pattern2 =
                this.tabItemData[2].form.pattern2),
              (this.masterStation[i].power2 = this.tabItemData[2].form.power2),
              (this.masterStation[i].dpgrZbpl2 =
                this.tabItemData[2].form.dpgrZbpl2), //点频干扰
              (this.masterStation[i].tpgrZbpl2 =
                this.tabItemData[2].form.tpgrZbpl2), //调频干扰
              (this.masterStation[i].tpgrTzpl2 =
                this.tabItemData[2].form.tpgrTzpl2), //调频干扰
              (this.masterStation[i].tpgrZbpp2 =
                this.tabItemData[2].form.tpgrZbpp2), //调频干扰
              (this.masterStation[i].spgrQspl2 =
                this.tabItemData[2].form.spgrQspl2), //扫频干扰
              (this.masterStation[i].spgrZzpl2 =
                this.tabItemData[2].form.spgrZzpl2), //扫频干扰
              (this.masterStation[i].spgrSpds2 =
                this.tabItemData[2].form.spgrSpds2), //扫频干扰
              (this.masterStation[i].spgrPdzlsj2 =
                this.tabItemData[2].form.spgrPdzlsj2), //扫频干扰
              (this.masterStation[i].bzsgrZxpl2 =
                this.tabItemData[2].form.bzsgrZxpl2), //白噪声干扰
              (this.masterStation[i].bzsgrDk2 =
                this.tabItemData[2].form.bzsgrDk2), //白噪声干扰
              (this.masterStation[i].bzsgrLbqxs2 =
                this.tabItemData[2].form.bzsgrLbqxs2), //白噪声干扰
              (this.masterStation[i].bzsgrLbqaz2 =
                this.tabItemData[2].form.bzsgrLbqaz2), //白噪声干扰
              (this.masterStation[i].txgrZbpl2 =
                this.tabItemData[2].form.txgrZbpl2), //调相干扰
              (this.masterStation[i].txgrTxxs2 =
                this.tabItemData[2].form.txgrTxxs2), //调相干扰
              (this.masterStation[i].txgrFhsl2 =
                this.tabItemData[2].form.txgrFhsl2), //调相干扰
              (this.masterStation[i].txgrPNm2 =
                this.tabItemData[2].form.txgrPNm2), //调相干扰
              (this.masterStation[i].txgrLbqxs2 =
                this.tabItemData[2].form.txgrLbqxs2), //调相干扰
              (this.masterStation[i].txgrLbqaz2 =
                this.tabItemData[2].form.txgrLbqaz2), //调相干扰
              (this.masterStation[i].mcgrMckd2 =
                this.tabItemData[2].form.mcgrMckd2), //脉冲干扰
              (this.masterStation[i].mcgrZq2 =
                this.tabItemData[2].form.mcgrZq2), //脉冲干扰
              //F3频段
              (this.masterStation[i].tabs2 = this.tabItemData[2].name),
              (this.masterStation[i].f3 = "F3频段"),
              (this.masterStation[i].zai2 = "在"),
              (this.masterStation[i].frequency3 =
                this.tabItemData[2].form.frequency3), //
              (this.masterStation[i].pattern3 =
                this.tabItemData[2].form.pattern3),
              (this.masterStation[i].power3 = this.tabItemData[2].form.power3),
              (this.masterStation[i].dpgrZbpl3 =
                this.tabItemData[2].form.dpgrZbpl3), //点频干扰
              (this.masterStation[i].tpgrZbpl3 =
                this.tabItemData[2].form.tpgrZbpl3), //调频干扰
              (this.masterStation[i].tpgrTzpl3 =
                this.tabItemData[2].form.tpgrTzpl3), //调频干扰
              (this.masterStation[i].tpgrZbpp3 =
                this.tabItemData[2].form.tpgrZbpp3), //调频干扰
              (this.masterStation[i].spgrQspl3 =
                this.tabItemData[2].form.spgrQspl3), //扫频干扰
              (this.masterStation[i].spgrZzpl3 =
                this.tabItemData[2].form.spgrZzpl3), //扫频干扰
              (this.masterStation[i].spgrSpds3 =
                this.tabItemData[2].form.spgrSpds3), //扫频干扰
              (this.masterStation[i].spgrPdzlsj3 =
                this.tabItemData[2].form.spgrPdzlsj3), //扫频干扰
              (this.masterStation[i].bzsgrZxpl3 =
                this.tabItemData[2].form.bzsgrZxpl3), //白噪声干扰
              (this.masterStation[i].bzsgrDk3 =
                this.tabItemData[2].form.bzsgrDk3), //白噪声干扰
              (this.masterStation[i].bzsgrLbqxs3 =
                this.tabItemData[2].form.bzsgrLbqxs3), //白噪声干扰
              (this.masterStation[i].bzsgrLbqaz3 =
                this.tabItemData[2].form.bzsgrLbqaz3), //白噪声干扰
              (this.masterStation[i].txgrZbpl3 =
                this.tabItemData[2].form.txgrZbpl3), //调相干扰
              (this.masterStation[i].txgrTxxs3 =
                this.tabItemData[2].form.txgrTxxs3), //调相干扰
              (this.masterStation[i].txgrFhsl3 =
                this.tabItemData[2].form.txgrFhsl3), //调相干扰
              (this.masterStation[i].txgrPNm3 =
                this.tabItemData[2].form.txgrPNm3), //调相干扰
              (this.masterStation[i].txgrLbqxs3 =
                this.tabItemData[2].form.txgrLbqxs3), //调相干扰
              (this.masterStation[i].txgrLbqaz3 =
                this.tabItemData[2].form.txgrLbqaz3), //调相干扰
              (this.masterStation[i].mcgrMckd3 =
                this.tabItemData[2].form.mcgrMckd3), //脉冲干扰
              (this.masterStation[i].mcgrZq3 =
                this.tabItemData[2].form.mcgrZq3); //脉冲干扰
          } else {
            (this.masterStation[i].grType = "欺骗干扰"),
              (this.masterStation[i].id = 0),
              (this.masterStation[i].f1 = "F1频段"),
              (this.masterStation[i].tab = this.tabItemData[2].name),
              (this.masterStation[i].zai = "在"),
              (this.masterStation[i].f1Bit0 = this.tabItemData[2].form1.f1Bit0),
              (this.masterStation[i].f1Bit1 = this.tabItemData[2].form1.f1Bit1),
              (this.masterStation[i].f1Bit2 = this.tabItemData[2].form1.f1Bit2),
              (this.masterStation[i].f1Bit3 = this.tabItemData[2].form1.f1Bit3),
              (this.masterStation[i].f2 = "F2频段"),
              (this.masterStation[i].f2Bit0 = this.tabItemData[2].form1.f2Bit0),
              (this.masterStation[i].f2Bit1 = this.tabItemData[2].form1.f2Bit1),
              (this.masterStation[i].f2Bit2 = this.tabItemData[2].form1.f2Bit2),
              (this.masterStation[i].f2Bit3 = this.tabItemData[2].form1.f2Bit3),
              (this.masterStation[i].f3 = "F3频段"),
              (this.masterStation[i].f3Bit0 = this.tabItemData[2].form1.f3Bit0),
              (this.masterStation[i].f3Bit1 = this.tabItemData[2].form1.f3Bit1),
              (this.masterStation[i].f3Bit2 = this.tabItemData[2].form1.f3Bit2),
              (this.masterStation[i].f3Bit3 = this.tabItemData[2].form1.f3Bit3);
          }
          break;
        case 3:
          if (this.tabItemData[3].grType == "压制干扰") {
            (this.masterStation[i].grType = "压制干扰"),
              (this.masterStation[i].id = 3),
              (this.masterStation[i].f1 = "F1频段"),
              (this.masterStation[i].tabs = this.tabItemData[3].name),
              (this.masterStation[i].zai = this.zai),
              (this.masterStation[i].frequency1 =
                this.tabItemData[3].form.frequency1),
              (this.masterStation[i].pattern1 =
                this.tabItemData[3].form.pattern1),
              (this.masterStation[i].power1 = this.tabItemData[3].form.power1),
              (this.masterStation[i].InterfereTime =
                this.tabItemData[3].InterfereTime), //时间或者位置
              (this.masterStation[i].standard1 =
                this.tabItemData[3].form.standard1), //点频干扰
              (this.masterStation[i].dpgrZbpl1 =
                this.tabItemData[3].form.dpgrZbpl1), //点频干扰(载波频1)
              (this.masterStation[i].tpgrZbpl1 =
                this.tabItemData[3].form.tpgrZbpl1), //调频干扰(载波频1)
              (this.masterStation[i].tpgrTzpl1 =
                this.tabItemData[3].form.tpgrTzpl1), //调频干扰(调制频1)
              (this.masterStation[i].tpgrZbpp1 =
                this.tabItemData[3].form.tpgrZbpp1), //调频干扰(调制频偏)
              (this.masterStation[i].spgrQspl1 =
                this.tabItemData[3].form.spgrQspl1), //扫频干扰(起始频1)
              (this.masterStation[i].spgrZzpl1 =
                this.tabItemData[3].form.spgrZzpl1), //扫频干扰(终止频1)
              (this.masterStation[i].spgrSpds1 =
                this.tabItemData[3].form.spgrSpds1), //扫频干扰(扫频点数)
              (this.masterStation[i].spgrPdzlsj1 =
                this.tabItemData[3].form.spgrPdzlsj1), //扫频干扰(频点驻留时间)
              (this.masterStation[i].bzsgrZxpl1 =
                this.tabItemData[3].form.bzsgrZxpl1), //白噪声干扰(中心频1)
              (this.masterStation[i].bzsgrDk1 =
                this.tabItemData[3].form.bzsgrDk1), //白噪声干扰(带宽)
              (this.masterStation[i].bzsgrLbqxs1 =
                this.tabItemData[3].form.bzsgrLbqxs1), //白噪声干扰(滤波器)
              (this.masterStation[i].bzsgrLbqaz1 =
                this.tabItemData[3].form.bzsgrLbqaz1), //白噪声干扰(滤波器a值)
              (this.masterStation[i].txgrZbpl1 =
                this.tabItemData[3].form.txgrZbpl1), //调相干扰(载波频1)
              (this.masterStation[i].txgrTxxs =
                this.tabItemData[3].form.txgrTxxs), //调相干扰
              (this.masterStation[i].txgrFhsl1 =
                this.tabItemData[3].form.txgrFhsl1), //调相干扰(符号速率)
              (this.masterStation[i].txgrPNm1 =
                this.tabItemData[3].form.txgrPNm1), //调相干扰
              (this.masterStation[i].txgrLbqxs1 =
                this.tabItemData[3].form.txgrLbqxs1), //调相干扰
              (this.masterStation[i].txgrLbqaz1 =
                this.tabItemData[3].form.txgrLbqaz1), //调相干扰(滤波器a值)
              (this.masterStation[i].mcgrMckd1 =
                this.tabItemData[3].form.mcgrMckd1), //脉冲干扰(脉冲宽度)
              (this.masterStation[i].mcgrZq1 =
                this.tabItemData[3].form.mcgrZq1), //脉冲干扰(周期)
              //F2频段
              (this.masterStation[i].tabs1 = this.tabItemData[3].name),
              (this.masterStation[i].f2 = "F2频段"),
              (this.masterStation[i].zai1 = "在"),
              (this.masterStation[i].frequency2 =
                this.tabItemData[3].form.frequency2), //
              (this.masterStation[i].pattern2 =
                this.tabItemData[3].form.pattern2),
              (this.masterStation[i].power2 = this.tabItemData[3].form.power2),
              (this.masterStation[i].dpgrZbpl2 =
                this.tabItemData[3].form.dpgrZbpl2), //点频干扰
              (this.masterStation[i].tpgrZbpl2 =
                this.tabItemData[3].form.tpgrZbpl2), //调频干扰
              (this.masterStation[i].tpgrTzpl2 =
                this.tabItemData[3].form.tpgrTzpl2), //调频干扰
              (this.masterStation[i].tpgrZbpp2 =
                this.tabItemData[3].form.tpgrZbpp2), //调频干扰
              (this.masterStation[i].spgrQspl2 =
                this.tabItemData[3].form.spgrQspl2), //扫频干扰
              (this.masterStation[i].spgrZzpl2 =
                this.tabItemData[3].form.spgrZzpl2), //扫频干扰
              (this.masterStation[i].spgrSpds2 =
                this.tabItemData[3].form.spgrSpds2), //扫频干扰
              (this.masterStation[i].spgrPdzlsj2 =
                this.tabItemData[3].form.spgrPdzlsj2), //扫频干扰
              (this.masterStation[i].bzsgrZxpl2 =
                this.tabItemData[3].form.bzsgrZxpl2), //白噪声干扰
              (this.masterStation[i].bzsgrDk2 =
                this.tabItemData[3].form.bzsgrDk2), //白噪声干扰
              (this.masterStation[i].bzsgrLbqxs2 =
                this.tabItemData[3].form.bzsgrLbqxs2), //白噪声干扰
              (this.masterStation[i].bzsgrLbqaz2 =
                this.tabItemData[3].form.bzsgrLbqaz2), //白噪声干扰
              (this.masterStation[i].txgrZbpl2 =
                this.tabItemData[3].form.txgrZbpl2), //调相干扰
              (this.masterStation[i].txgrTxxs2 =
                this.tabItemData[3].form.txgrTxxs2), //调相干扰
              (this.masterStation[i].txgrFhsl2 =
                this.tabItemData[3].form.txgrFhsl2), //调相干扰
              (this.masterStation[i].txgrPNm2 =
                this.tabItemData[3].form.txgrPNm2), //调相干扰
              (this.masterStation[i].txgrLbqxs2 =
                this.tabItemData[3].form.txgrLbqxs2), //调相干扰
              (this.masterStation[i].txgrLbqaz2 =
                this.tabItemData[3].form.txgrLbqaz2), //调相干扰
              (this.masterStation[i].mcgrMckd2 =
                this.tabItemData[3].form.mcgrMckd2), //脉冲干扰
              (this.masterStation[i].mcgrZq2 =
                this.tabItemData[3].form.mcgrZq2), //脉冲干扰
              //F3频段
              (this.masterStation[i].tabs2 = this.tabItemData[3].name),
              (this.masterStation[i].f3 = "F3频段"),
              (this.masterStation[i].zai2 = "在"),
              (this.masterStation[i].frequency3 =
                this.tabItemData[3].form.frequency3), //
              (this.masterStation[i].pattern3 =
                this.tabItemData[3].form.pattern3),
              (this.masterStation[i].power3 = this.tabItemData[3].form.power3),
              (this.masterStation[i].dpgrZbpl3 =
                this.tabItemData[3].form.dpgrZbpl3), //点频干扰
              (this.masterStation[i].tpgrZbpl3 =
                this.tabItemData[3].form.tpgrZbpl3), //调频干扰
              (this.masterStation[i].tpgrTzpl3 =
                this.tabItemData[3].form.tpgrTzpl3), //调频干扰
              (this.masterStation[i].tpgrZbpp3 =
                this.tabItemData[3].form.tpgrZbpp3), //调频干扰
              (this.masterStation[i].spgrQspl3 =
                this.tabItemData[3].form.spgrQspl3), //扫频干扰
              (this.masterStation[i].spgrZzpl3 =
                this.tabItemData[3].form.spgrZzpl3), //扫频干扰
              (this.masterStation[i].spgrSpds3 =
                this.tabItemData[3].form.spgrSpds3), //扫频干扰
              (this.masterStation[i].spgrPdzlsj3 =
                this.tabItemData[3].form.spgrPdzlsj3), //扫频干扰
              (this.masterStation[i].bzsgrZxpl3 =
                this.tabItemData[3].form.bzsgrZxpl3), //白噪声干扰
              (this.masterStation[i].bzsgrDk3 =
                this.tabItemData[3].form.bzsgrDk3), //白噪声干扰
              (this.masterStation[i].bzsgrLbqxs3 =
                this.tabItemData[3].form.bzsgrLbqxs3), //白噪声干扰
              (this.masterStation[i].bzsgrLbqaz3 =
                this.tabItemData[3].form.bzsgrLbqaz3), //白噪声干扰
              (this.masterStation[i].txgrZbpl3 =
                this.tabItemData[3].form.txgrZbpl3), //调相干扰
              (this.masterStation[i].txgrTxxs3 =
                this.tabItemData[3].form.txgrTxxs3), //调相干扰
              (this.masterStation[i].txgrFhsl3 =
                this.tabItemData[3].form.txgrFhsl3), //调相干扰
              (this.masterStation[i].txgrPNm3 =
                this.tabItemData[3].form.txgrPNm3), //调相干扰
              (this.masterStation[i].txgrLbqxs3 =
                this.tabItemData[3].form.txgrLbqxs3), //调相干扰
              (this.masterStation[i].txgrLbqaz3 =
                this.tabItemData[3].form.txgrLbqaz3), //调相干扰
              (this.masterStation[i].mcgrMckd3 =
                this.tabItemData[3].form.mcgrMckd3), //脉冲干扰
              (this.masterStation[i].mcgrZq3 =
                this.tabItemData[3].form.mcgrZq3); //脉冲干扰
          } else {
            (this.masterStation[i].grType = "欺骗干扰"),
              (this.masterStation[i].id = 0),
              (this.masterStation[i].f1 = "F1频段"),
              (this.masterStation[i].tab = this.tabItemData[3].name),
              (this.masterStation[i].zai = "在"),
              (this.masterStation[i].f1Bit0 = this.tabItemData[3].form1.f1Bit0),
              (this.masterStation[i].f1Bit1 = this.tabItemData[3].form1.f1Bit1),
              (this.masterStation[i].f1Bit2 = this.tabItemData[3].form1.f1Bit2),
              (this.masterStation[i].f1Bit3 = this.tabItemData[3].form1.f1Bit3),
              (this.masterStation[i].f2 = "F2频段"),
              (this.masterStation[i].f2Bit0 = this.tabItemData[3].form1.f2Bit0),
              (this.masterStation[i].f2Bit1 = this.tabItemData[3].form1.f2Bit1),
              (this.masterStation[i].f2Bit2 = this.tabItemData[3].form1.f2Bit2),
              (this.masterStation[i].f2Bit3 = this.tabItemData[3].form1.f2Bit3),
              (this.masterStation[i].f3 = "F3频段"),
              (this.masterStation[i].f3Bit0 = this.tabItemData[3].form1.f3Bit0),
              (this.masterStation[i].f3Bit1 = this.tabItemData[3].form1.f3Bit1),
              (this.masterStation[i].f3Bit2 = this.tabItemData[3].form1.f3Bit2),
              (this.masterStation[i].f3Bit3 = this.tabItemData[3].form1.f3Bit3);
          }
          break;
      }

      this.$message({
        message: "修改成功",
        type: "success",
      });
      this.current = null;
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    formatDate() {
      var time = new Date();
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();

      this.timestamp =
        y +
        "-" +
        this.add0(m) +
        "-" +
        this.add0(d) +
        " " +
        this.add0(h) +
        ":" +
        this.add0(mm) +
        ":" +
        this.add0(s);
      return (
        y +
        "-" +
        this.add0(m) +
        "-" +
        this.add0(d) +
        " " +
        this.add0(h) +
        ":" +
        this.add0(mm) +
        ":" +
        this.add0(s)
      );
    },
    animateReceiveData() {
      let animateInterval = null;
      if (animateInterval != null) {
        clearInterval(animateInterval);
        animateInterval = null;
      }
      this.setStations();

      let idx = 0;
      animateInterval = setInterval(() => {
        if (idx >= this.testData.length) {
          clearInterval(animateInterval);
          animateInterval = null;
          return;
        }
        let tmpCoord = this.testData[idx++];
        let globalId = 0;
        let targetData = {
          id: globalId++,
          properties: {
            时间: "2022-02-28",
            运行状态: "在线",
            姿态角: "140",
            经度: tmpCoord[0],
            纬度: tmpCoord[1],
            速度: "200KM/H",
          },
          coordinates: tmpCoord,
          styles: {
            isAlwaysShowPopop: true, //是否一直显示弹窗
          },
        };
        window.mapFrame.postMessage(
          {
            cmd: "addTarget", //在地图中添加站点
            params: {
              target: targetData,
            },
          },
          "*"
        );
      }, 1000);
    },
    //保存新场景
    save() {
      this.dialogVisible = false;
      this.visible = true;
    },
    //覆盖原场景
    cover() {
      this.dialogVisible = false;
      this.dialog = true;
    },
    //布局判决
    bujupanjue() {
      //let param = []
      let track = this.trackSplitList;
      let data = {
        param: this.tabItemData, //后端数据
        id: this.id,
        name: this.valueScene,
        frequencyOne: this.frequencyOne.value,
        patternOne: this.patternOne.value,
        num: this.num.value,
        DriveForms: this.DriveForms.value,
        ganxinbi: this.ganxinbi,
      };
      console.log(track);
      console.log(data);
      let params = {
        name: "layoutValidate",
        app_key: "sixteen",
        data: "",
        version: "",
        timestamp: this.timestamp,
        format: "json",
      };
      params.sign = this.buildSign(params);
      axios
        .post("http://streamwind.picp.vip:14028/api", {
          name: "layoutValidate",
          app_key: "sixteen",
          data: "",
          version: "",
          timestamp: this.timestamp,
          sign: params.sign,
          format: "json",
        })
        .then((res) => {
          // console.log(res);
          if (res.data.data.station[0].flag == false) {
            this.stationcolor1 = "purple";
            // console.log(this.stationcolor1);
          } else {
            this.stationcolor1 = "green";
            // console.log(this.stationcolor1);
          }
          if (res.data.data.track[1].flag == false) {
            this.stationcolor2 = "purple";
          } else {
            this.stationcolor2 = "green";
          }
          if (res.data.data.track[2].flag == false) {
            this.stationcolor3 = "purple";
          } else {
            this.stationcolor3 = "green";
          }
          if (res.data.data.track[3].flag == false) {
            this.stationcolor4 = "purple";
          } else {
            this.stationcolor4 = "green";
          }
          // console.log(res.data.data.track);
          // console.log(res.data.data.track[0].flag);
          // console.log(res.data.data.track[1].flag);
          // console.log(res.data.data.track[2].flag);
          // console.log(res.data.data.track[3].flag);
          if (res.data.data.track[0].flag == false) {
            this.trackcolor1 = "purple";
          } else {
            this.trackcolor1 = "green";
          }
          if (res.data.data.track[1].flag == false) {
            this.trackcolor2 = "purple";
          } else {
            this.trackcolor2 = "green";
          }
          if (res.data.data.track[2].flag == false) {
            this.trackcolor3 = "purple";
          } else {
            this.color3 = "green";
          }
          if (res.data.data.track[3].flag == false) {
            this.trackcolor4 = "purple";
          } else {
            this.trackcolor4 = "green";
          }
          // let msg = JSON.parse(JSON.stringify(res.data.data))
          // console.log(msg);
          this.setStations();
        });
      this.addTargetHistory();
    },
    //  addTargetHistory() {
    //   let targetHistoryData = [
    //     {
    //       id: '111',
    //       properties: { 时间: "2022-02-28", 运行状态: "在线", 姿态角: "140", 速度: "200KM/H" },
    //       coordinates: this.coordinatesOne,
    //     },
    //     {
    //       id: 23,
    //       properties: { 时间: "2022-02-29", 运行状态: "在线", 姿态角: "120", 速度: "100KM/H" },
    //       coordinates: this.coordinatesTwo,
    //     },
    //     {
    //       id: 33,
    //       properties: { 时间: "2022-03-28", 运行状态: "在线", 姿态角: "100", 速度: "220KM/H" },
    //       coordinates: this.coordinatesThree,
    //     },
    //     {
    //       id: 44,
    //       properties: { 时间: "2022-03-28", 运行状态: "在线", 姿态角: "80", 速度: "220KM/H" },
    //       coordinates: this.coordinatesFour,
    //     },
    //   ];
    //   window.mapFrame.postMessage(
    //     {
    //       cmd: "addTargetHistory", //在地图中添加站点
    //       params: {
    //         history: targetHistoryData,
    //         historyClickAble: true,//轨迹点是否可点击，启用该参数后，点击轨迹点，会将所点击轨迹点对应的id及经纬度回传给主程序
    //       },
    //     },
    //     "*"
    //   );
    // },
    addTargetHistory() {
      let targetHistoryData = [
        {
          id: "111",
          properties: {
            时间: "2022-02-28",
            运行状态: "在线",
            姿态角: "140",
            速度: "200KM/H",
          },
          coordinates: this.coordinatesOne,
          styles: {
            lineColor: "#FF0099", //圆边线颜色
            lineWidth: 2, //圆边线宽度
            radius: 6, //圆半径大小
            fillColor: this.trackcolor1, //圆填充色
            opacity: 0.5, //透明度，取值范围[0-1]，1代表完全不透明
          },
        },
        {
          id: 23,
          properties: {
            时间: "2022-02-29",
            运行状态: "在线",
            姿态角: "120",
            速度: "100KM/H",
          },
          coordinates: this.coordinatesTwo,
          styles: {
            lineColor: "#0000FF", //圆边线颜色
            lineWidth: 2, //圆边线宽度
            radius: 6, //圆半径大小
            fillColor: this.trackcolor2, //圆填充色
            opacity: 0.2, //透明度，取值范围[0-1]，1代表完全不透明
          },
        },
        {
          id: 33,
          properties: {
            时间: "2022-03-28",
            运行状态: "在线",
            姿态角: "100",
            速度: "220KM/H",
          },
          coordinates: this.coordinatesThree,
          styles: {
            lineColor: "#FF00FF", //圆边线颜色
            lineWidth: 3, //圆边线宽度
            radius: 3, //圆半径大小
            fillColor: this.trackcolor3, //圆填充色
            opacity: 1, //透明度，取值范围[0-1]，1代表完全不透明
          },
        },
        {
          id: 44,
          properties: {
            时间: "2022-03-28",
            运行状态: "在线",
            姿态角: "100",
            速度: "220KM/H",
          },
          coordinates: this.coordinatesFour,
          styles: {
            lineColor: "#FF00FF", //圆边线颜色
            lineWidth: 3, //圆边线宽度
            radius: 3, //圆半径大小
            fillColor: this.trackcolor4, //圆填充色
            opacity: 1, //透明度，取值范围[0-1]，1代表完全不透明
          },
        },
      ];
      window.mapFrame.postMessage(
        {
          cmd: "addTargetHistory", //在地图中目标历史轨迹
          params: {
            history: targetHistoryData,
            historyClickAble: true, //轨迹点是否可点击，启用该参数后，点击轨迹点，会将所点击轨迹点对应的id及经纬度回传给主程序
          },
        },
        "*"
      );
    },
    //信息展示
    messageshow() {
      let params = {
        name: "messageDisplay",
        app_key: "sixteen",
        data: "",
        version: "",
        timestamp: this.timestamp,
        format: "json",
      };
      params.sign = this.buildSign(params);
      axios
        .post("http://streamwind.picp.vip:14028/api", {
          name: "messageDisplay",
          app_key: "sixteen",
          data: "",
          version: "",
          timestamp: this.timestamp,
          sign: params.sign,
          format: "json",
        })
        .then((res) => {
          console.log(res);
          res.data.data.map((el) => {
            console.log(el.coordinate);
            this.testData.push(el.coordinate);
          });
          this.animateReceiveData();
        });
    },
    //开始执行
    start() {
      let params = {
        name: "startTask",
        app_key: "sixteen",
        data: "",
        version: "",
        timestamp: this.timestamp,
        format: "json",
      };
      params.sign = this.buildSign(params);
      axios
        .post("http://streamwind.picp.vip:14028/api", {
          name: "startTask",
          app_key: "sixteen",
          data: "",
          version: "",
          timestamp: this.timestamp,
          sign: params.sign,
          format: "json",
        })
        .then((res) => {
          // console.log(res);
          if (res.data.data.result == "ok") {
            this.$message({
              type: "success",
              message: "开始执行成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "开始执行失败",
            });
          }
        });
    },
    //结束执行
    over() {
      let params = {
        name: "terminateTask",
        app_key: "sixteen",
        data: "",
        version: "",
        timestamp: this.timestamp,
        format: "json",
      };
      params.sign = this.buildSign(params);
      axios
        .post("http://streamwind.picp.vip:14028/api", {
          name: "terminateTask",
          app_key: "sixteen",
          data: "",
          version: "",
          timestamp: this.timestamp,
          sign: params.sign,
          format: "json",
        })
        .then((res) => {
          // console.log(res);
          if (res.data.data.result == "ok") {
            this.$message({
              type: "success",
              message: "结束执行成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "结束执行失败",
            });
          }
        });
    },

    getnewArr(arr, num) {
      let newArr = [];
      const total = Math.ceil(arr.length / num);
      // console.log(total);
      for (let i = 0; i < total; i++) {
        let a = arr.slice(i * num, (i + 1) * num);
        newArr.push(a);
      }
      return newArr;
    },
    //仿真验证
    fangzhenyanzheng() {
      this.getData();
      //     let params = {
      //   name: "simulationValidate",
      //   app_key: "sixteen",
      //   data: "",
      //   version: "",
      //   timestamp: this.timestamp,
      //   format: "json",
      // };
      // params.sign = this.buildSign(params);
      //    axios
      //   .post("http://streamwind.picp.vip:14028/api", {

      //     name: "simulationValidate",
      //     app_key: "sixteen",
      //     data: "",
      //     version: "",
      //     timestamp: this.timestamp,
      //     sign: params.sign,
      //     format: "json",
      //   }).then((res => {
      //     console.log(res);
      //   }))
    },
    //发送
    async sendCommand() {
      try {
        
        const { data } = await this.$api.sendCommand({
          
        })
        console.log(data)
      } catch (error) {
        this.$message({
              type: "error",
              message: "发送失败",
            });
      }
      let track = this.trackSplitList;
      let cmd = {
        param: this.tabItemData, //后端数据
        id: this.id,
        name: this.valueScene,
        frequencyOne: this.frequencyOne.value,
        patternOne: this.patternOne.value,
        num: this.num.value,
        DriveForms: this.DriveForms.value,
        ganxinbi: this.ganxinbi,
      };
      console.log(track);
      console.log(cmd);
      let params = {
        name: "saveScene",
        app_key: "sixteen",
        data: "",
        version: "",
        timestamp: this.timestamp,
        format: "json",
      };
      params.sign = this.buildSign(params);
      axios
        .post("http://streamwind.picp.vip:14028/api", {
          tabItemData: this.tabItemData,
          name: "saveScene",
          app_key: "sixteen",
          data: "",
          version: "",
          timestamp: this.timestamp,
          sign: params.sign,
          format: "json",
        })
        .then((res) => {
          // console.log(res);
          if (res.data.data.result == "ok") {
            this.$message({
              type: "success",
              message: "发送成功",
            });
          }
        });
    },

    // 站点名称过滤
    filterStation(id) {
      let name = "";
      if (id == 0) {
        name = "主站1";
      }
      if (id == 1) {
        name = "从站1";
      }
      if (id == 2) {
        name = "从站2";
      }
      if (id == 3) {
        name = "从站3";
      }
      return name;
    },

    // 删除
    deleteData() {
      this.masterStation.splice(this.current, 1);
      this.$message({
        message: "删除成功",
        type: "success",
      });
      this.current = null;
      // console.log(this.masterStation, "this.masterStation");
    },
    //缩放到西北区域
    flyToXiBei() {
      var mapFrame = document.getElementById("ifrm").contentWindow;
      mapFrame.postMessage(
        {
          cmd: "flyTo", //地图缩放到指定位置和层级命名
          params: {
            x: 86.95,
            y: 39.355,
            level: 7,
          },
        },
        "*"
      );
    },
    //添加自定义样式线
    addCustomStyleLine() {
      window.mapFrame.postMessage(
        {
          cmd: "addCustomStyleLine", //在地图中添加站点
          params: {
            coordinates: this.coordinates,
            styles: {
              lineColor: "#FF0099", //线颜色
              lineWidth: 5, //线宽度
              duration: 3000, //线显示的时间（单位为毫秒），超过该时间后线自动消失。当该参数为0时，线永久显示
            },
          },
        },
        "*"
      );
    },
    // md5(){
    //   var  bbb = ''
    //   var secret= '123456'
    //   var secretHeader = '123456'
    //   let a =  this.$md5(bbb)
    //   this.md5app = secretHeader + a + secret
    //  this.setmd5 =  this.$md5( this.md5app)
    //   console.log(this.setmd5);
    // },
    buildSign(postData) {
      var secret = "123456";
      var secretHeader = "123456";
      var paramNames = [];
      for (var key in postData) {
        paramNames.push(key);
      }

      paramNames.sort();

      var paramNameValue = [];

      for (var i = 0, len = paramNames.length; i < len; i++) {
        var paramName = paramNames[i];
        paramNameValue.push(paramName);
        paramNameValue.push(postData[paramName]);
      }
      // console.log(paramNameValue);
      var source = secret + paramNameValue.join("") + secretHeader;
      this.md5app = secret + this.$md5(source).toUpperCase() + secretHeader;
      // console.log(this.md5app, this.$md5(this.md5app).toUpperCase());
      this.md5list = this.$md5(this.md5app).toUpperCase();
      // MD5算法参见http://pajhome.org.uk/crypt/md5/
      return this.$md5(source).toUpperCase();
    },
    beforeDestroy() {
      clearTimeout(this.outTimer);
    },
    //设置干扰站位置
    setStations() {
      let stationsData = [
        {
          id: "1",
          type: "",
          properties: { 站点名称: "测试站1", 运行状态: "在线" }, //在弹框中显示的信息
          coordinates: this.coordinates1,
          styles: {
            isAlwaysShowPopop: false, //是否保持一直显示弹窗，当该属性为false时可通过点击固定站来切换弹窗的显示状态
            isDraggable: false, //是否可拖拽 默认为true
            lineColor: "green", //连接线颜色，默认为red
            lineWidth: 3, //连接线宽度,默认为3
            icon: this.stationcolor1, //所用图标颜色，支持的颜色包括["purple","darkblue","blue","yellow","green"],默认值为darkblue
          },
        },
        {
          id: "2",
          properties: { 站点名称: "测试站2", 运行状态: "在线" },
          coordinates: this.coordinates2,
          styles: {
            isLine2Target: true, //是否在地图上绘制站点到目标之间的连接线，该参数默认true
            lineColor: "red", //连接线颜色
            lineWidth: 1, //连接线宽度
            isAlwaysShowPopop: true, //是否保持一直显示弹窗
            icon: this.stationcolor2, //所用图标颜色，支持的颜色包括["purple","darkblue","blue","yellow","green"],默认值为darkblue
          },
        },
        {
          id: "3",
          properties: { 站点名称: "测试站3", 运行状态: "在线" },
          coordinates: this.coordinates3,
          styles: {
            isLine2Target: false, //是否在地图上绘制站点到目标之间的连接线，该参数默认true
            lineColor: "red", //连接线颜色
            lineWidth: 1, //连接线宽度
            isAlwaysShowPopop: false, //是否保持一直显示弹窗，当该属性为false时可通过点击固定站来切换弹窗的显示状态
            icon: this.stationcolor3, //所用图标颜色，支持的颜色包括["purple","darkblue","blue","yellow","green"],默认值为darkblue
          },
        },
        {
          id: "4",
          properties: { 站点名称: "测试站4", 运行状态: "在线" },
          coordinates: this.coordinates4,
          styles: {
            isLine2Target: false, //是否在地图上绘制站点到目标之间的连接线，该参数默认true
            lineColor: "red", //连接线颜色
            lineWidth: 1, //连接线宽度
            isAlwaysShowPopop: false, //是否保持一直显示弹窗，当该属性为false时可通过点击固定站来切换弹窗的显示状态
            icon: this.stationcolor4, //所用图标颜色，支持的颜色包括["purple","darkblue","blue","yellow","green"],默认值为darkblue
          },
        },
      ];
      window.mapFrame.postMessage(
        {
          cmd: "setStations", //在地图中添加固定站
          params: {
            stations: stationsData,
          },
        },
        "*"
      );
    },

    callApi() {},
    clearMap() {
      var mapFrame = document.getElementById("ifrm").contentWindow;
      mapFrame.postMessage(
        {
          cmd: "clearMap", //清除所有地图要素指令
        },
        "*"
      );
    },
    //绘制路径
    enableDrawTool() {
      window.mapFrame.postMessage(
        {
          cmd: "enableDrawTool", //在地图中添加站点
          params: {},
        },
        "*"
      );
    },
    showMessage(msg) {
      console.log(msg, "SD");
      this.track = msg;
      let str = msg;
      let arr = str.split(",");
      let newArrs = this.getnewArr(arr, 4);
      //1 console.log(newArrs)
      let track = [];
      let trackJson = { id: "", coordinates: "", v: "" };
      let trackJsonStr = "";
      newArrs.forEach(function (newArr, index) {
        console.log(newArr, index);
        trackJson.id = index;
        trackJson.coordinates = newArr.slice(0, 3);
        trackJson.v = newArr[3];
        trackJsonStr = JSON.stringify(trackJson);
        track.push(trackJsonStr);
      });
      let tracks = track.map((item) => {
        return JSON.parse(item);
      });
      this.trackSplitList = tracks;
      console.log(tracks);
    },
    addEditPopup(id, position) {
      let popData = {
        properties: {
          经度: position[0],
          纬度: position[1],
          速度: "100KM/H",
        },
        coordinates: position,

        styles: {
          bCloseBt: false, //是否显示弹窗 右上角关闭按钮
          btText: "提交", //弹窗右下角按钮的文字信息
        },
      };
      window.mapFrame.postMessage(
        {
          cmd: "addEditPopup",
          params: {
            popData: popData,
          },
        },
        "*"
      );
    },
  },
  created() {
    this.tabItemIndex = 0;
    //this.getData()
  },
  mounted() {
    // this.hex_md5()
    // this.md5()
    //this.buildSign()
    this.formatDate();
    //this.buildSign()
    this.callApi();
    window.addEventListener("message", (event) => {
      let data = event.data;
      if (!data || !data.cmd) {
        return;
      }
      if (data.cmd === "Map_DblClick") {
        if (!data.params) return;
        let { lon, lat } = data.params;

        // console.log("双击地图位置：", x, y);
        this.showMessage("Map_DblClick:双击了地图：[" + lon + "," + lat + "],");
      } else if (data.cmd === "Map_RightClick") {
        if (!data.params) return;
        let { lon, lat } = data.params;

        // console.log("双击地图位置：", x, y);
        this.showMessage(
          "Map_RightClick:右键点击了地图：[" + lon + "," + lat + "],"
        );
      } else if (data.cmd === "Station_RightClick") {
        if (!data.params) return;
        let { id, lon, lat } = data.params;
        this.stationId = id;

        // console.log("双击地图位置：", x, y);
        this.showMessage(
          "Station_RightClick:ID为【" +
            id +
            "】的站点被右击了：" +
            "[" +
            lon +
            "," +
            lat +
            "],"
        );
        this.addEditPopup(id, [lon, lat]);
      } else if (data.cmd === "Station_Click") {
        if (!data.params) return;
        let { id, lon, lat } = data.params;
        // console.log("双击地图位置：", x, y);
        this.showMessage(
          "Station_Click:ID为【" +
            id +
            "】的站点被点击了：" +
            "[" +
            lon +
            "," +
            lat +
            "],"
        );
      }
      // else if (data.cmd === "Station_DragEnd") {
      //   if (!data.params) return;
      //   let { id, lon, lat } = data.params;
      //
      //   // console.log("双击地图位置：", x, y);
      //   showMessage("Station_DragEnd:ID为【" + id + "】的站点被拖动了：" + "["+ lon+ ","+ lat+ "],")
      // }
      // else if (data.cmd === "History_Click") {
      //   if (!data.params) return;
      //   let { id, lon, lat } = data.params;
      //
      //   showMessage("History_Click:ID为【" + id + "】的历史轨迹点被点击了，其坐标为: ["+ lon+ ","+ lat+ "],")
      // }
      // else if (data.cmd === "History_RightClick") {
      //   if (!data.params) return;
      //   let { id, lon, lat } = data.params;
      //
      //   showMessage("History_RightClick:ID为【" + id + "】的历史轨迹点被右键点击了，其坐标为: ["+ lon+ ","+ lat+ "],")
      // }
      // else if (data.cmd === "Target_Click") {
      //   if (!data.params) return;
      //   let { id, lon, lat } = data.params;
      //
      //   showMessage("Target_Click: 目标点被点击了，其坐标为 :["+ lon+ ","+ lat+ "],")
      // }
      // else if (data.cmd === "Target_RightClick") {
      //   if (!data.params) return;
      //   let { id, lon, lat } = data.params;
      //
      //   showMessage("Target_RightClick: 目标点被右键点击了，其坐标为:["+ lon+ ","+ lat+ "],")
      // }
      else if (data.cmd === "Line_Drawn") {
        if (!data.params) return;
        let { coordinates } = data.params;
        this.showMessage("路径绘制完成，坐标为：" + coordinates);
      } else if (data.cmd === "EditPopup_Submit") {
        if (!data.params) return;

        let object = data.params;
        let x = object["经度"];
        let y = object["纬度"];

        if (this.stationId === "1") {
          this.coordinates1 = [x, y];
        } else if (this.stationId === "2") {
          this.coordinates2 = [x, y];
        } else if (this.stationId === "3") {
          this.coordinates3 = [x, y];
        } else if (this.stationId === "4") {
          this.coordinates4 = [x, y];
        }
        // console.log("id=====",this. stationId1);

        // setStations([JSON.stringify(data.params)."经度"]);
        this.setStations();

        this.showMessage("EditPopup_Submit：" + JSON.stringify(data.params));
      }
    });
    this.showSessionId = window.location.search;
    //this.src = "http://www.szttchina.com:8092/nl/static/iframe.html";
    this.src = "http://172.20.10.14/data/gis/run/index.html#/";
  },
};
</script>

<style>
.my-form {
  height: 500px;
  overflow-y: auto;
}
</style>

<style scoped>
.el-table td,
.el-table th.is-leaf,
.el-table--border,
.el-table--group {
  border-color: black;
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: black;
}

.h3 {
  display: inline;
}

.ant-card {
  color: black;
  background: #092836;
}

.ant-tree {
  color: black;
}

.ant-tree-title {
  color: white;
}

/deep/.ant-tree li .ant-tree-node-content-wrapper {
  color: black;
}

/deep/.drawer-bootom-button {
  background: #092836 !important;
}

/deep/.ant-form-item-label label {
  color: black;
}

.right {
  position: absolute;
  left: 0px;
  top: -400px;

  border: 1px solid red;
}

.fzcs {
  margin-bottom: 20px;
  padding: 10px 0px 0px 0px;
  height: 190px;
  width: 710px;
}

.gzcs {
  padding: -10px 0px 0px 0px;
  size: 3px;
  height: 450px;
  width: 710px;
  background-color: #092836;
  /*display: inline-block;*/
  /*vertical-align: middle;*/
}

.xzgrzs {
  padding: 1px;

  border-color: #1e90ff;
  border-width: thin;
  border-style: solid;
  background-color: #092836;
}

.instructionsSet {
  margin-left: 15px;
  position: absolute;
  background-color: #fff;
  border: 1px solid #eee;

  left: 710px;
  top: 385px;
  padding: 50px 50px 20px 50px;
  width: 1000px;
  background-color: #092836;
  /*border-color: #00A0E9;*/
  /*border-width:thin;*/
  /*border-style: solid;*/
  /*background-color: #092836;*/
}

.fourTabs {
  /*padding: -25px 45px 50px 30px;*/
}

/deep/.el-select,
/deep/.el-input,
/deep/.el-input__inner {
  color: #1e90ff;
  border-color: #1e90ff;
}

.ant-btn-primary {
  background-color: #2980b9;
  border-color: #2980b9;
}

.ant-btn {
  background-color: #2980b9;
  border-color: #2980b9;
  color: black;
}

.anty-form-btn {
  width: 100%;
  text-align: center;
}

.anty-form-btn button {
  margin: 0 5px;
}

.anty-node-layout .ant-layout-header {
  padding-right: 0;
}

.header {
  padding: 0 8px;
}

.header button {
  margin: 0 3px;
}

.ant-modal-cust-warp {
  height: 100%;
}

.ant-row {
  height: 1150px !important;
}

.ant-modal-cust-warp .ant-modal-body {
  height: calc(100% - 110px) !important;
  overflow-y: auto;
}

.active {
  background: #eee;
}

.tabs {
  width: 200px;
  height: 20px;

  padding: 0;
  background-color: #0dfafc;
}

.li-tab {
  width: 50%;
  height: 100%;
  display: inline-block;
  text-align: center;
}

.divTab {
  width: 200px;
  height: 300px;
}

.ant-modal-cust-warp .ant-modal-content {
  height: 90% !important;
  overflow-y: hidden;
}

#app .desktop {
  height: auto !important;
}

/**  Button按钮间距 */
.ant-btn {
  margin-left: 3px;
}

.drawer-bootom-button {
  /*position: absolute;*/
  bottom: 0;
  width: 100%;
  /*border-top: 1px solid #e8e8e8;*/
  padding: 10px 16px;
  text-align: left;
  left: 0;
  background: #fff;
  border-radius: 0 0 2px 2px;
}

/deep/ .el-tabs__item {
  padding: 0px 120px 50px 30px;
  color: white;
  font-size: large;
}

/deep/.el-input__inner {
  background: transparent !important;
}

/deep/input::-webkit-input-placeholder {
  color: #17a1e5;
}

/deep/ .el-tabs__item.is-active {
  padding: -10px 60px 50px 30px;
  color: #1e90ff;
}

/deep/ .el-tabs__active-bar is-top {
  width: 15px;
}

.el-tabs__nav {
  width: 15px;
}
</style>
