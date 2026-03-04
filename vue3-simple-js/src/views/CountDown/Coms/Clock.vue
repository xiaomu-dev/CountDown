<template>
	<div class="TimeClock" :style="{ color: textColor }">
		<div class="TimeBlock" :style="bgStyle">
			<span class="Font">{{ formatTime(hour) }}</span>
		</div>

		<span class="Colon Font">{{ props.colon }}</span>

		<div class="TimeBlock" :style="bgStyle">
			<span class="Font">{{ formatTime(minute) }}</span>
		</div>

		<span class="Colon Font">{{ props.colon }}</span>

		<div class="TimeBlock" :style="bgStyle">
			<span class="Font">{{ formatTime(second) }}</span>
		</div>
	</div>
</template>

<script setup>
	// 收传 ---------------------------------------------------------------------------------------------
	const props = defineProps({
		modelValue: { type: Number, default: 0 },
		colon: { type: String, default: ':' },
		bgColor: {
			type: String,
			default: '#ffffff',
			validator: val => /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(val),
		},
		textColor: {
			type: String,
			default: '#ffffff',
			validator: val => /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(val),
		},
		bgOpacity: { type: Number, default: 0.2, validator: v => v >= 0 && v <= 1 },
		borderOpacity: { type: Number, default: 0.2, validator: v => v >= 0 && v <= 1 },
	});
	const emits = defineEmits(['update:modelValue']);

	// 模板中转换为十六进制透明度 -----------------------------------------------------------------------
	const getHexOpacity = opacity => {
		return Math.floor(opacity * 255)
			.toString(16)
			.padStart(2, '0');
	};

	// 背景样式 ------------------------------------------------------------------------------------------
	const bgStyle = computed(() => ({
		background: `${props.bgColor}${getHexOpacity(props.bgOpacity)}`,
		borderColor: `${props.bgColor}${getHexOpacity(props.borderOpacity)}`,
	}));

	// 双向绑定 ------------------------------------------------------------------------------------------
	import { useVModel } from '@vueuse/core';
	const times = useVModel(props, 'modelValue', emits);

	// 总秒数转时分秒
	const hour = computed(() => Math.floor(props.modelValue / 3600));
	const minute = computed(() => Math.floor((props.modelValue % 3600) / 60));
	const second = computed(() => props.modelValue % 60);

	// 补零工具函数
	const formatTime = num => num.toString().padStart(2, '0');
</script>

<style scoped>
	.TimeClock {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		cursor: default;
		user-select: none;

		.TimeBlock {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20px;
			box-sizing: border-box;
			border-radius: 10px;
			border: 1px solid;
			backdrop-filter: blur(10px);
			min-width: 100px;
		}

		.Font {
			font-size: 36px;
			font-weight: bold;
			line-height: 36px;
		}

		.Colon {
			margin: 0 5px;
		}
	}
</style>
