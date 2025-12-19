<template>
  <div style="height: calc(100vh - 230px)">
    <!-- AI 聊天区域（默认隐藏，发送后切换显示） -->
    <div v-if="activeView === 'chat'" class="mt-4 h-full rounded-xl p-24 py-0">
      <div
        class="overflow-auto p-3 chat-area bg-white rounded-lg shadow-md mb-2"
        style="height: calc(100vh - 280px)"
      >
        <el-scrollbar style="height: 100%">
          <div v-for="(m, i) in messages" :key="i" class="mb-4">
            <div v-if="m.role === 'assistant'" class="m-3">
              <VueMarkdown
                :source="m.content"
                class="prose max-w-none w-4/5 bg-gray-50 p-3 rounded"
              />
            </div>
            <div v-else class="flex justify-end m-3">
              <pre
                class="bg-blue-300 p-3 rounded whitespace-pre-wrap"
                style="max-width: 80%"
                >{{ m.content }}</pre
              >
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div v-else>
      <div class="flex justify-center items-center">
        <div
          class="w-32 h-1 rounded-l-lg"
          style="
            background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          "
        ></div>
        <div class="text-gray-500 mx-2">你已进入智能开方</div>
        <div
          class="w-32 h-1 rounded-r-lg"
          style="
            background-image: linear-gradient(315deg, #f5f7fa 0%, #c3cfe2 100%);
          "
        ></div>
      </div>
      <div class="w-full px-20 relative mt-20">
        <div class="bg-white rounded-xl shadow-lg">
          <div class="flex justify-center items-center">
            <el-image :src="bot" class="w-16 -mt-8"></el-image>
          </div>
          <div class="flex justify-center items-center my-2 text-xl">
            智能开方
          </div>
          <div class="flex justify-center items-center my-2 pb-5">
            仅依据您提供的症状、舌脉等信息,结合《黄帝内经》《伤寒论》等经典及现行国标证候术语,输出“辨证思路+参考处方+调护建议”。
          </div>
        </div>
      </div>
      <div class="flex px-20">
        <div
          v-for="(item, index) in example"
          :key="index"
          @click="setInput(item)"
          class="bg-white rounded-xl shadow-lg m-2 p-4 w-1/2 cursor-pointer"
        >
          <div class="text-lg font-semibold mb-2">样例：{{ item.name }}</div>
          <div class="text-gray-600">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </div>

  <div class="px-24 w-full">
    <EditorSender
      variant="updown"
      ref="senderRef"
      :custom-style="{
        height: '70px',
      }"
      style="background-color: white"
      @submit="handleSubmit"
    >
      <template #action-list>
        <div
          style="display: flex; align-items: center; gap: 8px"
          @click="handleSendClick"
        >
          <el-button
            round
            color="#626aef"
            :loading="isSending"
            :disabled="isSending"
          >
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
import { ref, nextTick } from 'vue'
import bot from '/@/assets/img/bot.png'
import { ElementPlus, Paperclip, Promotion } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'
import { getAiAnswer } from '/@/api/chat/index'
import VueMarkdown from 'vue-markdown-render'

const senderRef = ref();

// 定义样例
const example = [
    {
        name: '陈某,男,40岁。',
        desc:
            '右侧肢体不遂伴复视5个月。患者于2016年3月8日晚剧烈运动后,突然出现持续右侧肢体不遂伴头痛、眩晕、复视、语言謇涩,时神清,无胸闷憋气,二便失禁等症,急查颅脑CT示:脑干出血,出血量约5mL,血压200/160mmHg',
    },
    {
        name: '张某,男,82岁。',
        desc:
            '有糖尿病、高血压病、冠心病十余年。近一周每在活动及情绪波动时阵发左胸憋闷隐痛或刺痛,痛位固定,伴心悸,乏力,烦躁,寐差,舌黯淡,苔薄白,脉细弦。',
    },
]

// UI 状态
const activeView = ref<'form' | 'chat'>('form')
const messages = ref<Array<{ role: string; content: string }>>([])
const isSending = ref(false)

const handleSubmit = (text: string) => {
    if (isSending.value) {
        ElMessage.warning('正在发送，请稍候')
        return
    }
    const content = senderRef.value.getCurrentValue().text
    // push user message
    messages.value.push({ role: 'user', content })
    // 切换到聊天区域
    activeView.value = 'chat'
    // 清空输入框
    senderRef.value.clear()
    // send
    sendMessage(content)
}

const setInput = (item: any) => {
    const content = item.name + item.desc
    senderRef.value.clear()
    senderRef.value.setText(content)
}

// 从接口返回（或流）中提取并拼接所有 text_chunk 的 text
const collectTextChunks = (obj: any): string => {
    let out = ''
    const traverse = (x: any) => {
        if (x == null) return
        if (typeof x === 'object' && x.event === 'text_chunk' && x.data && typeof x.data.text === 'string') {
            out += x.data.text
            return
        }
        if (typeof x === 'string') return
        if (Array.isArray(x)) {
            x.forEach(traverse)
        } else if (typeof x === 'object') {
            Object.values(x).forEach(traverse)
        }
    }
    traverse(obj)
    return out
}

const scrollChatToBottom = async () => {
    await nextTick()
    const el = document.querySelector('.chat-area') as HTMLElement | null
    if (el) el.scrollTop = el.scrollHeight
}

const handleSendClick = () => {
    const text = senderRef.value.getCurrentValue().text;
    handleSubmit(text);
};
const sendMessage = async (item: string) => {
    if (isSending.value) return
    isSending.value = true
    // push a placeholder for assistant
    const placeholderIdx = messages.value.push({ role: 'assistant', content: '正在生成回复...' }) - 1
    const prams = {
        inputs: {
            symptom: item,
        },
        response_mode: 'streaming',
        user: 'user_id',
    }

    // 使用 fetch + ReadableStream 逐 chunk 读取 SSE 风格的响应并实时更新消息
    const controller = new AbortController()
    try {
        const res = await fetch('https://api.dify.ai/v1/workflows/run', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer app-jynwANlFJ7x4aZodzN31hk8K',
                'Content-Type': 'application/json',
                Accept: 'text/event-stream',
            },
            body: JSON.stringify(prams),
            signal: controller.signal,
        })

        if (!res.ok || !res.body) {
            messages.value[placeholderIdx] = { role: 'assistant', content: '请求失败，请重试' }
            return
        }

        const reader = res.body.getReader()
        const decoder = new TextDecoder('utf-8')
        let buffer = ''
        let accumulated = ''

        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            buffer += decoder.decode(value, { stream: true })

            // SSE events are separated by double newlines
            const parts = buffer.split('\n\n')
            // 保留最后一部分（可能是不完整的），其余部分都是完整事件
            buffer = parts.pop() || ''

            for (const part of parts) {
                // 每个 part 可能包含多行，例如："data: {...}\n"
                const lines = part.split(/\r?\n/)
                for (const line of lines) {
                    const trimmed = line.trim()
                    if (!trimmed) continue
                    if (trimmed.startsWith('data:')) {
                        const payload = trimmed.replace(/^data:\s?/, '')
                        if (payload === '[DONE]') {
                            // 流结束标志
                            break
                        }
                        try {
                            const parsed = JSON.parse(payload)
                            // 处理 text_chunk
                            if (parsed && parsed.event === 'text_chunk' && parsed.data && typeof parsed.data.text === 'string') {
                                accumulated += parsed.data.text
                                // 实时更新占位消息
                                messages.value[placeholderIdx].content = accumulated
                                // 滚动到最底部
                                scrollChatToBottom()
                            }
                        } catch (e) {
                            // 忽略无法解析的 chunk
                            console.warn('无法解析 chunk ->', payload)
                        }
                    }
                }
            }
        }

        // 流结束后，如果没有收到文本，显示提示
        if (!accumulated.trim()) {
            messages.value[placeholderIdx].content = '未收到有效回复'
        }
    } catch (error) {
        if (controller.signal.aborted) {
            messages.value[placeholderIdx].content = '已取消请求'
        } else {
            messages.value[placeholderIdx].content = '请求失败，请重试'
            console.error(error)
        }
    } finally {
        isSending.value = false
    }
    // scroll
    scrollChatToBottom()
}
</script>
