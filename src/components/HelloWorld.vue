<template>
  <div class="w-full h-full flex p-2  " style="background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);">
    <div style="width: 21.4vw;" class="  relative">
      <el-image :src="bgimg" fit="contain"> </el-image>
      <div class="  absolute top-20 left-0 bottom-0 right-0 p-10"> <el-image :src="title" fit="contain"></el-image>
      </div>

    </div>
    <div class="w-full">
      <div class="flex justify-end items-center mt-2">
        <div class="p-2 px-6 rounded-full  cursor-pointer bg-white mr-5" v-if="clickBot != 'none'"
          @click="clickBot = 'none'">返回</div>
        <div class="p-2 px-6 rounded-full  cursor-pointer bg-white mr-5">历史对话</div>
        <div class="p-2 px-6 rounded-full  cursor-pointer bg-white mr-5">联系我们</div>
      </div>
      <div v-if="clickBot == 'none'">
        <div class="w-full  flex justify-center items-center text-white text-xl  mt-10">
          <div class="w-1/2 flex justify-center items-center py-2 rounded-full "
            style="background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);">
            有什么问题都可以问我哟，我会尽力帮您解答!
          </div>
        </div>
        <div class="w-full  flex justify-center items-center text-white text-xl  mt-20">
          <div class="w-2/3 flex justify-center items-center text-black">
            <div v-for="item in midlist" :key="item.value"
              class="w-1/4 flex justify-center items-center mx-5 aspect-square cursor-pointer"
              style="background-color: #f1f5fe;">
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="px-32 my-10  w-full">
          <EditorSender variant="updown" :custom-style="{
            height: '130px',
          }" style="background-color: rgba(255, 255, 255, 0.7);">

            <template #prefix>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap">
                <el-button round plain color="#626aef">
                  <el-icon>
                    <Paperclip />
                  </el-icon>
                </el-button>
              </div>
            </template>
            <template #action-list>
              <div style="display: flex; align-items: center; gap: 8px">
                <el-button round color="#626aef">
                  <el-icon>
                    <Promotion />
                  </el-icon>
                </el-button>
              </div>
            </template>
          </EditorSender>
        </div>
        <div class="w-full  flex justify-center items-center text-white   mt-12">
          <div class="w-2/3 flex   flex-wrap items-center text-black">
            <div v-for="item in botlist" :key="item.value"
              class="w-1/5  flex  items-center  justify-center p-3 m-3 mx-4 cursor-pointer"
              style="background-color: #f1f5fe;" @click="changeBot(item.value)">
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="clickBot == 'chat'">
        <chatPage />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import bgimg from '/@/assets/img/backimage.png'
import { ElementPlus, Paperclip, Promotion } from '@element-plus/icons-vue';
import chatPage from './chatPage.vue'
import title from '/@/assets/img/title.png'
const clickBot = ref('none')

const midlist = [
  { label: 'AI研究方向', value: '0' },
  { label: 'AI数据分析', value: '1' },
  { label: '科研选题', value: '2' },
  { label: '搜文献', value: '3' },
]

const botlist = [
  { label: '智能开方', value: 'chat' },
  { label: '预问诊', value: '1' },
  { label: '智能审方', value: '2' },
  { label: '体质自测', value: '3' },
  { label: '病历生成', value: '4' },
  { label: 'AI诊室', value: '5' },
  { label: '病历质控', value: '6' },
]
const changeBot = (value: string) => {
  clickBot.value = value
}
</script>


<style scoped></style>
