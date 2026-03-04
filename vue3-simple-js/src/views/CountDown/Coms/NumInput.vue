<template>
	<el-input-number
		ref="NumberRef"
		v-model="num"
		v-bind="$attrs"
		:controls-position="props.controlsPosition"
		:size="props.size"
		:style="{
			width: props.width,
		}"
	>
		<template #prefix v-if="!!props.prefix">
			<span>{{ props.prefix }}</span>
		</template>
		<template #suffix v-if="!!props.suffix">
			<span>{{ props.suffix }}</span>
		</template>
	</el-input-number>
</template>

<script setup>
	// 收传 ---------------------------------------------------------------------------------------------
	const props = defineProps({
		modelValue: { type: Number, default: 0 },
		prefix: { type: String, default: '' },
		suffix: { type: String, default: '' },
		width: { type: String, default: '100%' },
		size: {
			type: String,
			default: 'large',
			validator: val => ['large', 'default', 'small'].includes(val),
		},
		controlsPosition: {
			type: String,
			default: 'right',
			validator: val => ['left', 'right'].includes(val),
		},
	});
	const emits = defineEmits(['update:modelValue']);

	// 双向绑定 ------------------------------------------------------------------------------------------
	import { useVModel } from '@vueuse/core';
	const num = useVModel(props, 'modelValue', emits);

	// 获取组件实例 --------------------------------------------------------------------------------------
	const NumberRef = ref(null);

	// 导出 ----------------------------------------------------------------------------------------------
	defineExpose({
		focus: () => NumberRef.value?.focus(),
		blur: () => NumberRef.value?.blur(),
	});
</script>

<style scoped></style>
