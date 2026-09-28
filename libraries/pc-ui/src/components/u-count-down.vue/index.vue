<template>
  <div v-if="isAppDesigner" :class="$style.root">{{ initialTime }}</div>
  <div v-else :class="$style.root">{{ crtTime }}</div>
</template>

<script>
class WebWorker {
    constructor(worker) {
        const code = worker.toString();
        const blob = new Blob([`(${code})()`]);
        const blobURL = URL.createObjectURL(blob);
        const workerInstance = new Worker(blobURL);
        // 保存 blobURL 以便后续释放
        workerInstance._blobURL = blobURL;
        return workerInstance;
    }
}

function work() {
    let timer = null;
    this.onmessage = (e) => {
        let { second, state } = e.data;
        if (state === "stop") {
            if (timer) {
                clearInterval(timer);
                this.postMessage(0);
                if (second === 0) this.postMessage(--second);
                timer = null;
            }
            this.lastPauseTime = undefined;
        } else if (state === "start") {
            if (timer) {
              clearInterval(timer);
            }
            timer = setInterval(() => {
            this.postMessage(--second);
          }, 1000);
          this.lastPauseTime = undefined;
        } else if (state === "pause") {
            if (!this.lastPauseTime) {
                clearInterval(timer);
                this.postMessage(--second);
                this.lastPauseTime = second;
            }
        } else if (state === 'continue') {
            if (this.lastPauseTime) {
                timer = setInterval(() => {
                    this.postMessage(--second);
                }, 1000);
                this.lastPauseTime = undefined;
            }
        }
    }
}

export default {
    name: "u-count-down",
    props: {
        timer: { type: Number, default: 60 },
        reverse: { type: String, default: 'positive' },
        autostart: { type: Boolean, default: true },
    },
    data() {
        return {
            second: Number(this.timer),
            worker: undefined,
            lastPauseTime: undefined,
            blobURL: null, // 保存 Blob URL 以便释放
        };
    },
    computed: {
        isAppDesigner() {
            return !!this.$env.VUE_APP_DESIGNER;
        },
        crtTime() {
            const { second } = this;
            const totalSecond = Number(this.timer);
            if (this.reverse === 'negative') {
                const min = String(Math.floor(second / 60)).padStart(2, "0");
                const sec = String(second % 60).padStart(2, "0");
                return `${min}:${sec}`;
            } else {
                const min = String(Math.floor((totalSecond - second) / 60)).padStart(2, "0");
                const sec = String((totalSecond - second) % 60).padStart(2, "0");
                return `${min}:${sec}`;
            }

        },
        initialTime() {
          const totalSecond = Number(this.timer);
          if (this.reverse === 'negative') {
            const min = String(Math.floor(totalSecond / 60)).padStart(2, "0");
            const sec = String(totalSecond % 60).padStart(2, "0");
            return `${min}:${sec}`;
          } else {
            return '00:00';
          }
        }
    },
    watch: {
        minute(min) {
            this.worker.postMessage({ state: "stop" });
            this.second = 60 * min;
            this.worker.postMessage({
                state: "start",
                second: this.second,
            });
        },
    },
    created() {
        const worker = new WebWorker(work);
        // 保存 Blob URL 以便后续释放
        this.blobURL = worker._blobURL;
        if (this.autostart) {
            worker.postMessage({
                state: "start",
                second: this.second,
            });
            this.$emit("start");

        }
        worker.onmessage = (e) => {
            if (e.data < 0) {
                worker.postMessage({ state: "stop" });
                this.$emit("stop");
                return;
            }
            this.second = e.data;
        };

        this.worker = worker;
    },
    beforeDestroy() {
        // 终止 Web Worker
        if (this.worker) {
            try {
                this.worker.postMessage({ state: "stop" });
                this.worker.terminate();
            } catch (e) {
                // 忽略错误
            }
            this.worker = null;
        }
        // 释放 Blob URL
        if (this.blobURL) {
            try {
                URL.revokeObjectURL(this.blobURL);
            } catch (e) {
                // 忽略错误
            }
            this.blobURL = null;
        }
    },
    methods: {
        start() {
          this.$emit("start");
          this.worker.postMessage({
                state: "start",
                second: Number(this.timer),
            });
        },
        stop() {
            this.worker.postMessage({
                state: "stop",
                second: 0,
            });
        },
        pause() {
          this.$emit("pause");
          this.worker.postMessage({
                state: "pause",
                second: this.second,
            });
        },
        continue() {
            this.$emit("continue");
            this.worker.postMessage({
                state: "continue",
                second: this.second,
            });
        }
    },
};
</script>

<style module>
.root {
}
</style>
