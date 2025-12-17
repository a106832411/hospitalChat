<template>
    <div style="height: calc(100vh - 260px);">
        <div class="flex justify-center items-center mt-10">
            <div class="w-32 h-1 rounded-l-lg "
                style="background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);"></div>
            <div class="  text-gray-500 mx-2">你已进入智能开方</div>
            <div class="w-32 h-1 rounded-r-lg"
                style="background-image: linear-gradient(315deg, #f5f7fa 0%, #c3cfe2 100%);">
            </div>

        </div>
        <div class="w-full px-20 relative mt-20">
            <div class="bg-white  rounded-xl  shadow-lg">
                <div class="flex justify-center items-center "><el-image :src="bot" class="w-16 -mt-8 "></el-image>
                </div>
                <div class="flex justify-center items-center my-2 text-xl">智能开方</div>
                <div class="flex justify-center items-center my-2 pb-5">
                    仅依据您提供的症状、舌脉等信息,结合《黄帝内经》《伤寒论》等经典及现行国标证候术语,输出“辨证思路+参考处方+调护建议”。</div>
            </div>
        </div>
        <div class="flex px-20">
            <div v-for="(item, index) in example" :key="index"  @click="senderRef?.setText(`${item.name} ${item.desc}`)"
                class="bg-white rounded-xl shadow-lg m-2 p-4 w-1/2   cursor-pointer">
                <div class="text-lg font-semibold mb-2 ">样例：{{ item.name }}</div>
                <div class="text-gray-600 ">{{ item.desc }}</div>
            </div>
        </div>
    </div>

    <div class="px-24    w-full">
        <div class="flex">
            <div>智能开方</div>
            <el-button @click="sendMessage">请求示例</el-button>
        </div>
        <EditorSender variant="updown" ref="senderRef" :custom-style="{
            height: '50px',
        }" style="background-color: rgba(255, 255, 255, 0.7);">


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

</template>
<script setup lang="ts">
import bot from '/@/assets/img/bot.png'
import { ElementPlus, Paperclip, Promotion } from '@element-plus/icons-vue';
import { getAiAnswer } from '/@/api/chat/index'
const senderRef = ref();
const sendMessage = async () => {
    const prams = {
        "inputs": {
            "symptom": "陈某，男，40岁。右侧肢体不遂伴复视5个月。患者于2016年3月8日晚剧烈运动后，突然出现持续右侧肢体不遂伴头痛、眩晕、复视、语言謇涩，时神清，无胸闷憋气，二便失禁等症，急查颅脑CT示:脑干出血，出血量约5mL，血压200/160mmHg"
        },
        "response_mode": "streaming",
        "user": 'user_id'
    }
    const res = await getAiAnswer(prams)

}
//定义样例
const example = [
    {
        name: '陈某,男,40岁。',
        desc: '右侧肢体不遂伴复视5个月。患者于2016年3月8日晚剧烈运动后,突然出现持续右侧肢体不遂伴头痛、眩晕、复视、语言謇涩,时神清,无胸闷憋气,二便失禁等症,急查颅脑CT示:脑干出血,出血量约5mL,血压200/160mmHg'
    },
    {
        name: '张某,男,82岁。',
        desc: '有糖尿病、高血压病、冠心病十余年。近一周每在活动及情绪波动时阵发左胸憋闷隐痛或刺痛,痛位固定,伴心悸,乏力,烦躁,寐差,舌黯淡,苔薄白,脉细弦。'
    },


]
</script>