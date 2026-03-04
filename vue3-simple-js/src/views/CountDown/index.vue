<template>
	<div class="AppPage">
		<div class="Pane" :style="paneStyle">
			<WindowBar ref="WinRef" min close move />

			<div class="Title">倒计时</div>

			<Clock v-model="total" v-if="isRun" />
			<div class="SetPane" v-else>
				<NumInput v-model="hour" suffix="时" :min="0" :max="23" width="120px" />
				<NumInput v-model="minute" suffix="分" :min="0" :max="59" width="120px" />
				<NumInput v-model="second" suffix="秒" :min="0" :max="59" width="120px" />
			</div>

			<div class="Btns" v-if="isRun">
				<el-button @click="stop" type="danger" size="large">停止</el-button>
			</div>
			<div class="Btns" v-else>
				<el-button @click="start" type="success" size="large">开始</el-button>
				<el-button @click="stop" type="warning" size="large">重置</el-button>
			</div>
		</div>
	</div>
</template>

<script setup>
	// 倒计时 ---------------------------------------------------------------------
	import NumInput from './Coms/NumInput.vue';
	import Clock from './Coms/Clock.vue';
	const isRun = ref(false);
	const hour = ref(0);
	const minute = ref(0);
	const second = ref(0);
	const total = ref(0);
	const timer = ref(null);
	const stop = () => {
		isRun.value = false;
		clearTimer();
		hour.value = minute.value = second.value = total.value = 0;
	};
	const start = () => {
		total.value = hour.value * 3600 + minute.value * 60 + second.value;
		if (!total.value) return;

		isRun.value = true;
		timer.value = setInterval(countDown, 1000);
	};
	const countDown = () => {
		total.value -= 1;
		if (total.value <= 0) {
			stop();
			ElMessage({ message: '倒计时结束!', type: 'success' });
			WinRef.value?.winTop(true);
			setTimeout(() => WinRef.value?.winTop(false), 1000);
			return;
		}
	};
	const clearTimer = () => {
		if (timer.value) {
			clearInterval(timer.value);
			timer.value = null;
		}
	};
	onUnmounted(() => clearTimer());

	// 随机渐变背景 ----------------------------------------------------------------------
	import { GetRandomGradient } from '@/utils/color.js';
	const paneStyle = ref({});
	const refreshGradient = () => (paneStyle.value = { '--random-gradient': GetRandomGradient(2) });
	refreshGradient();

	// aardio 自定义标题栏 ----------------------------------------------------------------------
	import WindowBar from '@/components/WindowBar.vue';
	const WinRef = ref(null);
</script>

<style scoped>
	html {
		background: transparent;
	}

	.AppPage {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		user-select: none;

		.Pane {
			position: relative;
			width: 500px;
			height: 300px;
			/* background: var(--random-gradient); */
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
			border-radius: 10px;
			overflow: hidden;

			.Title {
				font-size: 40px;
				font-weight: bold;
				text-align: center;
				margin: 40px 0;
				color: #fff;
				letter-spacing: 10px;
			}

			.SetPane {
				display: flex;
				justify-content: space-evenly;
				margin: 30px 0;
			}

			.Btns {
				display: flex;
				justify-content: space-evenly;
				margin: 20px 0;
				.el-button {
					width: 120px;
				}
			}
		}
	}
</style>
